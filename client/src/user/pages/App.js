import { Routes, Route } from "react-router-dom";
import HomePage from "../../schools/pages/HomePage";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import NavbarBottom from "../../shared/components/Navigation/NavbarBottom/NavbarBottom";
import LoginPage from "./LoginPage";
import ProfilPage from "./ProfilPage";
import ProfilDetails from "./ProfilDetails";
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<LoginPage/>}/>
        <Route path="/profil/:id" element={<ProfilPage/>}/>
        <Route path="/profil/:id/details" element={<ProfilDetails/>}/>
      </Routes>  
      {location.pathname !== '/register' && <NavbarBottom />}
    </>
  );
}

export default App;
