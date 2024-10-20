import { TextField, TextFieldProps } from "@shopify/polaris";
import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
type InputProps = {
  name: string;
  label: string;
  suffix?: ReactElement;
  onchangeCustom?: (value: string) => void;
};

export default ({ name, label, onchangeCustom, ...props }: InputProps) => {
  const { control, setValue, watch } = useFormContext();

  const onchange = (e: string) => {
    if (onchangeCustom) {
      onchangeCustom(e);
    } else {
      setValue(name, e);
    }
  };
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...props}
          value={watch(name)}
          label={label}
          autoComplete=""
          onChange={onchange}
        />
      )}
      name={name}
      control={control}
    />
  );
};
