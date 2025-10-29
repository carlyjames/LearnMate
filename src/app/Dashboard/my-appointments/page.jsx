'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Eye, Search, CalendarDays, User, FileText, MapPin } from 'lucide-react'
import Link from 'next/link'
import dayjs from 'dayjs'
import AppointmentsData from '../../appointments.json'

// For demo purposes - in real app, get this from auth context/session
const CURRENT_PATIENT_ID = 'P004' // John Doe

const Page = () => {
    const [searchQuery, setSearchQuery] = useState('')

    // Filter appointments for current patient
    const patientAppointments = AppointmentsData.filter(apt => apt.patient_id === CURRENT_PATIENT_ID)

    // Further filter by search query
    const filteredAppointments = patientAppointments.filter(apt => {
        const searchLower = searchQuery.toLowerCase()
        return apt.appointment_id.toLowerCase().includes(searchLower) ||
            apt.type.toLowerCase().includes(searchLower) ||
            apt.doctor.toLowerCase().includes(searchLower) ||
            apt.reason.toLowerCase().includes(searchLower)
    })

    // Get status badge color
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
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

    // Get appointment type icon
    const getTypeIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'general checkup':
                return '🩺'
            case 'follow-up':
                return '🔄'
            case 'consultation':
                return '💬'
            case 'prenatal':
                return '🤰'
            default:
                return '📋'
        }
    }

    // Count appointments by status
    const appointmentStats = {
        total: patientAppointments.length,
        upcoming: patientAppointments.filter(a => a.status === 'Scheduled').length,
        completed: patientAppointments.filter(a => a.status === 'Completed').length,
        cancelled: patientAppointments.filter(a => a.status === 'Cancelled').length
    }

    // Get patient details from first appointment
    const patientInfo = patientAppointments.length > 0 ? {
        name: patientAppointments[0].patient_name,
        age: patientAppointments[0].patient_age,
        gender: patientAppointments[0].patient_gender
    } : null

    return (
        <div className='mx-4 py-6'>
            {/* Header */}
            <div className='mb-6'>
                <h1 className='text-3xl font-bold text-gray-900'>My Appointments</h1>
                <p className='text-sm text-gray-500 mt-1'>View your scheduled and past appointments</p>
            </div>



            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
                <Card>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600'>Total</p>
                                <p className='text-3xl font-bold text-gray-900'>{appointmentStats.total}</p>
                            </div>
                            <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center'>
                                <CalendarDays className='w-6 h-6 text-gray-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600'>Upcoming</p>
                                <p className='text-3xl font-bold text-blue-600'>{appointmentStats.upcoming}</p>
                            </div>
                            <div className='w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center'>
                                <Clock className='w-6 h-6 text-blue-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600'>Completed</p>
                                <p className='text-3xl font-bold text-green-600'>{appointmentStats.completed}</p>
                            </div>
                            <div className='w-12 h-12 bg-green-50 rounded-full flex items-center justify-center'>
                                <FileText className='w-6 h-6 text-green-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600'>Cancelled</p>
                                <p className='text-3xl font-bold text-red-600'>{appointmentStats.cancelled}</p>
                            </div>
                            <div className='w-12 h-12 bg-red-50 rounded-full flex items-center justify-center'>
                                <User className='w-6 h-6 text-red-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className='relative mb-6'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                    placeholder='Search appointments by ID, type, doctor, or reason...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='pl-10'
                />
            </div>

            {/* Appointments List */}
            <div className='space-y-4'>
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                        <Card key={appointment.appointment_id} className='hover:shadow-md transition-shadow'>
                            <CardContent className='p-6'>
                                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                                    <div className='flex-1'>
                                        <div className='flex items-start gap-3 mb-3'>
                                            <div className='w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0'>
                                                <span className='text-2xl'>{getTypeIcon(appointment.type)}</span>
                                            </div>
                                            <div className='flex-1'>
                                                <div className='flex items-center gap-2 mb-1'>
                                                    <h3 className='font-semibold text-lg'>{appointment.type}</h3>
                                                    <Badge className={getStatusColor(appointment.status)}>
                                                        {appointment.status}
                                                    </Badge>
                                                </div>
                                                <p className='text-sm text-gray-600 mb-2'>{appointment.reason}</p>
                                                <div className='flex flex-wrap gap-4 text-sm text-gray-500'>
                                                    <div className='flex items-center gap-1'>
                                                        <Calendar className='w-4 h-4' />
                                                        <span>{dayjs(appointment.date).format('MMM D, YYYY')}</span>
                                                    </div>
                                                    <div className='flex items-center gap-1'>
                                                        <Clock className='w-4 h-4' />
                                                        <span>{appointment.time}</span>
                                                    </div>
                                                    <div className='flex items-center gap-1'>
                                                        <User className='w-4 h-4' />
                                                        <span>{appointment.doctor}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {appointment.notes && (
                                            <div className='ml-15 pl-3 border-l-2 border-gray-200'>
                                                <p className='text-xs text-gray-500'>
                                                    <span className='font-medium'>Note:</span> {appointment.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className='flex md:flex-col gap-2'>
                                                <Button className='w-full bg-[#021848] hover:bg-[#021848]/90'>
                                                    <Eye className='w-4 h-4 mr-2' />
                                                    View Details
                                                </Button>
                                            </div>
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
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className='py-12 text-center'>
                            <CalendarDays className='w-16 h-16 mx-auto mb-4 text-gray-300' />
                            <h3 className='text-lg font-semibold text-gray-900 mb-2'>No appointments found</h3>
                            <p className='text-sm text-gray-500'>
                                {searchQuery ? 'Try adjusting your search' : 'You have no appointments scheduled yet'}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {filteredAppointments.length > 0 && (
                <div className='text-sm text-gray-500 mt-6 text-center'>
                    Showing {filteredAppointments.length} of {patientAppointments.length} appointments
                </div>
            )}
        </div>
    )
}

export default Page