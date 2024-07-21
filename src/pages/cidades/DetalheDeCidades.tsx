import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { cidadeFormSchema } from "../../shared/forms/ValidationForm";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useVform, VTextField } from "../../shared/forms";
import { useForm } from "react-hook-form";

// interface IFormData {
//   nome: string;
// }

export const DetalheDeCidades: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVform();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const { handleSubmit, control, setValue } = useForm({ resolver: zodResolver(cidadeFormSchema), });

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      CidadesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/cidades');
          } else {
            setNome(result.nome)

            setValue('nome', result.nome);
          }
        });
    } else {
      setValue('nome', '');
    }
  }, [id]);

  const onSendData = (dados: any) => {
    setIsLoading(true);

    if (id === 'nova') {
      CidadesService
        .create(dados)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/cidades');
            } else {
              navigate(`/cidades/detalhe/${result}`);
            }
          }
        });
    } else {
      CidadesService
        .updateById(Number(id), dados)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/cidades');
            }
          }
        });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/cidades');
          }
        });
    }
  }

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova cidade' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/cidades')}
        />
      }
    >

      <form ref={formRef} onSubmit={handleSubmit(onSendData)}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <VTextField
                  name="nome"
                  control={control}
                  label="Nome"
                  disabled={isLoading}
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>

    </LayoutBaseDePagina>
  );
}