import React from 'react';

//Styles
import * as global from '../../styles/components/globalVariables';
import {Submit} from '../../styles/components/shared-components';
import {SubscribeCardWrap, SubscribeCardContainer, SubscribeCardLightning, SubscribeCardGroup, Form} from './styles/subscribeCard';
import {H2,  BorderContainer} from '../../styles/components/shared-components';
import { Email  } from '../shared-components/formInput';


export default function SubscribeCard() {
    const subscribeCard = 
        <SubscribeCardWrap>
            <SubscribeCardLightning/>
            <SubscribeCardGroup/>
            <BorderContainer>
                <H2 color={global.colorBlue}>Want a Further Boost with Voost?</H2>
                <SubscribeCardContainer>
                    <p>Sign up and be the first to gain the latest news, tips and tricks on your job video meetings, job searching and recruiting.</p>
                    <Form>
                        <Email/>
                        <Submit payload={{text: "SUBSCRIBE"}} />
                    </Form>
                </SubscribeCardContainer>
            </BorderContainer>
        </SubscribeCardWrap>

    return(subscribeCard);
};  