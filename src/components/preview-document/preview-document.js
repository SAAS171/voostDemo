import React, {useState, useEffect} from 'react'; 
import {useSelector, useDispatch} from 'react-redux'; 
import {useHistory} from 'react-router-dom';  

import {getApplicant} from '../../store/actions/actions';  
import styled from 'styled-components';   
import Button from '../shared-components/button'; 
import document from "../../assets/svg/document.svg";

import Notiflix from 'notiflix'; 
import CvPreview from "../applicant-preview/cv-preview";
    

const PreviewDocumentContainer = styled.div` 

    max-width: 800px;
    width: 100%;
    padding: 100px 0 ;
    margin: 0 auto; 
    border-radius: 8px;
    text-align: left;  
    box-shadow: 0 0 20px -7px rgba(0,0,0,0.5); 
    padding: 30px;
    max-height: 900px;
    overflow: scroll;
    background-color: white;

    
    > div.offerLetter-document{
        position: relative;
        .companyAddress{
            position: absolute;
            right: 15px;
            top: 15px;
            text-align: right;
            p{
                margin-bottom: 0;
                line-height: 1.4;
            }
            li{
                margin-bottom: 0;
                line-height: 1.4
            }
        }
        .employeeAddress{
            text-align: left;
            p{
                margin-bottom: 0;
            }
            li{
                margin-bottom: 0;
                line-height: 1.4
            }
        }
        .lrg-margin{
            margin: 25px 0;
        }
        .lrg-top-margin{
            margin: 25px 0 0;
        }

        h3{
            padding-top: 50px;
        }
    }
    
    > div.contract-document{
        background-color: white;
        margin: 0 auto;  
        width: 100%;
        > div{ 
            display: flex;
            justify-content: space-between;
            padding: 0 40px;
            margin-top: 100px;
            div{
                position: relative;
                width: calc(50% - 15px);
                span{ 
                    position: absolute;
                    top: 0;
                    display: block;
                    transform: translateY(-100%);
                    font-size: 22px; 
                }
            } 
            p{
                margin-bottom: 30px;
            }
        }
    }
    .signature-box{ 
        height: 100px;
        width: 40%; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        position: relative;
        img{
            width: 100%; 
            object-fit: contain;
            position: relative;
            height: 90%; 
            transform: none; 
        }

    }
    hr{
        margin-top: 0;
    }
    ol, h3{
        margin-bottom: 20px;
    }
    ol ul{
        padding-left: 30px;
    }
    p, li, h3,h2{
        font-size: 18px;
        color: grey;
    }
    h2{
        font-size: 28px!important;
    }
    h3{
        font-size: 25px!important;
    }
    .typography-sig{
        /* font-style: italic; */
        text-transform: capitalize;
    }
    .date-span{
        font-size: 30px;
        color: grey;
        margin: 5px 0;
    } 

    @media screen and (max-width: 992px) { 
        padding: 20px 10px;
        p, li, h3,h2{
            font-size: 16px;
            color: grey;
        }
        h2{
            font-size: 20px!important;
        }
        h3{
            font-size: 18px!important;
        }
        .signature-box {
            width: 90%;
        }
    } 
` 

export default function PreviewDocument(props){
    const dispatch = useDispatch(); 
    const history = useHistory()
    // const myJobs = useSelector(state => state.my_jobs.my_jobs); 
    // const { documentType, documentData } = history.location.state 
    const { documentType, documentData } = props
    
    console.log("DOC documentType: " , documentType)

    if(documentType === "contract"){  
        return ( 
            <PreviewDocumentContainer> 
                <div className="document-main">
                    <h2>EMPLOYMENT CONTRACT</h2>
                    <hr />
                    <p>This Agreement is made on the date of the last signature below. </p>
                    <p>Between</p>
                    <ol>
                        <li>{documentData.company} a company incorporated in England and Wales with registered number {documentData.companyNumber} whose registered office is at {documentData.addressLineOne}, {documentData.addressLineTwo}, {documentData.county}, {documentData.postcode} (the Employer, we or us); and</li>
                        <li>{documentData.employee} (the Employee or you).</li>
                    </ol>
                    <p>This document sets out your terms and conditions of employment and contains the written particulars of your employment as required under section 1 of the Employment Rights Act 1996.</p>
                    <h3>Getting Started</h3>
                    <ol>
                        <li>Your employer is {documentData.company}. We agree to employ you in the capacity of {documentData.jobTitle} from {documentData.startDate}.</li>
                        <li>Your normal workplace is {documentData.workAddressLineOne}, {documentData.workAddressLineTwo}, {documentData.workCounty}, {documentData.workPostcode}. Your job may involve some business travel or temporarily working at other locations but we don't envisage this involving more than a month's work outside the UK.</li>
                        <li>All the terms of your employment are in this contract. If there is any inconsistency between this contract and any offer letter we sent you then this contract will prevail.</li>
                        <li>{documentData.startDate} is the date on which your continuous employment starts for legal purposes.</li>
                        <li>Your duties are those that normally go with your job title including any reasonable additional or different duties when we ask you, to meet our reasonable business needs.</li>
                        <li>You must be allowed to work in the UK to be employed by us and must tell the us immediately if this is not the case. We can end your employment without notice or compensation if you lose or lack permission to work in the UK.</li>
                        <li>You can only work for someone else or hold another business interest if we give you advance written agreement. If you break this rule, we can dismiss you without notice or payment.</li>
                        <li>We can suspend you for a reasonable length of time in the circumstances, to carry out a disciplinary investigation or if we have another reasonable basis for suspension.</li>
                    </ol>
                    {
                        documentData.probation ? 
                            <>
                            <h3>Probationary Period</h3>
                            <ol>
                                <li>The first { documentData.probationPeriod } of your employment will be a probationary period (the Probationary Period).</li>
                                <li>We may at our discretion extend the Probationary Period by a further period of time to be decided in our discretion. If so, you will receive written confirmation of the extension. Reference to the Probationary Period in this contract includes any extension of it.</li>
                                <li>When you have completed your Probationary Period to our satisfaction, we will confirm your continued employment in writing.</li>
                                <li>During the Probationary Period, either we or you may end your employment by giving 1 week's written notice.</li>
                            </ol>
                            </>
                        : 
                        ""
                    }
                    <h3>Pay and Expenses</h3>
                    <ol>
                        <li>We will pay you £{documentData.salaryAmount} per {documentData.salaryType} by monthly instalments in arrears. Payment will be by automated bank transfer or another method agreed between us. We will review your pay annually, in our sole discretion.</li>
                        <li>We can deduct any money that you may owe us from your pay or other payments due to you.</li>
                        <li>You are not entitled to reimbursement of expenses in connection with your duties under this Agreement unless we give advance written permission.</li>
                    </ol>
                    <h3>Hours of Work</h3>
                    <ol>
                        <li>Your normal working days are:
                            <ul>
                                {  documentData.workDays.monday ? <li>Monday, </li> : ""  } 
                                {  documentData.workDays.tuesday ?  <li>Tuesday, </li> : ""} 
                                {  documentData.workDays.wednesday ?  <li>Wednesday, </li> : "" } 
                                {  documentData.workDays.thursday ?  <li>Thursday, </li> : ""} 
                                {  documentData.workDays.friday ?  <li>Friday, </li> : ""} 
                                {  documentData.workDays.saturday ?  <li>Saturday, </li> : ""} 
                                {  documentData.workDays.sunday ?  <li>Sunday, </li> : ""} 
                            </ul>
                            from {documentData.startTime} to {documentData.finishTime} 
                            {documentData.lunchHourTypeValue === "Yes" ? `with a daily ${ documentData.lunchPaidTypeValue === "Yes" ? "paid" : "unpaid" } lunch break of one hour.` : "" }
                        </li>
                        <li>You must work reasonable additional hours to meet our business requirements without additional payment.</li>
                    </ol>
                    <h3>Holiday</h3>
                    <ol>
                        <li>
                        Our holiday year begins on {documentData.holidayStartDate}. You are entitled to {documentData.holidays} days' holiday per holiday year at your normal basic pay. { documentData.holidayIncluded === "included" ? "This entitlement includes the usual public holidays." : ""} In the holiday year(s) in which your employment starts and ends, one-twelfth of your annual holiday entitlement will accrue for each full month of employment.
                        </li>
                        <li>
                        You must take your holidays on dates that are convenient to us and that we agree in writing in advance. You should give us as much notice as you can of your wish to take holiday on a particular date giving notice of at least double the length of time you wish to take on holiday in one go. We may require you to take holiday on specific days as notified to you.
                        </li>
                        <li>
                        When your employment ends, we will pay you in lieu of any accrued but untaken holiday entitlement. You must take your outstanding holiday entitlement during any notice period, if we ask you to. If you have taken more holiday than you have accrued then you must repay us for the days you have not accrued. Payment by you or us under this clause will be at the rate of 1/260th of your annual salary (or, if you are part-time, at 1/260th of your full-time equivalent salary) for each day of holiday.
                        </li>
                        <li>
                        Unless agreed otherwise, if you do not take all of your holiday entitlement in any holiday year, we will not normally make any payment in lieu or increase your holiday entitlement in any subsequent year. However, carry forward may be permitted if a period of extended sickness absence, statutory maternity, paternity, shared parental or adoption leave has prevented you from taking leave in the relevant year and in this case you should contact your line manager or HR representative.
                        </li>
                    </ol>
                    <h3>Sickness</h3>
                    <ol>
                        <li>
                        If you are ill or injured and cannot attend work you must tell your line manager or HR representative no later than 30 minutes before your usual start time or as soon as reasonably practicable, unless an extreme emergency does not allow for this. You must provide a reason for your absence.
                        </li>
                        <li>
                        If you are off sick for seven days or less in a row, you must complete a self-certification form. If you are off sick for longer, you must give us medical certificates covering the whole period (except the first seven days).
                        </li>
                        <li>
                        You must undergo a medical examination by our nominated doctor if we ask you to. We can see any report he writes and discuss the contents with him. We can postpone your return to work following sickness absence until a doctor confirms that you are fit to work.
                        </li>
                        <li>
                        During sickness absence, we will pay you Statutory Sick Pay (SSP) as long as you satisfy the relevant requirements. For the purposes of SSP, the agreed qualifying days are your normal days of work as specified in this Agreement.
                        </li>
                        <li>
                        If your sickness absence is the fault of a third party and you can recover damages from that party you should notify us. If there are any claims or settlements you should keep us informed and pay us back any sum recovered from the third party to compensate you for lost earnings, which you have been paid for by us.
                        </li>
                        <li>
                        We have the right to terminate your employment as set out in this agreement even if this means you lose the right to sickness or other benefits.
                        </li>
                    </ol>
                    <h3>Collective Agreements</h3>
                    <ol>
                        <li>Your employment is not affected by any collective agreement.</li>
                    </ol>
                    {
                        documentData.pensionScheme ? 
                        <>
                            <h3>Pension and Other Benefits</h3>
                            <ol>
                                <li>If you are eligible we are required to enrol you automatically into a designated pension scheme (Scheme) - National Emplpoyers Scheme. Details will be provided to you as required by the law, including your right to opt out if you do not wish to be a member of the Scheme. Our contribution to the Scheme shall be 3% of your qualifying earnings. You may also be required to contribute to the Scheme and you agree to such contributions being deducted from your qualifying earnings, where required. We will notify you of contributions you are required to make from time to time. The Scheme is subject to its rules as may be amended from time to time, and we may replace the scheme with another pension scheme at any time.
                                </li>
                                <li>For further information about pension arrangements, please contact your line manager or HR representative.</li>
                            </ol>
                        </>
                        : 
                        ""
                    }
                    <h3>Data Protection</h3>
                    <ol>
                        <li>We will process personal data and sensitive personal data ('special categories of personal data') about you in accordance with our Data Protection Policy and Data Protection Privacy Notice, available from your line manager or HR representative or the Staff Handbook.</li>
                        <li>'Personal data' includes references, personal records, emails containing personal details, addresses and details of contractual benefits</li>
                        <li>
                            'Sensitive personal data' includes information about:
                            <ul>
                                <li>your health, to monitor sick leave and take decisions about your fitness for work; and</li>
                                <li>your racial or ethnic origin or religious or similar information in order to monitor compliance with equal opportunities legislation.</li>
                            </ul>
                        </li>
                        <li>You will comply with your obligations under our Data Protection Policy and other relevant policies.</li>
                        <li>
                            We will process your data in accordance with our Data Protection Privacy Notice, specifically to:
                            <ul>
                                <li>meet our obligations under your employment contract; and</li>
                                <li>ensure that we are complying with our legal obligations.</li>
                            </ul>
                            In other cases, we have a legitimate interest in processing your data before, during and after the end of the employment relationship.
                        </li>
                        <li>The Employer may transfer personal data and sensitive personal data outside the UK or European Economic Area in accordance with the Employer's Data Protection Privacy Notice.</li>
                    </ol>
                    <h3>Termination</h3>
                    <ol>
                        <li>After successful completion of the Probationary Period, you or we can end your employment at any time by giving written notice of at least {documentData.noticePeriod}</li>
                        <li>We may end your employment without letting any notice period run its course by making a payment equal to the basic salary that would have been due during the unexpired notice period. We will also continue your contractual benefits over the notice period that would have applied or pay you the amount that those benefits would have cost us over the same period.</li>
                        <li>
                            We can terminate your employment without notice or payment for your notice period:
                            <ul>
                                <li>if you commit any act or omission that we think is gross misconduct; or</li>
                                <li>if you seriously breach your employment obligations (including under this Agreement); or</li>
                                <li>if you do not have the right to work in the United Kingdom; or</li>
                                <li>in any other situation that we have said allows us to do this (including in this Agreement or any handbook or written policy).</li>
                            </ul>
                        </li>
                    </ol>
                    <h3>Garden Leave</h3>
                    <ol>
                        <li>
                            During your notice period, whether you or we gave notice, we can require you:
                            <ul>
                                <li>to stay away from your workplace or our other premises;</li>
                                <li>to carry out different or specified work or duties or carry out no work duties at all;</li>
                                <li>not to behave as if you have authority to act on our behalf; or</li>
                                <li>not to communicate with our suppliers, customers or clients, investors, employees, contractors, agents, trustees or representatives.</li>
                            </ul>
                        </li>
                        <li>During the period when this change or these changes apply, you will continue to be employed under this contract and entitled to receive your salary and all contractual benefits. Your obligations to us will continue and you may not work for any third parties or for yourself unless we give prior written consent.</li>
                    </ol>
                    <h3>Confidentiality</h3>
                    <ol>
                        <li>
                            For the purposes of this Agreement:
                            <ul>
                                <li><b>Associated Employer </b> has the meaning given by the Employment Rights Act 1996;</li>
                                <li><b>Confidential Information</b> means any information disclosed by or on behalf of the Employer (or any Group Business) to the Employee during their employment that at the time of disclosure (whether in writing, electronic or digital form, verbally or by inspection of documents, computer systems or sites or pursuant to discussions or by any other means or other forms and whether directly or indirectly) is confidential in nature or may reasonably be considered to be commercially sensitive, and which relates to the business and affairs of the Employer (or any Group Business) including but not limited to: (a) all Employment IPRs (b) all Employment Inventions and (c) all analyses, compilations, studies and other documents prepared by the Employee which contain or otherwise reflect or are generated from the information referred to above.</li>
                                <li>
                                    Employment IPRs means Intellectual Property Rights you create in the course of your employment with us (whether or not during working hours or using our premises or resources) that:
                                    <ul>
                                        <li>relate to any part of (or demonstrably anticipated business of) the Employer or any Group Business; or</li>
                                        <li>are reasonably capable of being used by the Employer or in any part of a Group Business.</li>
                                    </ul> 
                                </li>
                                <li>
                                    Employment Inventions means any Invention which is made wholly or partially by you at any time during the course of your:
                                    <ul>
                                        <li>normal duties; or</li>
                                        <li>duties specifically assigned to you, if those duties are such, that an Invention might reasonably be an expected result (whether or not during working hours or using our premises or resources, and whether or not recorded in material form).</li>
                                    </ul>
                                </li>
                                <li><b>Group Business</b> means any business owned or operated by us or an Associated Employer or all of those businesses together, as the context allows;</li>
                                <li>
                                    <b>Intellectual Property</b> Rights means without limitation all existing or future intellectual and industrial property rights, anywhere in the world including any Invention, patent, utility model right, copyright and related right, trade mark, trade name, internet domain name, design right, design, service marks, trade secret, database right, topography right, right in get-up, right in goodwill or to sue for passing off and any other right of a similar nature, whether registered (or capable of registration) and the right to apply for any of these; and
                                </li>
                                <li>
                                    <b>Inventions</b> mean without limitation, inventions, ideas and improvements, whether or not patentable and whether or not recorded in any medium.
                                </li>
                            </ul>
                        </li>
                        <li>
                            During your employment, you may have access to Confidential Information concerning us, and our business. During and after your employment, you must not use or disclose or allow anyone else to use or disclose any of our Confidential Information, except:
                            <ul>
                                <li>as necessary to perform your duties for us, properly; or</li>
                                <li>with our consent; or</li>
                                <li>as required by law or ordered by a court that has jurisdiction; or</li>
                                <li>to make a protected disclosure within the meaning of Section 43A of the Employment Rights Act 1996.</li>
                            </ul>
                        </li>
                        <li>As soon as your employment ends, however that happens, or earlier if we request it, you must:
                            <ul>
                                <li>
                                    return to us, all property that you have or control that belongs to us or relates to our business including but not limited to all documents and any car, keys, swipe cards, laptops and mobile phones; and
                                </li>
                                <li>delete any such property and Confidential Information from any electronic device which belongs to you.</li>
                            </ul>
                        </li>
                        <li>
                            You agree that if you do not comply with this clause, damages would not be an adequate remedy and we can apply for an injunction to prevent any (further) breach, without prejudice to any other remedy that we might pursue, including but not limited to claiming damages.
                        </li>

                    </ol>
                    <h3>Intellectual Property</h3>
                    <ol>
                        <li>
                            You acknowledge that:
                            <ul>
                                <li>
                                    all Employment IPRs, Employment Inventions and works embodying them shall be owned automatically and absolutely by the Employer to the fullest extent permitted by law. To the extent that they are not automatically owned by the Employer, you hold them on trust for us; and
                                </li>
                                <li>
                                    because of the nature of your duties and the particular responsibilities arising from the nature of your duties, you have, and shall have at all times while you are employed by us, a special obligation to further the interests of the Employer.
                                </li>
                            </ul>
                        </li>

                        <li>
                            You agree:
                            <ul>
                                <li>
                                    to promptly and on their creation, give us full written details of all Employment Inventions you make wholly or partially during the course of your employment;
                                </li>
                                <li>
                                    at our request, and in any event, on the termination of your employment, to give us all originals and copies of correspondence, documents, papers and records on all media which record or relate to any of the Employment IPRs;
                                </li>
                                <li>
                                    to use your best endeavours to execute all documents and do all acts both during and after your employment by us as may, in the opinion of the Employer, be necessary or desirable to vest the Employment IPRs in the Employer, to register them in the name of the Employer and to protect and maintain the Employment IPRs and the Employment Inventions;
                                </li>
                                <li>
                                    to give us all necessary assistance to enable us to enforce our Intellectual Property Rights against third parties, to defend claims for infringement of third party Intellectual Property Rights and to apply for registration of Intellectual Property Rights, where appropriate throughout the world, and for the full term of those rights;
                                </li>
                                <li>
                                    not to attempt to register any Employment IPR nor patent any Employment Invention unless we request that you do so; and
                                </li>
                                <li>
                                    to keep confidential each Employment Invention unless we have consented to its disclosure in writing.
                                </li>
                            </ul>   
                        </li>
                        <li>
                            You waive all moral rights under the Copyright, Designs and Patents Act 1988 (and all similar rights in other jurisdictions) which you have or will have in any existing or future works.
                        </li>
                        <li>
                            You hereby irrevocably appoint the Employer to be your attorney in your name and on your behalf to execute documents, use your name and do all things which are necessary or desirable for the Employer to obtain for itself or its nominee the full benefit of this section.
                        </li>
                    </ol>
                    <h3>Employer's Procedures</h3>
                    <ol>
                        <li>
                            Our policies and procedures, including our Disciplinary Procedure and Grievance Procedure, are available from your line manager or HR representative. You must familiarise yourself with and comply with our policies and procedures including any new or amended ones introduced after this Agreement. No policy or procedure is part of your contract of employment, unless the policy or procedure specifically says that it is.
                        </li>
                        <li>
                            If you are dissatisfied with any disciplinary decision relating to you (including any decision to dismiss you) then you should notify your line manager or HR representative in writing, specifying the grounds for your dissatisfaction. Further information can be found in the Disciplinary Procedure.
                        </li>
                        <li>
                            If you wish to seek redress for any grievance relating to your employment then you should notify your immediate supervisor in writing, specifying the grounds for your grievance. If your grievance relates to your immediate supervisor then you can instead notify the HR representative or escalate your complaint to the director/manager. Further information can be found in the Grievance Procedure.
                        </li>
                    </ol>
                    <h3>Amendment to Terms and Conditions</h3>
                    <ol>
                        <li>
                            We can make reasonable changes to any of the terms of your employment whenever we want to. We will notify you in writing of any change before the date it comes into force.
                        </li>
                    </ol>
                    <h3>Notices</h3>
                    <ol>
                        <li>
                            Other than dealings in the normal course of business, any notice, request, demand or other communication (collectively Notices) to be given under this Agreement will be deemed to be duly given by either party if:
                            <ul>
                                <li>
                                    sent by first class post addressed to the other party at (in the case of a Notice to the Employer) its registered office or place of business for the time being or (in the case of a Notice to you) the address that you have last notified to us; or
                                </li>
                                <li>
                                    given personally to (in the case of a Notice to the Employer) a director, partner, chief executive or equivalent of the Employer or (in the case of a Notice to you) to you; or
                                </li>
                                <li>
                                    sent by electronic mail to the business email address of the chief executive or equivalent in the case of the Employer and your email address as notified in writing to the Employer from time to time.
                                </li> 
                            </ul>
                        </li>
                        <li>
                            Any such Notice will be deemed to have been given:
                            <ul>
                                <li>
                                    if sent by first class post, 48 hours (or, if sent to or from a place outside the United Kingdom, seven days) after the time of posting and, in proving service, it will be sufficient to prove that the envelope containing such Notice was properly addressed, stamped and put in the post;
                                </li>
                                <li>
                                    if sent by email, 24 hours after sending.
                                </li>
                            </ul>
                        </li>
                    </ol>
                    <h3>Governing Law</h3>
                    <ol>
                        <li>
                            This Agreement shall be governed by and interpreted according to the law of England and Wales and all disputes arising under the Agreement (including non-contractual disputes or claims) shall be subject to the exclusive jurisdiction of the English and Welsh courts.
                        </li>
                    </ol>
                    <h3>Third Party Rights</h3>
                    <ol>
                        <li>No one other than you and us have any rights to enforce any part of this agreement.</li>
                    </ol>

                    <div>
                        <div> 
                            {
                                documentData.signUrl ? 
                                    <div className="signature-box">
                                        <img src={documentData.signUrl }/>
                                    </div>
                                : ""
                            }  
                            <hr />
                            <p>{documentData.employerFirstname} {documentData.employerLastname} on behalf of { documentData.company }</p>
                        </div> 
                        <br /><br />
                        <div>
                            <span className="date-span">{ new Date().toLocaleDateString() }</span>
                            <hr />
                            <p>Date</p>
                        </div> 
                    </div>
                    <br /><br />
                    <div>
                        <div>
                            <hr />
                            <p className="typography-sig">{ documentData.employee } </p>
                        </div> 
                        <br /><br />
                        <div>
                            <hr />
                            <p>Date</p>
                        </div> 
                    </div>
                </div> 
            </PreviewDocumentContainer>
        )
    }else if(documentType === "offerLetter"){ 
        return ( 
            <PreviewDocumentContainer> 
                <div className="document-main offerLetter-document"> 
                    <div className="companyAddress">
                        <p>{ documentData.companyName }</p>
                        <p>{ documentData.addressLineOne }</p>
                        <p>{ documentData.addressLineTwo }</p>
                        <p>{ documentData.county }</p>
                        <p>{ documentData.postcode }</p>
                    </div>
                    <p className="lrg-margin">{ new Date().toLocaleDateString() }</p>
                    <div className="employeeAddress">
                        <p>{ documentData.employeeFirstname } { documentData.employeeLastname }</p>
                        <p>{ documentData.employeeAddressLineOne }</p>
                        <p>{ documentData.employeeAddressLineTwo }</p>
                        <p>{ documentData.employeeCounty }</p>
                        <p>{ documentData.employeePostcode }</p>
                    </div>
                    <p className="lrg-top-margin">Dear { documentData.employeeFirstname } { documentData.employeeLastname }</p>
                    <h3>Offer of Employment </h3>
                    <p>
                        I am pleased to offer you { documentData.offerType } employment in the role of { documentData.jobTitle }  with { documentData.companyName } (referred to as 'the Employer', 'us' or 'we', in the rest of this letter).
                    </p>
                    <p>
                        This letter is to confirm the offer to you, summarise the main commercial terms on which we would like to employ you and explain the conditions of our offer.
                    </p>
                    <h3>Summary of Employment Terms</h3>
                    <p>The main terms of your employment are:</p>
                    <ol>
                        <li>We will pay you a basic salary of £{documentData.salaryAmount}  Per {documentData.salaryType === "Yearly" ? "anum" : documentData.salaryType }  </li>
                        <li>Your normal place of work will be {documentData.workAddressLineOne}, {documentData.workAddressLineTwo}, {documentData.workAddressCounty}, {documentData.workAddressPostcode}</li>
                        <li>Your normal hours of work will be {documentData.startTime}  to  {documentData.finishTime} 
                        { documentData.workDays.monday ? " Monday, " : ""} 
                        { documentData.workDays.tuesday ? "Tuesday, " : ""}
                        { documentData.workDays.wednesday ? "Wednesday, " : ""}
                        { documentData.workDays.thursday ? "Thursday, " : ""}
                        { documentData.workDays.friday ? "Friday, " : ""}
                        { documentData.workDays.saturday ? "Saturday, " : ""}
                        { documentData.workDays.sunday ? "Sunday, " : ""}</li>
                        <li>You will be entitled to {documentData.holidays} days of holiday per year  { documentData.holidayIncluded === "included" ? "including bank holidays" : "" };</li>
                        <li>
                            If you are eligible we are required to enrol you automatically into a designated pension scheme ({documentData.pensionScheme}) - National pension scheme. Details will be provided to you as required by the law, including your right to opt out if you do not wish to be a member of the Scheme. Our contribution to the Scheme shall be {documentData.pensionSchemeContribution}% of your qualifying earnings. You may also be required to contribute to the Scheme and you agree to such contributions being deducted from your qualifying earnings, where required. We will notify you of contributions you are required to make from time to time. The Scheme is subject to its rules as may be amended from time to time, and we may replace the scheme with another pension scheme at any time.
                        </li>
                        <li>
                            You or we can end your employment by giving written notice of at least one week for each completed year of service, subject to a minimum of one week and a maximum of twelve weeks, from us, and one week from you;
                        </li>
                    </ol>
                    <p>
                        The above is intended as a high-level summary only and does not explain in full either the terms of your employment or the arrangements applicable to each of the items listed. The items covered in this letter and your employment are subject to the terms set out in the contract of employment which you must sign as a condition of your employment and which takes precedence over this letter if there is any inconsistency. 
                    </p>
                    <h3>Conditions of Offer</h3>
                    <p>Our offer of employment is conditional on:</p>

                    <ol>
                        <li>
                            You are signing a contract of employment that is acceptable to us, in our absolute discretion. The contract of employment will be provided to you separately. The contract of employment will take precedence over this letter if there is any inconsistency.
                        </li>
                        <li>
                            You having the right to work in the United Kingdom. You must show us documents which satisfy us that you have this right. This would normally be your original British passport, European Economic Area passport or a passport from another country which gives you the right to work in the UK. We will then copy and return the passport to you. If you do not hold one of these passports then we will need to see other documents to verify your right to work in the United Kingdom and you should contact us to find out which documents you will need to provide.
                        </li>
                        <li>
                            Us receiving evidence that you hold the qualification(s) set out in your CV or which you have otherwise indicated to us that you hold.
                        </li>
                    </ol>
                    <p>
                        If any of the above conditions are not satisfied then this offer will be withdrawn or if it has already been accepted then we will be entitled to end your employment without notice or payment in lieu of notice. Please do not resign from your current job until you have had confirmation from us that we consider that these conditions have been satisfied. These conditions will continue to apply even if you have signed your contract of employment. 
                    </p>
                    <p>
                        The written contract will be provided to you under separate cover. Please confirm your acceptance of the offer by signing the written contract and returning it to us. This offer is open for you to accept until {documentData.expirationDate}, at which time it will lapse automatically without further notice and no longer be capable of acceptance. If you do accept this offer, we would like you to commence your new role on {documentData.startDate} or as soon as possible afterwards. Please confirm when you can start work.
                    </p>
                    <p>
                        We treat personal data collected during the recruitment process in accordance with our data protection policy. Information about how your data is used and the basis for processing your data is provided in our employee privacy notice and other policies.
                    </p>
                    <p>Yours sincerely,</p> 
                    
                    {
                        documentData.signUrl ? 
                            <div className="signature-box">
                                <img src={documentData.signUrl }/>
                            </div>
                        : ""
                    } 
                    <hr /> 
                    <p>{documentData.employerFirstname} {documentData.employerLastname } for and on behalf of {documentData.companyName}</p>

                </div> 
            </PreviewDocumentContainer>
        )
    }
}