import React from 'react'
import Image from 'next/image'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import dayjs from 'dayjs'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye, Trash2, Filter, X, Check, XIcon, Star, ChevronDown, ChevronRight, User, SquarePen, Plus } from "lucide-react";
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import PatientsData from '../../patients.json'

const Page = () => {
    return (
        <div className='mx-4'>
            <Button className='bg-[#021848] flex gap-2 items-center'> 
                <Plus/> Add New Patient 
            </Button>
            
            <div className="mt-6 border rounded-lg">
                <div className="relative overflow-auto lg:h-[calc(80vh-80px)] h-[80vh]">
                    <Table className="relative">
                        <TableHeader className="bg-gray-50 sticky top-0 z-10 border-b">
                            <TableRow>
                                <TableHead className="text-sm font-semibold bg-gray-50 sticky top-0">
                                    Patient ID
                                </TableHead>
                                <TableHead className="text-sm font-semibold bg-gray-50 sticky top-0">
                                    Patient's Name
                                </TableHead>
                                <TableHead className="text-sm font-semibold bg-gray-50 sticky top-0">
                                    Age
                                </TableHead>
                                <TableHead className="text-sm font-semibold bg-gray-50 sticky top-0">
                                    Gender
                                </TableHead>
                                <TableHead className="text-sm font-semibold bg-gray-50 sticky top-0">
                                    Last Visit
                                </TableHead>
                                <TableHead className="text-sm font-semibold bg-gray-50 sticky top-0">
                                    Status
                                </TableHead>
                                <TableHead className="text-sm font-semibold bg-gray-50 sticky top-0">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {PatientsData.map((patient, index) => (
                                <TableRow key={patient.patient_id} className="hover:bg-gray-50">
                                    <TableCell className="font-medium">
                                        {patient.patient_id}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {patient.name}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {patient.age}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {patient.gender}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {dayjs(patient.last_visit).format('MMMM D, YYYY')}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {patient.role === 'Active' ? (
                                            <Badge className='bg-green-100 hover:bg-green-60 text-green-500 rounded-md shadow-none px-4'>
                                                {patient.role}
                                            </Badge>
                                        ) : (
                                            <Badge className='bg-gray-200 hover:bg-red-600 text-gray-400 rounded-md shadow-none px-4'>
                                                {patient.role}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex gap-3 items-center">
                                            <Link 
                                                href={`/Dashboard/patients/${patient.patient_id}`}
                                                title={`View ${patient.name}'s details`}
                                            >
                                                <Eye className='cursor-pointer text-gray-500 hover:text-blue-600 transition-colors' size={18} />
                                            </Link>
                                            <SquarePen className='cursor-pointer text-gray-500 hover:text-green-600 transition-colors' size={18} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="text-sm text-gray-500 p-4 border-t bg-gray-50">
                    Showing {PatientsData.length} patients
                </div>
            </div>
        </div>
    )
}

export default Page