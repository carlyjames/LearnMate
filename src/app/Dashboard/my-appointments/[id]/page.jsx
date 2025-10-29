'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Calendar, User, Activity, Pill, FlaskConical, FileText } from 'lucide-react'
import dayjs from 'dayjs'
import AppointmentsData from '../../../appointments.json'

const Page = () => {
    const params = useParams()
    const router = useRouter()
    const appointmentId = params?.id

    // Find appointment by ID
    const appointmentData = AppointmentsData.find(a => a.appointment_id === appointmentId)
    const [appointment, setAppointment] = useState(appointmentData || null)

    if (!appointment) {
        return (
            <div className='mx-4 py-8'>
                <Card>
                    <CardContent className='py-12 text-center'>
                        <p className='text-lg text-gray-600'>Appointment not found</p>
                        <Button
                            onClick={() => router.push('/Dashboard/appointments')}
                            className='mt-4 bg-[#021848]'
                        >
                            Back to Appointments
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Get status badge color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'scheduled':
                return 'bg-blue-100 text-blue-700 hover:bg-blue-100'
            case 'completed':
                return 'bg-green-100 text-green-700 hover:bg-green-100'
            case 'cancelled':
                return 'bg-red-100 text-red-700 hover:bg-red-100'
            default:
                return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
        }
    }

    return (
        <div className='mx-4 py-6'>
            {/* Header */}
            <div className='flex items-center gap-4 mb-6'>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => router.push('/Dashboard/appointments')}
                    className='rounded-full'
                >
                    <ArrowLeft className='h-4 w-4' />
                </Button>
                <div className='flex-1'>
                    <h1 className='text-2xl font-bold'>My Appointments</h1>
                    <p className='text-sm text-gray-500'>View your appointment details</p>
                </div>
            </div>

            {/* Appointments Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Card className='cursor-pointer hover:shadow-lg transition-shadow'>
                            <CardHeader>
                                <div className='flex items-start justify-between'>
                                    <CardTitle className='text-lg'>{appointment.type}</CardTitle>
                                    <Badge className={getStatusColor(appointment.status)}>
                                        {appointment.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className='space-y-2'>
                                <p className='text-sm text-gray-700'>{appointment.reason}</p>
                                <div className='flex items-center gap-2 text-sm text-gray-500'>
                                    <Calendar className='w-4 h-4' />
                                    <span>{dayjs(appointment.date).format('MMM D, YYYY')}</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm text-gray-500'>
                                    <User className='w-4 h-4' />
                                    <span>{appointment.doctor}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </DialogTrigger>

                    <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
                        <DialogHeader>
                            <DialogTitle className='text-2xl'>Appointment Details</DialogTitle>
                        </DialogHeader>

                        {/* Remove DialogDescription to avoid nesting issues */}
                        <div className='mt-4'>
                            <Tabs defaultValue='overview' className='w-full'>
                                <TabsList className='grid w-full grid-cols-3'>
                                    <TabsTrigger value='overview'>Overview</TabsTrigger>
                                    <TabsTrigger value='prescriptions'>
                                        Prescriptions
                                    </TabsTrigger>
                                    <TabsTrigger value='tests'>
                                        Test Results
                                    </TabsTrigger>
                                </TabsList>

                                {/* Overview Tab */}
                                <TabsContent value='overview' className='space-y-4 mt-4'>
                                    <Card className='shadow-none'>
                                        <CardHeader>
                                            <CardTitle className='text-base'>Appointment Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className='space-y-3'>
                                            <div className='grid grid-cols-2 gap-4'>
                                                <div>
                                                    <span className='text-xs text-gray-500'>Date</span>
                                                    <p className='text-sm font-medium'>{dayjs(appointment.date).format('MMMM D, YYYY')}</p>
                                                </div>
                                                <div>
                                                    <span className='text-xs text-gray-500'>Time</span>
                                                    <p className='text-sm font-medium'>{appointment.time}</p>
                                                </div>
                                                <div>
                                                    <span className='text-xs text-gray-500'>Duration</span>
                                                    <p className='text-sm font-medium'>{appointment.duration}</p>
                                                </div>
                                                <div>
                                                    <span className='text-xs text-gray-500'>Doctor</span>
                                                    <p className='text-sm font-medium'>{appointment.doctor}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className='shadow-none'>
                                        <CardHeader>
                                            <CardTitle className='text-base'>Reason for Visit</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className='text-sm text-gray-700'>{appointment.reason}</p>
                                        </CardContent>
                                    </Card>

                                    <Card className='shadow-none'>
                                        <CardHeader>
                                            <CardTitle className='text-base flex items-center gap-2'>
                                                Vital Signs
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {appointment.vitals && (appointment.vitals.blood_pressure || appointment.vitals.temperature || appointment.vitals.heart_rate || appointment.vitals.weight) ? (
                                                <div className='grid grid-cols-2 gap-4'>
                                                    {appointment.vitals.blood_pressure && (
                                                        <div>
                                                            <span className='text-xs text-gray-500'>Blood Pressure</span>
                                                            <p className='text-sm font-medium'>{appointment.vitals.blood_pressure}</p>
                                                        </div>
                                                    )}
                                                    {appointment.vitals.temperature && (
                                                        <div>
                                                            <span className='text-xs text-gray-500'>Temperature</span>
                                                            <p className='text-sm font-medium'>{appointment.vitals.temperature}</p>
                                                        </div>
                                                    )}
                                                    {appointment.vitals.heart_rate && (
                                                        <div>
                                                            <span className='text-xs text-gray-500'>Heart Rate</span>
                                                            <p className='text-sm font-medium'>{appointment.vitals.heart_rate}</p>
                                                        </div>
                                                    )}
                                                    {appointment.vitals.weight && (
                                                        <div>
                                                            <span className='text-xs text-gray-500'>Weight</span>
                                                            <p className='text-sm font-medium'>{appointment.vitals.weight}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className='text-sm text-gray-500'>No vitals recorded yet</p>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {appointment.notes && (
                                        <Card className='shadow-none'>
                                            <CardHeader>
                                                <CardTitle className='text-base'>Doctor's Notes</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className='text-sm text-gray-700'>{appointment.notes}</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </TabsContent>

                                {/* Prescriptions Tab */}
                                <TabsContent value='prescriptions' className='space-y-4 mt-4'>
                                    {appointment.prescriptions && appointment.prescriptions.length > 0 ? (
                                        <div className='space-y-3'>
                                            {appointment.prescriptions.map((prescription, index) => (
                                                <div key={index} className='border rounded-lg p-4 '>
                                                    <h4 className='font-semibold text-sm mb-2'>{prescription.medication}</h4>
                                                    <div className='space-y-1'>
                                                        <p className='text-xs text-gray-600'>
                                                            <span className='font-medium'>Dosage:</span> {prescription.dosage}
                                                        </p>
                                                        <p className='text-xs text-gray-600'>
                                                            <span className='font-medium'>Duration:</span> {prescription.duration}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='text-center py-8'>
                                            <p className='text-sm text-gray-500'>No prescriptions available</p>
                                        </div>
                                    )}
                                </TabsContent>

                                {/* Test Results Tab */}
                                <TabsContent value='tests' className='space-y-4 mt-4'>
                                    {appointment.test_results && appointment.test_results.length > 0 ? (
                                        <div className='space-y-3'>
                                            {appointment.test_results.map((test, index) => (
                                                <div key={index} className='border rounded-lg p-4'>
                                                    <div className='flex justify-between items-start mb-2'>
                                                        <h4 className='font-semibold text-sm'>{test.test_name}</h4>
                                                        <Badge
                                                            variant='outline'
                                                            className={
                                                                test.status === 'Normal' ? 'border-green-600 text-green-600 p-1' :
                                                                    test.status === 'Abnormal' ? 'border-red-600 text-red-600 p-1' :
                                                                        'border-yellow-600 text-yellow-600 p-1'
                                                            }
                                                        >
                                                            {test.status}
                                                        </Badge>
                                                    </div>
                                                    <p className='text-sm text-gray-700 mb-1'>
                                                        <span className='font-medium'>Result:</span> {test.result}
                                                    </p>
                                                    <p className='text-xs text-gray-500'>
                                                        {dayjs(test.date).format('MMM D, YYYY')}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='text-center py-8'>
                                            <p className='text-sm text-gray-500'>No test results available</p>
                                        </div>
                                    )}

                                </TabsContent>
                            </Tabs>
                        </div>

                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Page