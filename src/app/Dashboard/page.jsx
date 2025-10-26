"use client";

import React, { useEffect, useState, useRef } from 'react';
import PageContainer from '../../components/Layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList } from '../../components/ui/tabs';
import {
  Plus,
  Calendar,
  Server
} from 'lucide-react';


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Badge } from '../../components/ui/badge';
import PatientsIcon from '../../assets/images/PatientsIcon.png'
import DeliveriesIcon from '../../assets/images/DeliveriesIcon.png'
import AppointmentsIcon from '../../assets/images/AppointmentsIcon.png'
import Image from 'next/image';
import Patients from '../metrics/Patients';
import Appointments from '../metrics/Appointments';
import Link from 'next/link';

const MetricSkeleton = () => (
  <Card>
    <div className="animate-pulse">
      <div className="p-2 m-2">
        <div className="h-8 w-8 rounded-full bg-gray-200" />
      </div>
      <CardHeader className="pb-2">
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </CardContent>
    </div>
  </Card>
);



function Page() {
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const prevMetricsRef = useRef([]);

  const metrics = [
    { title: 'Patients', count: '1,250', icon: PatientsIcon, bg: 'bg-blue-50' },
    { title: 'Appointments', count: '1,250', icon: AppointmentsIcon, bg: 'bg-purple-100' },
    { title: 'Deliveries', count: '60', icon: DeliveriesIcon, bg: 'bg-green-100' },
  ]



  const handleSuspendModalClose = () => {
    setShowSuspendModal(false);
  };

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2 mb-4">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {metrics.map((metric, index) => (
                <Card key={index} className={`bg-[#F8FAFC] shadow-accent border-none p-4`}>
                  <Image src={metric.icon} alt='img' width={70} height={70} />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-medium">{metric.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">{metric.count}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className='grid lg:grid-cols-3 gap-4'>
              <div className='lg:col-span-2 gap-4'>
                <Card className='bg-[#F8FAFC] shadow-accent  border-none p-4'>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-medium">Patients Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Patients />
                  </CardContent>
                </Card>
                <h1 className='my-3 font-semibold'>Quick Action</h1>
                <div className='flex lg:flex-row flex-col items-center gap-4'>
                  <Link href='/Dashboard/patients'>
                    <div className='bg-[#F8FAFC] h-[100px] w-full lg:w-[170px] rounded-md'>
                      <div className='flex flex-col items-center justify-center h-full gap-3 cursor-pointer'>
                        <Plus className='text-gray-500' />
                        <h1 className='text-gray-500 text-sm'>Add New Patient</h1>
                      </div>
                    </div>
                  </Link>
                  <Link href='/Dashboard/appointments'>
                    <div className='bg-[#F8FAFC] h-[100px] w-full lg:w-[170px] rounded-md'>
                      <div className='flex flex-col items-center justify-center h-full gap-3 cursor-pointer'>
                        <Calendar className='text-gray-500' />
                        <h1 className='text-gray-500 text-sm'>Schedule Appointment</h1>
                      </div>
                    </div>
                  </Link>
                  <div className='bg-[#F8FAFC] h-[100px] w-full lg:w-[170px] rounded-md'>
                    <div className='flex flex-col items-center justify-center h-full gap-3 cursor-pointer'>
                      <Server className='text-gray-500' />
                      <h1 className='text-gray-500 text-sm'>Record Deliveries</h1>
                    </div>
                  </div>
                </div>
              </div>
              <Card className='bg-[#242424] shadow-accent border-none'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium text-white">Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Appointments />
                </CardContent>
              </Card>
            </div>

          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}

export default Page;