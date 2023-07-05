'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, gql } from '@apollo/client';
import { LOGIN_MUTATION } from "../graphql/mutations";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import Loading from "./Loading";
import { User } from "@/config/interfaces";
import { useState } from "react";

type LoginFormData = {
  email: string,
  password: string
};

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormData>();
  const [login] = useMutation(LOGIN_MUTATION);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin: SubmitHandler<LoginFormData> = async data => {
    try {
      setLoading(true);
      const response = await login({
        variables: {
          loginInput: {
            email: data.email,
            password: data.password
          }
        }
      })
      const token: string = response.data.login.token;
      const user: User = response.data.login.user;
      localStorage.setItem('token', token);
      dispatch(loginSuccess({ user, token }));
      return router.push('/movies');

    } catch (error) {
      console.log(error);
      setLoading(false);
      setError('Invalid credentials');
      setTimeout(() => {
        setError('');
      }
        , 3000);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <form onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8 bg-[#171717]">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-red-500 hover:text-red-600 ">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                {...register("password")}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-5 flex w-full justify-center rounded-mdtext-white bg-red-500 rounded hover:bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {errors.password && <span>This field is required</span>}
              {errors.email && <span>This field is required</span>}
              Sign in
            </button>
          </div>
          {
            error && (
              <div className="mt-5 flex w-full justify-center p-2
                bg-red-500 bg-opacity-50 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
              ">
                {error}
              </div>
            )
          }

          <p className="mt-10 text-sm text-center text-gray-500">
            Not a member?{' '}
            <a href="/auth/signup" className="font-semibold leading-6 text-red-500 hover:text-red-600 ">
              Sing up
            </a>
          </p>

        </div>

      </form>
    </>


  )
}

export default LoginForm