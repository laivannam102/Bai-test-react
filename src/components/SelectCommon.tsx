import { Select } from "@shopify/polaris";
import { Controller, useFormContext } from "react-hook-form";

export interface optionSelect {
  label: string;
  value: string;
}

interface InputProps {
  name: string;
  label: string;
  options: optionSelect[];
}

export default ({ name, label, options }: InputProps) => {
  const { control, setValue } = useFormContext();
  const handleOnchange = (select: string, id: string) => {
    console.log(select, id, "====selection===");
    setValue(name, select);
  };

  return (
    <Controller
      render={({ field }) => (
        <Select
          label="Date range"
          options={options}
          onChange={handleOnchange}
          value={field.value}
        />
      )}
      name={name}
      control={control}
    />
  );
};
