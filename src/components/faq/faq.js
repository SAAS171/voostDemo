import React from 'react';
import ButtonXL from '../shared-components/buttonXL';

//BOOTSTRAP
import Accordion from 'react-bootstrap/Accordion';
import { BsChevronDown } from "react-icons/bs";

// STYLES
import * as global from '../../styles/components/globalVariables';
import {FaqWrap, FaqContainer, QCont, QItem, QAns, SpanQ, QQu} from './styles/faq';
import {H2, P, BorderContainer} from '../../styles/components/shared-components';




export default function Faq() {
   
    const faq = 
        <FaqWrap>
            <BorderContainer>
                <FaqContainer>
                    <H2 color={global.colorBlue}>FAQ'S</H2>
                    <QCont>
                        <Accordion>

                            {/* QUESTION ONE */}
                            <QItem>
                                <QQu>How do I register with Voost? <SpanQ><Accordion.Toggle as={BsChevronDown} variant="link" eventKey="0" /></SpanQ></QQu>

                                <QAns>
                                    <Accordion.Collapse eventKey="0">
                                        <P>Registering with Voost has never been easier. The process is simple and quick; just tell us your name, how to contact you and what you’re looking for.

                                        Register with us today and start your job search right here </P>
                                    </Accordion.Collapse>
                                </QAns>
                            </QItem>

                            {/* QUESTION TWO */}
                            <QItem>
                                <QQu>I am not living in the UK, will Voost still let me register my CV? <SpanQ><Accordion.Toggle as={BsChevronDown} variant="link" eventKey="1" /></SpanQ></QQu>
                                
                                <QAns>
                                    <Accordion.Collapse eventKey="1">
                                        <P>Good news! Voost accepts all sign ups from the UK, the EU and the EEA region. </P>
                                    </Accordion.Collapse>
                                </QAns>
                            </QItem>

                            {/* QUESTION THREE */}
                            <QItem>
                                <QQu>Which files do Voost accept? <SpanQ><Accordion.Toggle as={BsChevronDown} variant="link" eventKey="2" /></SpanQ></QQu>
                                
                                <QAns>
                                    <Accordion.Collapse eventKey="2">
                                        <P>Voost will accept all of the following files:<br/>

                                                .doc<br/>

                                                .docx<br/>

                                                .rtf<br/>

                                                .txt<br/>

                                                .pdf<br/>

                                                .wps<br/>

                                                .odt<br/>
                                                <br/>
                                            Please note: We do not accept photos of CVs, so make sure it’s in one of the formats above</P>
                                    </Accordion.Collapse>
                                </QAns>
                            </QItem>

                            {/* QUESTION FOUR */}
                            <QItem>
                                <QQu>How do I search for jobs on Voost?<SpanQ><Accordion.Toggle as={BsChevronDown} variant="link" eventKey="3" /></SpanQ></QQu>
                                
                                <QAns>
                                    <Accordion.Collapse eventKey="3">
                                        <P>It’s so simple. From the homepage, select ‘find a job’ and you’ll be greeted with the ‘Jobs’ section where you can view and filter down thousands of jobs to match your job type and location. </P>
                                    </Accordion.Collapse>
                                </QAns>
                            </QItem>

                            {/* MORE QUESTIONS  */}
                            <Accordion.Collapse eventKey="6">
                                <div>
                                    <Accordion>  
                                        {/* QUESTION FIVE */}
                                        <QItem>
                                            <QQu>How do you track a job application? <SpanQ><Accordion.Toggle as={BsChevronDown} variant="link" eventKey="4" /></SpanQ></QQu>
                                            
                                            <QAns>
                                                <Accordion.Collapse eventKey="4">
                                                    <P>The applicant will receive an automated email from Voost with your application confirmation. From there,

                                                        If you remain unsure about whether or not your application was received, be sure to contact the recruiter directly to check they have received your application</P>
                                                </Accordion.Collapse>
                                            </QAns>
                                        </QItem>

                                        {/* QUESTION SIX */}
                                        <QItem>
                                            <QQu>I can’t remember my password, what should I do?<SpanQ><Accordion.Toggle as={BsChevronDown} variant="link" eventKey="5" /></SpanQ></QQu>
                                            
                                            <QAns>
                                                <Accordion.Collapse eventKey="5">
                                                    <P>You’re able to reset your password here. </P>
                                                </Accordion.Collapse>
                                            </QAns>
                                        </QItem>
                                        {/* QUESTION SEVEN */}
                                        <QItem>
                                            <QQu>How do I apply for a job?<SpanQ><Accordion.Toggle as={BsChevronDown} variant="link" eventKey="7" /></SpanQ></QQu>
                                            
                                            <QAns>
                                                <Accordion.Collapse eventKey="7">
                                                    <P>Simply find a job that meets your fancy, fill in your details such as full name, email, phone number, CV upload and one of our lovely team members will be in touch in due course</P>
                                                </Accordion.Collapse>
                                            </QAns>
                                        </QItem>
                                    </Accordion>
                                </div>
                            </Accordion.Collapse>

                            <Accordion.Toggle variant="link" eventKey="6" className="more-faqs">
                                <ButtonXL color="transparent" text="READ MORE FAQ'S"/>
                            </Accordion.Toggle>

                        </Accordion>
                    </QCont>                    
                </FaqContainer>
            </BorderContainer>
        </FaqWrap>
    return(faq)
};