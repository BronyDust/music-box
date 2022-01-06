import { BsTrash } from "solid-icons/bs";
import { Component, useContext } from "solid-js";
import { PageManagerContext } from "../..";
import Button from "../atoms/Button";
import { CommandPaletteSection } from "../molecules/CommandPalette/CommandPalette";

const StaffCommands: Component = () => {
  const pageManager = useContext(PageManagerContext);

  return (
    <CommandPaletteSection title="Нотный стан">
      <Button suffix={<BsTrash />} onClick={() => pageManager.removeSelectedStaff()}>Удалить</Button>
    </CommandPaletteSection>
  )
}

export default StaffCommands;
