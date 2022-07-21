import React from 'react';
import Button from '../shared-components/button';

//Styles
import {H3, P, BorderContainer} from '../../styles/components/shared-components';
import {CardPlus, CardGroup, Border} from './styles/card2';
import {CardWrap, CardCaptionWrap} from '../forward-card/styles/forwardCard';
import {NavLink} from 'react-router-dom'; 
export default function Card2() {
    return(
        <>
            <CardWrap>
                <CardPlus />
                <CardGroup />
                <Border>
                <BorderContainer>
                    <CardCaptionWrap>
                        <H3>What we do best</H3>
                        <P>
                            Our priority is to make sure you have a bespoke, smooth and easy experience using Voost. We’re committed to helping you find any type of job or employee, in any sector, no matter where you’re based. 
                        </P>
                        <NavLink to='/jobs'>
                                <Button type="primaryLarge" text="find jobs"/>
                        </NavLink> 
                    </CardCaptionWrap>
                </BorderContainer>
                </Border>
            </CardWrap>
           
        </>
    )
}