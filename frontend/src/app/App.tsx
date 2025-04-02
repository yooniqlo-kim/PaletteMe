import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import "./App.css";
import router from "@/router";
import { store } from "@/store/store";
import { ToastContainer } from "react-toastify";
import mainLogo from "@/assets/images/MainLogo_100x100.png";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer icon={<img src={mainLogo} />} />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
