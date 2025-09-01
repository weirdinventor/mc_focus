import { ConfigurationProps } from './../core/build';
import axios from 'axios';

// const DEV_URL = 'https://moulaclub-app-1.onrender.com/';

const DEV_URL = 'http://localhost:3000/';
//const DEV_URL = 'https://focus-academie.com/';

export const devConfig: ConfigurationProps = {
  httpClient: axios.create({ baseURL: DEV_URL }),
};
