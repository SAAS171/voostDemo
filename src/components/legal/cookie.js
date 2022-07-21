import React from 'react';
import styled from 'styled-components';

//Styles
import {H3, H4, P, BorderContainer, LegalCopyWrap} from '../../styles/components/shared-components';

const CookieWrap = styled.div`
    ul {
        margin-left: 20px;
    }
    ul li {
        margin: 10px 0;
    }

    span{
        font-weight: bold;
    }
`
export default function CookieContent() {
    return (
        <BorderContainer>
            <LegalCopyWrap>
                <CookieWrap>
                    <H3>
                        Information about our use of cookies
                    </H3>
                    <br/>
                    <p>
                        Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. By continuing to browse the site, you are agreeing to our use of cookies.
                    </p>
                    <br/>
                    <p>
                        A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer's hard drive.
                    </p>
                    <br/>
                    <p>
                        We use the following cookies:
                    </p>
                    <br/>
                    <ul>
                        <li>
                            <span>Strictly necessary cookies.</span> These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website.
                        </li>
                        <li>
                            <span>Analytical/performance cookies.</span> They allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
                        </li>
                        <li>
                            <span>Functionality cookies.</span> These are used to recognise you when you return to our website. This enables us to personalise our content for you, greet you by name and remember your preferences (for example, your choice of language or region).
                        </li>
                        <li>
                            <span>Targeting cookies.</span> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose.
                        </li>
                    </ul>
                    <br/>

                    <table>
                        <tr>
                            <td colSpan="1">
                                <span>
                                    Cookie
                                </span>
                            </td>
                            <td colSpan="1">
                                <span>Name</span>
                            </td>
                            <td colSpan="1">
                                <span>
                                    Purpose
                                </span>
                            </td>
                            <td colSpan="1">
                                <span>
                                    More information
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="1"> [COOKIE TITLE] </td>
                            <td colSpan="1"> [COOKIE NAME] </td>
                            <td colSpan="1"> [DESCRIPTION OF THE PURPOSE FOR WHICH THE COOKIE IS USED] This cookie is essential for out site, it enables us to [INSERT HERE] </td>
                            <td colSpan="1"> [WHERE APPROPRIATE INSERT LINK TO EXTERNAL INFORMATION] </td>
                        </tr>
                    </table>

                    {/* ///////////////////////////////////////////////////// TABLE GOES HERE ///////////////////////////////////////////////////////////////////////*/}
                    {/* ///////////////////////////////////////////////////// TABLE GOES HERE ///////////////////////////////////////////////////////////////////////*/}
                    {/* ///////////////////////////////////////////////////// TABLE GOES HERE ///////////////////////////////////////////////////////////////////////*/}
                    {/* ///////////////////////////////////////////////////// TABLE GOES HERE ///////////////////////////////////////////////////////////////////////*/}
                    {/* ///////////////////////////////////////////////////// TABLE GOES HERE ///////////////////////////////////////////////////////////////////////*/}
                    {/* ///////////////////////////////////////////////////// TABLE GOES HERE ///////////////////////////////////////////////////////////////////////*/}
                    {/* ///////////////////////////////////////////////////// TABLE GOES HERE ///////////////////////////////////////////////////////////////////////*/}
                    {/* ///////////////////////////////////////////////////// TABLE GOES HERE ///////////////////////////////////////////////////////////////////////*/}
                    {/* ///////////////////////////////////////////////////// TABLE GOES HERE ///////////////////////////////////////////////////////////////////////*/}
                    <br/>
                    <p>
                        Please note that third parties (including, for example, advertising networks and providers of external services like web traffic analysis services) may also use cookies, over which we have no control. These cookies are likely to be analytical/performance cookies or targeting cookies.
                    </p>
                    <br/>
                    <p>
                        You block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our site.
                    </p>
                    <br/>
                    <p>
                        Except for essential cookies, all cookies will expire after [INSERT EXPIRY PERIOD].
                    </p>
                </CookieWrap>

{/* 

<br/>
<br/>
<br/>
<br/>

<br/><br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>



            <p class="c16"><span class="c9">Information about our use of cookies</span></p>
    <p class="c7"><span class="c4">Our website uses cookies to distinguish you from other users of our website. This
            helps us to provide you with a good experience when you browse our website and also allows us to improve our
            site. By continuing to browse the site, you are agreeing to our use of cookies.</span></p>
    <p class="c7"><span class="c4">A cookie is a small file of letters and numbers that we store on your browser or the
            hard drive of your computer if you agree. Cookies contain information that is transferred to your
            computer&#39;s hard drive.</span></p>
    <p class="c7"><span class="c4">We use the following cookies: </span></p>
    <ul class="c11 lst-kix_4femv223398h-0 start">
        <li class="c0 li-bullet-0"><span class="c4">Strictly necessary cookies. These are cookies that are required for
                the operation of our website. They include, for example, cookies that enable you to log into secure
                areas of our website. </span></li>
        <li class="c0 li-bullet-0"><span class="c4">Analytical/performance cookies. They allow us to recognise and count
                the number of visitors and to see how visitors move around our website when they are using it. This
                helps us to improve the way our website works, for example, by ensuring that users are finding what they
                are looking for easily. </span></li>
        <li class="c0 li-bullet-0"><span class="c4">Functionality cookies. These are used to recognise you when you
                return to our website. This enables us to personalise our content for you, greet you by name and
                remember your preferences (for example, your choice of language or region).</span></li>
        <li class="c0 li-bullet-0"><span class="c4">Targeting cookies. These cookies record your visit to our website,
                the pages you have visited and the links you have followed. We will use this information to make our
                website and the advertising displayed on it more relevant to your interests. We may also share this
                information with third parties for this purpose.</span></li>
    </ul>
    <p class="c7"><span class="c4">You can find more information about the individual cookies we use and the purposes
            for which we use them in the table below:</span></p><a
        id="t.8538ae70978bd72f09422c0e7ef8bd4a7a251f1d"></a><a id="t.0"></a>
    <table class="c2">
        <tbody>
            <tr class="c6">
                <td class="c10" colspan="1" rowspan="1">
                    <p class="c3"><span class="c4">Cookie</span></p>
                </td>
                <td class="c10" colspan="1" rowspan="1">
                    <p class="c3"><span class="c4">Name</span></p>
                </td>
                <td class="c5" colspan="1" rowspan="1">
                    <p class="c3"><span class="c4">Purpose</span></p>
                </td>
                <td class="c12" colspan="1" rowspan="1">
                    <p class="c3"><span class="c4">More information</span></p>
                </td>
            </tr>
            <tr class="c14">
                <td class="c10" colspan="1" rowspan="1">
                    <p class="c3"><span class="c4">[COOKIE TITLE]</span></p>
                </td>
                <td class="c10" colspan="1" rowspan="1">
                    <p class="c3"><span class="c4">[COOKIE NAME]</span></p>
                </td>
                <td class="c5" colspan="1" rowspan="1">
                    <p class="c3"><span class="c4">[DESCRIPTION OF THE PURPOSE FOR WHICH THE COOKIE IS USED]</span></p>
                    <p class="c3"><span class="c4">Examples of purposes for which a cookie may be used:</span></p>
                    <p class="c3"><span class="c4">&nbsp;</span></p>
                    <p class="c3"><span class="c4">This cookie [is essential for our site to][enables us to]:</span></p>
                    <ul class="c11 lst-kix_z827yuu729oj-0 start">
                        <li class="c0 li-bullet-0"><span class="c4">[Estimate our audience size and usage
                                pattern.]</span></li>
                        <li class="c0 li-bullet-0"><span class="c4">[Store information about your preferences, and so
                                allow us to customise our site and to provide you with offers that are targeted at your
                                individual interests.]</span></li>
                        <li class="c0 li-bullet-0"><span class="c4">[Speed up your searches.]</span></li>
                        <li class="c0 li-bullet-0"><span class="c4">[Recognise you when you return to our site.]</span>
                        </li>
                        <li class="c0 li-bullet-0"><span class="c4">[Allow you to use our site in a way that makes your
                                browsing experience more convenient, for example, by allowing you to store items in an
                                electronic shopping basket between visits. If you register with us or complete our
                                online forms, we will use cookies to remember your details during your current visit,
                                and any future visits provided the cookie was not deleted in the interim.]</span></li>
                        <li class="c0 li-bullet-0"><span class="c4">[OTHER PURPOSES]</span></li>
                    </ul>
                </td>
                <td class="c12" colspan="1" rowspan="1">
                    <p class="c3"><span class="c4">[WHERE APPROPRIATE, INSERT LINK TO EXTERNAL INFORMATION]</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p class="c7"><span class="c4">Please note that third parties (including, for example, advertising networks and
            providers of external services like web traffic analysis services) may also use cookies, over which we have
            no control. These cookies are likely to be analytical/performance cookies or targeting cookies.</span></p>
    <p class="c7"><span class="c4">You block cookies by activating the setting on your browser that allows you to refuse
            the setting of all or some cookies. However, if you use your browser settings to block all cookies
            (including essential cookies) you may not be able to access all or parts of our site. </span></p>
    <p class="c7"><span class="c4">Except for essential cookies, all cookies will expire after [INSERT EXPIRY
            PERIOD].</span></p>
    <p class="c13"><span class="c17"></span></p>
    <p class="c1"><span class="c15"></span></p> */}
        </LegalCopyWrap>
        </BorderContainer>
       
    )
}