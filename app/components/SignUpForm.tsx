'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, gql } from '@apollo/client';
import { SIGNUP_MUTATION } from "../api/mutations";

type SignUpFormData = {
    email: string,
    password: string
    name: string
}

const SignUpForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormData>();
    const [signup] = useMutation(SIGNUP_MUTATION);
    const handleSignUp: SubmitHandler<SignUpFormData> = async data => {
        try {
            const response = await signup({
                variables: {
                    signUpInput: {
                        email: data.email,
                        password: data.password,
                        name: data.name

                    }
                }
            })
            console.log(response.data.signup);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSignUp)}
            className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8
            bg-white dark:bg-gray-900 overflow-hidden sm:rounded-lg"
        >
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        {...register("email")}
                        required
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                    Password
                </label>
                <div className="mt-2">
                    <input
                        {...register("password")}
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                    Name
                </label>
                <div className="mt-2">
                    <input
                        {...register("name")}
                        required
                        autoComplete="name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="mt-10 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500"
                >
                    {errors.password && <span>This field is required</span>}
                    {errors.email && <span>This field is required</span>}
                    {errors.name && <span>This field is required</span>}
                    Sign in
                </button>
            </div>
        </form>
    )

}

export default SignUpForm