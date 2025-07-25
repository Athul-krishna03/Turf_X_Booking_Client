import { api } from "../../api/auth.axios";
import { RegisterData ,LoginData, AuthResponse} from "../../types/Type";

export interface AxiosResponse {
  success: boolean;
  message: string;
}

export const registeUser = async(data:RegisterData)=>{
    try{
        const response = await api.post('/signup',data);
        return response.data
    }catch(error){
        throw new Error((error as Error).message || "Registration failed");
    }
};

export const sendOtp = async(email:string)=>{
    try {
        const response = await api.post('/send-otp',{email});
        return response       
    } catch (error) {
        throw new Error((error as Error).message || "Failed to send OTP")
    }
};

export const verifyOtp = async (email:string,otp:string)=>{
    try {
        const response = await api.post("/verify-otp",{email,otp});
        return response
    } catch (error) {
        throw new Error((error as Error).message || "Failed in verify-otp")
    }
}

export const loginUser = async (data: LoginData) => {
    try {
      const response = await api.post("/login", { ...data });
      console.log("login data response", response);
      return response;
    } catch (error) {
      throw new Error((error as Error).message || "Failed to Login User");
    }
  };

  export const googleAuth = async({
    credential,
    client_id,
    role

  }:{
    credential:string;
    client_id:string;
    role:string;
  }):Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/google-auth',{
        credential,
        client_id,
        role
    });

    return response.data
  }
  export const sendForgotPasswordEmail = async (email: string,role?:string) => {
    const response = await api.post("/forgot-password", {email , role});
    return response.data;
  };

  export const resetPassword = async (password:string,token:string)=>{
    const response = await api.patch('/resetPassword',{password,token})
    return response
  }