import { BsPlusCircle, BsTrash } from "solid-icons/bs";
import {
  Component,
  createSignal,
  Match,
  onCleanup,
  onMount,
  Switch,
  useContext,
} from "solid-js";
import { PageManagerContext } from ".";
import { PageManagerState } from "./agents/page-manager.class";
import Button from "./components/atoms/Button";
import CommandPalette from "./components/molecules/CommandPalette";
import { CommandPaletteSection } from "./components/molecules/CommandPalette/CommandPalette";

const App: Component = () => {
  const pageManager = useContext(PageManagerContext);
  const [getState, setState] = createSignal<PageManagerState>(
    pageManager.state,
  );

  onMount(() => {
    pageManager.subscribe(setState);

    onCleanup(() => pageManager.unsubscribe(setState));
  });

  return (
    <CommandPalette>
      <CommandPaletteSection title="Страница">
        <Switch>
          <Match when={getState() === PageManagerState.NoSheet}>
            <Button suffix={<BsPlusCircle />} onClick={() => pageManager.initSheet()}>Создать</Button>
          </Match>
          <Match when={getState() === PageManagerState.Sheet}>
            <Button suffix={<BsTrash />} onClick={() => pageManager.deleteSheet()}>Удалить</Button>
          </Match>
        </Switch>
      </CommandPaletteSection>
    </CommandPalette>
  );
};

export default App;
