import { Input } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Button from "../../shared/components/FormElements/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function PswdRecoverPage() {
  const navigate = useNavigate();
  const notify = () =>
    toast.info(" Mail de recupération envoyé!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  const notifyErr = () =>
    toast.error(" Le mail n'a pas été trouvé!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  const [mailTo, setEmail] = useState("");
  const sendMail = async () => {
    try {
      //appelle api
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/api/v1/user/send_recovery_email`,
        method: "POST",
        data: { mailTo: mailTo },
      });
      // notify();
      // setTimeout(() => {
        navigate('/register');
      // }, 3000);
      return response;
    } catch (error) {
      notifyErr();
      console.error(error);
    }
    // console.error(error);
    // throw new Error("Une erreur s'est produite lors de l'appel API.");
  };
  return (
    <>
      <Input onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={sendMail} />
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default PswdRecoverPage;
