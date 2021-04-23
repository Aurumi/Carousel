import React, {useState } from "react";
// import picture from "./../../img/picture.jpg"
// import light from "./../../img/light.jpg"
// import car from "./../../img/car.jpg"
// import bridge from "../../img/bridge.jpg"
// import glass from "../../img/glass.jpg"
import ArrowNext from "../arrows/arrowNext/ArrowNext";
import ArrowPrevious from "../arrows/arrowPrevious/ArrowPrevious";
import Dots from "../dots/Dots";
import "./Carousel.css"
// import { data } from "../../data";
import {data} from "../../data"





let Carousel = () =>{

  
 
  const [slidsArray, setSlidsArrays] = useState(data)
  
  const [circleTransition, setCircleTransition] = useState(0)

  const [transitionStep , setTransitionStep] = useState(0)

  const [animationStep , setAnimationStep] = useState(false)

  const [disable, setDisable] = useState(false)

  const lastIndexSlide = (slidsArray.length-1)*(-100)

  const [index, setIndex] = useState(3)

  const [indexLeft, setIndexLeft] =useState(0)

  let touchStart = 0;

  let touchEnd = 0;

  
  const delay = ( ms ) => new Promise(resolve => setTimeout( resolve, ms))

  
  const Next = () => {
   
    if (transitionStep  === lastIndexSlide) {
      
      
      setDisable(true)

      let cloneSlide = [...slidsArray];
      
      let fistSlide = cloneSlide[0]
      
        
      setSlidsArrays([...slidsArray,fistSlide]);
      
      
    
     delay(200).then(()=>{ 

      setTransitionStep(transitionStep -100)
     

     }).then(()=>{

      delay(900).then(()=>{

      
      setAnimationStep( true )
      setTransitionStep(0)
      setSlidsArrays([...slidsArray,])
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

  const Previous = () => {

    transitionStep  === 0 

    ? setTransitionStep ( 0 ) 

    : setTransitionStep ( transitionStep  + 100 )

    if( transitionStep === 0 ) {

      circleTransition(0)

    }

    if( transitionStep === indexLeft * -100 ){

      setCircleTransition( circleTransition + 20 )

      setIndexLeft( indexLeft - 1 )

      setIndex( index - 1 )
      

    }

  }
  const swipeMove = ( event ) =>{
    
    touchEnd = event.touches[0].clientX
    
  }
  const startSwipe = ( event ) =>{

    touchStart = event.touches[0].clientX
   

   
  }
  const endSwipe = () =>{

     touchStart < touchEnd  ? Previous() : Next()

  }

 
  return <div className = "carousel"  >

    {slidsArray.map(( item,index)=>{

      return <div  key = {index} onTouchEnd = {disable ? null:endSwipe} onTouchStart = {startSwipe} onTouchMove = {swipeMove}  className = { animationStep ? "carousel__slide__noTransition" : "carousel__slide"} style = {{transform:`translateX(${transitionStep}%)` } } >
             
             <img src = {item}/>
             
             
             </div>
       })}

       <ArrowNext Next = {Next} disable = {disable} setDisable = {setDisable} />

       <ArrowPrevious Previous = {Previous}/>
       
       <Dots valueDots = {slidsArray} setTransitionStep = {setTransitionStep}  transitionStep = {transitionStep}  setAnimationStep = {setAnimationStep}  circleTransition = {circleTransition} />
       
    </div>
}

export default Carousel;