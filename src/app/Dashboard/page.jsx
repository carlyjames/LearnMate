"use client"

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heading } from '@/components/ui/heading'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageContainer from '@/components/Layout/PageContainer'
import { File, Video } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { StarFilledIcon } from '@radix-ui/react-icons'

const courses = [
  {
    id: 1,
    title: 'Data Structures & Algorithm',
    code: 'Cos 412',
    materials: 12,
  },
  {
    id: 2,
    title: 'Web Development Fundamentals',
    code: 'Cos 452',
    materials: 12,
  },
  {
    id: 3,
    title: 'Machine Learning Basics',
    code: 'Cos 453',
    materials: 12,
  },
]

const recommendations = [
  {
    id: 1,
    title: 'Python Programming Fundamentals',
    code: 'Cos 421',
    rating: 4.5,
    icon: <Video />,
    type: 'PDF'
  },
  {
    id: 2,
    title: 'Web Development Basics',
    code: 'Cos 422',
    rating: 3.8,
    icon: <File />,
    type: 'Video'
  },
  {
    id: 3,
    title: 'Data Science with R',
    code: 'Cos 442',
    rating: 4.8,
    icon: <Video />,
    type: 'Video'
  },
]

const TopRated = [
  {
    id: 1,
    title: 'Advanced Python Concepts',
    rating: 4.5,
    downloads: 1200,
  },
  {
    id: 2,
    title: 'Machine Learning with Python',
    rating: 4.5,
    downloads: 1200,
  },
  {
    id: 3,
    title: 'Data Visualization with Python',
    rating: 4.5,
    downloads: 1200,
  },
]

const page = () => {
  const [dialogOpen, setDialogOpen] = useState(false)


  useEffect(() => {
    setDialogOpen(false) // Set to true to show the dialog on page load
  }, [])


  return (
    <div>
      <PageContainer scrollable={true}>
        <Heading title="Welcome Back, Stanley!" description="Here’s what new in your learning journey" />

        {/* my courses */}
        <div className='flex flex-col items-center gap-2 mt-8'>
          {/* heading */}
          <div className='w-full items-center justify-between flex'>
            <h1 className='text-xl font-semibold'>My Courses</h1>
            <Button className='border border-[#145DA0] rounded-lg text-[#145DA0] bg-transaprent'>Manage Courses</Button>
          </div>

          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full'>
            {courses.map((course) => (
              <div key={course.id} className='border border-gray-300 rounded-lg p-4 m-2 flex flex-col gap-3 items-center justify-between'>
                <div className='flex items-center justify-between w-full'>
                  <div className='p-2 rounded-full bg-[#A9D3B580] text-sm'>
                    {course.code}
                  </div>
                  <p className='text-sm'>{course.materials} Materials</p>
                </div>
                <h1 className='text-xl font-semibold text-center'>{course.title}</h1>
                <Button className='w-full border bg-transparent rounded-lg font-semibold cursor-pointer text-black shadow-none'>View Material</Button>
              </div>
            ))}
          </div>
        </div>

        {/* my recommendations */}
        <div className='flex flex-col items-center gap-2 mt-8'>
          {/* heading */}
          <div className='w-full items-center justify-between flex'>
            <h1 className='text-xl font-semibold'>Recommended Courses</h1>
            <Link href='/' className='flex items-center'> View All <ArrowRight /> </Link>
          </div>

          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full'>
            {recommendations.map((rec) => (
              <div key={rec.id} className='border border-gray-300 rounded-lg p-4 m-2 flex flex-col gap-3 items-start justify-between'>
                <div className='flex gap-2 w-full items-center'>
                  <div className='bg-[#A9D3B580] text-sm rounded-full p-2 '>
                    {rec.icon}
                  </div>
                  <h1 className='text-xl font-semibold'>{rec.title}</h1>
                </div>
                <div className='flex items-center justify-between w-full mt-4'>
                  <div className='border rounded-lg p-1 text-sm'>
                    {rec.type}
                  </div>
                  <div className='flex items-center'>
                    <StarFilledIcon className='inline-block h-4 w-4 text-yellow-500 mr-1' />
                    <span className='text-black font-semibold'>{rec.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* top rated courses */}
        <div className='w-full items-center justify-start flex mt-8 mb-4'>
          <h1 className='text-xl font-semibold'>Top Rated Materials</h1>
        </div>
        <div className='flex flex-col items-center'>
          {TopRated.map((course) => (
            <div key={course.id} className='flex items-center justify-between w-full border border-gray-300 p-2 first:rounded-t-lg last:rounded-b-lg'>
              <div className='flex items-center gap-2'>
                <div className='bg-[#A9D3B580] text-sm rounded-full p-3 h-[40px] w-[40px] text-center'>{course.id}</div>
                <div className='flex flex-col gap-1 items-start'>
                  <h1 className='font-semibold'>{course.title}</h1>
                  <p className='text-gray-400'>{(course.downloads).toLocaleString()} downloads</p>
                </div>
              </div>
              <div className='flex items-center'>
                <StarFilledIcon className='inline-block h-4 w-4 text-yellow-500 mr-1' />
                <span className='text-black font-semibold'>{course.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>


      {/* welcome dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{''}</DialogTitle>
            <DialogDescription className='flex flex-col items-center justify-center'>
              <Image src='/success.png' height={100} width={100} alt='success' className='object-cover' />
              <span className='text-xl '>You’re All Set!</span>
              <span>Welcome to your personalized learning journey</span>
            </DialogDescription>
          </DialogHeader>
          <Button x type="button" variant="secondary" className="w-full sm:w-auto bg-[#145DA0] text-white mt-4">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default page