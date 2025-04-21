'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

// Define strong password schema
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/\d/, 'Must contain at least one number')
    .regex(/[@$!%*?&]/, 'Must contain at least one special character (@, $, !, %, *, ?, &)')
    .refine((val) => !/\s/.test(val), 'Password must not contain spaces'), // No spaces allowed
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Login data:', data);
    router.replace('/');
  };

  return (
    <div className="flex h-screen pt-[100px]">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 h-full relative">
        <Image
          src="/login_img.jpeg"
          alt="Login Illustration"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 md:px-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Sign in to your account</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Don’t have an account? <a href="/signup" className="text-green-600 font-medium">Get started</a>
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            
            {/* Password Input with Eye Icon */}
            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 transition"
            >
              Sign In
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="mx-4 text-sm text-gray-500">OR</p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4">
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <Image src="/logo-google.svg" alt="Google" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
