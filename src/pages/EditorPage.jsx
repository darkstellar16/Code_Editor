import React, { useRef, useEffect, useState } from 'react'
import { CodeEditor } from '../components/CodeEditor'
import { initSocket } from '../socket';
import ACTIONS from '../Action';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";


export const EditorPage = () => {
    const [users, setUsers] = useState([])


    const socketRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { roomID } = useParams();

    const handleError = (err) => {
        console.log("scoket error", err);
        toast.error("Socket connection failed try again later");
        navigate("/");
    }

    useEffect(() => {
        const init = async () => {

            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleError(err));
            socketRef.current.on('connect_failed', (err) => handleError(err));

            socketRef.current.emit(ACTIONS.JOIN, {
                roomID,
                userName: location.state?.userName
            })

            //Listening for joined event
            socketRef.current.on(ACTIONS.JOINED,
                ({ clients, userName, socketId }) => {
                    if (userName !== location.state?.userName) {
                        toast.success(`${userName} joined the room`)
                    }
                    // console.log(clients);
                    setUsers(clients);

                })

            //Listening the disconnected 
            socketRef.current.on(ACTIONS.DISCONNETED, ({ socketId, userName }) => {
                console.log(userName);
                toast.success(`${userName} left the room`);
                setUsers((prev) => {
                    return prev.filter((clients) => clients.socketId !== socketId)
                })

            })
        }
        init();
        return () => {
            socketRef?.current?.off(ACTIONS.JOINED);
            socketRef?.current?.off(ACTIONS.DISCONNETED);
            socketRef?.current?.disconnect();
        }

    }, [])


    // console.log(users);

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
