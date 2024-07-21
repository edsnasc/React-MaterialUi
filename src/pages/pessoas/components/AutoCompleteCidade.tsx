import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";

import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../../shared/hooks";


type TAutoCompleteOption = {
  id: number;
  label: string;
}

interface IAutoCompleteCidadesProps {
  isExternalLoading?: boolean;
  name: string;
  control: any;
  label: string;
  id: number | undefined;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadesProps> = ({ isExternalLoading, name, control, label, id }) => {
  const { debounce } = useDebounce();

  const [selectedId, setSelectedId] = useState<number | undefined>(id);

  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(1, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            //alert(result.message);
          } else {

            console.log(result.data)

            setOpcoes(result.data.map((cidade) => ({ id: cidade.id, label: cidade.nome })));
          }
        });
    });
  }, [busca]);



  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null

    const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
    if (!selectedOption) return null

    return selectedOption;
  }, [selectedId, opcoes]);


  return (
    <Controller
      name={name}
      control={control}
      defaultValue={selectedId}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          openText="Abrir"
          closeText="Fechar"
          noOptionsText="Sem opções"
          loadingText="Carregando..."

          disablePortal
          options={opcoes}
          loading={isLoading}
          disabled={isExternalLoading}
          value={autoCompleteSelectedOption}
          popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
          onInputChange={(_e, newValue) => setBusca(newValue)}
          onChange={(_e, newValue) => {
            field.onChange(newValue?.id);
            setSelectedId(newValue?.id);
            setBusca('');
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={error ? error.message : null}

              error={!!error}
              label={label}
            />
          )}
        />
      )}
    />
  );
};