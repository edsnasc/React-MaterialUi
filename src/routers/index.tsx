import { Button } from "@mui/material"
import { Navigate, Route, Routes } from "react-router-dom"
import { ThemeContext } from "../shared/contexts"
import { useContext } from "react";

export const AppRoutes = () => {
   const {toggleTheme} = useContext(ThemeContext);

    return (
        <>
            <Routes>
                <Route
                    path='/pagina-inicial'
                    element={<Button variant="contained" color="primary" onClick={toggleTheme}>Toggle Theme</Button>}
                />
                <Route
                    path='*'
                    element={<Navigate to="/pagina-inicial" />}
                />
            </Routes>
        </>
    )
}