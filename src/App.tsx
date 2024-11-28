import { RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
