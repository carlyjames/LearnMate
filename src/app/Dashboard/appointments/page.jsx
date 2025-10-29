'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Clock, Eye, Plus, Search, Filter, CalendarDays, User, FileText } from 'lucide-react'
import Link from 'next/link'
import dayjs from 'dayjs'
import AppointmentsData from '../../appointments.json'
import PatientsData from '../../patients.json'

const Page = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)

    // New appointment form state
    const [newAppointment, setNewAppointment] = useState({
        patient_id: '',
        date: '',
        time: '',
        type: '',
        reason: '',
        duration: '30',
        notes: ''
    })

    // Filter appointments based on status
    const filteredAppointments = AppointmentsData.filter(apt => {
        const matchesSearch = apt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.appointment_id.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = filterStatus === 'all' || apt.status.toLowerCase() === filterStatus.toLowerCase()
        return matchesSearch && matchesStatus
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
        total: AppointmentsData.length,
        scheduled: AppointmentsData.filter(a => a.status === 'Scheduled').length,
        completed: AppointmentsData.filter(a => a.status === 'Completed').length,
        cancelled: AppointmentsData.filter(a => a.status === 'Cancelled').length
    }

    // Handle new appointment submission
    const handleCreateAppointment = () => {
        console.log('New appointment:', newAppointment)
        // Add API call here to create appointment
        setIsNewAppointmentOpen(false)
        // Reset form
        setNewAppointment({
            patient_id: '',
            date: '',
            time: '',
            type: '',
            reason: '',
            duration: '30',
            notes: ''
        })
    }

    return (
        <div className='mx-4 py-6'>
            {/* Header */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-900'>Appointments</h1>
                    <p className='text-sm text-gray-500 mt-1'>Manage and schedule patient appointments</p>
                </div>
                <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                    <DialogTrigger asChild>
                        <Button className='bg-[#021848] hover:bg-[#021848]/90 flex gap-2 items-center'>
                            <Plus className='w-4 h-4' />
                            New Appointment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
                        <DialogHeader>
                            <DialogTitle>Schedule New Appointment</DialogTitle>
                            <DialogDescription>
                                Fill in the details to create a new appointment for a patient
                            </DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                            <div className='grid gap-2'>
                                <Label htmlFor='patient'>Patient</Label>
                                <Select
                                    value={newAppointment.patient_id}
                                    onValueChange={(value) => setNewAppointment({ ...newAppointment, patient_id: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select patient' />
                                    </SelectTrigger>
                                    <SelectContent className='max-h-60 overflow-y-auto'>
                                        {PatientsData.map(patient => (
                                            <SelectItem key={patient.patient_id} value={patient.patient_id}>
                                                {patient.name} ({patient.patient_id})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='grid gap-2'>
                                    <Label htmlFor='date'>Date</Label>
                                    <Input
                                        id='date'
                                        type='date'
                                        value={newAppointment.date}
                                        onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                                    />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='time'>Time</Label>
                                    <Input
                                        id='time'
                                        type='time'
                                        value={newAppointment.time}
                                        onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='grid gap-2'>
                                    <Label htmlFor='type'>Appointment Type</Label>
                                    <Select
                                        value={newAppointment.type}
                                        onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select type' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='General Checkup'>General Checkup</SelectItem>
                                            <SelectItem value='Follow-up'>Follow-up</SelectItem>
                                            <SelectItem value='Consultation'>Consultation</SelectItem>
                                            <SelectItem value='Prenatal'>Prenatal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='duration'>Duration (mins)</Label>
                                    <Select
                                        value={newAppointment.duration}
                                        onValueChange={(value) => setNewAppointment({ ...newAppointment, duration: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='15'>15 mins</SelectItem>
                                            <SelectItem value='30'>30 mins</SelectItem>
                                            <SelectItem value='45'>45 mins</SelectItem>
                                            <SelectItem value='60'>60 mins</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='reason'>Reason for Visit</Label>
                                <Input
                                    id='reason'
                                    placeholder='Brief description of visit reason'
                                    value={newAppointment.reason}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='notes'>Additional Notes</Label>
                                <Textarea
                                    id='notes'
                                    placeholder='Any additional information...'
                                    value={newAppointment.notes}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                                    rows={3}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant='outline' onClick={() => setIsNewAppointmentOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                className='bg-[#021848] hover:bg-[#021848]/90'
                                onClick={handleCreateAppointment}
                            >
                                Schedule Appointment
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
                            <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                                <CalendarDays className='w-6 h-6 text-blue-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600'>Scheduled</p>
                                <p className='text-3xl font-bold text-blue-600'>{appointmentStats.scheduled}</p>
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

            {/* Search and Filters */}
            <div className='flex flex-col md:flex-row gap-4 mb-4'>
                <div className='relative flex-1'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <Input
                        placeholder='Search by patient name or appointment ID...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='pl-10'
                    />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className='w-full md:w-[200px]'>
                        <Filter className='w-4 h-4 mr-2' />
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>All Status</SelectItem>
                        <SelectItem value='scheduled'>Scheduled</SelectItem>
                        <SelectItem value='completed'>Completed</SelectItem>
                        <SelectItem value='cancelled'>Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Appointments Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Appointment History</CardTitle>
                    <CardDescription>View and manage all patient appointments</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='relative overflow-auto max-h-[600px]'>
                        <Table>
                            <TableHeader className='sticky top-0 bg-gray-50 z-10'>
                                <TableRow>
                                    <TableHead>Appointment ID</TableHead>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAppointments.length > 0 ? (
                                    filteredAppointments.map((appointment) => (
                                        <TableRow key={appointment.appointment_id} className='hover:bg-gray-50'>
                                            <TableCell className='font-medium'>
                                                {appointment.appointment_id}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className='font-medium'>{appointment.patient_name}</p>
                                                    <p className='text-sm text-gray-500'>
                                                        {appointment.patient_age}y • {appointment.patient_gender}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className='flex items-center gap-2'>
                                                    <Calendar className='w-4 h-4 text-gray-400' />
                                                    <div>
                                                        <p className='font-medium'>
                                                            {dayjs(appointment.date).format('MMM D, YYYY')}
                                                        </p>
                                                        <p className='text-sm text-gray-500'>{appointment.time}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className='flex items-center gap-2'>
                                                    {/* <span>{getTypeIcon(appointment.type)}</span> */}
                                                    <span>{appointment.type}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{appointment.duration}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(appointment.status)}>
                                                    {appointment.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/Dashboard/appointments/${appointment.appointment_id}`}>
                                                    <Button
                                                        variant='ghost'
                                                        size='sm'
                                                        className='hover:bg-blue-50'
                                                    >
                                                        <Eye className='w-4 h-4 mr-2' />
                                                        View
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className='text-center py-12 text-gray-500'>
                                            No appointments found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {filteredAppointments.length > 0 && (
                        <div className='text-sm text-gray-500 mt-4 pt-4 border-t'>
                            Showing {filteredAppointments.length} of {AppointmentsData.length} appointments
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default Page