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


const Page = () => {
    return (
        <div className='mx-4'>

            <Dialog className='bg-black'>
                <form>
                    <DialogTrigger asChild>
                        <Button className='bg-[#021848] flex gap-2 items-center'>
                            <Plus /> Add New Patient
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add a new patient</DialogTitle>
                            <DialogDescription>
                                Fill the form below to add a new patient to the system.
                            </DialogDescription>
                        </DialogHeader>
                            <DialogContent>
                                <form action="" className="flex flex-col gap-2 py-2">
                                    <div className="flex flex-col">
                                        <Label className="mb-2 mt-4" htmlFor="name">Patient's Full Name</Label>
                                        <Input type="text" id="name" placeholder="James Abraham Chinedu" className="w-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <Label className="mb-2 mt-4" htmlFor="email">Patient's Email</Label>
                                        <Input type="email" id="email" placeholder="abrahamjames543@gmail.com" className="w-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <Label className="mb-2 mt-4" htmlFor="phone">Patient's Phone Number</Label>
                                        <Input type="phone" id="phone" placeholder="+ 2 3 4 * * * * * * * * * *" className="w-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <Label className="mb-2 mt-4" htmlFor="number">Patient's Age</Label>
                                        <Input type="number" id="number" placeholder="23" className="w-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <Label className="mb-2 mt-4" htmlFor="gender">Patient's Gender</Label>
                                        <Input type="gender" id="gender" placeholder="Male" className="w-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <Label className="mb-2 mt-4" htmlFor="address">Patient's Address</Label>
                                        <Input type="address" id="address" placeholder="No 21 olawoyin street, mushin, lagos, nIGERIA" className="w-full" />
                                    </div>
                                </form>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                            </DialogContent>
                    </DialogContent>
                </form>
            </Dialog>

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
                                    Action
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