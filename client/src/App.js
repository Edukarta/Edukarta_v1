import { Routes, Route } from "react-router-dom";
import HomePage from "./schools/pages/HomePage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NavbarBottom from "./shared/components/Navigation/NavbarBottom/NavbarBottom";

function App() {
  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <main>
        
      </main>
      <NavbarBottom/>
    </>
  );
}

export default App;
