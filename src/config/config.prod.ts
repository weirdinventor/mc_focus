import { ConfigurationProps } from './../core/build';
import axios from 'axios';

// const PROD_URL = 'https://moulaclub-app-1.onrender.com/';
const PROD_URL = 'https://mc-backend-3hau.onrender.com/';

export const prodConfig: ConfigurationProps = {
  httpClient: axios.create({ baseURL: PROD_URL }),
};
