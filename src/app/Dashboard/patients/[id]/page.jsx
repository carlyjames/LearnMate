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
import { ArrowLeft, User, Calendar, Phone, Mail, MapPin, Heart, Activity } from 'lucide-react'
import dayjs from 'dayjs'
import PatientsData from '../../../patients.json'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Chip } from '@mui/material';

// Create a custom theme for black text
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000',
        },
        text: {
            primary: '#000000',
            secondary: '#000000',
        },
        background: {
            default: 'transparent',
            paper: 'transparent',
        },
    },
    components: {
        MuiDateCalendar: {
            styleOverrides: {
                root: {
                    color: '#000000',
                    backgroundColor: 'transparent',
                },
            },
        },
        MuiPickersCalendarHeader: {
            styleOverrides: {
                root: {
                    color: '#000000',
                },
                label: {
                    color: '#000000',
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    color: '#000000',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: '#000000',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.15)',
                        },
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#000000',
                },
            },
        },
    },
});



const Page = () => {
    const params = useParams()
    const router = useRouter()
    const patientId = params?.id
    const [productModalOpen, setProductModalOpen] = useState(false);
    const patient = PatientsData.find(p => p.patient_id === patientId)
    const [selectedDates, setSelectedDates] = useState([]);

    const handleDateChange = (newValue) => {
        if (newValue) {
            const dateString = newValue.format('YYYY-MM-DD');

            // Check if date is already selected
            const isAlreadySelected = selectedDates.some(
                date => date.format('YYYY-MM-DD') === dateString
            );

            if (isAlreadySelected) {
                // Remove date if already selected
                setSelectedDates(prev =>
                    prev.filter(date => date.format('YYYY-MM-DD') !== dateString)
                );
            } else {
                // Add date if not selected
                setSelectedDates(prev => [...prev, newValue]);
            }
        }
    };

    const removeDateFromSelection = (dateToRemove) => {
        setSelectedDates(prev =>
            prev.filter(date =>
                date.format('YYYY-MM-DD') !== dateToRemove.format('YYYY-MM-DD')
            )
        );
    };


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
                    onClick={() => router.push('/dashboard/patients')}
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
                                {''}
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
                        <Button className='bg-[#021848] flex-1'>
                            Schedule Appointment
                        </Button>
                        <Dialog className='bg-black'>
                            <form>
                                <DialogTrigger asChild>
                                    <Button variant='outline' className='flex-1'>
                                        Edit Patient Details
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Book an appointment</DialogTitle>
                                        <DialogDescription>
                                            Book appointment for {patient.name} here. Please provide the necessary details and confirm.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <ThemeProvider theme={lightTheme}>
                                        <DialogContent>
                                            <Box sx={{ color: 'black' }}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateCalendar
                                                        onChange={handleDateChange}
                                                        sx={{
                                                            color: 'black',
                                                            '& .MuiTypography-root': {
                                                                color: 'black',
                                                            },
                                                            '& .MuiSvgIcon-root': {
                                                                color: 'black',
                                                            },
                                                            '& .MuiPickersDay-root': {
                                                                color: 'black',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                                                },
                                                            },
                                                            '& .MuiPickersDay-root.Mui-selected': {
                                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                                color: 'white',
                                                            },
                                                        }}
                                                    />
                                                </LocalizationProvider>

                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </Box>
                                        </DialogContent>
                                    </ThemeProvider>
                                </DialogContent>
                            </form>
                        </Dialog>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Page