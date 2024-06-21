import { useState } from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";

interface Props {
  colors:string[];
}

export const MultiSelect = ({colors}:Props) => {

  const [values, setValues] = useState<Selection>(new Set([]));

  return (
      <Select
        selectionMode="multiple"
        placeholder="No seleccionado"
        selectedKeys={values}
        onSelectionChange={setValues}
      >
        {colors.map((color) => (
          <SelectItem key={color} value={color}>
            {color}
          </SelectItem>
        ))}
      </Select>
  );
};