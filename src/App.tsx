import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { AppRoutes } from "./routers";
import { MenuLateral } from "./shared/components";

export default function App() {

  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  )
}

