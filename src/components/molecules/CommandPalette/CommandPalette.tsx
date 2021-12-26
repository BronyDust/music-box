import { Component, JSX } from "solid-js";
import Card from "../../atoms/Card";
import Typography from "../../atoms/Typography";
import css from "./CommandPalette.module.css";

function CommandPalette(props: { children: JSX.Element }) {
  return (
    <div class={css.wrapper}>
      <Card class={css.palette}>{props.children}</Card>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: JSX.Element;
}

export const CommandPaletteSection: Component<SectionProps> = (props) => {
  return (
    <div class={css.palette_section}>
      <Typography class={css.palette_section_title} size="tiny">
        {props.title}
      </Typography>
      <div>{props.children}</div>
    </div>
  );
};

export default CommandPalette;
