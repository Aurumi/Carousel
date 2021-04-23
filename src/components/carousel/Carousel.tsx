import React, {FunctionComponent, TouchEvent, useState } from "react";
import ArrowNext from "../arrows/arrowNext/ArrowNext";
import ArrowPrevious from "../arrows/arrowPrevious/ArrowPrevious";
import Dots from "../dots/Dots";
import "./Carousel.css"
import {data} from "../../data"





let Carousel:FunctionComponent = () =>{

  
 
  const [slidsArray, setSlidsArrays] = useState(data)
  
  const [circleTransition, setCircleTransition] = useState <number> (0)

  const [transitionStep , setTransitionStep] = useState <number> (0)

  const [animationStep , setAnimationStep] = useState <boolean> (false)

  const [disable, setDisable] = useState <boolean> (false)

  const lastIndexSlide :number = (slidsArray.length-1)*(-100)

  const [index, setIndex] = useState <number> (3)

  const [indexLeft, setIndexLeft] = useState <number> (0)

  let touchStart:number = 0;

  let touchEnd:number = 0;

  

  
  const delay = ( ms:number ) => new Promise(resolve => setTimeout( resolve, ms))

  
  const Next = ():void => {
   
    
    if (transitionStep  === lastIndexSlide) {
      
      
      setDisable(true)

      let cloneSlide:any[] = [...slidsArray];
      
      let fistSlide:any[] = cloneSlide[0]
      
        
      setSlidsArrays([...slidsArray,fistSlide]);
      
     
     
      
    
     delay(100).then(()=>{ 

      setTransitionStep(transitionStep -100)
     

     }).then(()=>{

      delay(1400).then(()=>{

      setAnimationStep( true )

      setTransitionStep(0)

      setSlidsArrays([...slidsArray])
      
      setDisable( false )
      
     })

    })
    
    }

    else setTransitionStep ( transitionStep - 100 )
    
    setAnimationStep( false ) 

   
    if( transitionStep === index * - 100 ){ 

     setCircleTransition( circleTransition - 20 )

     setIndex( index + 1 )

     setIndexLeft( indexLeft + 1 )
    }
      
    if( transitionStep === lastIndexSlide ){

      setCircleTransition( 0 )

      setIndex( 3 )

      setIndexLeft( 0 )

    }

  }

  const Previous = ():void => {

    transitionStep  === 0 ? setTransitionStep ( 0 ) : setTransitionStep ( transitionStep  + 100 )

    if( transitionStep === 0 ) {

      setCircleTransition ( 0 )

    }

    if( transitionStep === indexLeft * -100 && transitionStep !==0){

      setCircleTransition( circleTransition + 20 )

      setIndexLeft( indexLeft - 1 )

      setIndex( index - 1 )
      

    }

  }
  const swipeMove = ( event:TouchEvent ):void =>{
    
    touchEnd = event.touches[0].clientX
    
  }
  const startSwipe = ( event:TouchEvent ):void =>{

    touchStart = event.touches[0].clientX
   

   
  }
  const endSwipe = ():void =>{

     touchStart < touchEnd  ? Previous() : Next()

  }

 
  return <div className = "carousel"  >

    {slidsArray.map(( item,index)=>{

      return <div  key = {index} onTouchEnd = {disable ? null:endSwipe} onTouchStart = {startSwipe} onTouchMove = {swipeMove}  className = { animationStep ? "carousel__slide__noTransition" : "carousel__slide"} style = {{transform:`translateX(${transitionStep}%)` } } >
             
             <img src = {item}/>
             
             
             </div>
       })}

       <ArrowNext Next = {Next} disable = {disable}  />

       <ArrowPrevious Previous = {Previous}/>
       
       <Dots valueDots = {slidsArray} setTransitionStep = {setTransitionStep}  transitionStep = {transitionStep}  setAnimationStep = {setAnimationStep}  circleTransition = {circleTransition} />
       
    </div>
}

export default Carousel;