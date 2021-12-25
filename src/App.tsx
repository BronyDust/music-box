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
import Overlap from "./components/atoms/Overlap";

const App: Component = () => {
  const pageManager = useContext(PageManagerContext);
  const [getState, setState] = createSignal<PageManagerState>(pageManager.state);

  onMount(() => {
    pageManager.subscribe(setState);

    onCleanup(() => pageManager.unsubscribe(setState));
  });

  return (
    <>
      <Switch>
        <Match when={getState() === PageManagerState.NoSheet}>
          <Button>adg</Button>
          <Overlap>eg</Overlap>
        </Match>
      </Switch>
    </>
  );
};

export default App;
