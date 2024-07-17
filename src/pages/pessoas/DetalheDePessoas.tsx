import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms/VTextField";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useForm } from "react-hook-form";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

// interface IFormData {
//   nomeCompleto: string;
//   email: string;
//   cidadeId: number;
// }

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const { handleSubmit, control, setValue } = useForm();

  const onSendData = (dados: any) => {
    setIsLoading(true);

    if (id === 'nova') {
      PessoasService
        .create(dados)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate(`/pessoas/detalhe/${result}`);
          }
        });
    } else {
      PessoasService
        .updateById(Number(id), dados)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          }
        });
    }
  };

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto)
            console.log(result);

            setValue('nomeCompleto', result.nomeCompleto);
            setValue('email', result.email);
            setValue('cidadeId', result.cidadeId);
          }
        });
    }
  }, [id]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/pessoas');
          }
        });
    }
  }

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={() => { formRef.current?.requestSubmit(); }}
          aoClicarEmSalvarEFechar={() => { }}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
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
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  name="nomeCompleto"
                  control={control}
                  label="Nome Completo"
                  disabled={isLoading}
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  name="email"
                  control={control}
                  label="Email"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  name="cidadeId"
                  control={control}
                  label="Cidade"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>

    </LayoutBaseDePagina>
  );
}