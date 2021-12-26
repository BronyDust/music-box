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
      <Switch>
        <Match when={getState() === PageManagerState.NoSheet}>
          <CommandPaletteSection title="Страница">
            <Button onClick={() => pageManager.initSheet()}>Создать</Button>
          </CommandPaletteSection>
        </Match>
        <Match when={getState() === PageManagerState.Sheet}>
          <CommandPaletteSection title="Страница">
            <Button onClick={() => pageManager.deleteSheet()}>Удалить</Button>
          </CommandPaletteSection>
        </Match>
      </Switch>
    </CommandPalette>
  );
};

export default App;
