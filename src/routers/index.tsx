import { Navigate, Route, Routes } from "react-router-dom"
import { DrawerContext } from "../shared/contexts"
import { useContext, useEffect } from "react";
import { Dashboard, ListagemDePessoas } from "../pages";

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
          element={<p>detalhe</p>}
        />
        <Route
          path='*'
          element={<Navigate to="/pagina-inicial" />}
        />
      </Routes>
    </>
  )
}