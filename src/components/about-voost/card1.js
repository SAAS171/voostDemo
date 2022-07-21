import React from 'react';

//Styles
import {H3, P, BorderContainer} from '../../styles/components/shared-components';
import {CardEllipse, CardLightning, Border} from './styles/card1';
import {CardWrap, CardCaptionWrap} from '../forward-card/styles/forwardCard';

export default function Card1() {
    return (
        <>
            <CardWrap>
                <CardEllipse />
                <CardLightning />
                <Border>
                <BorderContainer>
                    <CardCaptionWrap>
                        <H3>Working life has changed</H3>
                        <P>
                            Voost is here as the future of recruitment and working collaborations. 
                            <br />
                            Say goodbye to the applying and hiring process of the past and take control of your next career or business’s recruitment efficiently and safely, online - all in one application. 
                        </P>
                    </CardCaptionWrap>
                </BorderContainer>
                </Border>
            </CardWrap>
        </>
    )
}