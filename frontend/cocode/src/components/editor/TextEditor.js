import { useEffect, useRef, useState } from 'react';
import { Controlled as CodeMirror} from 'react-codemirror2';
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

    const [value, setValue] = useState(text);
    const options = {}

    const codemirrorRef = useRef();

useEffect(() => {
  const current = codemirrorRef.current.editor.display.wrapper.style.height = "600px";
});

    const onSubmit = async() => {

        const res = await eval(value);
        console.log(res);
    }
    return(

        <div className='flex'>
            <div className='w-11/12 my-5 p-3'>
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

                    onChange={(editor, data, value) => {

                        setValue(value);
                    }}
                />
            </div>
            
            <div className='text-center w-1/12 border flex flex-col p-2'>
                <button onClick={onSubmit} className='border border-gray-400 py-0.5 px-1.5 hover:bg-gray-400 my-2'>
                    Run
                </button>
                <button onClick={() => setValue('')} className='border border-gray-400 py-0.5 px-1.5 hover:bg-gray-400 my-2'>
                    Clear
                </button>
            </div>
            
        </div>
    )
}

export default TextEditor;