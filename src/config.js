import "dotenv-defaults/config";
import axios from "axios";

const { REACT_APP_SERVER_URL: SERVER_URL } = process.env;
const SERVER = axios.create({ baseURL: `${SERVER_URL}/api` });

export { SERVER_URL, SERVER };
