import React from 'react';
import styled from 'styled-components';
import * as global from '../../styles/components/globalVariables';
import {NavLink} from 'react-router-dom';
//Styles
import {H3, BorderContainer, LegalCopyWrap} from '../../styles/components/shared-components';

const TermsWrap = styled.div`
        ol {
                margin-left: 20px;
        }
        ol li {
                margin: 10px 0;
        }

        ul {
                list-style: none;

                li a{
                        color: ${global.colorRed};

                        &:hover{
                                text-decoration: underline;
                        }
                }
        }

        a{
                text-decoration: none;
                color: black;
        }
        
        ul li::before {
                content: "\\2022"; 
                color: ${global.colorRed};
                font-weight: bold;
                display: inline-block; 
                width: 1em;
                margin-left: -1em;
        }

        ol li::before {
                content: "";
        }

        .links {
                marign-left: 20px;
                display: inline-block;

                li a{
                        color: black;
                        transition: .2s;

                        
                }
        }
        
 
        .links li a:hover {
                color: ${global.colorRed};
                text-decoration: none;
        }

        span{
                font-weight: bold;
        }

        p a {
                color: ${global.colorRed};

                &:hover{
                        text-decoration: underline;
                }
        }

`
export default function TermsContent() {
    return (
        <BorderContainer>
            <LegalCopyWrap>
                    <TermsWrap>
                        <H3>
                        PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THIS SITE
                        </H3>
                        <br/>
                        <h4>
                        What's in these terms?
                        </h4>
                        <p>
                                These terms tell you the rules for using our website www.voostjobs.com (our site).
                        </p>
                        <p>
                        Click on the links below to go straight to more information on each area:
                        </p>

                        <ul className="links">
                                <li>
                                        <a href="#how-to-contact-us">
                                                Who we are and how to contact us.
                                        </a>
                                </li>
                                <li>
                                        <a href="#accepting-terms">
                                                By using our site you accept these terms
                                        </a>
                                </li>
                                <li>
                                        <a href="#other-terms">
                                                There are other terms that may apply to you
                                        </a>
                                </li>
                                <li>
                                        <a href="#changes-to-terms">
                                                We may make changes to these terms
                                        </a>
                                </li>
                                <li>
                                        <a href="#changes-to-site">
                                                We may make changes to our site
                                        </a>
                                </li>
                                <li>
                                        <a href="#withdraw-site">
                                                We may suspend or withdraw our site
                                        </a>
                                </li>
                                <li>
                                        <a href="#keep-account-details-safe">
                                                You must keep your account details safe
                                        </a> 
                                </li>
                                <li>
                                        <a href="#material-on-site">
                                                How you may use material on our site
                                        </a>
                                </li>
                                <li>
                                        <a href="#dont-rely-site-info">
                                                Do not rely on information on our site
                                        </a>
                                </li>
                                <li>
                                        <a href="#responsibility-external-links">
                                                We are not responsible for websites we link to
                                        </a>
                                </li>
                                <li>
                                        <a href="#content-not-approved">
                                                User-generated content is not approved by us
                                        </a>
                                </li>
                                <li>
                                        <a href="#our-responsibilty">
                                                Our responsibility for loss or damage suffered by you
                                        </a>
                                </li>
                                <li>
                                        <a href="exclusion-of-liability">
                                                Exclusion of liability for digital content
                                        </a>
                                </li>
                                <li>
                                        <a href="#use-your-info">
                                                How we may use your personal information 
                                        </a>
                                </li>
                                <li>
                                        <a href="#upload-content">
                                                Uploading content to our site
                                        </a>
                                </li>
                                <li>
                                        <a href="#rights-you-give">
                                                Rights you are giving us to use material you upload
                                        </a>
                                </li>
                                <li>
                                        <a href="#virus-responsibility">
                                                We are not responsible for viruses and you must not introduce them
                                        </a>
                                </li>
                                <li>
                                        <a href="#links-rules">
                                                Rules about linking to our site
                                        </a>
                                </li>
                                <li>
                                        <a href="#countries-laws">
                                                Which country's laws apply to any disputes?
                                        </a>
                                </li>
                        </ul>
                        <br/>
                        <h4 id="how-to-contact-us">
                                Who we are and how to contact us
                        </h4>
                        <p>
                                www.voostjobs.com is a site operated by My Job App Limited ("We"). We are a limited company registered in England and Wales under company number 10866837 and have our registered office at 102 Bold Street, Altrincham WA14 2EH.
                        </p>
                        <p>
                                To contact us, please e-mail info@voostjobs.com or telephone our customer service line on 10866837.
                        </p>
                        <h4 id="accepting-terms">
                                By using our site you accept these terms
                        </h4>
                        <p>
                                By using our site, you confirm that you accept these terms of use and that you agree to comply with them.
                        </p>
                        <p>
                                If you do not agree to these terms, you must not use our site.
                        </p>
                        <p>
                                We recommend that you print a copy of these terms for future reference
                        </p>
                        <br/>
                        <h4 id="#other-terms">
                                There are other terms that may apply to you
                        </h4>
                        <p>
                                These terms of use refer to the following additional terms, which also apply to your use of our site:
                        </p>
                        <ul>
                                <li>
                                Our <NavLink to="/privacy-policy">Privacy Policy </NavLink>. See further under the section below headed ‘How we may use your personal information’.
                                </li>
                                <li>
                                Our <NavLink to="/acceptable-use">Acceptable Use Policy</NavLink>, which sets out the permitted uses and prohibited uses of our site. When using our site, you must comply with this Acceptable Use Policy.
                                </li>
                                <li>
                                Our <NavLink to="/cookie-policy">Cookie Policy</NavLink>, which sets out information about the cookies on our site.
                                </li>
                        </ul>

                        <br/>
                        <h4 id="changes-to-terms">
                        We may make changes to these terms
                        </h4>
                        <p>
                        We amend these terms from time to time. Every time you wish to use our site, please check these terms to ensure you understand the terms that apply at that time. [These terms were most recently updated on [25/1/2020].]
                        </p>
                        <br/>
                        <h4 id="changes-to-site">
                        We may make changes to our site
                        </h4>
                        <p>
                        We may update and change our site from time to time. We will try to give you reasonable notice of any major changes.
                        </p>
                        <br/>
                        <h4 id="withdraw-site">
                        We may suspend or withdraw our site
                        </h4>
                        <p>
                        Our site is made available free of charge.
                        </p>
                        <p>
                        We do not guarantee that our site, or any content on it, will always be available or be uninterrupted. We may suspend or withdraw or restrict the availability of all or any part of our site for business and operational reasons. We will try to give you reasonable notice of any suspension or withdrawal.
                        </p>
                        <p>
                        You are also responsible for ensuring that all persons who access our site through your internet connection are aware of these terms of use and other applicable terms and conditions, and that they comply with them.
                        </p>
                        <br/>
                        <h4 id="keep-account-details-safe">
                        You must keep your account details safe
                        </h4>
                        <p>
                        If you choose, or you are provided with, a user identification code, password or any other piece of information as part of our security procedures, you must treat such information as confidential. You must not disclose it to any third party.
                        </p>
                        <p>
                                We have the right to disable any user identification code or password, whether chosen by you or allocated by us, at any time, if in our reasonable opinion you have failed to comply with any of the provisions of these terms of use.
                        </p>
                        <p>
                        If you know or suspect that anyone other than you knows your user identification code or password, you must promptly notify us at info@voostjobs.com.
                        </p>
                        <br/>
                        <h4 id="material-on-site">
                        How you may use material on our site
                        </h4>
                        <p>
                        We are the owner or the licensee of all intellectual property rights in our site, and in the material published on it. Those works are protected by copyright laws and treaties around the world. All such rights are reserved.
                        </p>
                        <p>
                        You may print off one copy, and may download extracts, of any page(s) from our site for your personal use and you may draw the attention of others within your organisation to content posted on our site.
                        </p>
                        <p>
                        You must not modify the paper or digital copies of any materials you have printed off or downloaded in any way, and you must not use any illustrations, photographs, video or audio sequences or any graphics separately from any accompanying text.
                        </p>
                        <p>
                        Our status (and that of any identified contributors) as the authors of content on our site must always be acknowledged.
                        </p>
                        <p>
                        You must not use any part of the content on our site for commercial purposes without obtaining a licence to do so from us or our licensors.  
                        </p>
                        <p>
                        If you print off, copy or download any part of our site in breach of these terms of use, your right to use our site will cease immediately and you must, at our option, return or destroy any copies of the materials you have made. 
                        </p>
                        <br/>
                        <h4 id="dont-rely-site-info">
                        Do not rely on information on this site
                        </h4>
                        <p>
                        The content on our site is provided for general information only. It is not intended to amount to advice on which you should rely. You must obtain professional or specialist advice before taking, or refraining from, any action on the basis of the content on our site.
                        </p>
                        <p>
                        Although we make reasonable efforts to update the information on our site, we make no representations, warranties or guarantees, whether express or implied, that the content on our site is accurate, complete or up to date.
                        </p>
                        <br/>
                        <h4 id="responsibility-external-links">
                                We are not responsible for websites we link to
                        </h4>
                        <p>
                                Where our site contains links to other sites and resources provided by third parties, these links are provided for your information only. Such links should not be interpreted as approval by us of those linked websites or information you may obtain from them.    
                        </p>
                        <p>
                                We have no control over the contents of those sites or resources.
                        </p>
                        <br/>
                        <h4 id="content-not-approved">
                                User-generated content is not approved by us
                        </h4>
                        <p>
                                This website may include information and materials uploaded by other users of the site, including to bulletin boards and chat rooms. This information and these materials have not been verified or approved by us. The views expressed by other users on our site do not represent our views or values.
                        </p>
                        <p>
                                If you wish to complain about information and materials uploaded by other users please contact us on <NavLink to="/contactUs">Contact us</NavLink>.
                        </p>
                        <br/>
                        <h4 id="our-responsibility">
                                Our responsibility for loss or damage suffered by you
                        </h4>

                        <p>
                                <span>
                                        Whether you are a consumer or a business user:
                                </span>
                        </p>

                        <ul>
                                <li>
                                        We do not exclude or limit in any way our liability to you where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence or the negligence of our employees, agents or subcontractors and for fraud or fraudulent misrepresentation.
                                </li>
                                <li>
                                        Different limitations and exclusions of liability will apply to liability arising as a result of the supply of any services to you, which will be set out in our terms and conditions of supply.
                                </li>
                        </ul>
                        <br/>
                        <h4 id="exclusion-of-liability">
                                If you are a business user:
                        </h4>
                        <ul>
                                <li>
                                        We exclude all implied conditions, warranties, representations or other terms that may apply to our site or any content on it
                                </li>
                                <li>
                                        We will not be liable to you for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with:

                                        <ol>
                                                <li>
                                                        use of, or inability to use, our site; and/or
                                                </li>
                                                <li>
                                                        use of or reliance on any content displayed on our site.
                                                </li>
                                        </ol>
                                </li>
                                <li>
                                        In particular, we will not be liable for:
                                        <ol>
                                                <li>
                                                        loss of profits, sales, business, or revenue;
                                                </li>
                                                <li>
                                                        business interruption;
                                                </li>
                                                <li>
                                                        loss of anticipated savings;
                                                </li>
                                                <li>
                                                        loss of business opportunity, goodwill or reputation; and/or
                                                </li>
                                                <li>
                                                        any indirect or consequential loss or damage
                                                </li>
                                        </ol>
                                </li>
                        </ul>
                        <p>
                                <span>
                                        If you are a consumer user:
                                </span>
                        </p>
                        <ul>
                                <li>
                                        Please note that we only provide our site for domestic and private use. You agree not to use our site for any commercial or business purposes, and we have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.
                                </li>
                                <li>
                                        If defective digital content that we have supplied damages a device or digital content belonging to you and this is caused by our failure to use reasonable care and skill, we will either repair the damage or pay you compensation. However, we will not be liable for damage that you could have avoided by following our advice to apply an update offered to you free of charge or for damage that was caused by you failing to correctly follow installation instructions or to have in place the minimum system requirements advised by us.
                                </li>
                        </ul>
                        <br/>
                        <h4 id="use-your-info">
                                How we may use your personal information
                        </h4>
                        <p>
                                We will only use your personal information as set out in our <NavLink to="privacy-policy">Privacy Policy</NavLink>.
                        </p>
                        <br/>
                        <h4 id="upload-content">
                                Uploading content to our site
                        </h4>
                        <p>
                                Whenever you make use of a feature that allows you to upload content to our site, or to make contact with other users of our site, you must comply with the content standards set out in our <NavLink to="acceptable-use">Acceptable Use Policy </NavLink>.
                        </p>
                        <p>
                                You warrant that any such contribution does comply with those standards, and you will be liable to us and indemnify us for any breach of that warranty. This means you will be responsible for any loss or damage we suffer as a result of your breach of warranty.
                        </p>
                        <p>
                                Any content you upload to our site will be considered non-confidential and non-proprietary. You retain all of your ownership rights in your content, but you are required to grant us and other users of our site a limited licence to use, store and copy that content and to distribute and make it available to third parties. The rights you license to us are described in the section below headed <a href="#rights-you-give">‘Rights you are giving us to use material you upload’</a>. 
                        </p>
                        <p>
                                We also have the right to disclose your identity to any third party who is claiming that any content posted or uploaded by you to our site constitutes a violation of their intellectual property rights, or of their right to privacy. 
                        </p>
                        <p>
                                We have the right to remove any posting you make on our site if, in our opinion, your post does not comply with the content standards set out in our <NavLink to="acceptable-use">Acceptable Use Policy </NavLink>.
                        </p>
                        <p>
                                You are solely responsible for securing and backing up your content.  
                        </p>
                        <br/>
                        <h4 id="rights-you-give">
                                Rights you are giving us to use material you upload  
                        </h4>
                        <p>
                                When you upload or post content to our site, you grant us the following rights to use that content: 
                        </p>
                        <ul>
                                <li>
                                        you grant us a non-exclusive, worldwide, perpetual and irrevocable licence, with the right to sub-license, to use such content for any commercial or non-commercial purpose; and
                                </li>
                                <li>
                                        you grant other users of the site a non-exclusive, worldwide, perpetual and irrevocable licence to use such content for personal and non-commercial purposes
                                </li>
                        </ul>
                        <br/>
                        <h4 id="virus-responsibility">
                                We are not responsible for viruses and you must not introduce them
                        </h4>
                        <p>
                                We do not guarantee that our site will be secure or free from bugs or viruses.
                        </p>
                        <p>
                                You are responsible for configuring your information technology, computer programmes and platform to access our site. You should use your own virus protection software.
                        </p>
                        <p>
                                You must not misuse our site by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful. You must not attempt to gain unauthorised access to our site, the server on which our site is stored or any server, computer or database connected to our site. You must not attack our site via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use our site will cease immediately.
                        </p>
                        <br/>
                        <h4 id="links-rules">
                                Rules about linking to our site
                        </h4>
                        <p>
                                You may link to our home page, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it.
                        </p>
                        <p>
                                You must not establish a link in such a way as to suggest any form of association, approval or endorsement on our part where none exists. 
                        </p>
                        <p>
                                You must not establish a link to our site in any website that is not owned by you. 
                        </p>
                        <p>
                                Our site must not be framed on any other site, nor may you create a link to any part of our site other than the home page.
                        </p>
                        <p>
                                We reserve the right to withdraw linking permission without notice.
                        </p>
                        <p>
                                The website in which you are linking must comply in all respects with the content standards set out in our <NavLink to="acceptable-use">Acceptable Use Policy </NavLink>.
                        </p>
                        <p>
                                If you wish to link to or make any use of content on our site other than that set out above, please contact info@voostjobs.com.  
                        </p>
                        <br/>
                        <h4 id="countries-laws">
                                Which country's laws apply to any disputes?
                        </h4>
                        <p>
                                If you are a consumer, please note that these terms of use, their subject matter and their formation, are governed by English law. You and we both agree that the courts of England and Wales will have exclusive jurisdiction except that if you are a resident of Northern Ireland you may also bring proceedings in Northern Ireland, and if you are resident of Scotland, you may also bring proceedings in Scotland. 
                        </p>
                        <p>
                                If you are a business, these terms of use, their subject matter and their formation (and any non-contractual disputes or claims) are governed by English law. We both agree to the exclusive jurisdiction of the courts of England and Wales.  
                        </p>
                        <br/>
                </TermsWrap>
        </LegalCopyWrap>
        </BorderContainer>
       
    )
}