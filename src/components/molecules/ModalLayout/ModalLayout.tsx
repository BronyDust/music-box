import { Component, Show } from "solid-js";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";
import Typography from "../../atoms/Typography";
import css from "./ModalLayout.module.css";

interface ModalLayoutProps {
  title: string;
  actionTitle: string;
  action: VoidFunction;
}

const ModalLayout: Component<ModalLayoutProps> = (props) => {
  return (
    <Card class={css.card}>
      <Typography class={css.title} size="xlarge">
        {props.title}
      </Typography>
      <Show when={props.children}>
        <Typography class={css.description} size="medium">
          {props.children}
        </Typography>
      </Show>
      <div class={css.buttons}>
        <Button primary>{props.actionTitle}</Button>
      </div>
    </Card>
  );
};

export default ModalLayout;
