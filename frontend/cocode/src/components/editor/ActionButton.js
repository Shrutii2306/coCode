import { useSelector } from "react-redux";
import { TbFileDownload } from "react-icons/tb";

export const Button = ({title,icon}) => {

    return(
        <div title={title} className={`border rounded-md items-center text-sm flex border-gray-400 py-0.5 px-1.5 my-2 text-wrap hover:shadow-lg hover:bg-gray-400 hover:font-medium hover:border-gray-700 justify-center`}>
           {icon}
            <span className='mx-1 '>{title}</span>
        </div>
    )
}

export const DownloadButton = ({code}) =>{

    
    const {sessionName} = useSelector((store) => store.session);
    const download = () => {

        // create a blob with code, using mime for a pdf
        const blob = new Blob([code], {type: 'text/plain'});

        // create a download link using URL.createObjectURL
        const url = URL.createObjectURL(blob);

        // create an anchor element and trigger a download
        const link = document.createElement('a');
        link.href = url;

        // file name
        link.download = `${sessionName}.txt`;
        // append link to body
        document.body.appendChild(link);

        // programmatically trigger click
        link.click();

        // remove the link after triggering download
        document.body.removeChild(link);
        // free memory
        URL.revokeObjectURL(url);
    }
    

    return(
        <button title="Download code" className={`border rounded-md items-center text-sm flex border-gray-400 py-1 px-1.5 my-2 text-wrap hover:shadow-lg hover:bg-gray-400 hover:font-medium hover:border-gray-700 justify-center`} onClick={download}>
           <TbFileDownload />
            <span className='mx-1 text-xs '>Download</span>
        </button>
    )
}