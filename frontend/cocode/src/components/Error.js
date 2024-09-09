import { useRouteError } from "react-router-dom";
const Error = () => {

    const error = useRouteError();
    console.log(error);
    
    return(
        <div>
            <h1>Error!!!</h1>
            <h3>Something went wrong!!!</h3>
        </div>
    )
}

export default Error;