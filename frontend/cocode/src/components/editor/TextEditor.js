import { useState } from 'react';
import { Controlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require("codemirror/addon/hint/show-hint.css") 
require( "codemirror/addon/hint/show-hint.js")
require( "codemirror/addon/hint/javascript-hint.js")
require( "codemirror/addon/hint/anyword-hint.js")
require("codemirror/theme/twilight.css")
const TextEditor = () => {

    const text = `function foo(){
        let str1 = "hello world!";
        console.log(str1);
    }
    
    foo();
    `;

    const [value, setValue] = useState(text);
    const options = {}

    

    const onSubmit = async() => {

        const res = await eval(value);
        console.log(res);
    }
    return(

        <div>
            <div>
                <CodeMirror 
                    value = {value}
                    options={{
                        
                        theme : 'twilight',
                        mode: 'javascript',
                        lineNumbers : true,
                        extraKeys: {"Ctrl-Space": "autocomplete"},
                        mode: {name: "javascript", globalVars: true}
                    }}
                    
                    onBeforeChange={(editor, data, value) => {

                        setValue(value);
                    }}

                    onChange={(editor, data, value) => {

                        setValue(value);
                    }}
                />
            </div>
            
            <button onClick={onSubmit}>
                Run
            </button>
        </div>
    )
}

export default TextEditor;