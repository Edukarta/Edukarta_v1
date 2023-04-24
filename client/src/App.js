import { Routes, Route } from "react-router-dom";
import HomePage from "./schools/pages/HomePage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NavbarBottom from "./shared/components/Navigation/NavbarBottom/NavbarBottom";
import LoginPage from "./user/pages/LoginPage";
import ProfilPage from "./user/pages/ProfilPage";
import ProfilDetails from "./user/pages/ProfilDetails";
import SchoolDetails from "./schools/pages/SchoolDetails";
import RequestForm from "./request/page/RequestForm";
import Dashboard from "./admin/pages/Dashboard";
import SchoolUpdate from "./schools/pages/SchoolUpdate";
import RequestDetails from "./request/page/RequestDetails";
import { useLocation } from "react-router-dom";
import ResultsPage from "./schools/pages/ResultsPage";

function App() {
  const location = useLocation();
  return (
    <>
    {!location.pathname.startsWith("/admin") && <MainNavigation />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/searchResult" element={<ResultsPage/>}/>
          <Route path="/register" element={<LoginPage />} />
          <Route path="/profil/:id" element={<ProfilPage />} />
          <Route path="/profil/:id/details" element={<ProfilDetails />} />
          <Route path="/school/:id" element={<SchoolDetails />} />
          <Route path="/school/:id/request/:requestId" element={<SchoolUpdate />} />
          <Route path="/school/:id/request" element={<RequestForm />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/request/:id" element={<RequestDetails />} />
        </Routes>
        {!["/register"].includes(location.pathname) &&
          !location.pathname.startsWith("/profil/") &&
          !location.pathname.includes("request") && 
          !location.pathname.startsWith("/admin") && <NavbarBottom />}
      </main>
    </>
  );
}

export default App;
