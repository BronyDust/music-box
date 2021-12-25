import { Component, mergeProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import css from './Typography.module.css';
import type { JSX } from "solid-js/types/jsx";

interface TypographyProps {
  size: 'mega' | 'xxlarge' | 'xlarge' | 'large' | 'medium' | 'small' | 'tiny'; 
  as?: keyof JSX.IntrinsicElements;
}

const Typography: Component<TypographyProps> = (props) => {
  const merged = mergeProps({ as: "div" }, props);

  return (
    <Dynamic component={merged.as} class={css[merged.size]}>
      {merged.children}
    </Dynamic>
  );
}

export default Typography;
