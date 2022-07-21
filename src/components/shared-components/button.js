import React from 'react';
import {ButtonStyle} from '../../styles/components/shared-components';

/*
Button Props
Type: PrimaryLarge, PrimarySmall
If nothing is put the Button will be small and transparent.

Text: (Can be anything, as it is text to display on the button)
*/

export default function Button(props) {
    return (
        <>
            <ButtonStyle {...props} type={props.type}>{props.text}</ButtonStyle>
        </>
    )
}