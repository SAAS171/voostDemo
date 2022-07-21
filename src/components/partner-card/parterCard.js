import React, {useState, useEffect} from 'react';

//Styles
import * as global from '../../styles/components/globalVariables';
import {PartnerImage, PartnerCardWrap, PartnerCardContainer, Card} from './styles/partnerCard';
import {H2, BorderContainer} from '../../styles/components/shared-components';

import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';


export default function PartnerCard() {
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState([]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

      function importAll(r) {
        
        return r.keys().map(r);

      }
      
      const getImages = importAll(require.context('../../assets/voost-logos', false, /\.(png|jpe?g|svg)$/));
      useEffect(() => {
        //   console.log(getImages);
          setImages(getImages); 
      }, [])
    const partnerCard =
        <PartnerCardWrap>
                <H2 color={global.colorBlue}>Who Voost Works With</H2>
                <PartnerCardContainer>
                    
                <Carousel slidesPerPage={4}
                    slidesPerScroll={1}
                    infinite
                    clickToChange
                    centered
                    autoPlay={3000}
                    >
                    {
                       images && (
                           images.map((image, i) => {
                               return (
                                <div key ={i}>
                                    <PartnerImage  
                                    src={image}
                                    alt="First slide"
                                    />
                                </div>
                               )
                           })
                       ) 
                    } 
                </Carousel>    
                    
                </PartnerCardContainer>
                
        </PartnerCardWrap>
    return(partnerCard);
};