import axios from "axios";
import { API } from "./endpoints";

export const ApiClient = axios.create({
  baseURL: API.BaseUrl,
  headers: { "Content-Type": "application/json" },
});