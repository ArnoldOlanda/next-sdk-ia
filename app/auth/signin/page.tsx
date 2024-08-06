'use client';
import React, { useEffect, useState } from 'react'
import { getProviders, signIn } from 'next-auth/react';
import GoogleLogo from '../../../public/logo-google.png';

const SignInPage = () => {
  const [providers, setProviders] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const setTheProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    setTheProviders();
  }, []);

  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex justify-center'>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className='mt-32'>
          <button onClick={() => signIn(provider.id,{callbackUrl:'/viewer'})} className='bg-blue-950 w-96 h-14 p-2 rounded  flex gap-2 items-center justify-center text-white'>
            {provider.id === 'google' && <img src={GoogleLogo.src} alt="Google Logo" className='w-9'/>}
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SignInPage;
