import { Component, JSX, Show } from "solid-js";
import css from "./Button.module.css";

interface ButtonProps {
  onClick: VoidFunction;
  primary?: boolean;
  suffix?: JSX.Element;
}

const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      classList={{
        [css.button]: true,
        [css.primary]: props.primary,
      }}
    >
      {props.children}
      <Show when={props.suffix}>
        <span class={css.suffix}>{props.suffix}</span>
      </Show>
    </button>
  );
};

export default Button;
