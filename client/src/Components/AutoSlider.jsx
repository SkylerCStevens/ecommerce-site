import React, { Component } from "react"; //Import React
import Slide from "./Slide"; //Import Slide Component

//Automaticly transitioning slider
class Slider extends Component {
  //Save images to state so they can be referenced later on with .map()
  state = {
    images: [
      "https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg", //PRS Singlecut
      "http://www.fmicassets.com/Damroot/Zoom/10001/9216080060_gtr_cntbdyright_001_nr.png", //Fender GOT strat
      "https://images.samash.com/sa/T41/T414CERVX-P.fpx?cvt=jpg", //Taylor Acoustic
      "https://www.prsguitars.com/images/electrics/se_245_2018_photo3.jpg", //PRS SE 245
      "https://www.fmicassets.com/Damroot/ZoomJpg/10001/0374090557_gtr_cntbdyright_001_nr.jpg", //Squier Jaguar
      "https://www.fmicassets.com/Damroot/ZoomJpg/10001/0114312762_gtr_cntbdyright_001_nr.jpg", //Fender Thinline Tele
      "https://www.prsguitars.com/images/electrics/se_mark_tremonti_2018_photo1.jpg", //PRS SE Tremonti
      "https://www.projectmusic.net/ekmps/shops/projectmusic/images/prs-mccarty-594-wood-library-black-gold-burst-exposed-binding-matching-flame-neck-[2]-19236-p.jpg" //PRS McCarty
    ],
    currentIndex: 0,
    translateValue: 0
  };

  componentDidMount() {
    //Put this function on setInterval() so it automatically changes slides every 3.8 sec after the component is mounted
    this.timerID = setInterval(() => {
      // Exiting the method early if we are at the end of the images array.
      //Reset currentIndex and translateValue, so to return to the first image in the array.
      if (this.state.currentIndex === this.state.images.length - 1) {
        return this.setState({
          currentIndex: 0,
          translateValue: 0
        });
      }

      // This will not run if it met the "if" condition above, increases index currentIndex and sets the translateValue
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
        translateValue: prevState.translateValue + -this.slideWidth()
      }));
    }, 3800);
  }

  //Clears the interval on unmount
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  //Helps with transition to the next slide with correct width
  slideWidth = () => {
    return document.querySelector(".slide").clientWidth;
  };

  render() {
    return (
      <div className="slider">
        {/* Wrapper for defining the correct transition from one picture to the next */}
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: "transform ease-out 0.45s"
          }}
        >
          {/* Map over the images in the state and send the info into the slide component */}
          {this.state.images.map((image, i) => (
            <Slide key={i} image={image} />
          ))}
        </div>
      </div>
    );
  }
}

//Export the component for use in other components
export default Slider;
