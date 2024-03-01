import React from 'react'
import { useNavigate } from "react-router-dom"


export const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-4 justify-center items-center  h-screen bg-black text-white'>
            <span className='text-4xl font-serif'>CODE SYNC</span>
            <div className=' border border-solid  rounded-lg border-red-700  flex flex-col shadow-lg shadow-gray-800 h-[60%]'>
                <div className='grid  grid-cols-2 p-4'>
                    <div className='grid  grid-cols-3 '>
                        <div className='h-16'>
                            <p>Code Sync</p>
                        </div>
                        <div></div>
                        <div>third</div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='flex flex-col justify-evenly p-4 h-full'>
                    <div className='flex flex-col text-start '>
                        <span>
                            Room ID
                        </span>
                        <input
                            className='w-full mt-1 h-10 border border-solid rounded-md pl-4  shadow-sm shadow-gray-800 '
                            type='text'
                            placeholder='Enter your Room Id'
                        />
                    </div>
                    <div className='flex flex-col  text-start '>
                        <span >
                            Username
                        </span>
                        <input
                            className='w-full mt-1 h-10 border border-solid rounded-md pl-4  shadow-sm shadow-gray-800 '
                            type='text'
                            placeholder='Enter your Username'
                        />
                    </div>
                    <div className='flex justify-end '>
                        <button
                            type='button'
                            className='bg-green-800 w-20 h-8  rounded-md shadow-sm  shadow-green-800 '
                        >JOIN</button>
                    </div>
                    <div className='pl-5'>
                        <p>If you don't have invite then create <span onClick={() => navigate('/editor')} className="text-green-800 cursor-pointer" >NEW ROOM</span></p>
                    </div>
                </div>

            </div>
        </div>
    )
}
