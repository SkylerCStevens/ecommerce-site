import React, {Component} from 'react';
//Component for background home page slider
class Slider extends Component {
  //Save images to state so they can be referenced later on with .map()
    state = {
        images: [
        "https://www.prsguitars.com/images/electrics/s2singlecutshphoto1.jpg",
        "http://www.fmicassets.com/Damroot/Zoom/10001/9216080060_gtr_cntbdyright_001_nr.png",
        "https://images.samash.com/sa/T41/T414CERVX-P.fpx?cvt=jpg",
        "https://www.prsguitars.com/images/electrics/se_245_2018_photo3.jpg",
        "https://www.fmicassets.com/Damroot/ZoomJpg/10001/0374090557_gtr_cntbdyright_001_nr.jpg",
        "https://www.fmicassets.com/Damroot/ZoomJpg/10001/0114312762_gtr_cntbdyright_001_nr.jpg",
        "https://www.prsguitars.com/images/electrics/se_mark_tremonti_2018_photo1.jpg"
        ],
        currentIndex: 0,
      translateValue: 0
    }

//Check the value of currentIndex and if zero return nothing(can't go back on the first image) otherwise subtract one from 
// goToPrevSlide = () => {
//     if(this.state.currentIndex === 0)
//       return;
    
//     this.setState(prevState => ({
//       currentIndex: prevState.currentIndex - 1,
//       translateValue: prevState.translateValue + this.slideWidth()
//     }))
//   }

componentDidMount() {
  this.timerID = setInterval(() => {
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
      }, 3800);
}
componentWillUnmount() {
  clearInterval(this.timerID);
}
//Helps with transition to the next slide
slideWidth = () => {
    return document.querySelector('.slide').clientWidth
}

render() {
    return (
      <div className="slider">

        <div className="slider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
            {
              this.state.images.map((image, i) => (
                <Slide key={i} image={image} />
              ))
            }
        </div>

      </div>
    );
  }
}

const Slide = ({ image }) => {
  const styles = {
    backgroundImage:`url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 60%'
  }
  return <div className="slide" style={styles}></div>
}

export default Slider;