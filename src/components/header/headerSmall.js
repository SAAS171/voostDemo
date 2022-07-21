import React from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';
import {HeaderWrap, SpanGt} from '../../styles/components/headerSmall';
import {H5, P, BorderContainer} from '../../styles/components/shared-components';

export default function headerSmall(props) {
    const header = 
        <HeaderWrap bg={props.bg}>
            <BorderContainer>
                <P>Home<SpanGt>&gt;</SpanGt>{props.text}</P>
                <H5>{props.text}</H5>
            </BorderContainer>
        </HeaderWrap>
    return(header)
} 