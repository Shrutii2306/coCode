import { useEffect, useRef, useState } from 'react';
import { Controlled as CodeMirror} from 'react-codemirror2';
import { executeCode, saveCodeSnippet, useLastCheckpoint } from '../../utils/codeHistories';
import ClipLoader from 'react-spinners/ClipLoader'
import { useSelector } from "react-redux";
import { Button, DownloadButton } from './ActionButton';
import { FiPlay, FiSave } from "react-icons/fi";
import { PiTextTSlash } from "react-icons/pi";
require('./codeMirrorImports');

const TextEditor = ({sessionId}) => {

    const text = useLastCheckpoint();
    const {isLoading} = useSelector((store) => store.codeSnippet);
    const [isSocketOpen, setIsSocketOpen] = useState(false);
    const [socket,setSocket] = useState() ;
    const codemirrorRef = useRef(null);
    const debounceTimeoutRef = useRef(null);
    const { hostId, sessionStatus} = useSelector((store) => store.session);
    const [value, setValue] = useState(text);
    const [output, setOutput] = useState();

    const handleDebouncedCode = (value) => {

        clearTimeout(debounceTimeoutRef.current);

        debounceTimeoutRef.current = setTimeout(() => {
            if(isSocketOpen && socket && socket.readyState === WebSocket.OPEN){

                socket.send(JSON.stringify({ type:'codeUpdate', code:value , sessionId:sessionId}));
            }
            else{
    
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
            alert('Code saved successfully');
            window.location.reload();
        }
    }

    
    const onSubmit = async() => {

        let consoleOutput = '';
        const customConsole = {

            log: (...args) =>{
                consoleOutput += args.join('') +'\n';
            }
        };

        try{
            const run = new Function('console',value);
             run(customConsole);
            setOutput(consoleOutput || 'No output');
            // console.log("output", output);

        }catch(err){

        console.log(err);
        setOutput(`Error: ${err.message}`);
        }
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
       
          if (data.type === 'codeUpdate' && data.sessionId == sessionId) {
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

    useEffect(() => {

        const saveTimer = setInterval(async()=>{

            if(sessionStatus && value!='')
            {
                await saveCodeSnippet(JSON.stringify(value), sessionId, hostId);
            console.log('saved at', Date.now().toLocaleString());}
        }, 1000*30 );

        return () => clearInterval(saveTimer);

    })

    return(

        <div className='my-5 md:flex  sm:block'>
           
           {/* text area */}
            <div className=' p-3 border md:w-[50%] sm:w-[100%]'>

                {isLoading ? 
                    <div className=" z-10 absolute flex md:w-[45%] sm:w-[100%] h-[600px]">
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
                            readOnly:sessionStatus? false:'nocursor'

                        }}
                        
                         onBeforeChange={(editor, data, value) => {

                                setValue(value);
                            }}

                        onChange={handleCodeChange}
                    />
                </div>
            </div>
            
            {/* buttons */}
            <div className='text-center border flex md:flex-col p-2 border-l-0sm:justify-evenly md:justify-normal'>
                <button onClick={onSave} >
                    <Button title='Save' icon={< FiSave />} color='green'/>
                </button>
                <button onClick={onSubmit} >
                    <Button title='Run' icon={< FiPlay />} color='blue' />
                </button>
                <button onClick={() => setValue('')} >
                    <Button title='Clear' icon={< PiTextTSlash />} color='red' />
                </button>
                <DownloadButton code={value}/>
            </div>

            {/* output */}
            <div className='border border-l-0 flex md:w-[40%] sm:w-[100%] p-3 '>
                
                    <div className='w-[100%] bg-[#494949] rounded-lg p-3 text-wrap text-white' >
                        <span className='font-semibold text-lg text-gray-200'>Output:</span><br/>
                        {output}
                    </div>                
            </div>
        </div>
    )
}

export default TextEditor;