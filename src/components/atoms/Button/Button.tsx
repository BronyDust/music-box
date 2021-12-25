import { Component } from "solid-js";
import css from './Button.module.css';

const Button: Component = (props) => {
  return (
    <button class={css.button}>{props.children}</button>
  )
};

export default Button;
