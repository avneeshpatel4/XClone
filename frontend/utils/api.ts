import axios, {AxiosInstance} from "axios"
import { useAuth } from "@clerk/clerk-expo"


const API_BASE_URL = "https://x-clone-sable-alpha.vercel.app"

export const createApiClient = (getToken:()=>Promise<string|null>):
 AxiosInstance=>{
    const api =  axios.create({baseURL:API_BASE_URL});
 api.interceptors.request.use(async (config) => {
  const token = await getToken();
  console.log("Token being sent:", token);

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  console.log("Final headers:", config.headers);
  return config;
});

    return api
 }

 export const useApiClient = ():AxiosInstance=>{
     const {getToken} = useAuth()
     return createApiClient(getToken)
 }

 export const userApi = {
    syncUser: (api:AxiosInstance) =>api.post("/user/sync"),
    syncCurrentUser:(api:AxiosInstance) =>api.get("/user/me"),
    updateProfile: (api:AxiosInstance,data:any)=>api.put("/users/profile",data),

 }