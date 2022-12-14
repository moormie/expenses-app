import { FC, useRef, useState } from "react";
import StyledSelect from ".";
import { CaretDown, CaretUp } from "../../assets";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { InputField } from "../InputField/InputField";
import { MenuList } from "../MenuList/MenuList";
import { Delayed } from "../Delayed";
import { myTheme } from "../../theme";

interface Props {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  placeholder?: string;
  style?: React.CSSProperties;
}

export const Select: FC<Props> = ({
  value,
  setValue,
  options,
  placeholder,
  style,
}) => {
  const [open, setOpen] = useState(false);

  const onSelect = (item: string) => {
    setValue(item);
    setOpen(false);
  };
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <StyledSelect.Container style={style}>
      <InputField
        ref={ref}
        disabled
        value={value}
        endAdornment={
          open ? (
            <CaretUp color={myTheme.colors.dark.green} />
          ) : (
            <CaretDown color={myTheme.colors.dark.green} />
          )
        }
        placeholder={placeholder}
        onClick={() => setOpen(!open)}
      />
      <Delayed visible={open}>
        <MenuList values={options} onSelect={onSelect} selectedItem={value} />
      </Delayed>
    </StyledSelect.Container>
  );
};
