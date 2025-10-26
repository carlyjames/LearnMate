'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, User, Calendar, Phone, Mail, MapPin, Heart, Activity, Clock } from 'lucide-react'
import dayjs from 'dayjs'
import PatientsData from '../../../patients.json'
import { toast } from 'sonner'

const Page = () => {
    const params = useParams()
    const router = useRouter()
    const patientId = params?.id
    const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
    const patient = PatientsData.find(p => p.patient_id === patientId)

    // Appointment form state
    const [appointmentData, setAppointmentData] = useState({
        date: '',
        time: '',
        type: '',
        duration: '30',
        reason: '',
        notes: ''
    })

    const handleSubmitAppointment = (e) => {
        e.preventDefault()
        
        // Validation
        if (!appointmentData.date || !appointmentData.time || !appointmentData.type || !appointmentData.reason) {
            toast.error('Please fill in all required fields')
            return
        }

        console.log('Appointment Data:', {
            patient_id: patient.patient_id,
            patient_name: patient.name,
            ...appointmentData
        })

        toast.success('Appointment scheduled successfully!')
        setAppointmentModalOpen(false)
        
        // Reset form
        setAppointmentData({
            date: '',
            time: '',
            type: '',
            duration: '30',
            reason: '',
            notes: ''
        })

        // Here you would make an API call to save the appointment
    }

    // If patient not found
    if (!patient) {
        return (
            <div className='mx-4 py-8'>
                <Card>
                    <CardContent className='py-12 text-center'>
                        <p className='text-lg text-gray-600'>Patient not found</p>
                        <Button
                            onClick={() => router.push('/Dashboard/patients')}
                            className='mt-4 bg-[#021848]'
                        >
                            Back to Patients
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className='mx-4 py-6'>
            {/* Header with back button */}
            <div className='flex items-center gap-4 mb-6'>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => router.push('/Dashboard/patients')}
                    className='rounded-full'
                >
                    <ArrowLeft className='h-4 w-4' />
                </Button>
                <div>
                    <h1 className='text-2xl font-bold'>Patient Details</h1>
                    <p className='text-sm text-gray-500'>View and manage patient information</p>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Left column - Patient Info */}
                <div className='lg:col-span-1 space-y-6'>
                    {/* Basic Information Card */}
                    <Card>
                        <CardHeader className='pb-3'>
                            <div className='flex items-center justify-between'>
                                <CardTitle className='text-lg'>Patient Information</CardTitle>
                                {patient.role === 'Active' ? (
                                    <Badge className='bg-green-100 hover:bg-green-100 text-green-600 rounded-md'>
                                        {patient.role}
                                    </Badge>
                                ) : (
                                    <Badge className='bg-gray-200 hover:bg-gray-200 text-gray-500 rounded-md'>
                                        {patient.role}
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='flex items-center justify-center py-6'>
                                <div className='w-24 h-24 bg-[#021848] rounded-full flex items-center justify-center'>
                                    <User className='w-12 h-12 text-white' />
                                </div>
                            </div>

                            <div className='text-center'>
                                <h2 className='text-xl font-semibold'>{patient.name}</h2>
                                <p className='text-sm text-gray-500'>{patient.patient_id}</p>
                            </div>

                            <Separator />

                            <div className='space-y-3'>
                                <div className='flex items-center gap-3'>
                                    <Calendar className='w-4 h-4 text-gray-400' />
                                    <div>
                                        <p className='text-xs text-gray-500'>Age</p>
                                        <p className='text-sm font-medium'>{patient.age} years</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-3'>
                                    <Heart className='w-4 h-4 text-gray-400' />
                                    <div>
                                        <p className='text-xs text-gray-500'>Blood Group</p>
                                        <p className='text-sm font-medium'>{patient.blood_group || 'N/A'}</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-3'>
                                    <Activity className='w-4 h-4 text-gray-400' />
                                    <div>
                                        <p className='text-xs text-gray-500'>Last Visit</p>
                                        <p className='text-sm font-medium'>
                                            {dayjs(patient.last_visit).format('MMM D, YYYY')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-lg'>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='flex items-start gap-3'>
                                <Mail className='w-4 h-4 text-gray-400 mt-1' />
                                <div>
                                    <p className='text-xs text-gray-500'>Email</p>
                                    <p className='text-sm font-medium'>{patient.email || 'N/A'}</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <Phone className='w-4 h-4 text-gray-400 mt-1' />
                                <div>
                                    <p className='text-xs text-gray-500'>Phone</p>
                                    <p className='text-sm font-medium'>{patient.phone || 'N/A'}</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <MapPin className='w-4 h-4 text-gray-400 mt-1' />
                                <div>
                                    <p className='text-xs text-gray-500'>Address</p>
                                    <p className='text-sm font-medium'>{patient.address || 'N/A'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right column - Medical History */}
                <div className='lg:col-span-2'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Medical History</CardTitle>
                            <CardDescription>
                                Complete medical visit history for this patient
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {patient.medical_history && patient.medical_history.length > 0 ? (
                                <div className='space-y-4'>
                                    {patient.medical_history.map((visit, index) => (
                                        <div key={index} className='border rounded-lg p-4 hover:bg-gray-50 transition-colors'>
                                            <div className='flex justify-between items-start mb-2'>
                                                <div>
                                                    <h3 className='font-semibold text-base'>{visit.diagnosis}</h3>
                                                    <p className='text-sm text-gray-500'>{visit.doctor}</p>
                                                </div>
                                                <Badge variant='outline' className='text-xs p-2'>
                                                    {dayjs(visit.date).format('MMM D, YYYY')}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-center py-12 text-gray-500'>
                                    <Activity className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                                    <p>No medical history available</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Action buttons */}
                    <div className='flex gap-3 mt-6'>
                        <Dialog open={appointmentModalOpen} onOpenChange={setAppointmentModalOpen}>
                            <DialogTrigger asChild>
                                <Button className='bg-[#021848] w-full hover:bg-[#021848]/90'>
                                    <Calendar className='w-4 h-4 mr-2' />
                                    Schedule Appointment
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                <form onSubmit={handleSubmitAppointment}>
                                    <DialogHeader>
                                        <DialogTitle>Schedule New Appointment</DialogTitle>
                                        <DialogDescription>
                                            Book an appointment for {patient.name}. Fill in all required details below.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className='grid gap-4 py-4'>
                                        {/* Patient Info Display */}
                                        <div className='bg-gray-50 rounded-lg p-3 border'>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-10 h-10 bg-[#021848] rounded-full flex items-center justify-center'>
                                                    <User className='w-5 h-5 text-white' />
                                                </div>
                                                <div>
                                                    <p className='font-semibold text-sm'>{patient.name}</p>
                                                    <p className='text-xs text-gray-500'>
                                                        {patient.patient_id} • {patient.age}y • {patient.gender}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date and Time */}
                                        <div className='grid grid-cols-2 gap-4'>
                                            <div className='space-y-2'>
                                                <Label htmlFor='date'>
                                                    Date <span className='text-red-500'>*</span>
                                                </Label>
                                                <div className='relative'>
                                                    <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                                    <Input
                                                        id='date'
                                                        type='date'
                                                        value={appointmentData.date}
                                                        onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                                                        className='pl-10'
                                                        required
                                                        min={dayjs().format('YYYY-MM-DD')}
                                                    />
                                                </div>
                                            </div>
                                            <div className='space-y-2'>
                                                <Label htmlFor='time'>
                                                    Time <span className='text-red-500'>*</span>
                                                </Label>
                                                <div className='relative'>
                                                    <Clock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                                    <Input
                                                        id='time'
                                                        type='time'
                                                        value={appointmentData.time}
                                                        onChange={(e) => setAppointmentData({...appointmentData, time: e.target.value})}
                                                        className='pl-10'
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Appointment Type and Duration */}
                                        <div className='grid grid-cols-2 gap-4'>
                                            <div className='space-y-2'>
                                                <Label htmlFor='type'>
                                                    Appointment Type <span className='text-red-500'>*</span>
                                                </Label>
                                                <Select 
                                                    value={appointmentData.type}
                                                    onValueChange={(value) => setAppointmentData({...appointmentData, type: value})}
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select type' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='General Checkup'>
                                                            <div className='flex items-center gap-2'>
                                                                <span>🩺</span>
                                                                <span>General Checkup</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value='Follow-up'>
                                                            <div className='flex items-center gap-2'>
                                                                <span>🔄</span>
                                                                <span>Follow-up</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value='Consultation'>
                                                            <div className='flex items-center gap-2'>
                                                                <span>💬</span>
                                                                <span>Consultation</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value='Prenatal'>
                                                            <div className='flex items-center gap-2'>
                                                                <span>🤰</span>
                                                                <span>Prenatal</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value='Emergency'>
                                                            <div className='flex items-center gap-2'>
                                                                <span>🚨</span>
                                                                <span>Emergency</span>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='space-y-2'>
                                                <Label htmlFor='duration'>Duration</Label>
                                                <Select 
                                                    value={appointmentData.duration}
                                                    onValueChange={(value) => setAppointmentData({...appointmentData, duration: value})}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='15'>15 minutes</SelectItem>
                                                        <SelectItem value='30'>30 minutes</SelectItem>
                                                        <SelectItem value='45'>45 minutes</SelectItem>
                                                        <SelectItem value='60'>1 hour</SelectItem>
                                                        <SelectItem value='90'>1.5 hours</SelectItem>
                                                        <SelectItem value='120'>2 hours</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* Reason for Visit */}
                                        <div className='space-y-2'>
                                            <Label htmlFor='reason'>
                                                Reason for Visit <span className='text-red-500'>*</span>
                                            </Label>
                                            <Input
                                                id='reason'
                                                placeholder='e.g., Annual physical examination, Follow-up for diabetes...'
                                                value={appointmentData.reason}
                                                onChange={(e) => setAppointmentData({...appointmentData, reason: e.target.value})}
                                                required
                                            />
                                        </div>

                                        {/* Additional Notes */}
                                        <div className='space-y-2'>
                                            <Label htmlFor='notes'>Additional Notes (Optional)</Label>
                                            <Textarea
                                                id='notes'
                                                placeholder='Any special instructions, preparations, or notes for this appointment...'
                                                value={appointmentData.notes}
                                                onChange={(e) => setAppointmentData({...appointmentData, notes: e.target.value})}
                                                rows={4}
                                                className='resize-none'
                                            />
                                        </div>

                                        {/* Summary */}
                                        {appointmentData.date && appointmentData.time && (
                                            <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
                                                <p className='text-sm font-semibold text-blue-900 mb-1'>
                                                    Appointment Summary
                                                </p>
                                                <p className='text-xs text-blue-700'>
                                                    {dayjs(appointmentData.date).format('dddd, MMMM D, YYYY')} at {appointmentData.time}
                                                    {appointmentData.duration && ` • ${appointmentData.duration} minutes`}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <DialogFooter className='gap-2'>
                                        <DialogClose asChild>
                                            <Button type='button' variant='outline'>
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button type='submit' className='bg-[#021848] hover:bg-[#021848]/90'>
                                            Schedule Appointment
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page