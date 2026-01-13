import Axios from "axios";
import { env } from "@/env";

export const Api = Axios.create({
  baseURL: env.VITE_API_URL,
});
