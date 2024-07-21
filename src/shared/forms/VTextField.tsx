import { TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";

type TVTextFieldProps = TextFieldProps & {
  name: string;
  control: any;
  label: string;
}

export const VTextField: React.FC<TVTextFieldProps> = ({ name, control, label, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...rest}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={e => { onChange(e.target.value); rest.onChange?.(e) }}
          value={value || ''}
          label={label}
          variant="outlined"
          InputLabelProps={value ? { shrink: true } : { shrink: false }}
        />
      )}
    />
  );
}