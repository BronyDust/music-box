import { Component } from "solid-js";
import css from './Button.module.css';

interface ButtonProps {
  primary?: boolean;
}

const Button: Component<ButtonProps> = (props) => {
  return (
    <button classList={{
      [css.button]: true,
      [css.primary]: props.primary
    }}>{props.children}</button>
  )
};

export default Button;
