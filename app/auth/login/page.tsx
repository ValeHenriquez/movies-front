"use client"
import LoginForm from '@/components/LoginForm';
import { AppState } from '@/store/store';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

const Login = () => {
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
    const token = useSelector((state: AppState) => state.auth.token);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (isAuthenticated && token) {
                return router.push('/movies');
            }

        }, 2000);
    }, [isAuthenticated, router]);
    if (loading) {
        return <>
            <Loading />
        </>
    }
    return (
        <>
            <LoginForm />
        </>
    )
}

export default Login;