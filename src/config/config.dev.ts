import { ConfigurationProps } from './../core/build';
import axios from 'axios';

const DEV_URL = 'http://localhost:3001/';

export const devConfig: ConfigurationProps = {
  httpClient: axios.create({ baseURL: DEV_URL }),
};
