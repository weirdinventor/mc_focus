import { ConfigurationProps } from './../core/build';
import axios from 'axios';

// const DEV_URL = 'https://moulaclub-app-1.onrender.com/';
const DEV_URL = 'https://mc-backend-3hau.onrender.com/';

export const devConfig: ConfigurationProps = {
  httpClient: axios.create({ baseURL: DEV_URL }),
};
