'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, GraduationCap, Lightbulb } from 'lucide-react'
import Image from 'next/image'

const Page = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    university: '',
    major: '',
    level: '',
    interests: []
  })

  const courses = [
    { id: 1, name: 'Data Structures & Algorithm', tag: 'CORE', color: 'bg-[#145DA0]' },
    { id: 2, name: 'Web Development', tag: 'WEB DEV', color: 'bg-gray-200' },
    { id: 3, name: 'Mobile App Development', tag: 'MOB DEV', color: 'bg-gray-200' },
    { id: 4, name: 'Web Development', tag: 'WEB DEV', color: 'bg-gray-200' },
    { id: 5, name: 'Frontend Frameworks', tag: 'WEB DEV', color: 'bg-[#145DA0]' },
    { id: 6, name: 'Backend Services', tag: 'DEV OPS', color: 'bg-gray-200' },
    { id: 7, name: 'Machine Learning', tag: 'ML / DL', color: 'bg-gray-200' },
    { id: 8, name: 'Intro to AI', tag: 'ML / DL', color: 'bg-gray-200' },
    { id: 9, name: 'Deep Learning', tag: 'ML / DL', color: 'bg-gray-200' },
  ]

  const toggleCourse = (courseId) => {
    setFormData(prev => {
      const isSelected = prev.interests.includes(courseId)
      if (isSelected) {
        return {
          ...prev,
          interests: prev.interests.filter(id => id !== courseId)
        }
      } else if (prev.interests.length < 2) {
        return {
          ...prev,
          interests: [...prev.interests, courseId]
        }
      }
      return prev
    })
  }

  const handleNext = () => {
    if (step === 1 && formData.university && formData.major && formData.level) {
      setStep(2)
    } else if (step === 2 && formData.interests.length >= 2) {
      console.log('Form submitted:', formData)
      // Handle form submission
      window.location.href = '/dashboard'
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const isStep1Valid = formData.university && formData.major && formData.level
  const isStep2Valid = formData.interests.length >= 2

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Image src='/logo.png' alt='logo' height={50} width={50} className='' />
              </div>
            </div>
            <span className="text-sm text-gray-600">Step {step} of 2</span>
          </div>
          <div className="mt-4">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#145DA0] transition-all duration-300"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8 pb-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-[#145DA0]" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Tell Us About Your Studies</h2>
                <p className="text-gray-600 text-sm">This helps us personalize your experience</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="university" className="text-sm font-medium mb-2 block">
                    University/Institution
                  </Label>
                  <Input
                    id="university"
                    placeholder="e.g., University of Nigeria"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="major" className="text-sm font-medium mb-2 block">
                    Major/Field of Study
                  </Label>
                  <Input
                    id="major"
                    placeholder="e.g., Computer Science"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="level" className="text-sm font-medium mb-2 block">
                    Level
                  </Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 Level</SelectItem>
                      <SelectItem value="200">200 Level</SelectItem>
                      <SelectItem value="300">300 Level</SelectItem>
                      <SelectItem value="400">400 Level</SelectItem>
                      <SelectItem value="500">500 Level</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Select Your Interests</h2>
                <p className="text-gray-600 text-sm">Choose at least 2 courses you're interested in</p>
              </div>

              <div className="space-y-3">
                {[0, 1, 2].map((rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-3 gap-3">
                    {courses.slice(rowIndex * 3, rowIndex * 3 + 3).map((course) => {
                      const isSelected = formData.interests.includes(course.id)
                      return (
                        <button
                          key={course.id}
                          onClick={() => toggleCourse(course.id)}
                          className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? 'bg-[#145DA0] border-[#145DA0] text-white'
                              : 'bg-white border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex flex-col gap-2">
                            <span className={`text-xs font-medium px-2 py-1 rounded w-fit ${
                              isSelected ? 'bg-blue-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {course.tag}
                            </span>
                            <span className={`text-sm font-medium ${
                              isSelected ? 'text-white' : 'text-gray-900'
                            }`}>
                              {course.name}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Selected: <span className="font-semibold">{formData.interests.length} Course{formData.interests.length !== 1 ? 's' : ''}</span>
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <div className="flex items-center justify-between p-6 border-t">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
            className="bg-[#145DA0] hover:bg-blue-700 gap-2"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Page