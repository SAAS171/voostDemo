import React from 'react';

import { InputText, InputMessage, InputMessageInt, Input, Label, Select, MeetingId, MeetingCheck, MeetingPassword, MeetingRadioVideo} from '../../styles/components/formInput';

export function FullName(props) {
    const FullName =
    <div>
        <InputText {...props} type="text" placeholder="Full Name " name="firstName" required/>
    </div>

    return(FullName);
}

export function FirstName(props) {
    const firstName =
    <div>
        <InputText {...props} type="text" placeholder="First Name " name="firstName" required/>
    </div>

    return(firstName);
}

export function LastName(props) {
    const LastName =
    <div>
        <InputText {...props} type="text" placeholder="Add your last name" name="lastName" required/>
    </div>
    return(LastName);
    
}

export function Phone(props) {
    const phone =
    <>
        <InputText {...props} type="text" placeholder="Phone number" name="phone" />
    </>
    return(phone);
    
}
export function GeneralText(props) {
    const text =
    <>
        <InputText {...props} type="text"  />
    </>
    return(text);
    
}

export function Email(props) {
    const email = 
    <div>
        <InputText {...props} type="email" placeholder="Email" name="email" required/>
    </div>
    return(email);
}

export function DesSalary(props) {
    const desSalary = 
    <>
        <InputText {...props} type="text" placeholder="Desired Salary" name="desSalary"/>
    </>
    return(desSalary);
}

export function CV(props) {
    const cv = 
    <>
        <label style={{'display': 'block', 'textAlign': 'left', 'fontWeight': '900'}} htmlFor="cv">Upload your cv</label>
        <InputText {...props} type="file" placeholder="CV:" name="cv" required style={{'marginTop': '0'}}/>
    </>
    return(cv);
}

export function JobInterest(props) {
    const jobInterest = 
    <>
        <InputText {...props} type="text" placeholder="Job interests" name="jobinterest"/>
    </>
    return(jobInterest);
}

export function Subject(props) {
    const subject = 
    <div>
        
        <InputText {...props} type="text" placeholder="Subject" name="subject"required/>
    </div>
    return(subject);
    
}

export function Message(props) {
    const message =
    <div>
        <InputMessage {...props} type="text" placeholder="Add your message" name="message" required/>
    </div> 
    return(message);
    
}


export function MessageInterview(props) {
    const messageInterview =
    <>
        <InputMessageInt {...props} type="text" placeholder="Message members..." name="messageInterview"/>
    </> 
    return(messageInterview);
    
}

export function Password(props) {
    const password = 
    <div>
        <InputText {...props} type="password" placeholder="Password" name="password" required/>
    </div>
    return(password);
}

export function CreatePassword(props) {
    const createPass =
    <div>
        <InputText {...props} type="password" placeholder="Create a password" name="createPass" required/>
    </div> 
    return(createPass);
    
}

export function ConfirmPassword(props) {
    const confirmPass = 
    <div>
        <InputText {...props} type="password" placeholder="Confirm password" name="confirmPass" required/>    
    </div>

    return(confirmPass);
    
}

export function CreateNewPassword(props) {
    const createNewPass =
    <div>
        <InputText {...props} type="password" placeholder="newPass" name="newPass" required/>
    </div> 
    return(createNewPass);
    
}
export function ResetPass(props) {
    const createNewPass =
    <div>
        <InputText {...props} type="email" placeholder="Email" name="email" required/>
    </div> 
    return(createNewPass);
    
}
export function ConfirmNewPassword(props) {
    const confirmNewPass = 
    <div>
        <InputText {...props} type="password" placeholder="Confirm new password" name="confirmNewPass" required/>    
    </div>

    return(confirmNewPass);
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////                    MEETING ROOM SETTING                     ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function EnterID(props) {
    const topic = 
    <form autoComplete="none">
        <InputText {...props} type="text" name="enterID" placeholder="Enter call ID" required/>    
    </form>
    
    return(topic);
}
export function EnterPassword(props) {
    const password = 
    <form autoComplete="none">
        <InputText {...props} type="password" placeholder="Enter Password" name="password" required/>
    </form>
    return(password);
}

export function Topic(props) {
    const topic = 
    <div>
        <InputText {...props} type="text" name="topic" required/>    
    </div>
    return(topic);
}

export function DatePicker(props) {
    const date = 
    <div>
        <Input {...props} type="date" name="date" required/>    
    </div>
    return(date);
}

export function Time(props) {
    const time = 
    <div>
        <Input {...props} type="time" name="time" required/>    
    </div>
    return(time);
}

export function TimeZone(props) {
    const topic = 
    <div>  
        <Label htmlFor="time-zone">Time zone:&nbsp; </Label>
        <Select name="time-zone" required>
            <option>UK</option>
            <option>EU</option>
        </Select>
    </div>
    return(topic);
}

export function MeetingID(props) {
    const topic = 
    <MeetingId>
        <div className="meetingId-container">
            {/* <label htmlFor="generateAutomatically" >Generate Automatically</label> */}
            <input disabled {...props} type="text" name="meetingID" id="generateAutomatically" required/>
        </div>
         {/* <form className="radio-container">
             <input {...props} type="radio" name="meetingID" id="personalInterviewid" required/>
            <span className="checked"/>
            <label for="personalInterviewid">
                Personal Interview ID 532 995 6006
            </label>
        </form>                 */}
    </MeetingId>
    return(topic);
}



export function MeetingPasswordRadio(props) {
    const topic = 
    <>
        <MeetingCheck>
            <div>
                <input {...props} type="checkbox" name="meetingID" id="requireMeetingMeeting" required/>
                <label htmlFor="requireMeetingMeeting" >
                    <span className="checked"/>
                    Require meeting password
                </label>
            </div>
        </MeetingCheck>   
    </>
    return(topic);
}


export function MeetingPasswordInput(props) {
    const topic = 
    <from>
        <MeetingPassword {...props} type="text" name="meetingPassword" required/>    
    </from>
    return(topic);
}


export function MeetingVideo(props) {
    const topic = 
    <>
    <MeetingRadioVideo {...props}>
        <from className="radio-container">
            <input type="radio" name={props.type} id={props.type + "on"} required/>
                <span className="checked"/>
                <label htmlFor={props.type + "on"} >on
            </label>
        </from>
         <from className="radio-container">
             <input type="radio" name={props.type} id={props.type + "off"} required/>
            <span className="checked"/>
            <label htmlFor={props.type + "off"}>
                off
            </label>
        </from>                   
    </MeetingRadioVideo>
    </>
    return(topic);
}