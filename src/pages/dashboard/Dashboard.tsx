import { BarraDeFerraentas } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      barraDeFerramentas={(
        <BarraDeFerraentas
          mostrarInputBusca
        />
      )}>
      testando
    </LayoutBaseDePagina>
  );
}