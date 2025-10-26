'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Calendar, Clock, User, FileText, Edit, Trash2, Save, Plus, Upload, X, Download, Activity } from 'lucide-react'
import Link from 'next/link'
import dayjs from 'dayjs'
import AppointmentsData from '../../../appointments.json'
import { toast } from 'sonner'

const Page = () => {
    const params = useParams()
    const router = useRouter()
    const appointmentId = params?.id

    // Find appointment by ID
    const appointmentData = AppointmentsData.find(a => a.appointment_id === appointmentId)

    // State for editing
    const [isEditing, setIsEditing] = useState(false)
    const [appointment, setAppointment] = useState(appointmentData || null)
    
    // State for prescriptions
    const [isAddingPrescription, setIsAddingPrescription] = useState(false)
    const [newPrescription, setNewPrescription] = useState({
        medication: '',
        dosage: '',
        duration: ''
    })

    // State for test results
    const [isAddingTestResult, setIsAddingTestResult] = useState(false)
    const [newTestResult, setNewTestResult] = useState({
        test_name: '',
        result: '',
        date: '',
        status: 'Normal'
    })

    // State for file upload
    const [uploadedFiles, setUploadedFiles] = useState([])

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
        switch(status.toLowerCase()) {
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

    // Handle save changes
    const handleSaveChanges = () => {
        console.log('Updated appointment:', appointment)
        toast.success('Appointment updated successfully')
        setIsEditing(false)
        // Add API call here to update appointment
    }

    // Handle cancel appointment
    const handleCancelAppointment = () => {
        setAppointment({...appointment, status: 'Cancelled'})
        toast.success('Appointment cancelled')
        // Add API call here
    }

    // Handle add prescription
    const handleAddPrescription = () => {
        if (!newPrescription.medication || !newPrescription.dosage) {
            toast.error('Please fill in all prescription fields')
            return
        }
        const updatedPrescriptions = [...(appointment.prescriptions || []), newPrescription]
        setAppointment({...appointment, prescriptions: updatedPrescriptions})
        setNewPrescription({ medication: '', dosage: '', duration: '' })
        setIsAddingPrescription(false)
        toast.success('Prescription added')
    }

    // Handle remove prescription
    const handleRemovePrescription = (index) => {
        const updatedPrescriptions = appointment.prescriptions.filter((_, i) => i !== index)
        setAppointment({...appointment, prescriptions: updatedPrescriptions})
        toast.success('Prescription removed')
    }

    // Handle add test result
    const handleAddTestResult = () => {
        if (!newTestResult.test_name || !newTestResult.result) {
            toast.error('Please fill in all test result fields')
            return
        }
        const updatedResults = [...(appointment.test_results || []), newTestResult]
        setAppointment({...appointment, test_results: updatedResults})
        setNewTestResult({ test_name: '', result: '', date: '', status: 'Normal' })
        setIsAddingTestResult(false)
        toast.success('Test result added')
    }

    // Handle file upload
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files)
        const newFiles = files.map(file => ({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            type: file.type,
            uploadDate: new Date().toISOString()
        }))
        setUploadedFiles([...uploadedFiles, ...newFiles])
        toast.success(`${files.length} file(s) uploaded`)
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
                    <h1 className='text-2xl font-bold'>Appointment Details</h1>
                    <p className='text-sm text-gray-500'>
                        {appointment.appointment_id} • {appointment.patient_name}
                    </p>
                </div>
                <div className='flex gap-2'>
                    {isEditing ? (
                        <>
                            <Button 
                                variant='outline' 
                                onClick={() => {
                                    setIsEditing(false)
                                    setAppointment(appointmentData)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleSaveChanges}
                                className='bg-[#021848] hover:bg-[#021848]/90'
                            >
                                <Save className='w-4 h-4 mr-2' />
                                Save Changes
                            </Button>
                        </>
                    ) : (
                        <Button 
                            onClick={() => setIsEditing(true)}
                            className='bg-[#021848] hover:bg-[#021848]/90'
                        >
                            <Edit className='w-4 h-4 mr-2' />
                            Edit Appointment
                        </Button>
                    )}
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Left Column - Appointment Info */}
                <div className='lg:col-span-1 space-y-6'>
                    {/* Basic Info Card */}
                    <Card>
                        <CardHeader>
                            <div className='flex items-center justify-between'>
                                <CardTitle className='text-lg'>Appointment Info</CardTitle>
                                <Badge className={getStatusColor(appointment.status)}>
                                    {appointment.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                                    <User className='w-5 h-5 text-blue-600' />
                                </div>
                                <div>
                                    <p className='text-xs text-gray-500'>Patient</p>
                                    <Link 
                                        href={`/Dashboard/patients/${appointment.patient_id}`}
                                        className='text-sm font-medium hover:text-blue-600 hover:underline'
                                    >
                                        {appointment.patient_name}
                                    </Link>
                                    <p className='text-xs text-gray-500'>
                                        {appointment.patient_age}y • {appointment.patient_gender}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <Label className='text-xs text-gray-500'>Date</Label>
                                {isEditing ? (
                                    <Input 
                                        type='date'
                                        value={appointment.date}
                                        onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                                        className='mt-1'
                                    />
                                ) : (
                                    <div className='flex items-center gap-2 mt-1'>
                                        <Calendar className='w-4 h-4 text-gray-400' />
                                        <span className='text-sm font-medium'>
                                            {dayjs(appointment.date).format('MMMM D, YYYY')}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <Label className='text-xs text-gray-500'>Time</Label>
                                {isEditing ? (
                                    <Input 
                                        type='time'
                                        value={appointment.time}
                                        onChange={(e) => setAppointment({...appointment, time: e.target.value})}
                                        className='mt-1'
                                    />
                                ) : (
                                    <div className='flex items-center gap-2 mt-1'>
                                        <Clock className='w-4 h-4 text-gray-400' />
                                        <span className='text-sm font-medium'>{appointment.time}</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <Label className='text-xs text-gray-500'>Type</Label>
                                {isEditing ? (
                                    <Select 
                                        value={appointment.type}
                                        onValueChange={(value) => setAppointment({...appointment, type: value})}
                                    >
                                        <SelectTrigger className='mt-1'>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='General Checkup'>General Checkup</SelectItem>
                                            <SelectItem value='Follow-up'>Follow-up</SelectItem>
                                            <SelectItem value='Consultation'>Consultation</SelectItem>
                                            <SelectItem value='Prenatal'>Prenatal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <p className='text-sm font-medium mt-1'>{appointment.type}</p>
                                )}
                            </div>

                            <div>
                                <Label className='text-xs text-gray-500'>Duration</Label>
                                {isEditing ? (
                                    <Select 
                                        value={appointment.duration}
                                        onValueChange={(value) => setAppointment({...appointment, duration: value})}
                                    >
                                        <SelectTrigger className='mt-1'>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='15 mins'>15 mins</SelectItem>
                                            <SelectItem value='30 mins'>30 mins</SelectItem>
                                            <SelectItem value='45 mins'>45 mins</SelectItem>
                                            <SelectItem value='60 mins'>60 mins</SelectItem>
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <p className='text-sm font-medium mt-1'>{appointment.duration}</p>
                                )}
                            </div>

                            <div>
                                <Label className='text-xs text-gray-500'>Doctor</Label>
                                <p className='text-sm font-medium mt-1'>{appointment.doctor}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vitals Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-lg flex items-center gap-2'>
                                <Activity className='w-5 h-5' />
                                Vital Signs
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div>
                                <Label className='text-xs text-gray-500'>Blood Pressure</Label>
                                {isEditing ? (
                                    <Input 
                                        placeholder='e.g., 120/80 mmHg'
                                        value={appointment.vitals?.blood_pressure || ''}
                                        onChange={(e) => setAppointment({
                                            ...appointment, 
                                            vitals: {...appointment.vitals, blood_pressure: e.target.value}
                                        })}
                                        className='mt-1'
                                    />
                                ) : (
                                    <p className='text-sm font-medium mt-1'>
                                        {appointment.vitals?.blood_pressure || 'Not recorded'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className='text-xs text-gray-500'>Temperature</Label>
                                {isEditing ? (
                                    <Input 
                                        placeholder='e.g., 98.6°F'
                                        value={appointment.vitals?.temperature || ''}
                                        onChange={(e) => setAppointment({
                                            ...appointment, 
                                            vitals: {...appointment.vitals, temperature: e.target.value}
                                        })}
                                        className='mt-1'
                                    />
                                ) : (
                                    <p className='text-sm font-medium mt-1'>
                                        {appointment.vitals?.temperature || 'Not recorded'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className='text-xs text-gray-500'>Heart Rate</Label>
                                {isEditing ? (
                                    <Input 
                                        placeholder='e.g., 75 bpm'
                                        value={appointment.vitals?.heart_rate || ''}
                                        onChange={(e) => setAppointment({
                                            ...appointment, 
                                            vitals: {...appointment.vitals, heart_rate: e.target.value}
                                        })}
                                        className='mt-1'
                                    />
                                ) : (
                                    <p className='text-sm font-medium mt-1'>
                                        {appointment.vitals?.heart_rate || 'Not recorded'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className='text-xs text-gray-500'>Weight</Label>
                                {isEditing ? (
                                    <Input 
                                        placeholder='e.g., 75 kg'
                                        value={appointment.vitals?.weight || ''}
                                        onChange={(e) => setAppointment({
                                            ...appointment, 
                                            vitals: {...appointment.vitals, weight: e.target.value}
                                        })}
                                        className='mt-1'
                                    />
                                ) : (
                                    <p className='text-sm font-medium mt-1'>
                                        {appointment.vitals?.weight || 'Not recorded'}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    {appointment.status !== 'Cancelled' && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant='destructive' className='w-full'>
                                    <Trash2 className='w-4 h-4 mr-2' />
                                    Cancel Appointment
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action will cancel the appointment. You can reschedule it later if needed.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>No, Keep it</AlertDialogCancel>
                                    <AlertDialogAction 
                                        onClick={handleCancelAppointment}
                                        className='bg-red-600 hover:bg-red-700'
                                    >
                                        Yes, Cancel
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>

                {/* Right Column - Tabs */}
                <div className='lg:col-span-2'>
                    <Tabs defaultValue='overview' className='w-full'>
                        <TabsList className='grid w-full grid-cols-4'>
                            <TabsTrigger value='overview'>Overview</TabsTrigger>
                            <TabsTrigger value='prescriptions'>Prescriptions</TabsTrigger>
                            <TabsTrigger value='tests'>Test Results</TabsTrigger>
                            <TabsTrigger value='files'>Files</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value='overview' className='space-y-4'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Reason for Visit</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isEditing ? (
                                        <Input 
                                            value={appointment.reason}
                                            onChange={(e) => setAppointment({...appointment, reason: e.target.value})}
                                        />
                                    ) : (
                                        <p className='text-sm text-gray-700'>{appointment.reason}</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isEditing ? (
                                        <Textarea 
                                            value={appointment.notes}
                                            onChange={(e) => setAppointment({...appointment, notes: e.target.value})}
                                            rows={5}
                                        />
                                    ) : (
                                        <p className='text-sm text-gray-700'>{appointment.notes || 'No notes added'}</p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Prescriptions Tab */}
                        <TabsContent value='prescriptions' className='space-y-4'>
                            <Card>
                                <CardHeader>
                                    <div className='flex items-center justify-between'>
                                        <CardTitle>Prescriptions</CardTitle>
                                        <Dialog open={isAddingPrescription} onOpenChange={setIsAddingPrescription}>
                                            <DialogTrigger asChild>
                                                <Button size='sm' className='bg-[#021848]'>
                                                    <Plus className='w-4 h-4 mr-2' />
                                                    Add Prescription
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Add Prescription</DialogTitle>
                                                    <DialogDescription>
                                                        Enter the prescription details below
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className='space-y-4'>
                                                    <div>
                                                        <Label>Medication Name</Label>
                                                        <Input 
                                                            placeholder='e.g., Amoxicillin 500mg'
                                                            value={newPrescription.medication}
                                                            onChange={(e) => setNewPrescription({...newPrescription, medication: e.target.value})}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Dosage</Label>
                                                        <Input 
                                                            placeholder='e.g., Twice daily after meals'
                                                            value={newPrescription.dosage}
                                                            onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Duration</Label>
                                                        <Input 
                                                            placeholder='e.g., 7 days'
                                                            value={newPrescription.duration}
                                                            onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button variant='outline' onClick={() => setIsAddingPrescription(false)}>
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={handleAddPrescription} className='bg-[#021848]'>
                                                        Add Prescription
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {appointment.prescriptions && appointment.prescriptions.length > 0 ? (
                                        <div className='space-y-3'>
                                            {appointment.prescriptions.map((prescription, index) => (
                                                <div key={index} className='border rounded-lg p-4 relative'>
                                                    <Button 
                                                        variant='ghost' 
                                                        size='sm'
                                                        className='absolute top-2 right-2 text-red-600 hover:text-red-700 hover:bg-red-50'
                                                        onClick={() => handleRemovePrescription(index)}
                                                    >
                                                        <X className='w-4 h-4' />
                                                    </Button>
                                                    <h4 className='font-semibold text-sm mb-1'>{prescription.medication}</h4>
                                                    <p className='text-sm text-gray-600'>
                                                        <span className='font-medium'>Dosage:</span> {prescription.dosage}
                                                    </p>
                                                    <p className='text-sm text-gray-600'>
                                                        <span className='font-medium'>Duration:</span> {prescription.duration}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className='text-sm text-gray-500 text-center py-8'>
                                            No prescriptions added yet
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Test Results Tab */}
                        <TabsContent value='tests' className='space-y-4'>
                            <Card>
                                <CardHeader>
                                    <div className='flex items-center justify-between'>
                                        <CardTitle>Test Results</CardTitle>
                                        <Dialog open={isAddingTestResult} onOpenChange={setIsAddingTestResult}>
                                            <DialogTrigger asChild>
                                                <Button size='sm' className='bg-[#021848]'>
                                                    <Plus className='w-4 h-4 mr-2' />
                                                    Add Test Result
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Add Test Result</DialogTitle>
                                                    <DialogDescription>
                                                        Enter the test result details below
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className='space-y-4'>
                                                    <div>
                                                        <Label>Test Name</Label>
                                                        <Input 
                                                            placeholder='e.g., Blood Sugar Test'
                                                            value={newTestResult.test_name}
                                                            onChange={(e) => setNewTestResult({...newTestResult, test_name: e.target.value})}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Result</Label>
                                                        <Input 
                                                            placeholder='e.g., 120 mg/dL'
                                                            value={newTestResult.result}
                                                            onChange={(e) => setNewTestResult({...newTestResult, result: e.target.value})}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Date</Label>
                                                        <Input 
                                                            type='date'
                                                            value={newTestResult.date}
                                                            onChange={(e) => setNewTestResult({...newTestResult, date: e.target.value})}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Status</Label>
                                                        <Select 
                                                            value={newTestResult.status}
                                                            onValueChange={(value) => setNewTestResult({...newTestResult, status: value})}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value='Normal'>Normal</SelectItem>
                                                                <SelectItem value='Abnormal'>Abnormal</SelectItem>
                                                                <SelectItem value='Borderline'>Borderline</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button variant='outline' onClick={() => setIsAddingTestResult(false)}>
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={handleAddTestResult} className='bg-[#021848]'>
                                                        Add Result
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {appointment.test_results && appointment.test_results.length > 0 ? (
                                        <div className='space-y-3'>
                                            {appointment.test_results.map((test, index) => (
                                                <div key={index} className='border rounded-lg p-4'>
                                                    <div className='flex justify-between items-start mb-2'>
                                                        <h4 className='font-semibold text-sm'>{test.test_name}</h4>
                                                        <Badge variant='outline' className={
                                                            test.status === 'Normal' ? 'border-green-600 text-green-600' :
                                                            test.status === 'Abnormal' ? 'border-red-600 text-red-600' :
                                                            'border-yellow-600 text-yellow-600'
                                                        }>
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
                                        <p className='text-sm text-gray-500 text-center py-8'>
                                            No test results available
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Files Tab */}
                        <TabsContent value='files' className='space-y-4'>
                            <Card>
                                <CardHeader>
                                    <div className='flex items-center justify-between'>
                                        <CardTitle>Uploaded Files</CardTitle>
                                        <Label htmlFor='file-upload' className='cursor-pointer'>
                                            <Button size='sm' className='bg-[#021848]' asChild>
                                                <span>
                                                    <Upload className='w-4 h-4 mr-2' />
                                                    Upload Files
                                                </span>
                                            </Button>
                                            <Input 
                                                id='file-upload'
                                                type='file'
                                                multiple
                                                onChange={handleFileUpload}
                                                className='hidden'
                                            />
                                        </Label>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {uploadedFiles.length > 0 ? (
                                        <div className='space-y-3'>
                                            {uploadedFiles.map((file, index) => (
                                                <div key={index} className='border rounded-lg p-4 flex items-center justify-between'>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='w-10 h-10 bg-blue-100 rounded flex items-center justify-center'>
                                                            <FileText className='w-5 h-5 text-blue-600' />
                                                        </div>
                                                        <div>
                                                            <p className='text-sm font-medium'>{file.name}</p>
                                                            <p className='text-xs text-gray-500'>{file.size} • {dayjs(file.uploadDate).format('MMM D, YYYY')}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <Button variant='ghost' size='sm'>
                                                            <Download className='w-4 h-4' />
                                                        </Button>
                                                        <Button 
                                                            variant='ghost' 
                                                            size='sm'
                                                            className='text-red-600 hover:text-red-700 hover:bg-red-50'
                                                            onClick={() => {
                                                                const updated = uploadedFiles.filter((_, i) => i !== index)
                                                                setUploadedFiles(updated)
                                                                toast.success('File removed')
                                                            }}
                                                        >
                                                            <Trash2 className='w-4 h-4' />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='text-center py-12'>
                                            <Upload className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                                            <p className='text-sm text-gray-500'>No files uploaded yet</p>
                                            <p className='text-xs text-gray-400 mt-1'>Upload lab results, X-rays, or other medical documents</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Page