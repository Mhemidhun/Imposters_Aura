// * custom hook

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/schemas/admin/login";
import { loginAPI } from "@/services/admin/api";

export const useLogin = ()=>{

    const [showPassword, setShowPassword] = useState(false);


      const onSubmit = async (data: LoginFormValues) => {
        console.log("Logging in with", data);
        try {
          const res = await loginAPI(data)
          console.log('res',res)
        } catch (error) {
          console.log(error)
        }
        // await new Promise((resolve) => setTimeout(resolve, 1500));
        alert("Login successful!");
      };
      
        const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
      });
    
      return{register,handleSubmit,errors,isSubmitting,onSubmit,showPassword,setShowPassword}
}