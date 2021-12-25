import { Component, mergeProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import css from './Typography.module.css';
import type { JSX } from "solid-js/types/jsx";

interface TypographyProps {
  size: 'mega' | 'xxlarge' | 'xlarge' | 'large' | 'medium' | 'small' | 'tiny';
  class?: string;
  as?: keyof JSX.IntrinsicElements;
}

const Typography: Component<TypographyProps> = (props) => {
  const merged = mergeProps({ as: "div" }, props);
  const classList = props.class ? `${css[merged.size]} ${props.class}` : css[merged.size];

  return (
    <Dynamic component={merged.as} class={classList}>
      {merged.children}
    </Dynamic>
  );
}

export default Typography;
