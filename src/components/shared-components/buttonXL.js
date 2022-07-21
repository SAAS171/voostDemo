import React from 'react';

//Styles
import {ButtonStyleXL} from '../../styles/components/shared-components';

/*
Button Props
Color: Pass in one of the variables from Global variables.. 

Text: (Anything)
*/

export default function ButtonXL(props) {
    const buttonXL =
        <ButtonStyleXL {...props} color={props.color}>{props.text}</ButtonStyleXL>
    return(buttonXL);
}