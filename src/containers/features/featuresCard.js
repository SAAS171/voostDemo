import React from 'react'; 
import {Card, Img, CardTitle, CardText} from './styles/featuresCard';

export default function FeaturesCard(props) {
    const featuresCard = 
        <Card>
            <Img src={props.icon}></Img>
            <CardTitle>{props.title}</CardTitle>
            <CardText>{props.description}</CardText>
        </Card>

    return(featuresCard)
}