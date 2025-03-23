import axios from 'axios';

// const API_SECRET = 'BCps-wlRAz244tguJUFpdPhUFio';
// const API_KEY = '149973343964814';

export const uploadImage = async (file: any) => {
  try {
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dh7qptl2n/image/upload',
      {
        file,
        upload_preset: 'ecomerce_uia',
        cloud_name: 'dh7qptl2n',
      }
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
