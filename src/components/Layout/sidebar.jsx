'use client';
import React, { useState, useEffect, useContext } from 'react';
import { DashboardNav } from './dashboard-nav';
import { cn } from '../../lib/utils';

import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '../../hooks/useSidebar';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/images/logo.png';
// import { useAuth } from '../../Context/AuthContext';

// Define navigation items based on roles
// const getNavItemsByRole = (role) => {
//   switch (role) {
//     case 'admin':
//       return [
//         { title: 'Dashboard', href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
//         { title: 'Sellers', href: '/dashboard/sellers', icon: 'users', label: 'users' },
//         { title: 'Orders', href: '/dashboard/allOrders', icon: 'products', label: 'products' },
//         { title: 'Tickets', href: '/dashboard/tickets', icon: 'Tickets', label: 'Tickets' },
//         // { title: 'Vouchers', href: '/dashboard/vouchers', icon: 'TicketCheck', label: 'TicketCheck' },
//       ];
//     case 'seller':
//       return [
//         { title: 'Dashboard', href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
//         { title: 'Products', href: '/dashboard/products', icon: 'products', label: 'products'  },
//         { title: 'Orders', href: '/dashboard/orders', icon: 'zap', label: 'Zap'  },
//         { title: 'Payments', href: '/dashboard/payments', icon: 'briefcase', label: 'briefcase'  },
//       ];
//     case 'super_admin':
//       return [
//         { title: 'Dashboard', href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
//         { title: 'Manage Sellers', href: '/dashboard/sellers', icon: 'users', label: 'users' },
//         { title: 'Manage Admins', href: '/dashboard/admins', icon: 'users', label: 'users' },

//       ];
//     default:
//       return [
//         { name: 'OverView', href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
//         { name: 'Products', href: '/products' }
//       ];
//   }
// };

const navItems = [
    { title: 'Home', href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { title: 'My Courses', href: '/dashboard/my-courses', icon: 'book', label: 'book' },
    { title: 'Recommendations', href: '/dashboard/recommendations', icon: 'Calendar', label: 'Calendar' },
]

const Sidebar = ({ className }) => {
//   const { user } = useAuth(); 
//   const [navItems, setNavItems] = useState([]);
  const { isMinimized, toggle } = useSidebar();

//   useEffect(() => {
//     if (user?.role) {
//       const items = getNavItemsByRole(user.role);
//       setNavItems(items);
//     }
//   }, [user]);

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? 'w-52' : 'w-[72px]',
        className
      )}
    >
      {/* Logo section */}
      {/* <div className="hidden p-5 pt-10 lg:block ">
        <Link href={'/'}>
          <Image src='/logo.png' width={100} height={100} className=' object-contain' alt='logo' />
        </Link>
      </div> */}

      {/* Toggle button */}
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />

      {/* Navigation items */}
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
