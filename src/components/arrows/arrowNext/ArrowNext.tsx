import React, { FunctionComponent } from "react";
import "./ArrowNext.css"

type arrowNextProps ={

    disable:boolean,
    Next:()=>void
}

const ArrowNext:FunctionComponent<arrowNextProps> = ( {Next,disable}) =>{


    return <div className = "container-arrow-next" onClick={ disable ? null:Next} >
    
    <div className = "arrow-next" >

    </div>
    </div>
}

export default ArrowNext