import { BsPlusCircle } from "solid-icons/bs";
import { Component, useContext } from "solid-js";
import { PageManagerContext } from "../..";
import Button from "../atoms/Button";
import { CommandPaletteSection } from "../molecules/CommandPalette/CommandPalette";

const SheetCommands: Component = () => {
  const pageManager = useContext(PageManagerContext);

  return (
    <CommandPaletteSection title="Нотный стан">
      <Button suffix={<BsPlusCircle />} onClick={() => pageManager.createStaff()}>Добавить</Button>
    </CommandPaletteSection>
  )
}

export default SheetCommands;
