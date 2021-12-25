import { JSX } from 'solid-js';
import Card from '../../atoms/Card';
import css from './CommandPalette.module.css';

function CommandPalette(props: { children: JSX.Element }) {
  return (
    <Card class={css.palette}>{props.children}</Card>
  )
}

export default CommandPalette;
