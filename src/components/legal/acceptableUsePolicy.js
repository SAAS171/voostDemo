import React from 'react';
import styled from 'styled-components';
import {H3,   BorderContainer, LegalCopyWrap} from '../../styles/components/shared-components';
import * as global from '../../styles/components/globalVariables';
import {NavLink} from 'react-router-dom';

const AcceptableUseWrap = styled.div`
    ol li a{
        color: black;
        transition: .2s;
        
        &:hover{
            color: ${global.colorRed};
            text-decoration: none;
        }
    }
    ul {
        list-style: none;
        a{
            color: ${global.colorRed};
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

    .list-indent{
        text-indent: 10px;

        li{
            margin-left: 10px;
        }

        & li::before{
            margin-right: 10px;
        }
    }

    p{
        a{
            color: ${global.colorRed};
        }
    }
`

function AcceptableUsePolicy(){
    return(
        <BorderContainer>
            <LegalCopyWrap>
                <AcceptableUseWrap>
                    <H3>
                        PLEASE READ THE TERMS OF THIS POLICY CAREFULLY BEFORE USING THE SITE
                    </H3>
                    <h4>
                        What's in these terms?
                    </h4>
                    <p>
                        This acceptable use policy sets out the content standards that apply when you upload content to our site, make contact with other users on our site, link to our site, or interact with our site in any other way,

                        Click on the links below to go straight to more information on each area:

                        [ADD INDEX]
                    </p>
                    <ol>
                        <li><a href="#who-we-are">Who we are and how to contact us</a></li>
                        <li><a href="#accpeting-terms">By using our site you accept these terms</a></li>
                        <li><a href="#other-terms-that-apply">There are other terms that may apply to you</a></li>
                        <li><a href="#changes-to-our-policy">We may make changes to the terms of this policy</a></li>
                        <li><a href="#prohibited-uses">Prohibited uses</a></li>
                        <li><a href="#interactive-services">Interactive services</a></li>
                        <li><a href="#content-standards">Content standards</a></li>
                        <li><a href="#breach-of-policy">Breach of this policy</a></li>
                        <li><a href="#countrys-laws">Which country's laws apply to any disputes?</a></li>
                    </ol>

                    <h4 id="who-we-are">
                        Who we are and how to contact us
                    </h4>
                    <p>
                        www.voostjobs.com is a site operated by My Job App Limited ("We"). We are a limited company registered in England and Wales under company number 10866837 and have our registered office at 102 Bold Street, Altrincham WA14 2EH. 

                        To contact us, please e-mail info@voostjobs.com [or telephone our customer service line on [10866837]].
                    </p>
                    <h4 id="accpeting-terms">
                        By using our site you accept these terms
                    </h4>
                    <p>
                        By using our site, you confirm that you accept the terms of this acceptable use policy and that you agree to comply with them.
                    </p>
                    <p>
                        If you do not agree to these terms, you must not use our site.
                    </p>
                    <p>
                        We recommend that you print a copy of these terms for future reference.
                    </p>
                    <h4 id="other-terms-that-apply">
                        There are other terms that may apply to you
                    </h4>
                    <p>
                        Our <NavLink to="/terms">terms of website use</NavLink> also apply to your use of our site.
                    </p>
                    <h4 id="changes-to-our-policy">
                        We may make changes to the terms of this policy
                    </h4>
                    <p>
                        We amend these terms from time to time. Every time you wish to use our site, please check these terms to ensure you understand the terms that apply at that time. [These terms were most recently updated on [25/01/21].]
                    </p>
                    <h4 id="prohibited-uses">
                        Prohibited uses
                    </h4>
                    <p>
                        You may use our site only for lawful purposes. You may not use our site:
                    </p>
                    <ul>
                        <li>
                            in any way that breaches any applicable local, national or international law or regulation;
                        </li>
                        <li>
                            in any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect;
                        </li>
                        <li>
                            for the purpose of harming or attempting to harm minors in any way;
                        </li>
                        <li>
                            to send, knowingly receive, upload, download, use or re-use any material which does not comply with our <a href="#content-standards">content standards</a>;
                        </li>
                        <li>
                            to transmit, or procure the sending of, any unsolicited or unauthorised advertising or promotional material or any other form of similar solicitation (spam); and/or
                        </li>
                        <li>
                            to knowingly transmit any data, send or upload any material that contains viruses, Trojan horses, worms, time-bombs, keystroke loggers, spyware, adware or any other harmful programs or similar computer code designed to adversely affect the operation of any computer software or hardware.
                        </li>
                    </ul>
                    <p>
                        You also agree:
                    </p>
                    <ul>
                        <li>
                            not to reproduce, duplicate, copy or re-sell any part of our site in contravention of the provisions of our <NavLink to="/terms">terms of website use</NavLink>; and
                        </li>
                        <li>
                            not to access without authority, interfere with, damage or disrupt:

                            <ul className="list-indent">
                                <li>
                                    any part of our site;
                                </li>
                                <li>
                                    any equipment or network on which our site is stored;
                                </li>
                                <li>
                                    any software used in the provision of our site; and/or
                                </li>
                                <li>
                                    any equipment or network or software owned or used by any third party.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <h4 id="interactive-services">
                        Interactive services
                    </h4>
                    <p>
                        We may from time to time provide interactive services on our site, including, without limitation:
                    </p>
                    <ul>
                        <li>
                            live chat facility; and
                        </li>
                        <li>
                            instant messaging.
                        </li>
                    </ul>
                    <p>
                        Where we do provide any interactive service, we will provide clear information to you about the kind of service offered, if it is moderated and what form of moderation is used (including whether it is human or technical).
                    </p>
                    <p>
                        We will do our best to assess any possible risks for users (and in particular, for children) from third parties when they use any interactive service provided on our site, 
                        and we will decide in each case whether it is appropriate to use moderation of the relevant service (including what kind of moderation to use) in the light of those risks.
                         However, we are under no obligation to oversee, monitor or moderate any interactive service we provide on our site, and we expressly exclude our liability for any loss or damage arising from the use of any interactive
                          service by a user in contravention of our content standards, whether the service is moderated or not.
                    </p>
                    <p>
                        The use of any of our interactive services by a minor is subject to the consent of their parent or guardian. We advise parents who permit their children to use an interactive service that it is important that they communicate with their children about their safety online, as moderation is not fool proof. Minors who are using any interactive service should be made aware of the potential risks to them.
                    </p>
                    <p>
                        Where we do moderate an interactive service, we will normally provide you with a means of contacting the moderator, should a concern or difficulty arise.
                    </p>

                    <h4 id="content-standards">
                        Content standards
                    </h4>
                    <p>
                        These content standards apply to any and all material which you contribute to our site <span>(Contribution) </span>, and to any interactive services associated with it.
                    </p>
                    <p>
                        The content standards must be complied with in spirit as well as to the letter. The standards apply to each part of any Contribution as well as to its whole.
                    </p>
                    <p>
                        My Job App Limited will determine, at its sole discretion, whether a Contribution breaches any and/or all of the content standards.
                    </p>
                    <p>
                        A Contribution must:
                    </p>
                    <ul>
                        <li>
                            be accurate (where it states facts);
                        </li>
                        <li>
                            be accurate (where it states facts);
                        </li>
                        <li>
                            comply with the law applicable in England and Wales and in any country from which it is posted.
                        </li>
                    </ul>
                    <p>
                        A Contribution must not:
                    </p>
                    <ul>
                        <li>
                            be defamatory of any person;
                        </li>
                        <li>
                            be obscene, offensive, hateful or inflammator
                        </li>
                        <li>
                            promote sexually explicit material;
                        </li>
                        <li>
                            promote violence;
                        </li>
                        <li>
                            promote discrimination based on race, sex, religion, nationality, disability, sexual orientation or age;
                        </li>
                        <li>
                            infringe any intellectual property right of any other person;
                        </li>
                        <li>
                            be likely to deceive any person;
                        </li>
                        <li>
                            breach any legal duty owed to a third party, such as a contractual duty or a duty of confidence;
                        </li>
                        <li>
                            promote any illegal activity;
                        </li>
                        <li>
                            be in contempt of court;
                        </li>
                        <li>
                            be threatening, abuse or invade another's privacy, or cause annoyance, inconvenience or needless anxiety;
                        </li>
                        <li>
                            be likely to harass, upset, embarrass, alarm or annoy any other person;
                        </li>
                        <li>
                            impersonate any person, or misrepresent your identity or affiliation with any person;
                        </li>
                        <li>
                            give the impression that the Contribution emanates from My Job App Limited, if this is not the case;
                        </li>
                        <li>
                            advocate, promote, incite any party to commit, or assist any unlawful or criminal act such as (by way of example only) copyright infringement or computer misuse;
                        </li>
                        <li>
                            contain a statement which you know or believe, or have reasonable grounds for believing, that members of the public to whom the statement is, or is to be, published are likely to understand as a direct or indirect encouragement or other inducement to the commission, preparation or instigation of acts of terrorism; and/or
                        </li>
                        <li>
                            contain any advertising or promote any services or web links to other sites
                        </li>
                    </ul>
                    <h4 id="breach-of-policy">
                        Breach of this policy
                    </h4>
                    <p>
                        When we consider that a breach of this acceptable use policy has occurred, we may take such action as we deem appropriate.
                    </p>
                    <p>
                        Failure to comply with this acceptable use policy constitutes a material breach of the <NavLink to="/terms">terms of use</NavLink> upon which you are permitted to use our site and may result in our taking all or any of the following actions:
                    </p>
                    <ul>
                        <li>
                            immediate, temporary or permanent withdrawal of your right to use our site;
                        </li>
                        <li>
                            immediate, temporary or permanent removal of any Contribution uploaded by you to our site;
                        </li>
                        <li>
                            issue of a warning to you;
                        </li>
                        <li>
                            legal proceedings against you for reimbursement of all costs on an indemnity basis (including, but not limited to, reasonable administrative and legal costs) resulting from the breach;
                        </li>
                        <li>
                            further legal action against you; and/or
                        </li>
                        <li>
                            disclosure of such information to law enforcement authorities as we reasonably feel is necessary or as required by law.
                        </li>
                    </ul>
                    <p>
                        We exclude our liability for all action we may take in response to breaches of this acceptable use policy. The actions we may take are not limited to those described above and we may take any other action we reasonably deem appropriate.
                    </p>
                    <h4 id="countrys-laws">
                        Which country's laws apply to any disputes?
                    </h4>
                    <p>
                        If you are a consumer, please note that the terms of this policy, its subject matter and its formation are governed by English law. You and we both agree that the courts of England and Wales will have exclusive jurisdiction except that if you are a resident of Northern Ireland you may also bring proceedings in Northern Ireland, and if you are resident of Scotland, you may also bring proceedings in Scotland.
                    </p>
                    <p>
                        If you are a business, the terms of this policy, its subject matter and its formation (and any non-contractual disputes or claims) are governed by English law. We both agree to the exclusive jurisdiction of the courts of England and Wales.
                    </p>
                </AcceptableUseWrap>
            </LegalCopyWrap>
        </BorderContainer>
    )
};

export default AcceptableUsePolicy;