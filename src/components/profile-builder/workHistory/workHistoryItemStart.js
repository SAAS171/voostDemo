import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../shared-components/button';  
import {useDispatch, useSelector} from 'react-redux'; 
import {  updateCvModal,  updateProfileBuilderState,  updateWorkHistoryItem, updateProfileBuilderWorkHistory} from '../../../store/actions/actions'; 
import Notiflix from 'notiflix'; 
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';

import firebase from 'firebase'; 
import { db } from '../../../firebase';


const WorkHistoryItemStartContainer = styled.div` 
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
        }
    }
    .workHistoryItemStart-container{
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
                > input{
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
    const workHistoryItem = useSelector(state => state.workHistoryItem);   
    const allWorkHistoryItems = useSelector(state => state.allWorkHistoryItems);   

    const [startDate, setStartDate] = useState(); 
    const [endDate, setEndDate] = useState(""); 

    const [savedStartDate, setSavedStartDate] = useState(); 
    const [savedEndDate, setSavedEndDate] = useState(""); 

    const [currentEmployer, setCurrentEmployer] = useState(false)

    const [workHistoryItemForm, setWorkHistoryItemForm] = useState({
        uid: uuidv4(),
        jobTitle: "",
        employer: "",
        city: "",
        county: "",
        startDate: "",
        endDate: "", 
        currentEmployer: false

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
    }, [workHistoryItemForm])
    

    useEffect(()=>{
        // console.log("work item BEFORE EMPTY----: ", workHistoryItem )
        if(!workHistoryItem.workHistoryItem.uid){
            // console.log("EMPTY FORM....");
            setStartDate("")
            setEndDate("")
            setCurrentEmployer(false)
            setWorkHistoryItemForm({
                uid:   uuidv4(),
                jobTitle: "",
                employer: "",
                city: "",
                county: "",
                startDate: "",
                endDate: "", 
                currentEmployer: false
        
            })
        }else{

            console.log("SDATESTRING: ", workHistoryItem.workHistoryItem.startDate);
            if(workHistoryItem.workHistoryItem.startDate){
                var sdateString = workHistoryItem.workHistoryItem.startDate; 


                var dateParts = sdateString.split("/"); 
                var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                setStartDate(dateObject)

            }else{
                setStartDate("")
  
            }

            if(workHistoryItem.workHistoryItem.endDate){
                var edateString = workHistoryItem.workHistoryItem.endDate
                var edateParts = edateString.split("/"); 
                var edateObject = new Date(+edateParts[2], edateParts[1] - 1, +edateParts[0]); 
                setEndDate(edateObject)
            }else{
                setEndDate("")
            }
            
            setCurrentEmployer(workHistoryItem.workHistoryItem.currentEmployer)
            setWorkHistoryItemForm({
                ...workHistoryItem.workHistoryItem
            })

        }
    }, [ workHistoryItem])
  
    useEffect(()=>{
        let obj = {
            ...workHistoryItemForm,
            endDate: savedEndDate,
            startDate: savedStartDate
        }
        // console.log("OBJ", obj)
        setWorkHistoryItemForm(obj)
    }, [savedEndDate, savedStartDate])
  
    const backStep = (e) =>{
        e.preventDefault();
        

        dispatch(updateWorkHistoryItem({}))

        if(allWorkHistoryItems.length || isReviewingLocalState){
            dispatch(updateProfileBuilderWorkHistory("itemReview")) 
        } else{
            dispatch(updateProfileBuilderWorkHistory("")) 
            console.log("BACK TO PRE WORK")
            dispatch(updateProfileBuilderState("preWorkHistory")) 
        }
    }

    const nextStep = (e) =>{
        e.preventDefault();
        // console.log("CLICKED....next ")   
        console.log("WORK HISTORY ITEM FORM: ", workHistoryItemForm)
        let hasError = false;

        for (const [key, value] of Object.entries(workHistoryItemForm)) {
            
            console.log("key: ", key, ": ", value) 
            
            if(
                (key === "endDate" || key === "currentEmployer") &&
                (!workHistoryItemForm.currentEmployer && (typeof workHistoryItemForm.endDate == "undefined" ||  workHistoryItemForm.endDate == "" ))
            ){
                hasError = true; 
            }

            
            if(
                (key !== "endDate"  && key !== "currentEmployer" && typeof value === "undefined" )
            ){   
                hasError = true; 
            }


        } 
        if(hasError){
            Notiflix.Notify.Failure('Please complete all fields.');
            return;
        }
        // console.log("WORKHISTORY START: ", workHistoryItemForm)

        dispatch(updateWorkHistoryItem(workHistoryItemForm))
        dispatch(updateProfileBuilderWorkHistory("itemContent")) 
 
    }

  
    const handleChange = (e) =>{
        e.preventDefault();
        let obj = {
            ...workHistoryItemForm,
            [e.target.id]: e.target.value
        }
        setWorkHistoryItemForm(obj)
    }
    const handleClick = (e) =>{ 
        e.preventDefault();
        setCurrentEmployer(!currentEmployer);
        let obj = {
            ...workHistoryItemForm,
            currentEmployer: !currentEmployer
        }
        setWorkHistoryItemForm(obj) 
    }
    const handleDateChangeSetStartDate = (d) =>{
        const date =  d.getDate() + "/" +  (d.getMonth()+1) + "/" +  d.getFullYear();
        setSavedStartDate(date) 
        setStartDate(d)  
    }
    const handleDateChangeSetEndDate = (d) =>{
        const date =  d.getDate() + "/" +  (d.getMonth()+1) + "/" +  d.getFullYear();
        setSavedEndDate(date) 
        setEndDate(d) 
    }


    const showPreviewModal = (e) =>{
        e.preventDefault();
        console.log("show modal....")
        dispatch(updateCvModal(true)) 

    }
    return ( 
        <WorkHistoryItemStartContainer>
              <div className="workHistoryItemStart-container">
                <div className="main-content">
                    <h1>Tell us about your work history</h1>
                    <p>Start with your most recent job, you can add more later on.</p>
                </div> 
                <div className="main-content-form">
                    <form>
                        <fieldset>
                            <input type="text" name="jobTitle"  id="jobTitle" value={workHistoryItemForm.jobTitle} onChange={handleChange} placeholder="Job Title"/>
                            <input type="text" name="employer"  id="employer" value={workHistoryItemForm.employer} onChange={handleChange}   placeholder="Employer"/>
                        </fieldset>
                        <fieldset>
                            <input type="text" name="city"      id="city"  value={workHistoryItemForm.city}  onChange={handleChange}  placeholder="City/Town"/>
                            <input type="text" name="county"    id="county" value={workHistoryItemForm.county} onChange={handleChange}   placeholder="County"/>
                        </fieldset> 
                        <fieldset>  
                            <DatePicker dateFormat="dd/MM/yyyy" showYearDropdown selected={startDate} onChange={(date) => { handleDateChangeSetStartDate(date) }}  placeholderText="Start Date" />
                            <DatePicker dateFormat="dd/MM/yyyy"  showYearDropdown selected={endDate} onChange={(date) => { handleDateChangeSetEndDate(date) }}  placeholderText="End Date" />
                        </fieldset>
                        <fieldset>
                            <Button type="greenSmall" text="Preview"  onClick={showPreviewModal}/>
                            <button className={`checkbox ${currentEmployer ? "checked" : ""}`} onClick={handleClick}>I currently work here</button>
                        </fieldset>
                    </form>
                </div> 
            </div>

            <div className="selection-buttons">
                <Button type="primarySmall" text="BACK"  onClick={backStep}/>
                <Button type="primarySmall" text="NEXT: ADD WORK DETAILS"  onClick={nextStep}/>
            </div>
        </WorkHistoryItemStartContainer>
    )
}
           