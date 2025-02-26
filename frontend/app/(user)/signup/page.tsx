"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gray-50 p-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Manage the job</h2>
            <p className="text-gray-600 mt-2">More effectively with optimized workflows.</p>
            <img src="/illustration.png" alt="Illustration" className="mt-6 w-64 mx-auto" />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">Get started absolutely free</h2>
          <p className="text-center text-gray-600 mt-1">Already have an account? <a href="#" className="text-green-600">Get started</a></p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="flex gap-3">
              <div className="flex-1">
                <input {...register('firstName')} placeholder="First name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-900" />
                <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
              </div>
              <div className="flex-1">
                <input {...register('lastName')} placeholder="Last name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-900" />
                <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
              </div>
            </div>
            <input {...register('email')} placeholder="Email address" className="w-full p-3 border rounded-lg mt-4 focus:ring-2 focus:ring-gray-900" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
            <input {...register('phone')} placeholder="Phone number" className="w-full p-3 border rounded-lg mt-4 focus:ring-2 focus:ring-gray-900" />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
            <div className="relative mt-4">
              <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-900" />
              <span className="absolute top-3 right-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white p-3 rounded-lg mt-6 hover:bg-gray-800">Create account</button>
          </form>
          <p className="text-center text-gray-600 text-sm mt-4">
            By signing up, I agree to <a href="#" className="text-blue-500">Terms of service</a> and <a href="#" className="text-blue-500">Privacy policy</a>.
          </p>
          <div className="flex items-center mt-6">
            <hr className="flex-1" />
            <span className="px-2 text-gray-500">OR</span>
            <hr className="flex-1" />
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <button className="text-gray-700">Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}
