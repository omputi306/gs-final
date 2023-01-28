import logo from "./logo.svg";
import "./App.css";
import MainRoutes from "./Routes";
import DialogManager from "./apps/common/Dialog/DialogManager";
import { ToastContainer } from "react-toastify";
import Header from "./features/layout/Header";
import Sidebar from "./features/layout/Sidebar/Sidebar";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
      <DialogManager />
      <ToastContainer position="top-right" theme="colored" hideProgressBar />
      <Header />
      <Sidebar />
      <MainRoutes />
    </>
  );
}

export default App;
