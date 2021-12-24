import { Component, createEffect, createSignal, onCleanup, onMount, useContext } from "solid-js";
import { PageManagerContext } from ".";
import { PageManagerState } from "./agents/page-manager.class";

const App: Component = () => {
  const pageManager = useContext(PageManagerContext);
  const [getState, setState] = createSignal<PageManagerState>();

  onMount(() => {
    pageManager.subscribe((e) => {
      setState(e);
    });

    // onCleanup(() => pageManager.unsubscribe(setState));
  });

  console.log(getState());

  return (
    <>
      <button onclick={() => pageManager.initSheet()}>INIT</button>
      <button onclick={() => pageManager.deleteSheet()}>DELETE</button>
    </>
  );
};

export default App;
