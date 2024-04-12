import { Button } from "@mui/material"
import { Navigate, Route, Routes } from "react-router-dom"
import { DrawerContext } from "../shared/contexts"
import { useContext } from "react";

export const AppRoutes = () => {
   const { toggleDrawerOpen } = useContext(DrawerContext);

    return (
        <>
            <Routes>
                <Route
                    path='/pagina-inicial'
                    element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Drawer Theme</Button>}
                />
                <Route
                    path='*'
                    element={<Navigate to="/pagina-inicial" />}
                />
            </Routes>
        </>
    )
}