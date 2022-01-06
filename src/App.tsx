import { BsFullscreenExit, BsPlusCircle } from "solid-icons/bs";
import {
  Component,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { PageManagerContext, StandManipulatorContext } from ".";
import { PageManagerState } from "./agents/page-manager.class";
import Button from "./components/atoms/Button";
import CommandPalette from "./components/molecules/CommandPalette";
import { CommandPaletteSection } from "./components/molecules/CommandPalette/CommandPalette";

const App: Component = () => {
  const pageManager = useContext(PageManagerContext);
  const standManipulator = useContext(StandManipulatorContext);
  const [getState, setState] = createSignal<PageManagerState>(
    pageManager.state,
  );

  onMount(() => {
    pageManager.subscribe(setState);

    onCleanup(() => pageManager.unsubscribe(setState));
  });

  return (
    <CommandPalette>
      <CommandPaletteSection title="Нотный стан">
        <Button suffix={<BsPlusCircle />} onClick={() => pageManager.createStaff()}>Добавить</Button>
      </CommandPaletteSection>
      <CommandPaletteSection title="Навигация">
        <Button suffix={<BsFullscreenExit />} onClick={() => standManipulator.setDefaultTranslating()}>По умолчанию</Button>
      </CommandPaletteSection>
    </CommandPalette>
  );
};

export default App;
