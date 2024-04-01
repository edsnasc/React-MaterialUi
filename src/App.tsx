import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./shared/contexts";
import { AppRoutes } from "./routers";

export default function App() {

  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  )
}

