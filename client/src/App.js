import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./schools/pages/HomePage";
import NavbarBottom from "./shared/components/Navigation/NavbarBottom/NavbarBottom";
import LoginPage from "./user/pages/LoginPage";
import { useSelector } from "react-redux";
import ProfilPage from "./user/pages/ProfilPage";
import FavoritePage from "./user/pages/FavoritePage";
import ProfilDetails from "./user/pages/ProfilDetails";
import Cart from "./user/pages/Cart";
import SchoolDetails from "./schools/pages/SchoolDetails";
import RequestForm from "./request/page/RequestForm";
import Dashboard from "./admin/pages/Dashboard";
import SchoolUpdate from "./schools/pages/SchoolUpdate";
import RequestDetails from "./request/page/RequestDetails";
import Offers from "./payment/pages/Offers";
import { useLocation } from "react-router-dom";
import ResultsPage from "./schools/pages/ResultsPage";
import AdminLogin from "./admin/pages/AdminLogin";
import Captcha from "./captcha/pages/captcha";
import RedirectionPage from "./schools/pages/RedirectionPage";


function App() {
  const location = useLocation();
  const isAuth = Boolean(useSelector((state) => state.token));
 
  
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/searchResult" element={<ResultsPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/profil/:_id" element={isAuth ? <ProfilPage /> : <LoginPage/>} />
          <Route path="/profil/:id/favorite" element={<FavoritePage />} />
          <Route path="/profil/:id/details" element={<ProfilDetails />} />
          <Route path="/school/:id" element={<SchoolDetails />} />
          <Route
            path="/school/:id/request/:requestId"
            element={<SchoolUpdate />}
          />
          <Route path="/school/:id/request" element={<RequestForm />} />
          <Route path="/prices/:id" element={isAuth ? <Offers /> : <LoginPage/>} />
          <Route path="/paiement" element={isAuth ? <Cart /> : <LoginPage/>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/request/:id" element={<RequestDetails />} />
          <Route path="/captcha" element={<Captcha />} />
          <Route path="/googleRedirect" element={<RedirectionPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!["/register"].includes(location.pathname) &&
        !location.pathname.startsWith("/profil/") &&
        !location.pathname.includes("request") &&
        !location.pathname.startsWith("/admin") &&
        !location.pathname.startsWith("/prices") && <NavbarBottom />}
    </>
  );
}

export default App;
