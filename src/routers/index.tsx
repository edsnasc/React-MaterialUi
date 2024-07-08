import { Navigate, Route, Routes } from "react-router-dom"
import { DrawerContext } from "../shared/contexts"
import { useContext, useEffect } from "react";
import { Dashboard, ListagemDeCidades } from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useContext(DrawerContext);

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial'
      },
      {
        icon: 'location_city',
        path: '/cidades',
        label: 'Cidades'
      }
    ]);
  }, []);

  return (
    <>
      <Routes>
        <Route
          path='/pagina-inicial'
          element={<Dashboard />}
        />
        <Route
          path='/cidades'
          element={<ListagemDeCidades />}
        />
        {/* <Route
          path='/cidades/detalhe/:id'
          element={<Dashboard />}
        /> */}
        <Route
          path='*'
          element={<Navigate to="/pagina-inicial" />}
        />
      </Routes>
    </>
  )
}