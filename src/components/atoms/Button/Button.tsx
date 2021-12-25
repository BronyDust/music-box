import { Component } from "solid-js";
import css from './Button.module.css';

interface ButtonProps {
  onClick: VoidFunction;
  primary?: boolean;
}

const Button: Component<ButtonProps> = (props) => {
  return (
    <button onClick={props.onClick} classList={{
      [css.button]: true,
      [css.primary]: props.primary
    }}>{props.children}</button>
  )
};

export default Button;
