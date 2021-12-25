import { Component, mergeProps } from "solid-js";
import css from "./Card.module.css";
import type { JSX } from "solid-js/types/jsx";
import { Dynamic } from "solid-js/web";

interface CardProps {
  class?: string;
  as?: keyof JSX.IntrinsicElements;
}

const Card: Component<CardProps> = (props) => {
  const merged = mergeProps({ as: "div" }, props);
  const classList = props.class ? `${css.card} ${props.class}` : css.card;

  return (
    <Dynamic component={merged.as} class={classList}>
      {merged.children}
    </Dynamic>
  );
};

export default Card;
