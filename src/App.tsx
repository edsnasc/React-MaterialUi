import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routers";

export default function App() {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

