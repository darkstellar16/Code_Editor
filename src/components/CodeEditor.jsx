// import React, { useEffect } from 'react'

// export const CodeEditor = () => {

//     useEffect(() => {
//         const init = () => {

//         }



//         init();
//     }, [])




//     return (
//         <textarea></textarea>
//     )
// }


import { React, useCallback, useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export const CodeEditor = () => {

    const [value, setValue] = useState("");
    const onChange = useCallback((val, viewUpdate) => {
        setValue(val);
    }, []);



    return (
        <CodeMirror value={value} height="100vh" extensions={[javascript({ jsx: true })]} onChange={onChange} />
    )
}
