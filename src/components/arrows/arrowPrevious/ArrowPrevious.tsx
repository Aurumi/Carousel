import React, { FunctionComponent } from "react";
import "./ArrowPrevious.css"

type arrowPreviousProps ={
    Previous:()=>void
}

const ArrowPrevious:FunctionComponent<arrowPreviousProps> = ( {Previous}) =>{
    
    return <div className = "container-arrow-previous" onClick = {Previous}>
    
    <div className = "arrow-previous">


    </div>
    </div>

}
export default ArrowPrevious