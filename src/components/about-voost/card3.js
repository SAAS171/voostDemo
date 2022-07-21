import React, {useState} from 'react';
// import Carousel from 'react-elastic-carousel';

//Styles
// import * as global from '../../styles/components/globalVariables';
import {BorderContainer,  H6} from '../../styles/components/shared-components';
import {CardWrap, TestimonialsDiv, Testimonial, ChevronLeft, ChevronRight, TestimonialsWrap} from './styles/card3';

export default function Card3({testimonials}){
    const [current, setCurrent] = useState(0);
    const [currentRight, setCurrentRight] = useState(current + 1);
    const length = testimonials.length;

    if(!Array.isArray(testimonials) || testimonials.length <= 0){
        return null
    }

    const prevTestimonial = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
        setCurrentRight(currentRight === 0 ? length - 1 : currentRight - 1)
    }

    const nextTestimonial = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
        setCurrentRight(currentRight === length - 1 ? 0 : currentRight + 1)
    }


    console.log(current, currentRight)
    return (
        <>
        <CardWrap>
            <BorderContainer>
                <TestimonialsWrap>
                    <ChevronLeft onClick={prevTestimonial}/>
                        <TestimonialsDiv>
                            
                            {testimonials.map((testimonial, index) => {
                                return(
                                    <div key={index}>
                                        {index === current && (
                                            <Testimonial>
                                                <div className="test-top">
                                                    <div>
                                                        <H6>{testimonial.name}</H6>
                                                        <p>{testimonial.job}</p>
                                                    </div>
                                                    <div className="rating">
                                                        <div className="star"/>
                                                        <div className="star"/>
                                                        <div className="star"/>
                                                        <div className="star"/>
                                                    </div>
                                                </div>
                                                <div div className="test-bottom">
                                                    <p>“{testimonial.testimonial}”</p>
                                                </div>
                                            </Testimonial>
                                        )}
                                    </div>
                                )
                            })}
                            {testimonials.map((testimonial, index) => {
                                return(
                                    <div key={index}>
                                        {index === currentRight && (
                                            <Testimonial>
                                                <div className="test-top">
                                                    <div>
                                                        <H6>{testimonial.name}</H6>
                                                        <p>{testimonial.job}</p>
                                                    </div>
                                                    <div className="rating">
                                                        <div className="star"/>
                                                        <div className="star"/>
                                                        <div className="star"/>
                                                        <div className="star"/>
                                                    </div>
                                                </div>
                                                <div div className="test-bottom">
                                                    <p>“{testimonial.testimonial}”</p>
                                                </div>
                                            </Testimonial>
                                        )}
                                    </div>
                                )
                            })}
                        </TestimonialsDiv>
                    <ChevronRight onClick={nextTestimonial}/>
                </TestimonialsWrap>
            </BorderContainer>
        </CardWrap>
        </>
    )
}