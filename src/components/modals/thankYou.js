import React from 'react';

import{Thankyou_wrap, Thankyou_container, Thankyou_header, Thankyou_body, Thankyou_button} from './styles/thankYou';
import {H4} from '../../styles/components/shared-components';

export default function ThankYou(props){
    // if (!open) return null
    return(
        <>
            <Thankyou_wrap>
                <Thankyou_container>
                    <Thankyou_header>
                        <Thankyou_button /> 
                        <H4 color={`${global.colorBlue}`}>Thank you for your application</H4>
                    </Thankyou_header>
                    <Thankyou_body>
                        <p>Our specialist team will be in touch with you shortly, in the mean time have be sure to look at more similar jobs</p>
                    </Thankyou_body>
                </Thankyou_container>
            </Thankyou_wrap>
        </>
    )
}