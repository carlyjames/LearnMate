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
import deliveries from '../../deliveries.json'
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
  const filteredDeliveries = deliveries.filter(apt => {
    const matchesSearch = apt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.appointment_id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || apt.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })



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
    total: deliveries.length,

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
          <h1 className='text-3xl font-bold text-gray-900'>Deliveries</h1>
          <p className='text-sm text-gray-500 mt-1'>Manage and record deliveries</p>
        </div>
        <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
          <DialogTrigger asChild>
            <Button className='bg-[#021848] hover:bg-[#021848]/90 flex gap-2 items-center'>
              <Plus className='w-4 h-4' />
              New Delivery
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>Record new delivery</DialogTitle>
              <DialogDescription>
                Fill in the details to record a new delivery
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4 h-[300px] overflow-x-hidden overflow-y-scroll'>
              {/* patient name */}
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
              {/* date */}
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
              {/* Number of babies */}
              <div className='grid gap-2'>
                <Label htmlFor='reason'>Number of babies</Label>
                <Input
                  id='babies'
                  placeholder='1'
                  value={newAppointment.reason}
                  type='number'
                  onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                />
              </div>
              {/* baby's condition */}
              <div className='grid gap-2'>
                <Label htmlFor='reason'>Baby's condition</Label>
                <Input
                  id='babys_condition'
                  placeholder='Baby condition details'
                  value={newAppointment.reason}
                  type='number'
                  onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                />
              </div>
              {/* mother's condition */}
              <div className='grid gap-2'>
                <Label htmlFor='reason'>Mother's condition</Label>
                <Input
                  id='mothers_condition'
                  placeholder='mother condition details'
                  value={newAppointment.reason}
                  type='number'
                  onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                />
              </div>
              {/* additional notes */}
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
              <Button className='bg-[#021848] hover:bg-[#021848]/90' onClick={handleCreateAppointment} >
                Record Delivery
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
                  <TableHead>Doctor</TableHead>
                  <TableHead>Mother</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Number of babies</TableHead>
                  <TableHead>Baby gender</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((delivery, i) => (
                    <TableRow key={i} className='hover:bg-gray-50'>
                      <TableCell>
                        <p>{delivery.doctor_name}</p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className='font-medium'>{delivery.patient_name}</p>
                          <p className='text-sm text-gray-400'>{delivery.mother_condition}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <div>
                            <p className='font-medium'>
                              {dayjs(delivery.date).format('MMM D, YYYY')}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-col items-start gap-2'>
                          <span>{delivery.number_of_babies}</span>
                          <span className='text-sm text-gray-400'>{delivery.baby_condition}</span>
                        </div>
                      </TableCell>
                      <TableCell>{delivery.gender}</TableCell>
                      <TableCell>
                        <p className='text-sm text-gray-400'>{delivery.notes}</p>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className='text-center py-12 text-gray-500'>
                      No delivery found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {filteredDeliveries.length > 0 && (
            <div className='text-sm text-gray-500 mt-4 pt-4 border-t'>
              Showing {filteredDeliveries.length} of {deliveries.length} deliveries
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Page