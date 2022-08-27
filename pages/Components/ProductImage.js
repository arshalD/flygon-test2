import React, { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import YouTube from "react-youtube"
import dark from '../Assets/Img/background.png'
// import "./styles.css"

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(next)
      })
    })
  }
}

export default function ProductImage(props) {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  })
  const [winWidth, setWinWidth] = useState(1000)
  useEffect(() => {
    setWinWidth(window.innerWidth)
  },[])
  const imagesArray = props.images;
  const opts = {
    height: '500',
    width: winWidth < 762? winWidth-25:(winWidth/2)-80,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const style = {
    height:'45vh'
  }
  const sliderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  const thumbnailStyle = {
    height:'15vh',
    width:'15vh',
  }
  const mobThumbnailStyle = {
    height:'10vh',
    width:'10vh',
  }
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  return (
    <>
      <div ref={sliderRef} className="keen-slider" style={style}>
        {imagesArray.map((image)=>{
          return(
            <div style={sliderStyle} key={image} className="keen-slider__slide"><img src={image}/></div>
          )
        })}
        <div style={sliderStyle} className="keen-slider__slide">
          <YouTube style ={{margin:'0'}} videoId={props.videoId} opts={opts} onReady={()=>{}} />
        </div>
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
      {imagesArray.map((image)=>{
          return(
            <div key={image} className="keen-slider__slide"><img style={winWidth<762?mobThumbnailStyle:thumbnailStyle} src={image}/></div>
          )
        })}
        <div className="keen-slider__slide">
        <img style={thumbnailStyle} src={dark.src}/>
        </div>
      </div>
    </>
  )
}
