import { Component, mergeProps } from "solid-js";
import css from "./Card.module.css";
import type { JSX } from "solid-js/types/jsx";
import { Dynamic } from "solid-js/web";

interface CardProps {
  as?: keyof JSX.IntrinsicElements;
}

const Card: Component<CardProps> = (props) => {
  const merged = mergeProps({ as: "div" }, props);

  return (
    <Dynamic component={merged.as} class={css.card}>
      {merged.children}
    </Dynamic>
  );
};

export default Card;
