import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
//Styles
import {H3, H4,  BorderContainer, LegalCopyWrap} from '../../styles/components/shared-components';
import *  as global from '../../styles/components/globalVariables';

const PrivacyWrap = styled.div`
        ol {
                margin-left: 20px;
        }
        ol li {
                margin: 10px 0;
        }


        ul {
                list-style: none;

                li a {
                        color: ${global.colorRed};
                        text-decoration: none;

                        &:hover{
                                text-decoration: underline;
                        }
                }
        }
              
        ul li::before {
                content: "\\2022"; 
                color: ${global.colorRed};
                font-weight: bold;
                display: inline-block; 
                width: 1em;
                margin-left: -1em;
        }

        span{
                font-weight: bold;
                margin: 0;
        }
        
        //Don't move this
        ol li::before {
                content: "";
        }

        .links {
                marign-left: 20px;
                display: inline-block;
                li{
                        transition: .2s;
                }
                a{
                        color: black;
                }
        }
        
 
        .links li a:hover {
                color: ${global.colorRed};
                cursor: pointer
        }

        p a{
                color: ${global.colorRed};
        }
`
const IntroductionWrap = styled.div`
        .links {
                marign-left: 20px;
                display: inline-block;
                li{
                        a{
                                text-decoration: none;
                                color: black;
                                transition: .2s;
                        }
                }
        }
        
 
        .links li a:hover {
                color: ${global.colorRed};
                cursor: pointer
        }
`
 
export default function PrivacyContent() {
    return (
        <BorderContainer>
                <LegalCopyWrap>
                        <PrivacyWrap>
                                <H3>CONTENTS</H3>
                                <p class="c1">CLAUSE</p>
                                <ol>
                                        <li>
                                                Important information and who we are 
                                        </li>
                                </ol>
                                <ol start="2">
                                        <li>
                                                The data we collect about you  
                                        </li>
                                </ol>
                                <ol>
                                        <li>
                                                How is your personal data collected?
                                        </li>
                                </ol>
                                <ol>
                                        <li>
                                                How we use your personal data 
                                        </li>
                                </ol>
                                <ol>
                                        <li>
                                                Disclosures of your personal data 
                                        </li>
                                </ol>
                                        
                                <ol>
                                        <li>
                                                International transfers
                                        </li>
                                </ol>
                                
                                <ol start="2">
                                        <li>
                                                Data security  
                                        </li>
                                </ol>
                                
                                <ol start="3">
                                        <li>
                                                Data retention  
                                        </li>
                                </ol>
                                
                                <ol start="4">
                                        <li>
                                                Your legal rights   
                                        </li>
                                </ol>
                                
                                <ol>
                                        <li>
                                                Glossary 
                                        </li>
                                </ol>

                                <IntroductionWrap>
                                        <H4>
                                                Introduction
                                        </H4>
                                        <br/> 
                                        <p>
                                                Welcome to Voost’s privacy policy.
                                        </p>
                                        <p>
                                                Voost is a trading style of My Job App Limited. Company Registered Address: 102, Bold Street, Altrincham, WA14 2EH. 
                                                <br />
                                                <br />
                                                My Job App is registered in England & Wales. Company number: 10866837.
                                                <br />           
                                                <br />
                                                My Job App Limited ICO No: ZB227468.
                                        </p> 
                                        <p>
                                                My Job App Limited respects your privacy and is committed to protecting your personal data. 
                                                This privacy policy will inform you as to how we look after your personal data when you visit our website 
                                                (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                                        </p> 
                                        <p>
                                                This privacy policy is provided in a layered format so you can click through to the specific areas set out below. 
                                                {/* [Alternatively, you can download a pdf version of the policy here: [LINK].]  */}
                                                Please also use the Glossary to understand the meaning of some of the terms used in this privacy policy.
                                        </p>

                                        <ol className="links">
                                                <li>
                                                       <a  rel="noopener noreferrer"  href="#who-we-are">
                                                                IMPORTANT INFORMATION AND WHO WE ARE
                                                        </a>
                                                </li>
                                                <li>
                                                        <a  rel="noopener noreferrer"  href="#data-we-collect">
                                                                THE DATA WE COLLECT ABOUT YOU
                                                        </a>
                                                </li>
                                                <li>
                                                        <a  rel="noopener noreferrer"  href="#your-personal-data-collected">
                                                                HOW IS YOUR PERSONAL DATA COLLECTED?
                                                        </a>
                                                </li>
                                                <li>
                                                        <a  rel="noopener noreferrer"  href="#your-personal-data-used">
                                                                HOW WE USE YOUR PERSONAL DATA
                                                        </a>
                                                </li>
                                                <li>
                                                        <a  rel="noopener noreferrer"  href="#personal-data-disclosed">
                                                                DISCLOSURES OF YOUR PERSONAL DATA
                                                        </a>
                                                </li>
                                                <li>
                                                        <a  rel="noopener noreferrer"  href="#international-transfers">
                                                                INTERNATIONAL TRANSFERS
                                                        </a>
                                                </li>
                                                <li>
                                                        <a  rel="noopener noreferrer"  href="#data-security">
                                                                DATA SECURITY
                                                        </a>
                                                </li>
                                                <li>
                                                        <a  rel="noopener noreferrer"  href="#data-retention">
                                                                DATA RETENTION
                                                        </a>
                                                </li>
                                                <li>
                                                        <a  rel="noopener noreferrer"  href="#your-legal-rights">
                                                                YOUR LEGAL RIGHTS
                                                        </a>
                                                </li>
                                                <li>
                                                        <a  rel="noopener noreferrer"  href="#glossary">
                                                                GLOSSARY
                                                        </a>
                                                </li>
                                        </ol>
                                </IntroductionWrap>

                                <h5 id="who-we-are">
                                        1.      Important information and who we are
                                </h5>

                                <H4>
                                        Purpose of this privacy policy
                                </H4>
                                <br/>
                                <p>
                                        This privacy policy aims to give you information on how My Job App Limited collects and processes your personal data through your use of this website,
                                        including any data you may provide through this website when you use it.
                                </p>
                                <p>
                                        This website is not intended for children and we do not knowingly collect data relating to children.   
                                </p>
                                <p>
                                        It is important that you read this privacy policy together with any other privacy policy or fair processing policy we may provide on specific occasions 
                                        when we are collecting or processing personal data about you so that you are fully aware of how and why we are using your data. This privacy policy supplements other notices and privacy policies and is not intended to override them.
                                </p>

                                <H4>
                                        Controller
                                </H4>
                                <br/>
                                <p>
                                        My Job App Limited T/A Voostjobs.com  is the controller and responsible for your personal data (collectively referred to as "My Job", "we", "us" or "our" in this privacy policy).
                                </p>
                                <p>
                                        We have appointed a data privacy manager who is responsible for overseeing questions in relation to this privacy policy. 
                                        If you have any questions about this privacy policy, including any requests to exercise your legal rights, please contact the privacy manager
                                        using the details set out below.
                                </p>

                                <H4>
                                        Contact Details
                                </H4>
                                <br/>
                                <p>
                                If you have any questions about this privacy policy or our privacy practices, please contact our [DPO OR data privacy manager] in the following ways:   
                                </p>
                                <ul>
                                        <li>
                                        Full name of legal entity: My Job App Limited
                                        </li>
                                        <li>
                                        E-mail address: info@voostjobs.com
                                        </li>
                                        <li>
                                        Postal address: 102 Bold Street, Altrincham WA14 2EH
                                        </li>
                                </ul>
                                <p>
                                You have the right to make a complaint at any time to the Information Commissioner's Office (ICO), the UK supervisory authority for data protection issues
                                        (www.ico.org.uk). We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us in the first instance.
                                </p>
                                <p>
                                Changes to the privacy policy and your duty to inform us of changes
                                </p>
                                <p>
                                We keep our privacy policy under regular review.
                                </p>
                                <p>
                                        It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us.
                                </p>
                                <H4>
                                        Third party links
                                </H4>
                                <br/>
                                <p>
                                        This website may include links to third party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties 
                                        to collect or share data about you. We do not control these third party websites and are not responsible for their privacy statements. When you leave our website, 
                                        we encourage you to read the privacy policy of every website you visit.
                                </p>
                                <br/>
                                <h5 id="data-we-collect">
                                        2.      Data we collect about you
                                </h5>

                                <p>
                                        Personal data, or personal information, means any information about an individual from which that person can be identified. 
                                        It does not include data where the identity has been removed (anonymous data).
                                </p>
                                <p>
                                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                                </p>
                                <ul>
                                        <li>
                                                <span>Identity Data </span> includes [first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender].
                                        </li>
                                        <li>
                                                <span>Contact Data</span> includes [billing address, e-mail address and telephone numbers].
                                        </li>
                                        <li>
                                                <span>Financial Data </span> includes [bank account and payment card details].
                                        </li>
                                        <li>
                                                <span>Transaction Data</span> includes [details about payments to and from you and other details of services you have obtained from us].
                                        </li>
                                        <li>
                                                <span>Technical Data</span> includes [internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website].
                                        </li>
                                        <li>
                                                <span>Profile Data</span> includes [your username and password, your interests, preferences, feedback and survey responses].  
                                        </li>
                                        <li>
                                                <span>Usage Data</span> includes [information about how you use our website, products and services].
                                        </li>
                                        <li>
                                                <span>Marketing and Communications Data</span> includes your preferences in receiving marketing from us and our third parties and your communication preferences.
                                        </li>
                                </ul>
                                <p>
                                        We also collect, use and share <span>Aggregated Data</span> such as statistical or demographic data for any purpose. Aggregated Data could be derived from your personal data but is not considered personal data in law as this data will not directly or indirectly reveal your identity. For example, we may aggregate your Usage Data to calculate the percentage of users accessing a specific website feature. However, if we combine or connect Aggregated Data with your personal data so that it can directly or indirectly identify you, we treat the combined data as personal data which will be used in accordance with this privacy policy.
                                </p>
                                <p>
                                        We do not collect any <span>Special Categories of Personal Data </span>about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data). Nor do we collect any information about criminal convictions and offences.
                                </p>
                                <H4>
                                        If you fail to provide personal data
                                </H4>
                                <br/>
                                <p>
                                        Where we need to collect personal data by law, or under the terms of a contract we have with you, and you fail to provide that data when requested, we may not be able to perform the contract we have or are trying to enter into with you.
                                </p>
                                <br/>
                                <h5 id="your-personal-data-collected">
                                        3.      How is your personal data collected?
                                </h5>

                                <p>
                                        We use different methods to collect data from and about you including through:
                                </p>
                                <ul>
                                        <li>
                                        <span>Direct interactions.</span> You may give us your [Identity, Contact and Financial Data] by filling in forms or by corresponding with us by post, phone, e-mail or otherwise. This includes personal data you provide when you:
                                        </li>
                                        <li>
                                        create an account on our website;    
                                        </li>
                                        <li>
                                        subscribe to our service or publications;
                                        </li>
                                        <li>
                                        request marketing to be sent to you;
                                        </li>
                                        <li>
                                        give us feedback or contact us.
                                        </li>
                                        <li>
                                        Automated technologies or interactions. As you interact with our website, we will automatically collect Technical Data about your equipment, 
                                        browsing actions and patterns. We collect this personal data by using cookies[, server logs] and other similar technologies. 
                                        [We may also receive Technical Data about you if you visit other websites employing our cookies.] Please see our <NavLink to="cookie-policy">cookie policy</NavLink> for further details.
                                        </li>
                                        <li>
                                        Third parties or publicly available sources. We will receive personal data about you from various third parties and public sources as set out below:
                                        </li>
                                        <li>
                                                Technical Data from the following parties:
                                        </li>
                                        <ol>
                                                <li>
                                                        analytics providers;
                                                </li>
                                                <li>
                                                        advertising networks; 
                                                </li>
                                                <li>
                                                        and search information providers.
                                                </li>
                                        </ol>
                                        <li>
                                                Contact, Financial and Transaction Data from providers of technical, payment and delivery services.
                                        </li>
                                        {/* <li>
                                                Identity and Contact Data from data brokers or aggregators.
                                        </li> */}
                                        {/* <li>
                                                Identity and Contact Data from publicly available sources [such as Companies House and the Electoral Register based inside the EU].
                                        </li> */}
                                        <br/>

                                        <h5 id="your-personal-data-used">
                                                4.      How we use your personal data
                                        </h5>

                                        <p>
                                                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                                        </p>
                                        <li>
                                                where we need to perform the contract we are about to enter into or have entered into with you;
                                        </li>
                                        <li>
                                                where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests; and/or
                                        </li>
                                        <li>
                                                where we need to comply with a legal obligation.
                                        </li>
                                </ul>
                                <p>
                                       <a  rel="noopener noreferrer"  href="#glossary">Click here</a> to find out more about the types of lawful basis that we will rely on to process your personal data.
                                </p>
                                <p>
                                Generally, we do not rely on consent as a legal basis for processing your personal data, although we will get your consent before sending third party direct marketing communications to you via e-mail or text message. You have the right to withdraw consent to marketing at any time by contacting us.
                                </p>
                                <H4>
                                        Purposes for which we will use your personal data
                                </H4>
                                <br/>
                                <p>
                                        We have set out below, in a table format, a description of all the ways we plan to use your personal data, and which of the legal bases we rely on to do so. We have also identified what our legitimate interests are where appropriate.
                                </p>
                                <p>
                                        Note that we may process your personal data for more than one lawful ground depending on the specific purpose for which we are using your data. Please contact us if you need details about the specific legal ground we are relying on to process your personal data where more than one ground has been set out in the table below.
                                </p>

                                <H4>
                                        Marketing
                                </H4>
                                <br/>
                                <p>
                                        We strive to provide you with choices regarding certain personal data uses, particularly around marketing and advertising. 
                                </p>
                                <H4>
                                        Promotional offers from us
                                </H4>
                                <br/>

                                <p>
                                        We may use your Identity, Contact, Technical, Usage and Profile Data to form a view on what we think you may want or need, or what may be of interest to you. 
                                        This is how we decide which services and offers may be relevant for you (we call this marketing).
                                </p>
                                <p>
                                        You will receive marketing communications from us if you have requested information from us or purchased services] from us and you have not opted out of receiving that marketing.
                                </p>
                                <H4>
                                        Third party marketing
                                </H4>
                                <br/>
                                <p>
                                        We will get your express opt-in consent before we share your personal data with any third party for marketing purposes.
                                </p>
                                <H4>
                                        Opting out
                                </H4>
                                <br/>
                                <p>
                                        You can ask us or third parties to stop sending you marketing messages at any time [by logging into the website and checking or unchecking relevant boxes to adjust your marketing preferencesOR by following the opt-out links on any marketing message sent to you OR by contacting us at any time].
                                </p>
                                <p>
                                        Where you opt out of receiving these marketing messages, this will not apply to personal data provided to us as a result of a service purchase, service experience or other transactions.
                                </p>
                                <H4>
                                        Cookies
                                </H4>
                                <br/>
                                <p>
                                        You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. 
                                        If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly. 
                                        For more information about the cookies we use, please see our <NavLink to="/cookie-policy"> cookie policy</NavLink>.
                                </p>
                                <H4>
                                        Change of purpose
                                </H4>
                                <br/>
                                <p>
                                        We will only use your personal data for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose. If you wish to get an explanation as to how the processing for the new purpose is compatible with the original purpose, please contact us.     
                                </p>
                                <p>
                                        If we need to use your personal data for an unrelated purpose, we will notify you and we will explain the legal basis which allows us to do so.
                                </p>
                                <p>
                                        Please note that we may process your personal data without your knowledge or consent, in compliance with the above rules, where this is required or permitted by law.
                                </p>
                                <br/>
                                <h5 id="personal-data-disclosed">
                                        5.    Disclosures of your personal data
                                </h5>

                                <p>
                                        We may share your personal data with the parties set out below for the purposes set out in the table [Purposes for which we will use your personal data] above. 
                                </p>
                                <ul>
                                        <li>
                                                Internal Third Parties as set out in the <a  rel="noopener noreferrer"  href="glossary">glossary</a>.
                                        </li>
                                        <li>
                                                External Third Parties as set out in the <a  rel="noopener noreferrer"  href="glossary">glossary</a>.
                                        </li>
                                        <li>
                                                Third parties to whom we may choose to sell, transfer or merge parts of our business or our assets. Alternatively, we may seek to acquire other businesses or merge with them. If a change happens to our business, then the new owners may use your personal data in the same way as set out in this privacy policy.
                                        </li>
                                </ul>
                                <p>
                                        We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
                                </p>
                                <br/>
                                <h5 id="international-transfers">
                                        6.   International transfers
                                </h5>
                                <p>
                                        We do not transfer your personal data outside the European Economic Area (EEA)
                                </p>
                                <br/>
                                <h5 id="data-security">
                                        7.   Data security
                                </h5>
                                <p>
                                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                                </p>
                                <p>
                                        We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
                                </p>
                                <br/>
                                <h5 id="data-retention">
                                        8.   Data retention
                                </h5>
                                <p>
                                        How long will you use my personal data for?
                                </p>
                                <p>
                                        We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, 
                                        regulatory, tax, accounting or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.
                                </p>
                                <p>
                                        To determine the appropriate retention period for personal data, we consider the amount, nature and sensitivity of the personal data, 
                                        the potential risk of harm from unauthorised use or disclosure of your personal data, the purposes for which we process your personal data and whether we can 
                                        achieve those purposes through other means, and the applicable legal, regulatory, tax, accounting or other requirements.
                                </p>
                                <p>
                                        [Details of retention periods for different aspects of your personal data are [available in our retention policy which you can request from us by contacting us above].    
                                </p>
                                <p>
                                        OR
                                </p>
                                <p>
                                        By law we have to keep basic information about our customers (including Contact, Identity, Financial and Transaction Data) for [six] years after they cease being customers for a variety of purposes.]
                                </p>
                                <p>
                                In some circumstances you can ask us to delete your data: see [your legal rights] below for further information.
                                </p>
                                <p>
                                        In some circumstances we will anonymise your personal data (so that it can no longer be associated with you) for research or statistical purposes, in which case we may use this information indefinitely without further notice to you.
                                </p>
                                <br/>
                                <h5 id="your-legal-rights">
                                        9.   Your legal rights
                                </h5>
                                <p>
                                        Under certain circumstances, you have rights under data protection laws in relation to your personal data. Please click on the links below to find out more about these rights:
                                </p>
                                <ul className="links">
                                        <li>
                                                <a  rel="noopener noreferrer"  href="https://ico.org.uk/" target="_blank"> Request access to your personal data.</a>
                                        </li>
                                        <li>
                                                <a  rel="noopener noreferrer"  href="https://ico.org.uk/" target="_blank">Request correction of your personal data</a>
                                        </li>
                                        <li>
                                                <a  rel="noopener noreferrer"  href="https://ico.org.uk/" target="_blank">Request erasure of your personal data</a>
                                        </li>
                                        <li>
                                                <a  rel="noopener noreferrer"  href="https://ico.org.uk/" target="_blank"> Object to processing of your personal data</a>
                                        </li>
                                        <li>
                                                <a  rel="noopener noreferrer"  href="https://ico.org.uk/" target="_blank">Request restriction of processing your personal data</a>
                                        </li>
                                        <li>
                                                <a  rel="noopener noreferrer"  href="https://ico.org.uk/" target="_blank">Request transfer of your personal data</a>
                                        </li>
                                        <li>
                                                <a  rel="noopener noreferrer"  href="https://ico.org.uk/" target="_blank"> Right to withdraw consent</a>
                                        </li>
                                </ul>
                                <p>
                                        If you wish to exercise any of the rights set out above, please <NavLink to="contactUs">contact us</NavLink>.      
                                </p>
                                <H4>
                                        No fee usually required
                                </H4>
                                <br/>
                                <p>
                                        You will not have to pay a fee to access your personal data (or to exercise any of the other rights). However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive. Alternatively, we could refuse to comply with your request in these circumstances.
                                </p>
                                <H4>
                                        What we may need from you   
                                </H4>
                                <br/>
                                <p>
                                        We may need to request specific information from you to help us confirm your identity and ensure your right to access your personal data (or to exercise any of your other rights). This is a security measure to ensure that personal data is not disclosed to any person who has no right to receive it. We may also contact you to ask you for further information in relation to your request to speed up our response.
                                </p>
                                <H4>
                                        Time limit to respond
                                </H4>
                                <br/>
                                <p>
                                        We try to respond to all legitimate requests within one month. Occasionally it could take us longer than a month if your request is particularly complex or you have made a number of requests. In this case, we will notify you and keep you updated.
                                </p>
                                <br/>
                                <h5 id="glossary">
                                        10.  Glossary
                                </h5>
                                <H4>LAWFUL BASIS</H4>
                                <br/>
                                <p>
                                        <span>Legitimate Interest</span> means the interest of our business in conducting and managing our business to enable us to give you the best service/product and the best and most secure experience. We make sure we consider and balance any potential impact on you (both positive and negative) and your rights before we process your personal data for our legitimate interests. We do not use your personal data for activities where our interests are overridden by the impact on you (unless we have your consent or are otherwise required or permitted to by law). You can obtain further information about how we assess our legitimate interests against any potential impact on you in respect of specific activities by contacting us.
                                </p>
                                <p>     
                                        <span>Performance of Contract</span> means processing your data where it is necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract.
                                </p>
                                <p>
                                        <span>Comply with a legal obligation</span> means processing your personal data where it is necessary for compliance with a legal obligation that we are subject to.   
                                </p>
                                <h5>
                                        THIRD PARTIES
                                </h5>
                                <p>
                                        Internal third parties
                                </p>
                                <h5>
                                        External Third Parties
                                </h5>
                                <ul>
                                        <li>
                                                Service providers [acting as processors] who provide [IT and system administration services].
                                        </li>
                                        <li>
                                                Professional advisers [acting as processors or joint controllers] including lawyers, bankers, auditors and insurers based in [SPECIFIC COUNTRIES] who provide [consultancy, banking, legal, insurance and accounting services].
                                        </li>
                                        <li>
                                                HM Revenue & Customs, regulators and other authorities [acting as processors or joint controllers] based [in the United Kingdom] [who require reporting of processing activities in certain circumstances].
                                        </li>
                                </ul>
                                <H4>
                                        YOUR LEGAL RIGHTS
                                </H4>
                                <br/>
                                <p>
                                        You have the right to:
                                </p>
                                <p>
                                        <span>Request access</span> to your personal data (commonly known as a "data subject access request"). This enables you to receive a copy of the personal data we hold about you and to check that we are lawfully processing it.
                                </p>
                                <p>
                                        <span>Request correction</span> of the personal data that we hold about you. This enables you to have any incomplete or inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you provide to us.
                                </p>
                                <p>
                                       <span>Request erasure</span> of your personal data. This enables you to ask us to delete or remove personal data where there is no good reason for us continuing to process it. You also have the right to ask us to delete or remove your personal data where you have successfully exercised your right to object to processing (see below), where we may have processed your information unlawfully or where we are required to erase your personal data to comply with local law. Note, however, that we may not always be able to comply with your request of erasure for specific legal reasons which will be notified to you, if applicable, at the time of your request.
                                </p>
                                <p>
                                        <span>Object to processing</span> of your personal data where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object where we are processing your personal data for direct marketing purposes. In some cases, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms.
                                </p>
                                <p>
                                        <span>Request restriction</span> of processing of your personal data. This enables you to ask us to suspend the processing of your personal data in the following scenarios:
                                </p>
                                <ul>
                                        <li>if you want us to establish the data's accuracy;</li>
                                        <li>where our use of the data is unlawful but you do not want us to erase it;</li>
                                        <li>where you need us to hold the data even if we no longer require it as you need it to establish, exercise or defend legal claims; and/or</li>
                                        <li>you have objected to our use of your data but we need to verify whether we have overriding legitimate grounds to use it.</li>
                                </ul>
                                <p>
                                        <span>Request the transfer</span> of your personal data to you or to a third party. We will provide to you, or a third party you have chosen, your personal data in a structured, commonly used, machine-readable format. Note that this right only applies to automated information which you initially provided consent for us to use or where we used the information to perform a contract with you.
                                </p>
                                <p>
                                        <span>Withdraw consent</span> at any time where we are relying on consent to process your personal data. However, this will not affect the lawfulness of any processing carried out before you withdraw your consent. If you withdraw your consent, we may not be able to provide certain products or services to you. We will advise you if this is the case at the time you withdraw your consent.
                                </p>
                        </PrivacyWrap>
                </LegalCopyWrap>
        </BorderContainer>
       
    )
}