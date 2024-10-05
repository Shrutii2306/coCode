import { ShimmerTitle } from "react-shimmer-effects";

export const ShimmerTitleUI = ({height, width,marginTop, variant}) => {

    return (

        <div style={{width, marginTop}} className=" mx-3">
            <ShimmerTitle line={1} variant={variant?'secondary':'primary'} />        
        </div>
    )
}

