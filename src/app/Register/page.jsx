import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// icons
import appleIcon from '../../assets/images/apple.png'
import facebookIcon from '../../assets/images/icons8-facebook.png'
import googleIcon from '../../assets/images/icons8-google.png'

const page = () => {
  return (
    <section className='flex items-center justify-center h-screen gap-4 relative'>
      <div className=' items-end bg-login h-[92vh] w-[65%] bg-cover bg-center rounded-lg shadow-lg lg:flex hidden'>
        <div className='flex flex-col gap-3 p-4 bg-gray-10 w-full backdrop-blur-md rounded-lg'>
          <h1 className='text-white font-semibold text-4xl'>Create Your LearnMate Account</h1>
          <p className='text-xl font-light text-gray-400'>Access course materials tailored to your academic level.</p>
        </div>
      </div>
      <div className='flex flex-col gap-2 bg-white p-4 pb-2 rounded-lg shadow-lg lg:w-[30%] w-full h-[85vh] transform lg:-translate-x-20'>
        <p className='text-gray-400 text-sm'>LET'S GET YOU STARTED</p>
        <h1 className='text-xl text-[#2563EB]'>Create an Account</h1>
        <div className='mt-3 flex gap-3 flex-col'>
          <div className='gap-2 flex flex-col'>
            <Label htmlFor='name' className='text-gray-500 font-semibold'>Name</Label>
            <Input id='name' type='text' placeholder='Johnson Doe' className='border-gray-300 focus:border-blue-500 focus:ring-blue-500' />
          </div>
          <div className='gap-2 flex flex-col'>
            <Label htmlFor='email' className='text-gray-500 font-semibold'>Email</Label>
            <Input id='email' type='text' placeholder='johndoe@gmail.com' className='border-gray-300 focus:border-blue-500 focus:ring-blue-500' />
          </div>
          <div className='gap-2 flex flex-col'>
            <Label htmlFor='password' className='text-gray-500 font-semibold'>Password</Label>
            <Input id='password' type='text' placeholder='*********' className='border-gray-300 focus:border-blue-500 focus:ring-blue-500' />
          </div>
          <Link href='/login' className='w-full'>
            <Button className='cursor-pointer bg-[#2563EB] w-full'>GET STARTED</Button>
          </Link>
        </div>
        <div className='flex w-full items-center gap-2 justify-center'>
            <div className='h-[1px] w-[80%] bg-gray-300'></div>
            <p>Or</p>
            <div className='h-[1px] w-[80%] bg-gray-300'></div>
        </div>
        <div className='flex flex-col gap-2'>
            <Button className='flex items-center justify-center gap-4 cursor-pointer bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 w-full'> <Image src={googleIcon} alt='google icon' height={100} width={100} className='h-4 w-4 object-contain' /> <p> Sign up with Google</p> </Button>
            <Button className='flex items-center justify-center gap-4 cursor-pointer bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 w-full'> <Image src={facebookIcon} alt='google icon' height={100} width={100} className='h-4 w-4 object-contain' /> Sign up with Facebook</Button>
            <Button className='flex items-center justify-center gap-4 cursor-pointer bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 w-full'> <Image src={appleIcon} alt='google icon' height={100} width={100} className='h-4 w-4 object-contain' />  Sign up with Apple</Button>
        </div>
        <h1 className='text-[#2563EB] text-sm self-center'>Already have an account? <Link href='/login' className='underline'>LOGIN HERE</Link> </h1>
      </div>
    </section>
  )
}

export default page