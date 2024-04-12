import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./shared/contexts";
import { AppRoutes } from "./routers";
import { MenuLateral } from "./shared/components";

export default function App() {

  return (
    <AppThemeProvider>
      <BrowserRouter>
        <MenuLateral>
          <AppRoutes />
        </MenuLateral>
      </BrowserRouter>
    </AppThemeProvider>
  )
}

