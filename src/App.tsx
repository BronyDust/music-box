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
import Card from "./components/atoms/Card";
import Overlap from "./components/atoms/Overlap";
import Typography from "./components/atoms/Typography";
import CommandPalette from "./components/molecules/CommandPalette";
import ModalLayout from "./components/molecules/ModalLayout";

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
          
        </Match>
      </Switch>
    </CommandPalette>
  );
};

export default App;
