import React, { useEffect, useState, useRef }  from 'react';
import {useHistory} from 'react-router-dom';  
import {Animated} from "react-animated-css"; 
import styled from 'styled-components';  
import Button from '../shared-components/button';

import SignatureCanvas from "react-signature-canvas";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from 'react-redux'; 
import { requestCreateContract, createdContract } from '../../store/actions/actions'; 
// import phone from '../../assets/svg/phone.svg';  

import PreviewDocument from "../preview-document/preview-document";
import Notiflix from 'notiflix'; 

import signbg from "../../assets/svg/sign-bg.svg";



const CreateContractContainer = styled.div`  

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
                &.percent-99 {
                    &:before{
                        width: 99%;  
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
        .contract-step{
            &.step-contractParties{
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
            &.step-notice{  }

            &.step-benefits,
            &.step-probation,
            &.step-hours,
            &.step-salary,
            &.step-terms,
            &.step-pension{ 
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
            .contract-step{
                margin: 5px 0!important;
                max-width: 100vw!important;
                padding: 30px 0;
                > div{
                    flex-direction: column;
                }
                &.step-jobType, 
                &.step-salary,
                &.step-hours,
                &.step-holiday,
                &.step-pension,
                &.step-terms,
                &.step-probation,
                &.step-benefits{ 
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

    .display-none{
        display: none!important;
    }

`

export default function CreateContract() {
    const history = useHistory()
    const dispatch = useDispatch();    
    const createContract = useSelector(state => state.contractCreation)
    const {currentApplicant, job } = history.location.state ;
    const [currentProgress, setCurrentProgress] = useState("5");
    const [sigUrl, setSigUrl] = useState(""); 
    const ref = useRef();
    const [signBg, setSignBg] = useState(true);

    const [includedValue, setIncludedValue] = useState("");
    const [pensionValue, setPensionValue] = useState("");
    const [termsValue, setTermsValue] = useState("");
    const [salaryTypeValue, setSalaryTypeValue] = useState("");
    const [payTypeValue, setPayTypeValue] = useState("");
    const [lunchHourTypeValue, setLunchHourTypeValue] = useState("");
    const [lunchPaidTypeValue, setLunchPaidTypeValue] = useState("");
    const [probationValue, setProbationValue] = useState("");
 
    const [selectProbationState, setSelectProbationState] = useState(false);
    const [selectState, setSelectState] = useState(false);
    const [titleState, setTitleState] = useState("Employment Contract");
    const [createContractCurrent, setCreateContractCurrent] = useState("contractParties")  
    // const [createContractCurrent, setCreateContractCurrent] = useState("contractBenefits")  
    const obj = {
        application_id: currentApplicant.b.applicationId, 
        applicant_uid: currentApplicant.a.id,
        company: job.recruiter_name,
        companyNumber: "",
        employerPosition: "",
        employerFirstname: "",
        employerLastname: "", 
        signUrl: "",

        employeeLastname: currentApplicant.a.cvProfile.lastname,
        employeeFirstname: currentApplicant.a.cvProfile.firstname  ,
        employee: currentApplicant.a.cvProfile.firstname + " " + currentApplicant.a.cvProfile.lastname,
        jobTitle: job.jobTitle,
        startDate: "",
        jobDescription: job.description,
        addressLineOne: "",
        addressLineTwo: "",
        county: "",
        postcode: "",
        workAddressLineOne: "",
        workAddressLineTwo: "",
        workCounty: "",
        workPostcode: "",
        holidays: 0,
        holidayStartDate: "",
        holidayIncluded: "",
        pensionScheme: "",
        schemeName: "",
        contribution: "",
        terms: "",
        noticePeriod: "",
        salaryAmount: "",
        salaryType: "",
        payType: "",
        lunchPaidType: "",
        lunchType: "",
        lunchBreakDuration: "",
        workDays: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }, 
        benefits: {
            overtime: false,
            bonus: false,
            shareOption: false,
            sickPay: false 
        },
        startTime: "",
        finishTime: "",
        probation: "",
        probationPeriod: ""

    }
    
    const [contractData, setContractData] = useState({...obj});
    const [localSDate, setLocalSDate] = useState("");
    const [localHolidayStartDate, setLocalHolidayStartDate] = useState("");
    
    useEffect(() =>{
        if(createContract.loading) Notiflix.Loading.Circle("Creating Contract") 
      
        if(createContract.errors){
            Notiflix.Loading.Remove(); 
            Notiflix.Report.Failure( 'Contract Failed', 'We were unable to create your contract, please try again.', 'OK' ); 
        } 

        if(createContract.contractCreated){ 
            Notiflix.Loading.Remove(); 
            history.push( {pathname: "/complete-document", state: { documentType: "contract", documentData: {...contractData}  }});
            dispatch(createdContract(false)); 
        }
 

    },[createContract])
    
    const toggleLunchLength = (e) => {
        console.log(e.target)
        console.log("logged")
        let cd = {...contractData, lunchBreakDuration : e.target.value}
        setContractData(cd);
    };
    
    useEffect(()=>{ 
        let cd = {...contractData, signUrl : sigUrl}
        setContractData(cd);
    }, [sigUrl])

    useEffect(()=>{ 
        let cd = {...contractData, probation : probationValue}
        setContractData(cd);
    }, [probationValue])

    useEffect(()=>{ 
        let cd = {...contractData, lunchPaidType : lunchPaidTypeValue}
        setContractData(cd);
    }, [lunchPaidTypeValue])

    useEffect(()=>{ 
        let cd = {...contractData, lunchType : lunchHourTypeValue}
        setContractData(cd);
    }, [lunchHourTypeValue])

    useEffect(()=>{ 
        let cd = {...contractData, salaryType : salaryTypeValue}
        setContractData(cd);
    }, [salaryTypeValue])

    useEffect(()=>{ 
        let cd = {...contractData, payType : payTypeValue}
        setContractData(cd);
    }, [payTypeValue])

    useEffect(()=>{ 
        let cd = {...contractData, terms : termsValue}
        setContractData(cd);
    }, [termsValue])

    useEffect(()=>{ 
        let cd = {...contractData, pensionScheme : pensionValue}
        setContractData(cd);
    }, [pensionValue])

    useEffect(()=>{ 
        let cd = {...contractData, holidayIncluded : includedValue}
        setContractData(cd);
    }, [includedValue])

    useEffect(()=>{
        console.log('currentApplicant' , currentApplicant);
        console.log('contractData' , contractData);
    }, [])

    const enterContractData = (e) => {
        e.preventDefault();
        let cd = {...contractData, [e.target.id]: e.target.value}
        setContractData(cd)
    }

    const nextStep = (e) =>{
        e.preventDefault();
        setCreateContractCurrent(e.target.getAttribute("data-next"))
        setCurrentProgress(e.target.getAttribute("data-percent"))
        setTitleState(e.target.getAttribute("data-nextTitle"))  
    }

    const handleDateChangeSetStartDate = (d) =>{
        const date =  d.getDate() + "/" +  (d.getMonth()+1) + "/" +  d.getFullYear();
        let cd = {...contractData, startDate: date} 
        setContractData(cd)
        setLocalSDate(d)

    }
    const handleDateChangeSetHolidayStartDate = (d) =>{
        const date =  d.getDate() + "/" +  (d.getMonth()+1) + "/" +  d.getFullYear();
        let cd = {...contractData, holidayStartDate: date} 
        setContractData(cd)
        setLocalHolidayStartDate(d)

    }

    const selectNotice = (e) =>{
        e.preventDefault(); 
        let cd = {...contractData, noticePeriod: e.target.innerHTML} 
        setContractData(cd)          
        setSelectState(false)

    }
    const selectProbation = (e) =>{
        e.preventDefault(); 
        let cd = {...contractData, probationPeriod: e.target.innerHTML} 
        setContractData(cd)          
        setSelectProbationState(false)

    }

    const showSelect = (e) =>{
        e.preventDefault(); 
        setSelectState(!selectState)
    }
 
    const showProbationSelect = (e) =>{
        e.preventDefault(); 
        setSelectProbationState(!selectProbationState)
    } 
    
    const toggleDay = (day) =>{    
        let wd = {...contractData.workDays }
        wd[day] = !contractData.workDays[`${day}`]; 
        let cd = {...contractData, workDays: {...wd}}
        setContractData(cd)
    }
    
    const toggleBenefits = (b) =>{     
        let bs = {...contractData.benefits }
        bs[b] = !contractData.benefits[`${b}`]; 
        let cd = {...contractData, benefits: {...bs}}
        setContractData(cd)
    }

    const completeContract = (e) => {
        e.preventDefault();  
        dispatch(requestCreateContract(contractData));
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
    
    return ( 
        <CreateContractContainer> 
            <div className="title-container"> 
                <h1>{titleState}</h1>
                <div className="progress-container">
                    <div className={`progress-inner percent-${currentProgress}`}></div>
                    <p>{currentProgress}% Complete</p>
                </div>
            </div>
            <div className="steps-container"> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={200} isVisible={createContractCurrent === "contractParties"} animateOnMount={true}>
                    <div className={`contract-step step-contractParties  ${createContractCurrent !== "contractParties" ? "display-none" : ""} `}>
                        <div className="step-title">
                            <p>Who is the contract between?</p>
                        </div>
                        <div className="party-inputs">
                            <fieldset>
                                <label>Company:</label>
                                <input type="text" name="company" id="company" value={contractData.company} onChange={enterContractData} />
                            </fieldset>
                            <fieldset>
                                <label>Employee:</label>
                                <input type="text" name="employee" id="employee" value={contractData.employee} onChange={enterContractData}   />
                            </fieldset>
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Confirm company details"  
                                data-next="contractCompany" 
                                data-percent="5"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractCompany"} animateOnMount={false}>
                    <div className={`contract-step step-workAddress   ${createContractCurrent !== "contractCompany" ? "display-none" : ""} `}>
                        {/* <div className="step-title"></div> */}
                        <div className="workAddress-inputs"> 
                            
                            <fieldset> 
                                <input type="text" name="companyNumber" id="companyNumber" placeholder="Company Number"  value={contractData.companyNumber} onChange={enterContractData}  />
                            </fieldset>
                            <fieldset> 
                                <input type="text" name="addressLineOne" id="addressLineOne" placeholder="Address line one"  value={contractData.addressLineOne} onChange={enterContractData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="addressLineTwo" id="addressLineTwo" placeholder="Address line two"  value={contractData.addressLineTwo} onChange={enterContractData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="county" id="county" placeholder="County"  value={contractData.county} onChange={enterContractData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="postcode" id="postcode" placeholder="Postcode"  value={contractData.postcode} onChange={enterContractData}  />
                            </fieldset>

                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Employer Signature"  
                                data-next="contractSig" 
                                data-percent="5"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractSig"} animateOnMount={false}>
                    <div className={`contract-step step-sig  ${createContractCurrent !== "contractSig" ? "display-none" : ""} `}>
                        {/* <div className="step-title"></div> */}
                        <div className="sig-inputs"> 
                         
                            <fieldset className="fieldset-half">
                                <div className="fieldset-inner-half">
                                    <input type="text" name="employerFirstname" id="employerFirstname" placeholder="Employer First Name"  value={contractData.employerFirstname} onChange={enterContractData}  />
                                </div>
                                <div className="fieldset-inner-half">
                                    <input type="text" name="employerLastname" id="employerLastname" placeholder="Employer Last Name"  value={contractData.employerLastname} onChange={enterContractData}  />
                                </div>
                            </fieldset> 
                            <fieldset>
                                <input type="text" name="employerPosition" id="employerPosition" placeholder="Position"  value={contractData.employerPosition} onChange={enterContractData}  />
                             </fieldset> 
                            <fieldset className={`center-fieldset canvas-fieldset ${signBg ? "" : "removebg"}`}>

                                <SignatureCanvas
                                    ref={ref}
                                    clearOnResize={false}
                                    penColor="lightgrey"
                                    canvasProps={{ width: window.innerWidth < 700 ? 350: 900,  height: window.innerWidth < 700 ? 200: 300, className: "sigCanvas"}}
                                    onEnd={saveSign}
                                    onBegin={startedSign}
                                    /> 
                                    <button onClick={clearSign} className="clearSign">Clear</button>

                            </fieldset> 
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Job Outline"  
                                data-next="contractOutline" 
                                data-percent="10"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractOutline"} animateOnMount={false}>
                    <div className={`contract-step step-outlines  ${createContractCurrent !== "contractOutline" ? "display-none" : ""} `}>
                        {/* <div className="step-title"></div> */}
                        <div className="outline-inputs"> 
                            <fieldset>
                                <input type="text" name="jobTitle" id="jobTitle" placeholder="Job title"  value={contractData.jobTitle} onChange={enterContractData}  />
                            </fieldset>
                            <fieldset>
                                <DatePicker dateFormat="dd/MM/yyyy" selected={localSDate} onChange={(date) => { handleDateChangeSetStartDate(date) }}  placeholderText="Start Date" />
                            </fieldset>
                            <fieldset>
                                <textarea name="jobDescription" id="jobDescription" placeholder="Job description"  value={contractData.jobDescription.replace(/(<([^>]+)>)/gi, "")}  onChange={enterContractData} >
                                </textarea>
                            </fieldset>
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Employee Workplace Address"  
                                data-next="contractWorkAddress" 
                                data-percent="15"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractWorkAddress"} animateOnMount={false}>
                    <div className={`contract-step step-workAddress  ${createContractCurrent !== "contractWorkAddress" ? "display-none" : ""} `}>
                        {/* <div className="step-title"></div> */}
                        <div className="workAddress-inputs"> 
                             
                            <fieldset> 
                                <input type="text" name="workAddressLineOne" id="workAddressLineOne" placeholder="Work address line one"  value={contractData.workAddressLineOne} onChange={enterContractData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="workAddressLineTwo" id="workAddressLineTwo" placeholder="Work address line two"  value={contractData.workAddressLineTwo} onChange={enterContractData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="workCounty" id="workCounty" placeholder="Work address county"  value={contractData.workCounty} onChange={enterContractData}  />
                            </fieldset>
                            <fieldset>
                                <input type="text" name="workPostcode" id="workPostcode" placeholder="Work address postcode"  value={contractData.workPostcode} onChange={enterContractData}  />
                            </fieldset>

                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Employee Holiday Entitlement"  
                                data-next="contractHoliday" 
                                data-percent="20"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractHoliday"} animateOnMount={false}>
                    <div className={`contract-step step-holiday  ${createContractCurrent !== "contractHoliday" ? "display-none" : ""}`} >
                        {/* <div className="step-title"></div> */}
                        <div className="holiday-inputs"> 
                            
                            <fieldset className="fieldset-half"> 
                                <div className="fieldset-inner-half">
                                    <label>Amount of holidays:</label>
                                    <input type="number" name="holidays" id="holidays" placeholder="Days"  value={contractData.holidays} onChange={enterContractData} />
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

                            <fieldset className="column-flex">
                                <label>Annual entitlement start date:</label>
                                <DatePicker dateFormat="dd/MM/yyyy" selected={localHolidayStartDate} onChange={(date) => { handleDateChangeSetHolidayStartDate(date) }}  placeholderText="Start Date" />
                            </fieldset>
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Pension Scheme"  
                                data-next="contractPension" 
                                data-percent="30"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractPension"} animateOnMount={false}>
                    <div className={`contract-step step-pension  ${createContractCurrent !== "contractPension" ? "display-none" : ""}`} >
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
                                        <input type="text" name="schemeName" id="schemeName" value={contractData.schemeName} onChange={enterContractData} placeholder="Name of Scheme" />
                                    </fieldset>
                                    <fieldset>
                                        <input type="text" name="contribution" id="contribution" value={contractData.contribution} onChange={enterContractData} placeholder="Employee contribution %"/>
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
                                data-nextTitle="Employment Terms"  
                                data-next="contractTerms" 
                                data-percent="40"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractTerms"} animateOnMount={false}>
                    <div className={`contract-step step-terms  ${createContractCurrent !== "contractTerms" ? "display-none" : ""}`} >
                        {/* <div className="step-title"></div> */}
                        <div className="terms-inputs">  

                            <fieldset className="column-flex">
                                <label>Type of contract:</label>
                                <p>
                                    <span onClick={e => setTermsValue("permanent")}>
                                        Permanent
                                        <button className={`custom-check ${termsValue==="permanent" ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => setTermsValue("fixed")}>
                                        Fixed
                                        <button className={`custom-check ${termsValue==="fixed" ? "checked" : "" }`}></button>
                                    </span>
                                </p>                   
                            </fieldset>
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Employee Notice Period"  
                                data-next="contractNotice" 
                                data-percent="50"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractNotice"} animateOnMount={false}>
                    <div className={`contract-step step-notice  ${createContractCurrent !== "contractNotice" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="notice-inputs">  

                            <fieldset className="column-flex">
                                <label>What is the employee’s notice period?</label>
                                <div className="custom-select-container">
                                    <input type="text" name="noticePeriod" id="noticePeriod" value={contractData.noticePeriod} onClick={showSelect} readOnly/>
                                    <div className={`custom-select ${ selectState ? "display-select" : ""  }`}>
                                        <ul>
                                            <li onClick={selectNotice}>1 week</li>
                                            <li onClick={selectNotice}>2 Weeks</li>
                                            <li onClick={selectNotice}>3 Weeks</li>
                                            <li onClick={selectNotice}>4 Weeks</li>
                                            <li onClick={selectNotice}>1 Month</li>
                                            <li onClick={selectNotice}>2 Months</li>
                                            <li onClick={selectNotice}>3 Months</li>
                                            <li onClick={selectNotice}>4 Months</li>
                                        </ul>
                                    </div>

                                </div>
                            </fieldset>
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Employee Salary"  
                                data-next="contractSalary" 
                                data-percent="60"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractSalary"} animateOnMount={false}>
                    <div className={`contract-step step-salary ${createContractCurrent !== "contractSalary" ? "display-none" : ""}`}>
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
                                <input type="number" name="salaryAmount" id="salaryAmount"  value={contractData.salaryAmount} onChange={enterContractData}  placeholder="£"/>
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
                                data-next="contractHours" 
                                data-percent="70"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractHours"} animateOnMount={false}>
                    <div className={`contract-step step-hours  ${createContractCurrent !== "contractHours" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="hours-inputs">  

                            <fieldset className="column-flex">
                                    <label>Does the employee have a 1 hour lunch break?</label>
                                    <p>
                                        <span onClick={e => setLunchHourTypeValue("Yes")}>
                                            Yes
                                            <button className={`custom-check ${lunchHourTypeValue==="Yes" ? "checked" : "" }`} value="1"></button>
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
                                        <input type="number" name="lunchBreakDuration" id="lunchBreakDuration" value={contractData.lunchBreakDuration} placeholder="HH:MM" onChange={(e) => {toggleLunchLength(e)}}/>
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
                                        <button className={`custom-check ${contractData.workDays.monday  ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => toggleDay("tuesday")}>
                                        Tue
                                        <button className={`custom-check ${contractData.workDays.tuesday ? "checked" : "" }`}></button>
                                    </span> 
                                    <span onClick={e => toggleDay("wednesday")}>
                                        Wed
                                        <button className={`custom-check ${contractData.workDays.wednesday  ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => toggleDay("thursday")}>
                                        Thurs
                                        <button className={`custom-check ${contractData.workDays.thursday ? "checked" : "" }`}></button>
                                    </span> 
                                    <span onClick={e => toggleDay("friday")}>
                                        Fri
                                        <button className={`custom-check ${contractData.workDays.friday  ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => toggleDay("saturday")}>
                                        Sat
                                        <button className={`custom-check ${contractData.workDays.saturday ? "checked" : "" }`}></button>
                                    </span> 
                                    <span onClick={e => toggleDay("sunday")}>
                                        Sun
                                        <button className={`custom-check ${contractData.workDays.sunday ? "checked" : "" }`}></button>
                                    </span> 
                                </p>                   
                            </fieldset> 
                            <fieldset className="fieldset-half"  > 
                                <div className="fieldset-inner-half">
                                    <label>Start time</label>
                                    <input type="text" name="startTime" id="startTime" placeholder="00:00"  value={contractData.startTime} onChange={enterContractData} />
                                </div>
                                <div className="fieldset-inner-half">
                                    <label>Finish time</label>                                   
                                    <input type="text" name="finishTime" id="finishTime" placeholder="00:00"  value={contractData.finishTime} onChange={enterContractData} />
                                </div>              
                            </fieldset>  
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Probation Period"  
                                data-next="contractProbation" 
                                data-percent="80"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractProbation"} animateOnMount={false}>
                    <div className={`contract-step step-probation  ${createContractCurrent !== "contractProbation" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="probation-inputs">    
                            <fieldset className="column-flex">
                                <label>Does the employee have a probation period?</label>
                                <p> 
                                    <span onClick={e => setProbationValue("Yes")}>
                                        Yes
                                        <button className={`custom-check ${probationValue==="Yes" ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => setProbationValue("No")}>
                                        No
                                        <button className={`custom-check ${probationValue==="No" ? "checked" : "" }`}></button>
                                    </span> 
                                </p>                   
                            </fieldset>   
                            <fieldset className="column-flex">
                                <label>What is the employee’s notice period?</label>
                                <div className="custom-select-container">
                                    <input type="text" name="probationPeriod" id="probationPeriod" value={contractData.probationPeriod} onClick={showProbationSelect} readOnly/>
                                    <div className={`custom-select ${ selectProbationState ? "display-select" : ""  }`}>
                                        <ul>
                                            <li onClick={selectProbation}>1 week</li>
                                            <li onClick={selectProbation}>2 Weeks</li>
                                            <li onClick={selectProbation}>3 Weeks</li>
                                            <li onClick={selectProbation}>4 Weeks</li>
                                            <li onClick={selectProbation}>1 Month</li>
                                            <li onClick={selectProbation}>2 Months</li>
                                            <li onClick={selectProbation}>3 Months</li>
                                            <li onClick={selectProbation}>4 Months</li>
                                        </ul>
                                    </div>

                                </div>
                            </fieldset>
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall" 
                                data-nextTitle="Employee Benefits"  
                                data-next="contractBenefits" 
                                data-percent="99"
                                text="NEXT"
                                onClick={nextStep}
                                />
                        </div>
                    </div>
                </Animated> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={createContractCurrent === "contractBenefits"} animateOnMount={false}>
                    <div className={`contract-step step-benefits   ${createContractCurrent !== "contractBenefits" ? "display-none" : ""}`}>
                        {/* <div className="step-title"></div> */}
                        <div className="benefits-inputs">    
                            <fieldset className="column-flex">
                                <label>Additional benefits:</label>
                                <p>
                                    <span onClick={e => toggleBenefits("overtime")}>
                                        Overtime Pay
                                        <button className={`custom-check ${contractData.benefits.overtime  ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => toggleBenefits("bonus")}>
                                        Bonus
                                        <button className={`custom-check ${contractData.benefits.bonus  ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => toggleBenefits("shareOption")}>
                                        Share Option
                                        <button className={`custom-check ${contractData.benefits.shareOption  ? "checked" : "" }`}></button>
                                    </span>
                                    <span onClick={e => toggleBenefits("sickPay")}>
                                        Sick Pay
                                        <button className={`custom-check ${contractData.benefits.sickPay  ? "checked" : "" }`}></button>
                                    </span> 
                                </p>                   
                            </fieldset>  
                        </div>
                        <div className="buttons-container">
                            <Button 
                                type="primarySmall"  
                                text="Create Contract"
                                onClick={completeContract}
                                />
                        </div>
                    </div>
                </Animated> 
            </div>
            <div className="realTimePreview">
                <PreviewDocument documentType={"contract"} documentData={contractData}/>
            </div>
        </CreateContractContainer>
    )
}
           