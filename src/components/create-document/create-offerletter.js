import React, { useEffect, useState, useRef }  from 'react';
import {useHistory} from 'react-router-dom';  
import {Animated} from "react-animated-css"; 
import styled from 'styled-components';  
import Button from '../shared-components/button';

import signbg from "../../assets/svg/sign-bg.svg";
import SignatureCanvas from "react-signature-canvas";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from 'react-redux'; 
import { requestCreateOfferLetter, createdOffer } from '../../store/actions/actions'; 
// import phone from '../../assets/svg/phone.svg';  

import PreviewDocument from "../preview-document/preview-document";
import Notiflix from 'notiflix'; 




const CreateOfferLetterContainer = styled.div`  



    .title-container{
        max-width: 900px;
        width: 100%;
        margin: 40px auto;
        h1{
            text-align: center;
        }
        .progress-container{
            margin-top: 40px;
            display: block;
            text-align: left;
            p{
                margin-top: 10px;
                color: grey;
                font-weight: 600;
            }
            .progress-inner{
                margin-top: 15px;
                height: 10px;
                border-radius: 25px;
                background-color: whitesmoke;
                overflow: hidden;
                position: relative;
                &:before{
                    content: "";
                    position: absolute;
                    border-top-right-radius: 25px;
                    border-bottom-right-radius: 25px;
                    background-color: #DC3163;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 0;
                    transition: ease-in-out 200ms all;
                }
                
                &.percent-5{
                    /* background-color: green; */
                    &:before{
                        width: 5%; 
                    }
                }

                &.percent-10 {
                    &:before{
                        width: 10%;  
                    }  
                }
                &.percent-15 {
                    &:before{
                        width: 15%;   
                    } 
                }
                &.percent-20 {
                    &:before{
                        width: 20%;   
                    } 
                }
                &.percent-30 {
                    &:before{
                    width: 30%;   
                    } 
                }
                &.percent-40 {
                    &:before{
                        width: 40%;   
                    } 
                }
                &.percent-50 {
                    &:before{
                        width: 50%;    
                    } 
                }
                &.percent-60 {
                    &:before{
                        width: 60%;    
                    } 
                }
                &.percent-70 {
                    &:before{
                        width: 70%;    
                    } 
                }
                &.percent-80 {
                    &:before{
                        width: 80%;    
                    } 
                }
                &.percent-85 {
                    &:before{
                        width: 85%;  
                    } 
                }
                &.percent-90 {
                    &:before{
                        width: 90%;  
                    } 
                }
            }
        }

    }

    .react-datepicker-wrapper{
        width: 100%;
        flex-shrink: 0;
        .react-datepicker__input-container{
            width: 100%;
            input{ 
                width: 100%;
                padding: 15px;
                border-radius: 10px;
                border: 1px solid transparent;
                box-shadow: 0 0 20px -7px rgba(0,0,0,0.5);
                background-color: white;
                outline: none; 
                font-size: 23px;
                padding-right: 50px; 
                background-size: 25px;
                background-position: calc(100% - 18px) 50%;
                background-repeat: no-repeat;
                &:focus{
                    border: 1px solid #6FC7BA;
                }
            }
        } 
    }
    
    .react-datepicker__tab-loop{ 
        position: absolute;
        width: calc(50% - 10px);
        .react-datepicker-popper{
            /* width: calc(50% - 10px) ; */

            top: -20px!important; 
            right: 0px;
            left: 0;
            margin: 10px auto;    
            width: 100%;
            transform: none!important;
            .react-datepicker, .react-datepicker__month-container {  
                    width: 100%;
                    .react-datepicker__week{
                    display: flex;
                    width: 100%;
                    justify-content: space-evenly;
                    }
            }
            .react-datepicker__day--selected,
            .react-datepicker__day--keyboard-selected{
                background-color: #dc3163;

            }
        }
        .react-datepicker{ 
            border: 1px solid #6FC7BA;
        }
        .react-datepicker__header{
            background-color: white;
            border: none;

        }
        .react-datepicker__triangle{
            display: none;
            border-bottom-color: #fff;
        }
    }
    .steps-container{
        display: grid;
        align-items: flex-start;
        > *{
            grid-column: 1;
            grid-row: 1;
        }
        .offerLetter-step{
            p{ 
                display: flex;
                justify-content: flex-start;
                margin: 0;
                height: 100%;
                align-items: flex-start;
                padding-top: 10px;
                font-size: 22px;
                color: grey;
                span {
                    cursor: pointer;
                    margin: 0 30px 0 0 ;
                }
            }
            &.step-offerParties{
                .party-inputs{
                    display: flex;
                    justify-content: space-between;
                    fieldset{
                        display: flex;
                        flex-direction: column;

                    }
                    > *{
                        width: calc(50% - 15px);
                    }
                }
            } 
            &.step-outlines{
                input{
                    width: 100%;
                }
            }
            &.step-holiday{
                p{ 
                    display: flex;
                    justify-content: flex-start;
                    margin: 0;
                    height: 100%;
                    align-items: flex-start;
                    padding-top: 10px;
                    font-size: 22px;
                    color: grey;
                }
                span {
                    cursor: pointer;
                    margin: 0 30px 0 0 ;
                }
                
            }
            &.step-notice{
                
            }
            &.offerLetter-step 
            &.step-workAddress,
            &.step-benefits,
            &.step-probation,
            &.step-hours,
            &.step-salary,
            &.step-terms,
            &.step-pension{ 
                
                
            }
            max-width: 900px;
            margin: 40px auto;
            display: block;
            width: 100%;
            text-align: left;
            .step-title{
                margin-bottom: 30px;
                p{
                    font-size: 24px;
                    letter-spacing: 1px;
                    color: #4C567C;
                }

            }
            .buttons-container{
                text-align: center;
            }
            label{
                color: #4C567C;
                margin-bottom: 5px;
                font-size: 21px;
            }
            button.custom-check{
                margin: 0 0 0 10px ;
                pointer-events: none;
                border: 1px solid lightgrey;
                background-color: transparent;
                border-radius: 4px;
                display: inline;
                height: 20px;
                width: 20px;
                transition: ease-in-out 200ms all;
                &.checked{
                    transition: ease-in-out 200ms all;
                    background-color: red; 
                }
            }
            textarea,
            input[type=number],
            input[type=text]{ 
                background-color: white;
                border-radius: 10px;
                border: 1px solid transparent;
                box-shadow: 0 0 20px -7px rgba(0,0,0,0.5); 
                margin-bottom: 20px;
                width: 100%; 
                padding: 18px;
                outline: none;
                font-size: 23px;
            }
 
            .clearSign{
                position: absolute;
                bottom: 6px;
                right: 0;
                border: none;
                background-color: #dd3162;
                color: white;
                padding: 5px 30px;
                font-size: 12px;
                border-bottom-right-radius: 10px;
                border-top-left-radius: 10px;
                outline: none;

            }
            fieldset{  
                margin: 40px 0;
                position: relative;
                &.center-fieldset{
                    text-align: center;
                }
                &.canvas-fieldset{
                    background-color: white;
                    background-image: url(${signbg});
                    background-position: center;
                    background-size: 150%;
                    background-repeat: no-repeat;
                    canvas{ 
                        border-radius: 10px;
                        box-shadow: 0 0 20px -7px rgba(0,0,0,0.5);
                        width: 100%;
                        outline: none;
                        background-color: transparent;
                    }
                    &.removebg{
                        background-image: none;
                    }
                }
                &.fieldset-half{
                    display: flex;
                    justify-content: space-between; 
                    .fieldset-inner-half{
                        display: flex;
                        flex-direction: column;
                        width: calc(50% - 15px)
                    }
                }
                &.column-flex{
                    flex-direction: column;
                }
            }
            .custom-select-container{
                position: relative;
                .custom-select{ 
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 300px;
                    height: auto;
                    opacity: 0;
                    pointer-events: none; 
                    border-radius: 2px;
                    transition: ease-in-out 200ms all;
                    overflow: hidden;
                    box-shadow: 0 0 20px -7px rgba(0,0,0,0.5); 
                    padding: 20px;
                    li {
                        color: #4C567C;
                        display: block;
                        line-height: 1.6;
                        font-size: 19px;
                        margin-bottom: 10px;
                        cursor: pointer;

                    }
                    &.display-select{
                        pointer-events: all;
                        transition: ease-in-out 200ms all;
                        opacity: 1;
                    }

                } 
            }
        }

    }
    .realTimePreview{ 
        padding: 100px;
        background: whitesmoke;
    }
    .display-none{
        display: none!important;
    }

    @media screen and (max-width: 992px) { 
        .realTimePreview {
            padding: 20px 10px!important;
            .offerLetter-document .companyAddress{
                position: relative!important;
            }
        }
        .title-container {
            max-width: 100vw!important;
            width: 100%!important;
            margin: 70px auto 0!important;
            padding: 0 15px!important;
            h1{
                font-size: 30px!important;
            }
        }
        .steps-container {
            padding: 0 15px!important;
            > *{
                max-width: calc(100vw - 30px)!important;
            }
            .offerLetter-step{
                margin: 5px 0!important;
                max-width: 100vw!important;
                padding: 30px 0;
                &.step-jobType, 
                &.step-salary,
                &.step-hours,
                &.step-holiday,
                &.step-pension    { 
                    p{
                        flex-direction: column;
                        margin-bottom: 10px;
                        span {
                            margin: 0 0 10px;
                            button.custom-check {
                                margin: 0 0px 0 10px!important;
                            }
                        }
                    }
                }
                .react-datepicker-popper,
                .react-datepicker__tab-loop{
                    z-index: 99999999!important;
                    position: relative!important;
                    width: 100%!important;
                }
                .custom-select.display-select {
                    position: relative!important;
                    margin-bottom: 10px;
                }
                fieldset{
                    width: 100%!important;
                    margin: 0!important;
                    &.fieldset-half{
                        flex-direction: column;
                        .fieldset-inner-half{
                            width: 100%;
                        }
                    }
                }
                .canvas-fieldset { 
                    background-size: auto!important;
                    margin-bottom: 40px!important;
                }
                input[type=text] { 
                    padding: 10px!important; 
                    font-size: 17px!important;
                }
                button.custom-check{
                    margin: 0 10px 0 0!important;
                }
                .workAddress-inputs{
                    p span{ 
                        margin: 0 0 10px;
                        font-size: 19px;

                    }
                }
                 
            } 
        }
    }
`

export default function CreateOfferLetter(){
    const history = useHistory()
    const dispatch = useDispatch();    
    const createOfferLetter = useSelector(state => state.offerCreation)
    const {currentApplicant, job } = history.location.state ;
    const [currentProgress, setCurrentProgress] = useState("5");
    const [sigUrl, setSigUrl] = useState(""); 
    const ref = useRef();
 
    const [terminationSelectState, setTerminationSelectState] = useState(false);
    
    const [employerAddressAsWorkAddress, setEmployerAddressAsWorkAddress] = useState(false);
    const [typeValue, setTypeValue] = useState(""); 
    const [salaryTypeValue, setSalaryTypeValue] = useState("");
    const [payTypeValue, setPayTypeValue] = useState("");
    const [startDate, setLocalStartDate] = useState("");
    const [endDate, setLocalEndDate] = useState("");
    const [localExpirationDate, setLocalExpirationDate] = useState("");
    const [localSendDate, setLocalSendDate] = useState("");
    const [signBg, setSignBg] = useState(true);


    
    const [includedValue, setIncludedValue] = useState("");
    
    const [lunchHourTypeValue, setLunchHourTypeValue] = useState("");
    const [lunchPaidTypeValue, setLunchPaidTypeValue] = useState("");


    // const [probationValue, setProbationValue] = useState("");
    const [pensionValue, setPensionValue] = useState("");

    const [titleState, setTitleState] = useState("Offer of Employment");
    // const [createOfferLetterCurrent, setCreateOfferLetterCurrent] =    useState("offerDate")  
    const [createOfferLetterCurrent, setCreateOfferLetterCurrent] =   useState("startCompanyDetails")  
    const obj = {
        job_id: currentApplicant.b.jobId,
        application_id: currentApplicant.b.applicationId, 
        applicant_uid: currentApplicant.a.id,
        companyNumber: "",
        companyName: job.recruiter_name,
        
        jobTitle: job.jobTitle,
        jobDescription: job.description,
        signUrl: "",
        
        employerPosition: "",
        employerFirstname: "",
        employerLastname: "", 
        startDate: "",
        
        employeeLastname: currentApplicant.a.cvProfile.lastname,
        employeeFirstname: currentApplicant.a.cvProfile.firstname  ,
        
        addressLineOne: "",
        addressLineTwo: "",
        county: "",
        postcode: "",
        
        workAddressLineOne: "",
        workAddressLineTwo: "",
        workAddressCounty: "",
        workAddressPostcode: "", 


        employeeAddressLineOne:"",
        employeeAddressLineTwo:"",
        employeeCounty:"",
        employeePostcode:"",


        offerType: "" ,
        startDate: "",
        finishDate: "",
        
        salaryAmount: "",
        salaryType: "",
        payType: "",

        pensionScheme: "",
        pensionSchemeName: "",
        pensionSchemeContribution: "",
        
        lunchPaidType: "",
        lunchType: "",
        terminationPeriod: "",
        
        startTime: "",
        finishTime: "", 

        expirationDate: "",
        sendDate: "",


        holidays: 0, 
        holidayIncluded: "",


        workDays: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }, 
    }
    
    const [offerLetterData, setOfferLetterData] = useState({...obj});
    
    


    useEffect(() =>{ 
        console.log("offerLetterData......", offerLetterData)     
    },[offerLetterData])




    useEffect(() =>{
        if(createOfferLetter.loading) Notiflix.Loading.Circle("Creating Offer Letter") 
        if(createOfferLetter.errors) Notiflix.Report.Failure( 'Offer Letter Failed', 'We were unable to create your Offer letter, Please try again.', 'OK' ); 

        if(createOfferLetter.offerCreated){ 
            Notiflix.Loading.Remove(); 
            history.push( {pathname: "/complete-document", state: { documentType: "offerLetter", documentData: {...offerLetterData}  }});
            dispatch(createdOffer(false)); 
        } 
    },[createOfferLetter])
    
    
    
    useEffect(()=>{   
        let cd = {
            ...offerLetterData, 
            offerType: typeValue
        }
        setOfferLetterData(cd);
    }, [typeValue])

    useEffect(()=>{ 
        let cd = {...offerLetterData, salaryType : salaryTypeValue}
        setOfferLetterData(cd);
    }, [salaryTypeValue])

    useEffect(()=>{ 
        let cd = {...offerLetterData, payType : payTypeValue}
        setOfferLetterData(cd);
    }, [payTypeValue])

    useEffect(()=>{ 
        let cd = {...offerLetterData, holidayIncluded : includedValue}
        setOfferLetterData(cd);
    }, [includedValue])


    useEffect(()=>{ 
        let cd = {...offerLetterData, lunchPaidType : lunchPaidTypeValue}
        setOfferLetterData(cd);
    }, [lunchPaidTypeValue])

    useEffect(()=>{ 
        let cd = {...offerLetterData, lunchType : lunchHourTypeValue}
        setOfferLetterData(cd);
    }, [lunchHourTypeValue])

    
    useEffect(()=>{  
        if(employerAddressAsWorkAddress){  
            let cd = {
                ...offerLetterData, 
                workAddressLineOne: offerLetterData.addressLineOne,
                workAddressLineTwo: offerLetterData.addressLineTwo,
                workAddressCounty: offerLetterData.county,
                workAddressPostcode: offerLetterData.postcode
            }
            setOfferLetterData(cd);

        }else{
            let cd = {
                ...offerLetterData, 
                workAddressLineOne: "",
                workAddressLineTwo: "",
                workAddressCounty: "",
                workAddressPostcode: ""
            }    
            setOfferLetterData(cd); 

        } 
    }, [employerAddressAsWorkAddress])


    useEffect(()=>{ 
        let cd = {...offerLetterData, pensionScheme : pensionValue}
        setOfferLetterData(cd);
    }, [pensionValue])



    useEffect(()=>{ 
        let cd = {...offerLetterData, signUrl : sigUrl}
        setOfferLetterData(cd);
    }, [sigUrl])
 
    useEffect(()=>{
        console.log('currentApplicant' , currentApplicant);
        console.log('offerLetterData' , offerLetterData);
    }, [])

    const enterOfferLetterData = (e) => {
        e.preventDefault();
        let cd = {...offerLetterData, [e.target.id]: e.target.value}
        setOfferLetterData(cd)
    }

    const nextStep = (e) =>{
        e.preventDefault();
        setCreateOfferLetterCurrent(e.target.getAttribute("data-next"))
        setCurrentProgress(e.target.getAttribute("data-percent"))
        setTitleState(e.target.getAttribute("data-nextTitle"))  
    } 
    
    const completeOfferLetter = (e) => {
        e.preventDefault(); 
        dispatch(requestCreateOfferLetter(offerLetterData));
    }

    const saveSign = (e) =>{
        e.preventDefault(); 
        ref.current.on();
        let x = ref.current.toDataURL();
        setSigUrl(x);
    }   
 
    const clearSign = (e) =>{
        e.preventDefault(); 
        ref.current.clear();
        ref.current.on();
        setSignBg(true)
    }       

    const startedSign = (e) =>{
        e.preventDefault();  
        setSignBg(false)
    }   

    
    const handleDateChangeStartDate = (d) =>{
        const date =  d.getDate() + "/" +  (d.getMonth()+1) + "/" +  d.getFullYear();
        let cd = {...offerLetterData, startDate: date} 
        setOfferLetterData(cd)
        setLocalStartDate(d)

    }
    const handleDateChangeEndDate = (d) =>{
        const date =  d.getDate() + "/" +  (d.getMonth()+1) + "/" +  d.getFullYear();
        let cd = {...offerLetterData, endDate: date} 
        setOfferLetterData(cd)
        setLocalEndDate(d)

    }

    const handleDateExpirationDate = (d) =>{
        const date =  d.getDate() + "/" +  (d.getMonth()+1) + "/" +  d.getFullYear();
        let cd = {...offerLetterData, expirationDate: date} 
        setOfferLetterData(cd)
        setLocalExpirationDate(d)

    }

    const handleDateSendDate = (d) =>{
        const date =  d.getDate() + "/" +  (d.getMonth()+1) + "/" +  d.getFullYear();
        let cd = {...offerLetterData, sendDate: date} 
        setOfferLetterData(cd)
        setLocalSendDate(d)

    }
    
    const toggleDay = (day) =>{    
        let wd = {...offerLetterData.workDays }
        wd[day] = !offerLetterData.workDays[`${day}`]; 
        let cd = {...offerLetterData, workDays: {...wd}}
        setOfferLetterData(cd)
    }
    


    const showTerminationSelect = (e) =>{
        e.preventDefault(); 
        setTerminationSelectState(!terminationSelectState)
    }

    const selectTermination = (e) =>{
        e.preventDefault(); 
        let cd = {...offerLetterData, terminationPeriod: e.target.innerHTML} 
        setOfferLetterData(cd)          
        setTerminationSelectState(false)

    }
 

    return ( 
        <CreateOfferLetterContainer> 
            <div className="title-container"> 
                <h1>{titleState}</h1>
                <div className="progress-container">
                    <div className={`progress-inner percent-${currentProgress}`}></div>
                    <p>{currentProgress}% Complete</p>
                </div>
            </div>
            <div className="steps-container"> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={200} isVisible={createOfferLetterCurrent === "startCompanyDetails"} animateOnMount={true}>
                    <div className={`offerLetter-step step-offerParties ${createOfferLetterCurrent !== "startCompanyDetails" ? "display-none" : ""}`}>
                        <div className="party-inputs">
                            <fieldset >  
                                <label>Step 1</label> 
                                <label>Please add your company details below</label> 
                                <Button 
                                    type="primarySmall" 
                                    data-nextTitle="Confirm company details"  
                                    data-next="offerCompany" 
                                    data-percent="5"
                                    text="ADD DETAILS"
                                    onClick={nextStep}
                                    /> 
                            </fieldset> 
                        </div>
                        {/* <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Confirm company details"  
                                data-next="offerCompany" 
                                data-percent="5"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div> */}
                    </div>
                </Animated>   
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerCompany"} animateOnMount={false}>
                    <div className={`offerLetter-step step-companyAddress  ${createOfferLetterCurrent !== "offerCompany" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="companyAddress-inputs"> 
                            
                            <fieldset> 
                                <input type="text" name="companyName" id="companyName" placeholder="Company Name"  value={offerLetterData.companyName} onChange={enterOfferLetterData}  />
                            </fieldset>
                            <fieldset> 
                                <input type="text" name="pointOfContact" id="pointOfContact" placeholder="Point of Contact"  value={offerLetterData.pointOfContact} onChange={enterOfferLetterData}  />
                            </fieldset>
                            <fieldset> 
                                <input type="text" name="addressLineOne" id="addressLineOne" placeholder="Address line one"  value={offerLetterData.addressLineOne} onChange={enterOfferLetterData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="addressLineTwo" id="addressLineTwo" placeholder="Address line two"  value={offerLetterData.addressLineTwo} onChange={enterOfferLetterData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="county" id="county" placeholder="County"  value={offerLetterData.county} onChange={enterOfferLetterData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="postcode" id="postcode" placeholder="Postcode"  value={offerLetterData.postcode} onChange={enterOfferLetterData}  />
                            </fieldset>

                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Employer Signature"  
                                data-next="offerSig" 
                                data-percent="5"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated>  
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerSig"} animateOnMount={false}>
                    <div className={`offerLetter-step step-sig     ${createOfferLetterCurrent !== "offerSig" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="sig-inputs"> 
                         
                            <fieldset className="fieldset-half">
                                <div className="fieldset-inner-half">
                                    <input type="text" name="employerFirstname" id="employerFirstname" placeholder="Employer First Name"  value={offerLetterData.employerFirstname} onChange={enterOfferLetterData}  />
                                </div>
                                <div className="fieldset-inner-half">
                                    <input type="text" name="employerLastname" id="employerLastname" placeholder="Employer Last Name"  value={offerLetterData.employerLastname} onChange={enterOfferLetterData}  />
                                </div>
                            </fieldset> 
                            <fieldset>
                                <input type="text" name="employerPosition" id="employerPosition" placeholder="Position"  value={offerLetterData.employerPosition} onChange={enterOfferLetterData}  />
                             </fieldset>
                            <fieldset className={`center-fieldset canvas-fieldset ${signBg ? "" : "removebg"}`}>
                                <SignatureCanvas
                                    ref={ref}
                                    clearOnResize={false}
                                    penColor="lightgrey"
                                    canvasProps={{ width: window.innerWidth < 700 ? 350: 900, height: window.innerWidth < 700 ? 200: 300, className: "sigCanvas"}}
                                    onEnd={saveSign}
                                    onBegin={startedSign}
                                    /> 
                                    <button onClick={clearSign} className="clearSign">Clear</button>

                            </fieldset> 
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Employee Details"  
                                data-next="offerEmployeeDetails" 
                                data-percent="10"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerEmployeeDetails"} animateOnMount={false}>
                    <div className={`offerLetter-step step-employeeDetails    ${createOfferLetterCurrent !== "offerEmployeeDetails" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="employeeDetails-inputs"> 
                         
                            <fieldset className="fieldset-half"> 
                                <div className="fieldset-inner-half">
                                    <input type="text" name="employeeFirstname" id="employeeFirstname" placeholder="Firstname"  value={offerLetterData.employeeFirstname} onChange={enterOfferLetterData} />
                                </div>
                                <div className="fieldset-inner-half">
                                    <input type="text" name="employeeLastname" id="employeeLastname" placeholder="Lastname"  value={offerLetterData.employeeLastname} onChange={enterOfferLetterData} />
                                </div>  
                            </fieldset> 
                            <fieldset> 
                                <input type="text" name="employeeAddressLineOne" id="employeeAddressLineOne" placeholder="Address line one"  value={offerLetterData.employeeAddressLineOne} onChange={enterOfferLetterData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="employeeAddressLineTwo" id="employeeAddressLineTwo" placeholder="Address line two"  value={offerLetterData.employeeAddressLineTwo} onChange={enterOfferLetterData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="employeeCounty" id="employeeCounty" placeholder="County"  value={offerLetterData.employeeCounty} onChange={enterOfferLetterData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="employeePostcode" id="employeePostcode" placeholder="Postcode"  value={offerLetterData.employeePostcode} onChange={enterOfferLetterData}  />
                            </fieldset>
                            
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Job Title"  
                                data-next="offerJobTitle" 
                                data-percent="15"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerJobTitle"} animateOnMount={false}>
                    <div className={`offerLetter-step step-jobTitle   ${createOfferLetterCurrent !== "offerJobTitle" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="jobTitle-inputs"> 
                            <fieldset>
                                <label>What position is the employee filling? </label>
                                <input type="text" name="position" id="position" placeholder="Position"  value={offerLetterData.position} onChange={enterOfferLetterData}  />
                            </fieldset> 
                            
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Employee Workplace Address"  
                                data-next="offerWorkAddress" 
                                data-percent="20"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerWorkAddress"} animateOnMount={false}>
                    <div className={`offerLetter-step step-workAddress  ${createOfferLetterCurrent !== "offerWorkAddress" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="workAddress-inputs"> 
                             
                            <fieldset>  
                                <p> 
                                    <span onClick={e => setEmployerAddressAsWorkAddress(!employerAddressAsWorkAddress)}>
                                        <button className={`custom-check ${employerAddressAsWorkAddress  ? "checked" : "" }`}></button> 
                                        Same as employers address
                                    </span>
                                </p> 
                            </fieldset>
                            <fieldset> 
                                <input type="text" name="workAddressLineOne" id="workAddressLineOne" placeholder="Address line one"  value={offerLetterData.workAddressLineOne} onChange={enterOfferLetterData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="workAddressLineTwo" id="workAddressLineTwo" placeholder="Address line two"  value={offerLetterData.workAddressLineTwo} onChange={enterOfferLetterData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="workAddressCounty" id="workAddressCounty" placeholder="County"  value={offerLetterData.workAddressCounty} onChange={enterOfferLetterData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="workAddressPostcode" id="workAddressPostcode" placeholder="Postcode"  value={offerLetterData.workAddressPostcode} onChange={enterOfferLetterData}  />
                            </fieldset>

                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Job Type"  
                                data-next="offerJobType" 
                                data-percent="30"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated>  
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerJobType"} animateOnMount={false}>
                    <div className={`offerLetter-step step-jobType  ${createOfferLetterCurrent !== "offerJobType" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="jobType-inputs"> 
                             
                            <fieldset>  
                               
                                <label>Type of offer:</label>
                                <p>
                                    <span onClick={e => setTypeValue("fulltime")}>
                                        Full time
                                        <button className={`custom-check ${typeValue==="fulltime" ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => setTypeValue("parttime")}>
                                        Part time
                                        <button className={`custom-check ${typeValue==="parttime" ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => setTypeValue("permanent")}>
                                        Permanent
                                        <button className={`custom-check ${typeValue==="permanent" ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => setTypeValue("fixed")}>
                                        Fixed Term
                                        <button className={`custom-check ${typeValue==="fixed" ? "checked" : "" }`}></button>
                                    </span>
                                </p>      
                            </fieldset>
                            
                            <fieldset className="column-flex">
                                <label>Start date:</label>
                                <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => { handleDateChangeStartDate(date) }}  placeholderText="Start Date" />
                            </fieldset>
                            <fieldset className="column-flex">
                                <label>End date: (Fixed term only*)</label>
                                <DatePicker dateFormat="dd/MM/yyyy" selected={endDate} onChange={(date) => { handleDateChangeEndDate(date) }}  placeholderText="End Date" />
                            </fieldset>

                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Salary"  
                                data-next="offerSalary" 
                                data-percent="40"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated>  
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerSalary"} animateOnMount={false}>
                    <div className={`offerLetter-step step-salary  ${createOfferLetterCurrent !== "offerSalary" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="salary-inputs">  

                            <fieldset className="column-flex">
                                <label>What is the employee’s salary?</label>
                                <p>
                                    <span onClick={e => setSalaryTypeValue("Yearly")}>
                                        Yearly
                                        <button className={`custom-check ${salaryTypeValue==="Yearly" ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => setSalaryTypeValue("Quarterly")}>
                                        Quarterly
                                        <button className={`custom-check ${salaryTypeValue==="Quarterly" ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => setSalaryTypeValue("Monthly")}>
                                        Monthly
                                        <button className={`custom-check ${salaryTypeValue==="Monthly" ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => setSalaryTypeValue("Weekly")}>
                                        Weekly
                                        <button className={`custom-check ${salaryTypeValue==="Weekly" ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => setSalaryTypeValue("Hourly")}>
                                        Hourly
                                        <button className={`custom-check ${salaryTypeValue==="Hourly" ? "checked" : "" }`}></button>
                                    </span>
                                </p>                   
                            </fieldset> 
                                
                            <fieldset className="column-flex">
                                <label>Amount</label>
                                <input type="number" name="salaryAmount" id="salaryAmount"  value={offerLetterData.salaryAmount} onChange={enterOfferLetterData}  placeholder="£"/>
                            </fieldset> 
                            
                            <fieldset className="column-flex">
                                    <label>When will the employee get paid?</label>
                                    <p> 
                                        <span onClick={e => setPayTypeValue("Quarterly")}>
                                            Quarterly
                                            <button className={`custom-check ${payTypeValue==="Quarterly" ? "checked" : "" }`}></button>
                                        </span>
                                        <span onClick={e => setPayTypeValue("Monthly")}>
                                            Monthly
                                            <button className={`custom-check ${payTypeValue==="Monthly" ? "checked" : "" }`}></button>
                                        </span>
                                        <span onClick={e => setPayTypeValue("Weekly")}>
                                            Weekly
                                            <button className={`custom-check ${payTypeValue==="Weekly" ? "checked" : "" }`}></button>
                                        </span>
                                        <span onClick={e => setPayTypeValue("Daily")}>
                                            Daily
                                            <button className={`custom-check ${payTypeValue==="Daily" ? "checked" : "" }`}></button>
                                        </span>
                                    </p>                   
                                </fieldset> 
                                
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Work Hours"  
                                data-next="offerHours" 
                                data-percent="50"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerHours"} animateOnMount={false}>
                    <div className={`offerLetter-step step-hours  ${createOfferLetterCurrent !== "offerHours" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="hours-inputs">  

                            <fieldset className="column-flex">
                                    <label>Does the employee have a 1 hour lunch break?</label>
                                    <p>
                                        <span onClick={e => setLunchHourTypeValue("Yes")}>
                                            Yes
                                            <button className={`custom-check ${lunchHourTypeValue==="Yes" ? "checked" : "" }`}></button>
                                        </span>
                                        <span onClick={e => setLunchHourTypeValue("No")}>
                                            No
                                            <button className={`custom-check ${lunchHourTypeValue==="No" ? "checked" : "" }`}></button>
                                        </span> 
                                    </p>                   
                            </fieldset> 
                            {
                                lunchHourTypeValue === "No" ? 
                                    <fieldset className="column-flex">
                                        <label>How long is the employee’s lunch break?</label>
                                        <input type="number" name="lunchBreakDuration" id="lunchBreakDuration" value={offerLetterData.lunchBreakDuration} onChange={enterOfferLetterData}  placeholder="HH:MM"/>
                                    </fieldset> 

                                :
                                    ""  
                            }
                            
                            <fieldset className="column-flex">
                                <label>Will the lunch be paid?</label>
                                <p> 
                                    <span onClick={e => setLunchPaidTypeValue("Yes")}>
                                        Yes
                                        <button className={`custom-check ${lunchPaidTypeValue==="Yes" ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => setLunchPaidTypeValue("No")}>
                                        No
                                        <button className={`custom-check ${lunchPaidTypeValue==="No" ? "checked" : "" }`}></button>
                                    </span> 
                                </p>                   
                            </fieldset>  
                            <hr />
                            <fieldset className="column-flex">
                                <label>Employee work days</label>
                                <p> 
                                    <span onClick={e => toggleDay("monday")}>
                                        Mon
                                        <button className={`custom-check ${offerLetterData.workDays.monday  ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => toggleDay("tuesday")}>
                                        Tue
                                        <button className={`custom-check ${offerLetterData.workDays.tuesday ? "checked" : "" }`}></button>
                                    </span> 
                                    <span onClick={e => toggleDay("wednesday")}>
                                        Wed
                                        <button className={`custom-check ${offerLetterData.workDays.wednesday  ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => toggleDay("thursday")}>
                                        Thurs
                                        <button className={`custom-check ${offerLetterData.workDays.thursday ? "checked" : "" }`}></button>
                                    </span> 
                                    <span onClick={e => toggleDay("friday")}>
                                        Fri
                                        <button className={`custom-check ${offerLetterData.workDays.friday  ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => toggleDay("saturday")}>
                                        Sat
                                        <button className={`custom-check ${offerLetterData.workDays.saturday ? "checked" : "" }`}></button>
                                    </span> 
                                    <span onClick={e => toggleDay("sunday")}>
                                        Sun
                                        <button className={`custom-check ${offerLetterData.workDays.sunday ? "checked" : "" }`}></button>
                                    </span> 
                                </p>                   
                            </fieldset> 
                            <fieldset className="fieldset-half"  > 
                                <div className="fieldset-inner-half">
                                    <label>Start time</label>
                                    <input type="text" name="startTime" id="startTime" placeholder="00:01"  value={offerLetterData.startTime} onChange={enterOfferLetterData} />
                                </div>
                                <div className="fieldset-inner-half">
                                    <label>Finish time</label>                                   
                                    <input type="text" name="finishTime" id="finishTime" placeholder="23:59"  value={offerLetterData.finishTime} onChange={enterOfferLetterData} />
                                </div>              
                            </fieldset>  
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Holiday Entitlement"  
                                data-next="offerHoliday" 
                                data-percent="60"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerHoliday"} animateOnMount={false}>
                    <div className={`offerLetter-step step-holiday  ${createOfferLetterCurrent !== "offerHoliday" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="holiday-inputs"> 
                            
                            <fieldset className="fieldset-half"> 
                                <div className="fieldset-inner-half">
                                    <label>Amount of holidays:</label>
                                    <input type="number" name="holidays" id="holidays" placeholder="Days"  value={offerLetterData.holidays} onChange={enterOfferLetterData} />
                                </div>
                                <div className="fieldset-inner-half">
                                    <label>Bank holidays included?</label>
                                    <p>
                                        <span onClick={e => setIncludedValue("included")}>
                                            Included
                                            <button className={`custom-check ${includedValue==="included" ? "checked" : "" }`}></button>
                                        </span>
                                        <span onClick={e => setIncludedValue("not-included")}>
                                            Not included
                                            <button className={`custom-check ${includedValue==="not-included" ? "checked" : "" }`}></button>
                                        </span>
                                    </p>
                                </div>  
                            </fieldset> 
 
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Pension Scheme"  
                                data-next="offerPension" 
                                data-percent="70"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerPension"} animateOnMount={false}>
                    <div className={`offerLetter-step step-pension  ${createOfferLetterCurrent !== "offerPension" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="pension-inputs">  

                            <fieldset className="column-flex">
                                <label>Will the employee be automatically enrolled into the emlpoyee pension scheme?</label>
                                <p>
                                    <span onClick={e => setPensionValue("yes")}>
                                        Yes
                                        <button className={`custom-check ${pensionValue==="yes" ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => setPensionValue("no")}>
                                        No
                                        <button className={`custom-check ${pensionValue==="no" ? "checked" : "" }`}></button>
                                    </span>
                                </p>                   
                            </fieldset>
                            {
                                pensionValue ==="yes" ?

                                <div>
                                    <fieldset>
                                        <input type="text" name="pensionSchemeName" id="pensionSchemeName" value={offerLetterData.pensionSchemeName} onChange={enterOfferLetterData} placeholder="Name of Scheme" />
                                    </fieldset>
                                    <fieldset>
                                        <input type="text" name="pensionSchemeContribution" id="pensionSchemeContribution" value={offerLetterData.pensionSchemeContribution} onChange={enterOfferLetterData} placeholder="Employee contribution %"/>
                                        <span>*The normal amount is 3%</span>
                                    </fieldset>
                                </div>
                                : 
                                <></>

                            }
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Termination Period"  
                                data-next="offerTermination" 
                                data-percent="80"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerTermination"} animateOnMount={false}>
                    <div className={`offerLetter-step step-termination  ${createOfferLetterCurrent !== "offerTermination" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="termination-inputs">  

                            <fieldset className="column-flex">
                                <label>What is the employee’s termination period?</label>
                                <div className="custom-select-container">
                                    <input type="text" name="terminationPeriod" id="terminationPeriod" value={offerLetterData.terminationPeriod} onClick={showTerminationSelect} readOnly/>
                                    <div className={`custom-select ${ terminationSelectState ? "display-select" : ""  }`}>
                                        <ul>
                                            <li onClick={selectTermination}>1 week</li>
                                            <li onClick={selectTermination}>2 Weeks</li>
                                            <li onClick={selectTermination}>3 Weeks</li>
                                            <li onClick={selectTermination}>4 Weeks</li>
                                            <li onClick={selectTermination}>1 Month</li>
                                            <li onClick={selectTermination}>2 Months</li>
                                            <li onClick={selectTermination}>3 Months</li>
                                            <li onClick={selectTermination}>4 Months</li>
                                        </ul>
                                    </div>

                                </div>
                            </fieldset>
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Offer Expiration Date"  
                                data-next="offerExpiration" 
                                data-percent="90"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerExpiration"} animateOnMount={false}>
                    <div className={`offerLetter-step step-expiration  ${createOfferLetterCurrent !== "offerExpiration" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="hours-inputs">  
                            <fieldset className="fieldset-half"  > 
                                <div className="fieldset-inner-half">
                                    <label>When does the offer expire?</label>
                                    <DatePicker dateFormat="dd/MM/yyyy" selected={localExpirationDate} onChange={(date) => { handleDateExpirationDate(date) }}  placeholderText="" />
                                </div>           
                            </fieldset>  
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Offer Date"  
                                data-next="offerDate" 
                                data-percent="90"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createOfferLetterCurrent === "offerDate"} animateOnMount={false}>
                    <div className={`offerLetter-step step-date  ${createOfferLetterCurrent !== "offerDate" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="date-inputs">  
                            <fieldset   >  
                                    <label>Date you want the offer to be sent to the employee</label>
                                    <DatePicker dateFormat="dd/MM/yyyy" selected={localSendDate} onChange={(date) => { handleDateSendDate(date) }}  placeholderText="Select Date" />     
                            </fieldset>  
                        </div> 
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall"
                                text="Next"
                                onClick={completeOfferLetter}
                                />
                        </div>
                    </div>
                </Animated> 
          
           </div>
            <div className="realTimePreview">
                <PreviewDocument documentType={"offerLetter"} documentData={offerLetterData}/>
            </div>
        </CreateOfferLetterContainer>
    )
}
           