import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import HomePage from "./schools/pages/HomePage";
import NavbarBottom from "./shared/components/Navigation/NavbarBottom/NavbarBottom";
import LoginPage from "./user/pages/LoginPage";
import ProfilPage from "./user/pages/ProfilPage";
import FavoritePage from "./user/pages/FavoritePage";
import ProfilDetails from "./user/pages/ProfilDetails";
import { setLogin } from "./shared/state/store";
import { useDispatch, useSelector } from "react-redux";
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
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const getUser = async () => {
    try {
      if (!user) {
        const url = `http://localhost:5000/api/v1/googleAuth//google/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        dispatch(
          setLogin({
            user: data.user,
          })
        );
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/searchResult" element={<ResultsPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/profil/:id" element={<ProfilPage />} />
          <Route path="/profil/:id/favorite" element={<FavoritePage />} />
          <Route path="/profil/:id/details" element={<ProfilDetails />} />
          <Route path="/school/:id" element={<SchoolDetails />} />
          <Route
            path="/school/:id/request/:requestId"
            element={<SchoolUpdate />}
          />
          <Route path="/school/:id/request" element={<RequestForm />} />
          <Route path="/prices/:id" element={<Offers />} />
          <Route path="/paiement" element={<Cart />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/request/:id" element={<RequestDetails />} />
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
