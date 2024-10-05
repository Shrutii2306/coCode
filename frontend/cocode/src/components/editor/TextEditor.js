import { useEffect, useRef, useState } from 'react';
import { Controlled as CodeMirror} from 'react-codemirror2';
import { saveCodeSnippet, useLastCheckpoint } from '../../utils/codeHistories';
import ClipLoader from 'react-spinners/ClipLoader'
import { useSelector } from "react-redux";
require('./codeMirrorImports');

const TextEditor = () => {

    const text = useLastCheckpoint();
    const {isLoading} = useSelector((store) => store.codeSnippet);
    const [isSocketOpen, setIsSocketOpen] = useState(false);
    const [socket,setSocket] = useState() ;
    const codemirrorRef = useRef(null);
    const debounceTimeoutRef = useRef(null);
    const {sessionId, hostId} = useSelector((store) => store.session);
    const [value, setValue] = useState(text);

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
    
    const onSave = async() => {

        const saved =await saveCodeSnippet(JSON.stringify(value), sessionId, hostId);
        if(saved){
            window.location.reload();
        }
    }

    const onSubmit = async() => {

        console.log(JSON.stringify(value), sessionId, hostId);
        
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

    useEffect(()=>{
        
        setValue(text);
    },[text])

    return(

        <div className='flex my-5'>
           
            <div className='w-11/12 p-3 border  '>

                {isLoading ? 
                    <div className=" w-9/12  h-[600px] z-10 absolute flex">
                        <div className='m-auto'>
                            <ClipLoader
                                color="red"
                                size = {40}
                            />
                        </div>
                           
                </div>: null}
                
                <div className='rounded-lg overflow-hidden'>
                    <CodeMirror 
                        value = {value}
                        ref={codemirrorRef}
                        options={{
                                
                            theme : 'gruvbox-dark',
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
            </div>
            
            <div className='text-center border flex flex-col p-2'>
                <button onClick={onSave} className='border border-gray-400 py-0.5 px-1.5 my-2 text-wrap hover:bg-gray-400'>
                        Save
                    </button>
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