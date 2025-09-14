'use client';
import { DashboardNav } from './dashboard-nav';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
// import { useAuth } from '../../Context/AuthContext';

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
    { title: 'Overview', href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { title: 'Patients', href: '/dashboard/sellers', icon: 'users', label: 'users' },
    { title: 'Appointments', href: '/dashboard/allOrders', icon: 'Calendar', label: 'Calendar' },
    { title: 'Settings', href: '/dashboard/tickets', icon: 'settings', label: 'Settings' },
    { title: 'Help Center', href: '/dashboard/tickets', icon: 'Tickets', label: 'Tickets' },
    // { title: 'Vouchers', href: '/dashboard/vouchers', icon: 'TicketCheck', label: 'TicketCheck' },

]

export function MobileSidebar({ className }) {
    //   const { user } = useAuth(); 
    //   const [navItems, setNavItems] = useState([]);
    const [open, setOpen] = useState(false);

    //   useEffect(() => {
    //     if (user && user.role) {
    //       const items = getNavItemsByRole(user.role);
    //       setNavItems(items);
    //     }
    //   }, [user]);


    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent side="left" className="!px-0">
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                Overview
                            </h2>
                            <div className="space-y-1">
                                <DashboardNav
                                    items={navItems}
                                    isMobileNav={true}
                                    setOpen={setOpen}
                                />
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
