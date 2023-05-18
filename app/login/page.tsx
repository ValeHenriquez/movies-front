"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Form from '../components/Form';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(email);

    return (
        <>
            <Form />

        </>
    )
}
