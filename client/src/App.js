import { Routes, Route } from "react-router-dom";
import HomePage from "./schools/pages/HomePage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NavbarBottom from "./shared/components/Navigation/NavbarBottom/NavbarBottom";
import LoginPage from "./user/pages/LoginPage";
import ProfilPage from "./user/pages/ProfilPage";
import ProfilDetails from "./user/pages/ProfilDetails";
import SchoolDetails from "./schools/pages/SchoolDetails";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/profil/:id" element={<ProfilPage />} />
          <Route path="/profil/:id/details" element={<ProfilDetails />} />
          <Route path="/school/:id" element={<SchoolDetails />} />
        </Routes>
        {location.pathname !== "/register" && <NavbarBottom />}
      </main>
    </>
  );
}

export default App;
