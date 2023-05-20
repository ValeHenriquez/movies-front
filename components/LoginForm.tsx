import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, gql } from '@apollo/client';
import { LOGIN_MUTATION } from "../graphql/mutations";

type LoginFormData = {
    email: string,
    password: string
};

const LoginForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormData>();
    const [login] = useMutation(LOGIN_MUTATION);
    const handleLogin: SubmitHandler<LoginFormData> = async data => {
        try {
            const response = await login({
                variables: {
                    loginInput: {
                        email: data.email,
                        password: data.password
                    }
                }
            })
            console.log(response.data.login);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}
            className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            {...register("password")}
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {errors.password && <span>This field is required</span>}
                        {errors.email && <span>This field is required</span>}
                        Sign in
                    </button>
                </div>


                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sing up
                    </a>
                </p>
            </div>

        </form>


    )
}

export default LoginForm