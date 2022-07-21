import React from 'react';

//Styles
import {Div, Input, InputFile} from './styles/applyInput';


export function ResumeFullName(props) {
    const resumeFirstName =
    <Div>
        <Input {...props} type="text" name="fullName" placeholder="Full name"/>
    </Div>

    return(resumeFirstName);
}

export function ResumeEmail(props) {
    const resumeEmail =
    <Div>
        <Input {...props} type="email" name="email" placeholder="Email"/>
    </Div>

    return(resumeEmail);
}


export function ResumePhone(props) {
    const resumePhone =
    <Div>
        <Input {...props} name="resumePhone"  placeholder="Phone number"/>
    </Div>

    return(resumePhone);
}


export function ResumeWebsite(props) {
    const resumeWebsite =
    <Div>
        <Input {...props} type="url" name="resumeWebsite"  placeholder="Online portfolio link"/>
    </Div>

    return(resumeWebsite);
}


export function ResumeCV(props) {
    const resumeCV =
    <Div>
        <InputFile {...props} type="file" name="resumeCV"  placeholder="Email"/>
    </Div>

    return(resumeCV);
}