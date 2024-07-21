import { Box, Card, CardContent, debounce, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () => {

  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isLoadingPeoples, setIsLoadingPeoples] = useState(true);
  const [totalCountCities, setTotalCountCities] = useState(0);
  const [totalCountPeoples, setTotalCountPeoples] = useState(0);

  useEffect(() => {
    setIsLoadingCities(true);


    CidadesService.getAll(1)
      .then((result) => {
        setIsLoadingCities(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountCities(result.totalCount);
        }
      });

    PessoasService.getAll(1)
      .then((result) => {
        setIsLoadingPeoples(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountPeoples(result.totalCount);
        }
      });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid container item spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Pessoas
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingPeoples && (
                      <Typography variant='h1'>
                        {totalCountPeoples}
                      </Typography>
                    )}
                    {isLoadingPeoples && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de cidades
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingCities && (
                      <Typography variant='h1'>
                        {totalCountCities}
                      </Typography>
                    )}
                    {isLoadingCities && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
}