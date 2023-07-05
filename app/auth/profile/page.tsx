"use client"
import Loading from "@/components/Loading";
import { User } from "@/config/interfaces";
import { GET_PROFILE } from "@/graphql/querys";
import { AppState } from "@/store/store";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const token = useSelector((state: AppState) => state.auth.token);
    const [user, setUser] = useState<User>();
    const [profile, { error, loading, data }] = useLazyQuery(GET_PROFILE,
        {
            context: {
                headers: {
                    authorization: token ? `Bearer ${token}` : "",
                },
            },
            fetchPolicy: "network-only",
        }
    );

    useEffect(() => {
        if (token && !user) {
            profile();
            setUser(data?.profile);
        }
    }, [data]);

    return (
        <main className="flex flex-col mt-5">
            {loading && <Loading />}
            <div >
                <div className="container mx-auto">
                    <div className="w-full max-w-2xl p-6 mx-auto inputs">
                        <h2 className="text-2xl text-gray-900">Account Setting</h2>
                        <form className="pt-4 mt-6 border-t border-gray-400">
                            <div className='flex flex-wrap mb-6 -mx-3'>
                                <div className='w-full px-3 mb-6 md:w-full'>
                                    <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase' htmlFor='grid-text-1'></label>
                                    <input value={user?.email}
                                        className='block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded-md shadow-inner appearance-none focus:outline-none focus:border-gray-500' id='grid-text-1' type='text' placeholder='Enter email' required />
                                </div>
                                <div className='w-full px-3 mb-6 md:w-full '>
                                    <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>password</label>
                                    <button className="px-2 py-1 text-gray-900 bg-gray-200 border border-gray-400 rounded-md shadow-sm appearance-none ">change your password</button>
                                </div>
                                <div className='w-full px-3 mb-6 md:w-full'>
                                    <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>pick your country</label>
                                    <div className="relative flex-shrink inline-block w-full">
                                        <select className="block w-full px-4 py-2 pr-8 text-gray-600 bg-white border border-gray-400 rounded shadow-inner appearance-none">
                                            <option>choose ...</option>
                                            <option>Chile</option>
                                            <option>France</option>
                                            <option>Spain</option>
                                            <option>UK</option>
                                        </select>
                                        <div className="absolute top-0 right-0 flex items-center px-2 mt-3 text-gray-600 pointer-events-none">
                                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full px-3 mb-6 md:w-full'>
                                    <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>fav language</label>
                                    <div className="relative flex-shrink inline-block w-full">
                                        <select className="block w-full px-4 py-2 pr-8 text-gray-600 bg-white border border-gray-400 rounded shadow-inner appearance-none">
                                            <option>choose ...</option>
                                            <option>English</option>
                                            <option>France</option>
                                            <option>Spanish</option>
                                        </select>
                                        <div className="absolute top-0 right-0 flex items-center px-2 mt-3 text-gray-600 pointer-events-none">
                                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full pt-4 border-t border-gray-400 personal">
                                    <h2 className="text-2xl text-gray-900">Personal info:</h2>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className='w-full px-3 mb-6 md:w-1/2'>
                                            <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase' >first name</label>
                                            <input value={user?.name}
                                                className='block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded-md shadow-inner appearance-none focus:outline-none focus:border-gray-500' type='text' required />
                                        </div>
                                        <div className='w-full px-3 mb-6 md:w-1/2'>
                                            <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase' >last name</label>
                                            <input className='block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded-md shadow-inner appearance-none focus:outline-none focus:border-gray-500' type='text' required />
                                        </div>
                                    </div>
                                    <div className='w-full px-3 mb-6 md:w-full'>
                                        <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>user name</label>
                                        <input className='block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded-md shadow-inner appearance-none focus:outline-none focus:border-gray-500' type='text' required />
                                    </div>
                                    <div className='w-full px-3 mb-6 md:w-full'>
                                        <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase' >Bio</label>
                                        <textarea className='w-full h-20 px-3 py-2 font-medium leading-normal placeholder-gray-700 bg-gray-100 border border-gray-400 rounded-md shadow-inner resize-none focus:outline-none focus:bg-white' required></textarea>
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="px-2 py-1 mr-3 text-gray-900 bg-gray-200 border border-gray-400 rounded-md shadow-sm appearance-none" type="submit">save changes</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
