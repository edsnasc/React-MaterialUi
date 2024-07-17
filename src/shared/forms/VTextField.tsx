import { TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";

type TVTextFieldProps = TextFieldProps & {
  name: string;
  control: any;
  label: string;
}

export const VTextField: React.FC<TVTextFieldProps> = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}