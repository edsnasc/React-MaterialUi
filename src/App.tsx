import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routers";
import { ThemeProvider } from "@emotion/react";
import { LightTheme } from "./shared/themes";

export default function App() {

  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

