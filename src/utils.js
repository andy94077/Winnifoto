import { SERVER_URL } from "./config";

export default function CONCAT_SERVER_URL(url) {
  return url.startsWith(SERVER_URL) || url.startsWith("blob")
    ? url
    : `${SERVER_URL}${url}`;
}
