import React from 'react'
import Image from 'next/image'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import dayjs from 'dayjs'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye, Trash2, Filter, X, Check, XIcon, Star, ChevronDown, ChevronRight, User, SquarePen, Plus } from "lucide-react";
import { Badge } from '@/components/ui/badge'

const PatientsData = [
    {
        "patient_id": "P001",
        "name": "John Doe",
        "age": 34,
        "gender": "Male",
        "last_visit": "2025-08-12",
        "role": "Active",
    },
    {
        "patient_id": "P002",
        "name": "Mary Johnson",
        "age": 27,
        "gender": "Female",
        "last_visit": "2025-07-22",
        "role": "Inactive",
    },
    {
        "patient_id": "P003",
        "name": "Ahmed Bello",
        "age": 45,
        "gender": "Male",
        "last_visit": "2025-09-01",
        "role": "Active",
    },
    {
        "patient_id": "P004",
        "name": "Chiamaka Okafor",
        "age": 31,
        "gender": "Female",
        "last_visit": "2025-08-28",
        "role": "Active",
    },
    {
        "patient_id": "P005",
        "name": "David Smith",
        "age": 52,
        "gender": "Male",
        "last_visit": "2025-06-15",
        "role": "Inactive",
    },
    {
        "patient_id": "P006",
        "name": "Sophia Williams",
        "age": 19,
        "gender": "Female",
        "last_visit": "2025-09-10",
        "role": "Active",
    },
    {
        "patient_id": "P007",
        "name": "Michael Brown",
        "age": 63,
        "gender": "Male",
        "last_visit": "2025-05-29",
        "role": "Inactive",
    },
    {
        "patient_id": "P008",
        "name": "Emily Davis",
        "age": 41,
        "gender": "Female",
        "last_visit": "2025-09-05",
        "role": "Active",
    },
    {
        "patient_id": "P009",
        "name": "Peter Obi",
        "age": 36,
        "gender": "Male",
        "last_visit": "2025-07-30",
        "role": "Active",
    },
    {
        "patient_id": "P010",
        "name": "Fatima Abubakar",
        "age": 29,
        "gender": "Female",
        "last_visit": "2025-08-18",
        "role": "Inactive",
    },
    {
        "patient_id": "P011",
        "name": "James Miller",
        "age": 48,
        "gender": "Male",
        "last_visit": "2025-08-01",
        "role": "Active",
    },
    {
        "patient_id": "P012",
        "name": "Olivia Johnson",
        "age": 22,
        "gender": "Female",
        "last_visit": "2025-09-07",
        "role": "Active",
    },
    {
        "patient_id": "P013",
        "name": "Henry Thomas",
        "age": 55,
        "gender": "Male",
        "last_visit": "2025-06-20",
        "role": "Inactive",
    },
    {
        "patient_id": "P014",
        "name": "Grace Nwankwo",
        "age": 39,
        "gender": "Female",
        "last_visit": "2025-07-25",
        "role": "Active",
    },
    {
        "patient_id": "P015",
        "name": "Daniel White",
        "age": 60,
        "gender": "Male",
        "last_visit": "2025-05-10",
        "role": "Inactive",
    },
    {
        "patient_id": "P016",
        "name": "Amaka Uche",
        "age": 33,
        "gender": "Female",
        "last_visit": "2025-08-29",
        "role": "Active",
    },
    {
        "patient_id": "P017",
        "name": "Samuel Johnson",
        "age": 25,
        "gender": "Male",
        "last_visit": "2025-09-11",
        "role": "Active",
    },
    {
        "patient_id": "P018",
        "name": "Linda George",
        "age": 47,
        "gender": "Female",
        "last_visit": "2025-06-30",
        "role": "Inactive",
    },
    {
        "patient_id": "P019",
        "name": "Victor Adeyemi",
        "age": 38,
        "gender": "Male",
        "last_visit": "2025-08-06",
        "role": "Active",
    },
    {
        "patient_id": "P020",
        "name": "Hannah Lee",
        "age": 30,
        "gender": "Female",
        "last_visit": "2025-09-03",
        "role": "Active",
    }
]

const page = () => {
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
                                            <Badge className='bg-green-500 hover:bg-green-600 text-white'>
                                                {patient.role}
                                            </Badge>
                                        ) : (
                                            <Badge className='bg-red-500 hover:bg-red-600 text-white'>
                                                {patient.role}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex gap-3 items-center">
                                            <Eye className='cursor-pointer text-gray-500 hover:text-blue-600 transition-colors' size={18} />
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

export default page