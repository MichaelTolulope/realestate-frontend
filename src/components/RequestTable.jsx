import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { useQuery } from '@tanstack/react-query'
import { getAllRequests } from '../apiRequests/apiCalls'
import {formatDateTime} from '../util/utils'

const RequestTable = () => {
    const { theme } = useTheme()
    const {data, isLoading, isError} = useQuery({
        queryKey:['requests'],
        queryFn: getAllRequests,
        cacheTime: 10 * 60 * 1000,

    })

    return (

        < div className={`rounded-lg border border-gray-200`} >
            <div className="overflow-x-auto rounded-t-lg ">
                <table className=" divide-y-2 divide-gray-200  text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr >
                            <th className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-left px-4 py-2 font-medium whitespace-nowrap text-gray-900`}>Request ID</th>
                            <th className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-left px-4 py-2 font-medium whitespace-nowrap text-gray-900`}>Name</th>
                            <th className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-left px-4 py-2 font-medium whitespace-nowrap text-gray-900`}>Email</th>
                            <th className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-left px-4 py-2 font-medium whitespace-nowrap text-gray-900`}>Phone Number</th>
                            <th className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-left px-4 py-2 font-medium whitespace-nowrap text-gray-900`}>Message</th>
                            <th className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-left px-4 py-2 font-medium whitespace-nowrap text-gray-900`}>Date - Time</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            data?.requests?.map((request) => (
                                <tr key={request._id}>
                                    <td className={`${theme === 'dark' ? 'text-white' : 'text-black'} px-4 py-2 font-medium whitespace-nowrap text-gray-900`}>{request._id}</td>
                                    <td className={`${theme === 'dark' ? 'text-white' : 'text-black'} px-4 py-2 font-medium whitespace-nowrap text-gray-900`}>{request.fullName}</td>
                                    <td className={`${theme === 'dark' ? 'text-white' : 'text-black'} px-4 py-2 whitespace-nowrap text-gray-700`}>{request.email}</td>
                                    <td className={`${theme === 'dark' ? 'text-white' : 'text-black'} px-4 py-2 whitespace-nowrap text-gray-700`}>{request.phoneNumber}</td>
                                    <td className={`${theme === 'dark' ? 'text-white' : 'text-black'} px-4 py-2 whitespace-nowrap text-gray-700`}>{request.message}</td>
                                    <td className={`${theme === 'dark' ? 'text-white' : 'text-black'} px-4 py-2 whitespace-nowrap text-gray-700`}>{formatDateTime(request.date)}</td>
                                    {/* <td className={`${theme === 'dark' ? 'text-white' : 'text-black'} px-4 py-2 whitespace-nowrap text-gray-700`}><button className='border-none bg-black text-white px-3 py-2 rounded-lg font-bold'>Respond</button></td> */}
                                </tr>
                            ))
                        }



                    </tbody>
                </table>
            </div>

            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 flex justify-center">
                <ol className="flex justify-end gap-1 text-xs font-medium">
                    <li>
                        <a
                            href="#"
                            className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span className="sr-only">Prev Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900"
                        >
                            1
                        </a>
                    </li>

                    <li
                        className="block size-8 rounded-sm border-blue-600 bg-blue-600 text-center leading-8 text-white"
                    >
                        2
                    </li>

                    <li>
                        <a
                            href="#"
                            className="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900"
                        >
                            3
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900"
                        >
                            4
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span className="sr-only">Next Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </li>
                </ol>
            </div>
        </div >
    )
}

export default RequestTable