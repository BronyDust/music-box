import { Component, onCleanup, onMount } from "solid-js";
import css from './Overlap.module.css';

/**
 * Black overlap that places children to center
 * 
 * Locking of overflow (body) provided
 */
const Overlap: Component = (props) => {
  onMount(() => {
    document.body.style.overflow = 'hidden';

    onCleanup(() => {
      document.body.style.overflow = 'auto';
    });
  });

  return (
    <div class={css.overlap}>
      <div class={css.content}>{props.children}</div>
    </div>
  )
}

export default Overlap;
