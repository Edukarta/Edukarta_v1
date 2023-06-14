import axios from "axios";

// Hook to fetch data (default methode GET)
export const callApi = async (url, method = 'GET', data = null) => {
  // console.log("callapi :",url,method,data);
  try {
    //appelle api
    const response = await axios({
      url,
      method,
      data,
    });
     return response;
  } 
  //gestion des erreurs
  catch (error) { 
    if (error.response && error.response.status === 404) {
      return {
        error: "Not Found",
        status: 404,
      };
    }
    else if(error.response && error.response.status === 429){
      localStorage.setItem("captcha",true)
      return {
        error: "No access",
        status: 429,
      };
    }
    else if(error.response && error.response.status === 403){
      return {
        error: "Access deny",
        status: 403,
      };
    }
    // console.error(error);
    throw new Error("Une erreur s'est produite lors de l'appel API.");
  }
};
