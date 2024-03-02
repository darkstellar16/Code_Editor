import React, { useRef, useEffect, useState } from 'react'
import { CodeEditor } from '../components/CodeEditor'
import { initSocket } from '../socket';

export const EditorPage = () => {
    const [clients, setClients] = useState([{
        socketID: "1",
        username: "Vishal Patel"
    }, {
        socketID: "2",
        username: "Vishal Yadav"
    }])
    const socketRef = useRef(null);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.emit("join", {
                username: "Vishal Patel",
                socketID: "1"
            })
        }
        init();


    }, [])




    return (
        <div className='flex flex-row h-screen overflow-hidden'>
            <div className='w-[20%] border border-r-2 border-r-red-100 h-full  bg-gray-200 '>
                <div className=' mt-6 text-center'>
                    <span className='text-4xl font-serif'>CODE SYNC</span>
                </div>
                <div className='overflow-y-auto h-[75%] border border-b-2 mt-2'>
                    <div className='grid grid-cols-2 gap-6  p-6 '>
                        {[1, 2, 3, 4, 5, 3, 3, 1, 1, 1, 1, 1, 1].map((item) => {
                            return (<div>
                                <div className='mx-auto flex items-center justify-center h-12 w-12 bg-black/75 text-white text-lg border rounded-full '>VP</div>
                                <div className='w-full text-sm text-center'><p>Vishal Patel</p></div>
                            </div>)
                        })}
                    </div>
                </div>
                <div className='flex justify-evenly  h-[15%] items-center '>
                    <button
                        type='button'
                        className='w-[45%] text-sm p-2 rounded-md  text-white bg-blue-600 '
                    >Copy room ID</button>
                    <button
                        type='button'
                        className='w-[45%] text-sm p-2 rounded-md text-white bg-red-600 '
                    >Leave</button>
                </div>
            </div>
            <div className='w-full'>
                <CodeEditor />
            </div>
        </div>
    )
}
