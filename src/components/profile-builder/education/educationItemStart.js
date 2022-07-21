import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../shared-components/button';  
import {useDispatch, useSelector} from 'react-redux'; 
import {
    updateUserCVData,
    updateCvModal,
    updateEducationHistoryItem, 
    updateAllEducationHistoryItems, 
    updateProfileBuilderState,   
    updateProfileBuilderEducationHistory} from '../../../store/actions/actions'; 
import Notiflix from 'notiflix'; 
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import select from '../../../assets/svg/select.svg'; 

import firebase from 'firebase'; 
import { db } from '../../../firebase';


const EducationHistoryItemStartContainer = styled.div` 
    max-width: 1140px;
    margin: 50px auto;
    @media screen and (max-width: 992px) { 
        max-width: 100vw;
        margin: 20px auto;
        padding: 0 15px;
        h1{ 
            text-align: center;
            margin-top: 20px;
            font-size: 25px;
        }

        fieldset{
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-bottom: 0!important;
            > * {
                width: 100%!important;
                margin-bottom: 15px;
            }
            .customDropdown { 
                top: calc(50% + 5px)!important;
            }
        } 
    }  
    .educationHistoryItemStart-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between; 

        .main-content{
            width: 100%;
            margin-bottom: 15px;
        }
        .main-content-form{
            width: 100%;
            margin-bottom: 15px;
            fieldset{ 
                position: relative;
                max-width: 700px;
                margin: 0 auto 20px;
                display: flex;
                justify-content: space-between;
                &.full-width{
                    width: 100%;
                    *{
                        width: 100%!important
                    }
                }
                .customDropdown{
                    position: absolute;
                    left: 0;
                    right: 50%;
                    top: calc(100% + 5px);
                    background-color: white;
                    border: 2px solid #6FC7BA;
                    padding: 15px;
                    z-index: 999;
                    border-radius: 10px;
                    pointer-events: none;
                    opacity: 0;
                    &.show{
                        opacity: 1;
                        transition: ease-in-out 200ms all;
                        pointer-events: all;

                    }
                    ul{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: flex-start;
                        margin: 0;
                        padding: 0;
                        max-height: 250px;
                        overflow: scroll;
                        li{
                            cursor: pointer;
                            padding: 0;
                            margin-bottom: 8px;
                            line-height: 1.4;
                            list-style: none;
                            color: grey;
                            &:last-of-type{
                                margin: 0;
                            }
                        }
                    }

                }
                .react-datepicker-wrapper{
                    width: calc(50% - 10px);
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
                        top: 0px;
                        right: 0px;
                        left: 0;
                        margin: 10px auto;
                        width: 100%;
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
                > input.qual-select{
                    appearance: none;
                    -webkit-appearance: none;
                    background-image: url(${select});
                    background-size: 17px;
                    background-position: calc(100% - 20px) center;
                    background-repeat: no-repeat;
                    cursor: pointer;

                }
                > input, 
                > select,
                > textarea{
                    width: calc(50% - 10px);
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
                button.checkbox{
                    border: none;
                    background: white;
                    color: grey;
                    padding-left: 40px;
                    position: relative;
                    outline: none;

                    &:before {
                        content: "";
                        height: 25px;
                        width: 25px;
                        border-radius: 4px;
                        border: 2px solid #DC3163;
                        background-color: white; 
                        transition: ease-in-out 200ms all;
                        position: absolute; 
                        left: 5px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    &.checked:before{
                        transition: ease-in-out 200ms all;
                        background-color:  #DC3163; 

                    }
                }
            }
        }
    }

    .selection-buttons{
        margin-top: 35px;
    }
    
    .hidden {
        display: none;
    }
`
export default function WorkHistoryItemStart() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();    
    const educationHistoryItem = useSelector(state => state.educationHistoryItem);   
    const allEducationHistoryItems = useSelector(state => state.allEducationHistoryItems);   

    const [showDropdown, setShowDropdown] = useState(false); 
    const [dropdownSelect, setDropdownSelect] = useState(""); 
    const [startDate, setStartDate] = useState(); 
    const [endDate, setEndDate] = useState(); 

    const [savedStartDate, setSavedStartDate] = useState(); 
    const [savedEndDate, setSavedEndDate] = useState(); 
 

    const [educationHistoryItemForm, setEducationHistoryItemForm] = useState({
        uid: uuidv4(),
        institutionName: "",
        qualification: "",
        studyField: "",
        city: "",
        startDate: "",
        endDate: "", 
        description: ""

    })

    const isReviewing = useSelector(state => state.isReviewingState);    
    const [isReviewingLocalState, setIsReviewingLocalState] = useState(false); 

    useEffect(() =>{
       //  console.log("is reviewing......", isReviewing.isReviewing)
        setIsReviewingLocalState(isReviewing.isReviewing)
        //  console.log("IS REVIEWING STATE...." + isReviewingLocalState)
    },[isReviewing])


    useEffect(()=>{
        // console.log("WORKHISTORY ITEM: " , workHistoryItemForm)
    }, [educationHistoryItemForm])
     

    useEffect(()=>{
        // console.log("work item BEFORE EMPTY----: ", workHistoryItem )
        if(!educationHistoryItem.educationHistoryItem.uid){
            // console.log("EMPTY FORM....");
            setStartDate("")
            setEndDate("")
            setEducationHistoryItemForm({
                uid: uuidv4(),  
                institutionName: "",
                qualification: "",
                studyField: "",
                city: "",
                startDate: "",
                endDate: "", 
                description: ""
        
            })
        }else{

            if(educationHistoryItem.educationHistoryItem.startDate){

                var sdateString = educationHistoryItem.educationHistoryItem.startDate; 
                var dateParts = sdateString.split("/"); 
                var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                setStartDate(dateObject)

            }else{
                setStartDate("")

            }

            if(educationHistoryItem.educationHistoryItem.endDate){
                var edateString = educationHistoryItem.educationHistoryItem.endDate
                var edateParts = edateString.split("/"); 
                var edateObject = new Date(+edateParts[2], edateParts[1] - 1, +edateParts[0]); 
                setEndDate(edateObject) 
            }else{
                setEndDate("") 
            }
            
            setEducationHistoryItemForm({
                ...educationHistoryItem.educationHistoryItem
            })

        }
    }, [ educationHistoryItem])
  
    useEffect(()=>{
        let obj = {
            ...educationHistoryItemForm,
            endDate: savedEndDate,
            startDate: savedStartDate
        } 
        setEducationHistoryItemForm(obj)
    }, [savedEndDate, savedStartDate])
  
    useEffect(()=>{
        let obj = {
            ...educationHistoryItemForm,
            qualification: dropdownSelect, 
        } 
        setEducationHistoryItemForm(obj)
    }, [dropdownSelect])
  
    const backStep = (e) =>{
        e.preventDefault();
         
        dispatch(updateEducationHistoryItem({}))


        if(allEducationHistoryItems.length || isReviewingLocalState){
            dispatch(updateProfileBuilderEducationHistory("itemReview")) 
        } else{
            dispatch(updateProfileBuilderEducationHistory("")) 
            dispatch(updateProfileBuilderState("preEducation")) 
        }
    }

    const nextStep = (e) =>{
        e.preventDefault();
        // console.log("CLICKED....next ")   
        for (const [key, value] of Object.entries(educationHistoryItemForm)) {
            if(key !== "description" && (  typeof value == "undefined" || value.length < 1)){ 
                Notiflix.Notify.Failure('Please complete all fields.');
                return;
            }
        }  
        const allEducationHistoryItemsUpdate = [
            ...allEducationHistoryItems.allEducationHistoryItems
        ]
        const index = allEducationHistoryItems.allEducationHistoryItems.findIndex(x => x.uid === educationHistoryItemForm.uid)


        if(index > -1){
            allEducationHistoryItemsUpdate[index] = educationHistoryItemForm; 
        }else{ 
            allEducationHistoryItemsUpdate[allEducationHistoryItemsUpdate.length] = educationHistoryItemForm;
        }

        dispatch(updateEducationHistoryItem({}))
        dispatch(updateAllEducationHistoryItems(allEducationHistoryItemsUpdate)); 
        dispatch(updateUserCVData({ value: {educationHistory : allEducationHistoryItemsUpdate}, test: "education" })) 
        dispatch(updateProfileBuilderEducationHistory("itemReview")) 
    }
  
    const handleChange = (e) =>{
        e.preventDefault();
        let obj = {
            ...educationHistoryItemForm,
            [e.target.id]: e.target.value
        }
        setEducationHistoryItemForm(obj)
    }
    
    const handleDateChangeSetStartDate = (d) =>{
        const date =  d.getDate() + "/" +  (d.getMonth()+1) + "/" +  d.getFullYear();
        setSavedStartDate(date) 
        setStartDate(d)  
    }

    const handleDateChangeSetEndDate = (d) =>{
        if(d != null){
            const date =  d.getDate() + "/" +  (d.getMonth()+1) + "/" +  d.getFullYear();
            setSavedEndDate(date) 
            setEndDate(d) 
        }
    }

    const handleQualDropdownClick = (e) =>{
        e.preventDefault();
        setShowDropdown(!showDropdown)
    }

    const clickQual = (e) =>{
        e.preventDefault();
        console.log("CLICKED....")
        setShowDropdown(false)
        setDropdownSelect(e.target.innerHTML)
    }

    const showPreviewModal = (e) =>{
        e.preventDefault();
        console.log("show modal....")
        dispatch(updateCvModal({showModal: true})) 

    }
    return ( 
        <EducationHistoryItemStartContainer>
              <div className="educationHistoryItemStart-container">
                <div className="main-content">
                    <h1>Tell us about your education</h1>
                    <p>Include every school, even if you’re still there or didn’t graduate.</p>
                </div> 
                <div className="main-content-form">
                    <form>
                        <fieldset>
                            <input type="text" name="institutionName"  id="institutionName" value={educationHistoryItemForm.institutionName} onChange={handleChange} placeholder="Institution Name"/>
                            <input type="text" name="city"      id="city"  value={educationHistoryItemForm.city}  onChange={handleChange}  placeholder="City/Town"/>
                        </fieldset>
                        <fieldset>
                            <input type="text" name="qualification" className="qual-select" id="qualification" value={educationHistoryItemForm.qualification} readOnly onClick={handleQualDropdownClick}  placeholder="Qualification"/>
                            <input type="text" name="studyField"    id="studyField" value={educationHistoryItemForm.studyField} onChange={handleChange}   placeholder="Field of Study"/>
                            <div className={`customDropdown ${showDropdown ? 'show' : ""}`}>
                                <ul>
                                    <li >Please Select</li>
                                    <li onClick={clickQual} >Doctor of Philosophy</li>
                                    <li onClick={clickQual} >Doctor of Medicine</li>
                                    <li onClick={clickQual} >Juris Doctor</li>
                                    <li onClick={clickQual} >Master of Business Administration</li>
                                    <li onClick={clickQual} >Master of Science</li>
                                    <li onClick={clickQual} >Master of Arts</li>
                                    <li onClick={clickQual} >Bachelors of Arts </li>
                                    <li onClick={clickQual} >Bachelors of Science </li>
                                    <li onClick={clickQual} >Bachelor of Business Administration </li>
                                    <li onClick={clickQual} >Foundation Degree in Science</li>
                                    <li onClick={clickQual} >Foundation Degree in Arts</li>
                                    <li onClick={clickQual} >Certificate of Higher Education </li>
                                    <li onClick={clickQual} >A Levels</li>
                                    <li onClick={clickQual} >Higher National Diploma</li>
                                    <li onClick={clickQual} >Scottish Qualification Certificate</li>
                                    <li onClick={clickQual} >NVQ Level</li> 
                                    <li onClick={clickQual} >GSCE </li>
                                    <li onClick={clickQual} >SQL Level</li>
                                </ul>
                            </div>
                        </fieldset> 
                        <fieldset>  
                                <DatePicker dateFormat="dd/MM/yyyy" showYearDropdown selected={startDate} onChange={(date) => { handleDateChangeSetStartDate(date) }}  placeholderText="Start Date" />
                                <DatePicker dateFormat="dd/MM/yyyy"  showYearDropdown selected={endDate} onChange={(date) => { handleDateChangeSetEndDate(date) }}  placeholderText="Graduation Date" />
                        </fieldset>
                        <fieldset className="full-width">  
                            <textarea id="description" onChange={handleChange}  value={educationHistoryItemForm.description} placeholder="Add a description (optional)">

                            </textarea>
                        </fieldset>
                        <fieldset>
                            <Button type="greenSmall" text="Preview"  onClick={showPreviewModal}/>
                        </fieldset>
                    </form>
                </div> 
            </div>

            <div className="selection-buttons">
                <Button type="primarySmall" text="BACK"  onClick={backStep}/>
                <Button type="primarySmall" text="NEXT"  onClick={nextStep}/>
            </div>
        </EducationHistoryItemStartContainer>
    )
}
           