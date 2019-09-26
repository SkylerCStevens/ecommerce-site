import React, {Component} from 'react';
//Component for background home page slider
class ArrowSlider extends Component {
  //Save images to state so they can be referenced later on with .map()
    state = {
        images: [
        { url:"https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg", description:"Description Photo"},
        { url:"https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg", description:"Description Photo"},
        { url:"https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg", description:"Description Photo"},
        { url:"https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg", description:"Description Photo"},
        { url:"https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg", description:"Description Photo"},
        { url:"https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg", description:"Description Photo"},
        { url:"https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg", description:"Description Photo"},
        { url:"https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg", description:"Description Photo"},
        { url:"https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg", description:"Description Photo"},
        { url:"https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg", description:"Description Photo"}
        ],
        currentIndex: 0,
      translateValue: 0
    }

//Check the value of currentIndex and if zero return nothing(can't go back on the first image) otherwise subtract one from 
goToPrevSlide = () => {
    if(this.state.currentIndex === 0)
      return;
    
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }))
  }
goToNextSlide = () => {
// Exiting the method early if we are at the end of the images array.
//Reset currentIndex and translateValue, so to return to the first image in the array.
if(this.state.currentIndex === this.state.images.length - 1) {
    return this.setState({
    currentIndex: 0,
    translateValue: 0
    })
}
    
// This will not run if it met the "if" condition above
    this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
        translateValue: prevState.translateValue + -(this.slideWidth())
        }));
}
//Helps with transition to the next slide
slideWidth = () => {
    return document.querySelector('.slide').clientWidth
}

render() {
    return (
      <div className="arrowslider">

        <div className="arrowslider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
            {
              this.state.images.map((image, i) => (
                <Slide key={i} image={image.url} description={image.description} />
              ))
            }
        </div>

        <LeftArrow
         goToPrevSlide={this.goToPrevSlide}
        />

        <RightArrow
         goToNextSlide={this.goToNextSlide}
        />
      </div>
    );
  }
}

const Slide = ({ image, description }) => {
  const styles = {
    width: "33%",
    margin: "0 1% 0 1%",
    textAlign: "center",
    display: "inline-block"
  }
  return <div className="arrowslide">
      <img src={image} alt={description} style={styles}></img>
      <p>{description}</p>
  </div>
}
const LeftArrow = (props) => {
  return (
    <div className="backArrow arrow" onClick={props.goToPrevSlide}>
      <i className="arrow-image-left" aria-hidden="true"></i>
    </div>
  );
}
const RightArrow = (props) => {
  return (
    <div className="nextArrow arrow" onClick={props.goToNextSlide}>
      <i className="arrow-image-right" aria-hidden="true"></i>
    </div>
  );
}

export default ArrowSlider;