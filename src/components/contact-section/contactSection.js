import React, {useState} from 'react';
import { Submit } from '../../styles/components/shared-components';

//Styles
import * as global from '../../styles/components/globalVariables';
import {ContactPageWrap, PageFlex, ContactPageInfo, ContactPageForm,  SocDiv, FormDiv, ContactEllipse, ContactPlus, ContactLightning} from './styles/contactSection';
import {FullName, Email, Subject, Message} from '../shared-components/formInput';
import {H4, H3, P, BorderContainer, SocI} from '../../styles/components/shared-components';
import Notiflix from 'notiflix'; 
import {Link} from 'react-router-dom';

export default function ContactSection() {
    const [fullName, setFullName] = useState('');
    const[email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const form = (e) => {
        switch (e.target.getAttribute('name')){
            case 'firstName':
                setFullName(e.target.value);
                break
            case 'email':
                setEmail(e.target.value);
                break
            case 'subject':
                setSubject(e.target.value);
                break
            case 'message':
                setMessage(e.target.value);
                break
            default:
                break
        }
    }
    
    function sendForm(){
        if(!email){
            Notiflix.Report.Failure(
                'Incomplete form', 
                'Enter your email address', 
                'close'
            );
        }
        else if (!fullName){
            Notiflix.Report.Failure(
                'Incomplete form', 
                'Enter tell us your name', 
                'close'
            );
        }else if(!message){
            Notiflix.Report.Failure(
                'Incomplete form', 
                'Please enter a message to continue', 
                'close'
            );
        }
        else {
            Notiflix.Loading.Standard();

            var api_key = process.env.REACT_APP_MAILGUN_KEY;
          
            if(api_key){
                const domain = "mailer.opopmedia.co.uk";
                const host = 'api.eu.mailgun.net'; 
                const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain, host});

                var data = {
                    from: email,
                    to: '<caleb@opopmedia.co.uk>',
                    subject: fullName + ": " + subject,
                    text: message
                };
                
                mailgun.messages().send(data, function (error, body) {
                    if(error){
                        Notiflix.Loading.Remove();
                        console.log(error);
                        Notiflix.Report.Failure(
                            'Something went wrong', 
                            'Please try again later', 
                            'close'
                        );
                    }else {
                    Notiflix.Loading.Remove();
                    Notiflix.Report.Success(
                        'Message sent', 
                        'Our support team will be in touch shortly', 
                        'close', 
                        function(){
                            setFullName(''); 
                            setEmail('');
                            setSubject(''); 
                            setMessage('');
                        }
                    );
                    }
                    console.log(JSON.stringify(body) + "test..." );
                })
            }
            
        }
        
        

    }

    const contactSection = 
        <ContactPageWrap>
            <ContactEllipse/>
            <ContactPlus />
            <ContactLightning />

            <BorderContainer>
                <PageFlex>
                    <ContactPageInfo>
                            <H3>We’re here to help!</H3>
                            <P>Reach out to us with any questions you may have using our contact form.</P>
                            <H4 color={`${global.colorBlue}`}>Social Media</H4>
                            <SocDiv>
                                <SocI color="green" className="fab fa-twitter"></SocI>
                                <Link to="https://www.facebook.com/Voost-Jobs-358460721865361">
                                    <SocI className="fab fa-facebook-f"></SocI>
                                </Link>
                                <Link to="https://www.linkedin.com/company/voost-jobs">
                                    <SocI className="fab fa-linkedin-in"></SocI>
                                </Link>
                                {/* <SocI color="green" className="fab fa-youtube"></SocI> */}
                            </SocDiv>
                        </ContactPageInfo>

                        <ContactPageForm>
                            <FormDiv>
                                <FullName onChange={(e) => form(e)}/>
                                <Email text="Email" onChange={(e) => form(e)}/>
                                <Subject onChange={(e) => form(e)}/>
                                <Message  onChange={(e) => form(e)} required/>
                                <div>
                                    <Submit payload={{'text': "SEND YOUR MESSAGE"}} onClick={sendForm}/>
                                </div>
                            </FormDiv>
                    </ContactPageForm>
                </PageFlex>
            </BorderContainer>
        </ContactPageWrap>
    return(contactSection)
};