import React, { FunctionComponent }  from 'react';
import "./Dots.css";

type dotsProps ={
    
    valueDots:any[],
    setTransitionStep:(index:number)=>void,
    transitionStep:number,
    setAnimationStep:(animation:boolean)=>void,
    circleTransition:number

    

}

const Dots:FunctionComponent<dotsProps> = ({valueDots,setTransitionStep,transitionStep,setAnimationStep,circleTransition} ) =>{


const click = ( index:number ) =>{

   

    setTransitionStep( index * -100 ) 
    setAnimationStep(false)
          
}

    return <div className = "container-dots">   

        <div className = "dots" >

            {valueDots.map((dot, index)=>{

                return <div key = {index} onClick = {() =>{click( index )}} 

                        className = { index * -100 === transitionStep  ? "dotHover" : "dot"}

                        style = {{transform:`translateX(${circleTransition}px)`}}>

                        </div>
            })}
        </div>
    </div>
}

export default Dots;
