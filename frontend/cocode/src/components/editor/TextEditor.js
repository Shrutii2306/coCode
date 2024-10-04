import { useEffect, useRef, useState } from 'react';
import { Controlled as CodeMirror} from 'react-codemirror2';
import { saveCodeSnippet } from '../../utils/codeHistories';
import { useSelector } from "react-redux";
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require("codemirror/addon/hint/show-hint.css") 
require( "codemirror/addon/hint/show-hint.js")
require( "codemirror/addon/hint/javascript-hint.js")
require( "codemirror/addon/hint/anyword-hint.js")
require("codemirror/theme/twilight.css")
require("@codemirror/view");

const TextEditor = () => {

    const text = `function foo(){
        let str1 = "hello world!";
        console.log(str1);
    }
    
    foo();
    `;

    const [isSocketOpen, setIsSocketOpen] = useState(false);
    const [value, setValue] = useState("");
    const [socket,setSocket] = useState() ;
    const codemirrorRef = useRef(null);
    const debounceTimeoutRef = useRef(null);
    const {sessionId, hostId} = useSelector((store) => store.session);
    
    const handleDebouncedCode = (value) => {

        clearTimeout(debounceTimeoutRef.current);

        debounceTimeoutRef.current = setTimeout(() => {
            if(isSocketOpen && socket && socket.readyState === WebSocket.OPEN){

                console.log(socket)
                socket.send(JSON.stringify({ type:'codeUpdate', code:value}));
            }
            else{
    
                console.log(socket)
                console.log('Websocket not opened');
            }
          },2000);  // Delay by 500ms (adjust as needed)
    }

    const handleCodeChange = (editor, data, value) => {

        setValue(value);
        handleDebouncedCode(value);        
    }
    
    const onSubmit = async() => {

        // const res = await eval(value);
        console.log(JSON.stringify(value));
        saveCodeSnippet(JSON.stringify(value), sessionId, hostId);
    }


    useEffect(() => {
    const current = codemirrorRef.current.editor.display.wrapper.style.height = "600px";
    },[]);


    useEffect(() => {

        const ws = new WebSocket('ws://localhost:5000');

        ws.onopen = () => {
          console.log('WebSocket connection opened');
          setIsSocketOpen(true); // Set socket to open
        };
    
        ws.onmessage = (message) => {
          const data = JSON.parse(message.data);
          if (data.type === 'codeUpdate') {
            setValue(data.code); // Update code when receiving a broadcast message
          }
        };
    
        ws.onclose = () => {
          console.log('WebSocket connection closed');
          setIsSocketOpen(false); // Set socket to closed
        };
    
        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
    
        // Save the WebSocket connection in state
        setSocket(ws);
    
        // Cleanup the WebSocket connection when the component unmounts
        return () => {
          if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
            ws.close();
          }
        };
    },[]);

    
    return(

        <div className='flex my-5'>
            <div className='w-11/12 p-3 border '>
                <CodeMirror 
                    value = {value}
                    ref={codemirrorRef}
                    options={{
                        
                        theme : 'twilight',
                        mode: 'javascript',
                        lineNumbers : true,
                        extraKeys: {"Ctrl-Space": "autocomplete"},
                        mode: {name: "javascript", globalVars: true},
                        
                    }}
                    
                    onBeforeChange={(editor, data, value) => {

                        setValue(value);
                    }}

                    onChange={handleCodeChange}

                />
            </div>
            
            <div className='text-center border flex flex-col p-2'>
                <button onClick={onSubmit} className='border border-gray-400 py-0.5 px-1.5 my-2 text-wrap hover:bg-gray-400'>
                    Run
                </button>
                <button onClick={() => setValue('')} className='border border-gray-400 py-0.5 px-1.5 my-2 text-wrap hover:bg-gray-400 '>
                    Clear
                </button>
            </div>
            
        </div>
    )
}

export default TextEditor;