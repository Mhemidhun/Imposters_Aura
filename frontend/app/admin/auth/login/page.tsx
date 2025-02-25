"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLogin } from "@/hooks/admin/useLogin";



export default function Login() {

    const {register,handleSubmit,errors,onSubmit,isSubmitting,showPassword,setShowPassword} = useLogin()
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-bl from-gray-100 to-gray-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">M</span>
          </div>
        </div>

        <h2 className="mt-4 text-center text-2xl font-semibold text-gray-800">Sign in to your account</h2>
        <p className="mt-1 text-center text-sm text-gray-500">
          Don’t have an account? <a href="#" className="text-green-600 hover:underline">Get started</a>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              {...register("email")}
              className={`mt-1 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`mt-1 w-full rounded-lg border p-3 pr-10 focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between text-sm">
            <span></span>
            <a href="#" className="text-gray-600 hover:text-green-600">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-black px-4 py-3 text-white transition hover:bg-gray-900 disabled:bg-gray-400"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="mt-4 flex items-center justify-center space-x-2 text-gray-500">
          <span className="h-px w-20 bg-gray-300"></span>
          <span className="text-sm">OR</span>
          <span className="h-px w-20 bg-gray-300"></span>
        </div>

        {/* Social Logins */}
        <div className="mt-4 flex justify-center space-x-6">
          <button className="rounded-full p-2 text-gray-500 transition hover:text-red-500">
            <FcGoogle size={24} />
          </button>
          <button className="rounded-full p-2 text-gray-500 transition hover:text-black">
            <FaGithub size={24} />
          </button>
          <button className="rounded-full p-2 text-gray-500 transition hover:text-blue-500">
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Help Button */}
        <div className="mt-6 flex justify-end text-sm text-gray-600">
          <a href="#" className="flex items-center gap-1 hover:text-green-600">
            <span>Need help?</span>
            <span className="text-gray-500">⚙️</span>
          </a>
        </div>
      </div>
    </div>
  );
}
