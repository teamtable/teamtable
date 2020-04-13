import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../../lib/styles/alice-carousel.css";


const Wrapper = styled.div`

`;

const WrapperInner = styled.div`
  width: 100%;
  height: 100%;

`;

const SlideWrap = styled.div`
`;//   padding-left: 18px;
//   padding-right: 18px;

/*
  width: ${(props) => props.width};
  height: ${(props) => props.height};
 */


class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lightBoxOpened: false,
      lightBoxSlide: 0,
    };
  }


  render() {
    const handleOnDragStart = e => e.preventDefault();

    return (
      <Wrapper compensateDotPadding={this.props.compensateDotPadding}>
        <WrapperInner>
          <AliceCarousel
            buttonsDisabled
            infinite
            ref={el => (this.Carousel = el)}

            responsive={{
              0: {
                items: 1,
              },
              1024: {
                items: 1,
              },
            }}
            alt="Webapp walkthrough"
          >
            {this.props.slides.map((slide, index) => (
              <SlideWrap
                key={`slide-${slide.url}`}
                onDragStart={handleOnDragStart}
                height={slide.height}
                width={slide.width}
              >
                <div>
                  <img
                    style={{
                      position: "relative !important",
                      bottom: "0",
                      height: slide.height,
                      width: slide.width,
                      maxWidth: "100%",
                    }}
                    src={process.env.PUBLIC_URL + slide.url}
                    alt={slide.alt}
                    title={slide.title}
                  />
                </div>
              </SlideWrap>
            ))}
          </AliceCarousel>
        </WrapperInner>
      </Wrapper>
    );
  }
}


/** ** HOW TO USE:

1. define setting objects for each carousel element:

        let slide_1 = {
            width:"100",
            height:"200",
            url:'/images/abound-hero.jpg',
        };

        let slide_2 = {
            width:"250",
            height:"200",
            url:'/images/abound-hero.jpg',
        };

        let slide_3 = {
            width:"500",
            height:"200",
            url:'/images/abound-hero.jpg',
        };

2. create array and pass it via props to this component:

        <Carousel slides={[slide_1, slide_2, slide_3]}/>
**** */

Carousel.propTypes = {
  slides: PropTypes.array.isRequired,
  compensateDotPadding: PropTypes.bool,
};


export default Carousel;


/*
toggleLightBox(index){
    if(!this.state.lightBoxOpened){
        this.Carousel.slideTo(this.props.lightBoxSlide);
    }
    this.setState({lightBoxOpened: !this.state.lightBoxOpened, lightBoxSlide: index })
 }
 */


/*
                        stagePadding={{
                            paddingLeft: stagePadding,     // 150 in pixels
                            paddingRight: stagePadding
                    }}
 */

/*
<ImageWrap width={GetResponsiveSizes(slide.height,slide.width).width} height={GetResponsiveSizes(slide.height,slide.width).height}>
                                    <Image imgUrl={process.env.PUBLIC_URL + slide.url}>
                                    </Image >
                                </ImageWrap>
 */
