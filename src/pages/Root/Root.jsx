import { Navbar } from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./Root.scss";

export function Root() {
  return (
    <>
      <header className="header">
        <Navbar />
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}
