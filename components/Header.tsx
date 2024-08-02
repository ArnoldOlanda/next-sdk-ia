'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const Header = () => {

  const router = useRouter()
  const { data: session } = useSession()
  // console.log(session)
  return (
    <div className='bg-gray-900 w-[100%] h-[50px] p-2 flex justify-end z-10 flex-0'>
      {
        session?.user 
          ?(
            <div className='flex gap-2 items-center'>
              <span>{ session.user.email }</span>
              <img src={session.user.image!} alt="test" className='w-8 h-8 rounded-full' />
              <button 
                className='mr-4 bg-blue-900 p-1 px-4 rounded hover:bg-blue-700 transition-all'
                onClick={() => signOut({callbackUrl: '/auth/signin'})} 
              >
                Sign out
              </button>
            </div>
          ):(
            <button
              className='mr-4 bg-blue-900 p-1 px-4 rounded hover:bg-blue-700 transition-all'
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )
      }
    </div>
  )
}
