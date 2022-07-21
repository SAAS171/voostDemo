import React from 'react';
import FeaturesCard from './featuresCard';

//SVG's
import features1 from '../../assets/icons/features-1.svg';
import features2 from '../../assets/icons/features-2.svg';
import features3 from '../../assets/icons/features-3.svg';
import features4 from '../../assets/icons/features-4.svg';
import features5 from '../../assets/icons/features-5.svg';
import features6 from '../../assets/icons/features-6.svg';

//Styles
import {FeaturedItem, FeatWrap, FeatContainer} from './styles/features';
import {BorderContainer, H2} from '../../styles/components/shared-components';
import featuresbg from '../../assets/features.jpg';

export default function Features() {
    const features = 
        <FeatWrap background={featuresbg} >
            <BorderContainer>
                <H2 color="white">The Features of Voost</H2>
                <FeatContainer className='container-fluid'>
                    <div className="row">
                        <FeaturedItem className ="col-xs-12 col-sm-6 col-md-4" >
                            <FeaturesCard icon={features1} title="Video interview like never before" description="82.4% of candidates are satisfied with video interviews as a method of hiring."  />
                        </FeaturedItem>
                        <FeaturedItem className ="col-xs-12 col-sm-6 col-md-4" >
                            <FeaturesCard icon={features2}   title="Easy Filtering" description="Filtering is essential as 90% of job seekers use their mobile devices to look for their dream job." />
                        </FeaturedItem>
                        <FeaturedItem className ="col-xs-12 col-sm-6 col-md-4" >
                            <FeaturesCard icon={features3} title="Smart scheduling" description="Scheduling and conducting online interviews can accelerate the hiring process. Video interviews help recruiters improve their efficiency to identify the most qualified candidates faster." />
                        </FeaturedItem>
                        <FeaturedItem className ="col-xs-12 col-sm-6 col-md-4" >
                            <FeaturesCard icon={features4} title="Document Repository" description=" Showcasing your online portfolios live during interview can boost your chances of being hired, with 87% of recruiters using LinkedIn to learn more about their candidates." />
                        </FeaturedItem>
                        <FeaturedItem className ="col-xs-12 col-sm-6 col-md-4" >
                            <FeaturesCard icon={features5} title="Low Fees, No Hidden Costs " description="Advertise for the most premium candidates suitable for your business at a low, competitive rate."/>
                        </FeaturedItem>
                        <FeaturedItem className ="col-xs-12 col-sm-6 col-md-4">
                            <FeaturesCard icon={features6}   title="Free job board that saves time" description="56% of recruiters said they can't hire the right people due to lengthy recruitment processes. Voost ensures the quickest and most transparent process on the market."/>
                        </FeaturedItem>
                    
                    </div>
                    
                </FeatContainer>

            </BorderContainer>
        </FeatWrap>
    return features
};