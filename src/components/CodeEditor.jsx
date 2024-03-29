import React, { useEffect, useRef } from 'react'
import Codemirror from "codemirror"
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Action';



export const CodeEditor = ({ socketRef, roomId }) => {
    // console.log(socketRef);
    const editorRef = useRef(null);
    useEffect(() => {
        const init = async () => {
            editorRef.current = Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
                mode: {
                    name: 'javascript',
                    json: true
                },
                theme: "dracula",
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true
            });

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                // onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });

        }

        init();
    }, []);


    useEffect(() => {
        console.log("changing ref")
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                console.log(code);
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }
    }, [socketRef.current]);


    return <textarea id="realtimeEditor" className='h-screen'></textarea>; // Keep the textarea in your JSX.
};



