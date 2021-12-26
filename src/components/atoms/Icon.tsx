import { Component } from "solid-js";
import 'bootstrap-icons/bootstrap-icons.svg';

interface IconProps {
  id: string;
}

const Icon: Component<IconProps> = (props) => {
  return (
    <svg>
      <use href={`bootstrap-icons.svg#${props.id}`}/>
    </svg>
  )
}

export default Icon;
