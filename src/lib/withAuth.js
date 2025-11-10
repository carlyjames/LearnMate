'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        router.push('/'); 
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
