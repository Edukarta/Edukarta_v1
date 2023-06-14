import axios from 'axios';

export const callApi = async (url, method = 'GET', data = null) => {
  try {
    const response = await axios({
      url,
      method,
      data,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Une erreur s\'est produite lors de l\'appel API.');
  }
};
