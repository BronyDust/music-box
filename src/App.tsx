import { BsFullscreenExit } from "solid-icons/bs";
import {
  Component,
  createSignal,
  Match,
  onCleanup,
  onMount,
  Switch,
  useContext,
} from "solid-js";
import { PageManagerContext, StandManipulatorContext } from ".";
import { PageManagerState } from "./agents/page-manager.class";
import Button from "./components/atoms/Button";
import CommandPalette from "./components/molecules/CommandPalette";
import { CommandPaletteSection } from "./components/molecules/CommandPalette/CommandPalette";
import SheetCommands from "./components/organisms/SheetCommands";
import StaffCommands from "./components/organisms/StaffCommands";

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
      <Switch>
        <Match when={getState() === PageManagerState.SheetSelected}>
          <SheetCommands />
        </Match>
        <Match when={getState() === PageManagerState.StaffSelected}>
          <StaffCommands />
        </Match>
      </Switch>
      
      <CommandPaletteSection title="Навигация">
        <Button suffix={<BsFullscreenExit />} onClick={() => standManipulator.setDefaultTranslating()}>По умолчанию</Button>
      </CommandPaletteSection>
    </CommandPalette>
  );
};

export default App;
