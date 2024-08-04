import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';
import { getUserByEmail } from '@/service/supabaseService';


interface FormData {
    email: string;
    password: string;
  }


  
const LoginPage = () => {

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [error, setError] = useState<string | null>(null);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
    
        try {
          // Here you would typically send the data to your API
          const response = await getUserByEmail(formData.email)
          console.log(response)
    
          // Handle successful signup
          console.log('Signup successful!', formData);
          // Redirect or show success message
        } catch (err) {
          setError('An error occurred during signup. Please try again.');
          console.error('Signup error:', err);
        } finally {
          setIsSubmitting(false);
        }
      };


  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
        <div>
          <div className="flex justify-center items-center mb-12">
            <Image src="/slay.png" alt="Slay Logo" width={128} height={64} />
          </div>
          
          <h1 className="text-4xl font-bold text-black mb-2">Welcome Back</h1>
          
          <form onSubmit={handleSubmit}>
        <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  className="mt-1 block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password" 
                  className="mt-1 block w-full text-black px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              

              <button
                type="submit"
                className="w-full py-2 px-4 mb-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
        
          
          <div className="text-center text-sm text-gray-500 mb-4">Or Continue With</div>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button className="p-2 border border-gray-300 rounded-full">
              <FaGoogle className="text-red-500" />
            </button>
            <button className="p-2 border border-gray-300 rounded-full">
              <FaApple className="text-black" />
            </button>
            <button className="p-2 border border-gray-300 rounded-full">
              <FaFacebook className="text-blue-600" />
            </button>
          </div>
        </div>

       
   
      </div>
      
      <div className='hidden md:block w-full md:w-1/2 relative'>
        <Image 
          src='/login_pic.png' 
          alt="Login Logo" 
          layout='fill' 
          objectFit="cover"
          className='relative'
        />
      </div>
    </div>
  );
};

export default LoginPage;