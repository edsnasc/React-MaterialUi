import { Navigate, Route, Routes } from "react-router-dom"
import { useContext, useEffect } from "react";

import { Dashboard, DetalheDePessoas, ListagemDePessoas, ListagemDeCidades, DetalheDeCidades } from "../pages";
import { DrawerContext } from "../shared/contexts"


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
      },
      {
        icon: 'people',
        path: '/pessoas',
        label: 'Pessoas'
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
          path='/pessoas'
          element={<ListagemDePessoas />}
        />
        <Route
          path='/pessoas/detalhe/:id'
          element={<DetalheDePessoas />}
        />
        <Route
          path='/cidades'
          element={<ListagemDeCidades />}
        />
        <Route
          path='/cidades/detalhe/:id'
          element={<DetalheDeCidades />}
        />
        <Route
          path='*'
          element={<Navigate to="/pagina-inicial" />}
        />
      </Routes>
    </>
  )
}