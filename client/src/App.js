import { Routes, Route } from "react-router-dom";
import HomePage from "./schools/pages/HomePage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NavbarBottom from "./shared/components/Navigation/NavbarBottom/NavbarBottom";
import Register from "./user/pages/Register";
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>  
      {location.pathname !== '/register' && <NavbarBottom />}
    </>
  );
}

export default App;
