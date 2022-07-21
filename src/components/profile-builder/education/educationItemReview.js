import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../shared-components/button'; 

import {useDispatch, useSelector} from 'react-redux'; 


import {  
    updateUserCVData,
    updateCvHighlightBuilder,
    updateEducationHistoryItem, 
    updateProfileBuilderState, 
    updateProfileBuilderEducationHistory, 
    updateAllEducationHistoryItems} from  '../../../store/actions/actions'; 


import up from '../../../assets/svg/sort-up.svg'; 
import down from '../../../assets/svg/sort-down.svg'; 
import exit from '../../../assets/svg/exit.svg'; 
import editfield from '../../../assets/svg/edit-field.svg'; 

import firebase from 'firebase'; 
import { db } from '../../../firebase';


const EducationHistoryReviewContainer = styled.div` 
    max-width: 1140px;
    margin: 50px auto;
    text-align: left;

    @media screen and (max-width: 992px) { 
        max-width: 100vw;
        margin: 20px auto;
        padding: 0 15px;
        h1{
            text-align: center;
            margin-top: 80px;
            font-size: 25px;
        }
        .educationhistoryitems-container {
            > div {
                position: relative; 

                .remove-item { 
                    right: -10px!important;
                    top: -10px!important; 
                    height: 30px!important;
                    width: 30px!important;
                }
                .edit { 
                    right: 20px!important;
                    top: 30px!important;
                    height: 30px!important;
                    width: 30px!important;
                }
            }
            .educationhistoryitem-content{
                padding: 5px 40px!important;
            }

            .educationhistoryitem-title{ 
                padding: 5px 60px 5px 40px!important; 
                > span{
                    width: 30px!important;
                    height: 30px!important;
                    font-size: 18px!important;
                }
                > p{
                    font-size: 20px!important;
                    span {
                        display: block!important;
                        margin: 0!important;
                    }
                }
            }
        }
    }


    .educationitem-title{
        margin-bottom: 30px;   
    }

    .educationhistoryitem-outer-container{
        position: relative;
        padding: 0 50px;
        .ordering-buttons{
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            height: 100px;
            justify-content: flex-start;
            button{
                width: 40px;
                height: 30px;
                background-color: transparent;
                border: none;
                background-size: 60%;
                background-position: center;
                background-repeat: no-repeat;
                &:first-of-type{
                    background-image: url(${up})
                }
                &:last-of-type{
                    background-image: url(${down})
                }
            }
        }
    }
    .educationhistoryitems-container{
        display: flex;
        flex-direction: column; 
        .educationhistoryitem-container{ 
            height: auto;
            border-radius: 10px;
            box-shadow: 0 0 40px -10px rgba(0,0,0,0.5);
            position: relative;
            margin-bottom: 50px; 
            cursor:pointer;

            &:after{
                content: "";
                position: absolute;
                pointer-events: none;
                left: 0;
                right: 0;
                bottom: 0;
                height: 100px;
                background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 60%); /* FF3.6-15 */
                background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 60%); /* Chrome10-25,Safari5.1-6 */
                background: linear-gradient(to bottom, rgba(255,255,255. 0) 0%,rgba(255,255,255,1) 60%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=0 ); /* IE6-9 */
            }
            .remove-item{
                z-index: 99;
                position: absolute;
                right: -20px;
                top: -15px;
                background-color: lightgrey;
                color: white;
                border-radius: 50%;
                height: 40px;
                width: 40px;
                border: none;
                background-image: url(${exit});
                background-size: 60%;
                background-position: center;
                background-repeat: no-repeat;
            }
            .educationhistoryitem-title{
                overflow: hidden;
                position: relative;
                padding: 10px 100px 10px 60px;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                p {
                    margin: 0;
                    font-size: 22px;
                    color: #555E82;
                    text-transform: capitalize;
                    > span{
                        font-weight: 600;
                    }

                }
                .edit{
                    margin: 0;
                    position: absolute;
                    right: 60px;
                    top: 10px;
                    height: 30px;
                    width: 30px;
                    background-color: transparent;
                    background-image: url(${editfield});
                    background-position: center;
                    background-size: 80%;
                    border: none;
                    background-repeat: no-repeat;
                    outline: none;

                }
                > span{
                    margin: 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 50px;
                    height: 50px;
                    background-color: #DC3163;
                    color: white;
                    font-size: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    line-height: 1;
                    border-bottom-right-radius: 4px;
                }
            }

            .educationhistoryitem-content{
                padding: 10px 100px 10px 76px; 
                max-height: 160px;
                overflow: hidden;
            }
        }

    }

    .add-more-items{
        text-align: center;
        margin-top: 35px;
        button{
            background-color: #4C567C;
            color: white;
            border-radius: 4px;
            margin:0 auto;
            display: inline-block;
            border: none;
            box-shadow: none;
            padding: 10px 20px;
            display: flex;
            align-items: center;
            &:before{
                content: ""; 
                height: 20px;
                width: 15px;
                display: inline-block;
                vertical-align: initial;
                background-image: url(/static/media/add.2001b95a.svg);
                background-size: 100%;
                background-position: center;
                background-repeat: no-repeat;
                margin: 0 10px;
            }
        }
    }
    
    .selection-buttons{
        margin-top: 35px;
        display: flex;
        justify-content: center;
    }
    .hidden {
        display: none;
    }
`
export default function EducationHistoryReview() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();     
    const allEducationHistoryItems = useSelector(state => state.allEducationHistoryItems);   
    const [localEducationItems, setLocalEducationItems] = useState([]);
    const isReviewing = useSelector(state => state.isReviewingState);   
 
    const [isReviewingLocalState, setIsReviewingLocalState] = useState(false); 

    useEffect(() =>{ 
        setIsReviewingLocalState(isReviewing.isReviewing) 
    },[isReviewing])

    useEffect(()=>{
        setLocalEducationItems(allEducationHistoryItems.allEducationHistoryItems)
        if(allEducationHistoryItems.allEducationHistoryItems.length > 0 ) {
            // console.log("EDUCATION HISTORY: ", allEducationHistoryItems.allEducationHistoryItems  )

        }
    }, [allEducationHistoryItems])

 

    const backStep = (e) =>{
        e.preventDefault();
        dispatch(updateProfileBuilderState("education"))
        dispatch(updateProfileBuilderEducationHistory("itemStart"))
    }

    const nextStep = (e) =>{
        e.preventDefault();
        dispatch(updateProfileBuilderState("preSkills"))
        dispatch(updateProfileBuilderEducationHistory(""))
    }

    const handleNewItemClick = (e) =>{
        e.preventDefault();
        dispatch(updateProfileBuilderState("education"))
        dispatch(updateProfileBuilderEducationHistory("itemStart"))
    }

    const removeItem = (e)=>{
        e.preventDefault(); 
        let uid = e.target.getAttribute("data-uid")   

        let x = localEducationItems.filter( o => o.uid !== uid )
        dispatch(updateAllEducationHistoryItems(x));
        dispatch(updateUserCVData({ value: {educationHistory : x}, test: "education" }))
    }
    
    const editItem = (e )=>{
        e.preventDefault()  
        let uid = e.target.getAttribute("data-uid")
        
        console.log("uid: ", e.target.getAttribute("data-uid"))
        const singleLocalEducationItem = localEducationItems.find( o => o.uid === uid ) 

        console.log("single item: ",  singleLocalEducationItem)
        dispatch(updateEducationHistoryItem(singleLocalEducationItem)) 
        dispatch(updateProfileBuilderState("education"))
        dispatch(updateProfileBuilderEducationHistory("itemStart"))
 
    }

    const cardEditItem = (uid)=>{
        // e.preventDefault()  
        // let uid = e.target.getAttribute("data-uid")
        
        // console.log("uid: ", e.target.getAttribute("data-uid"))
        const singleLocalEducationItem = localEducationItems.find( o => o.uid === uid ) 

        console.log("single item: ",  singleLocalEducationItem)
        dispatch(updateEducationHistoryItem(singleLocalEducationItem)) 
        dispatch(updateProfileBuilderState("education"))
        dispatch(updateProfileBuilderEducationHistory("itemStart"))
 
    }
    
    const reviewStep = (e) =>{
        e.preventDefault();

        dispatch(updateCvHighlightBuilder(""))
        dispatch(updateProfileBuilderState("reviewCV"))
        dispatch(updateProfileBuilderEducationHistory(""))
    }
  


    const moveUp = (i) =>{ 
 
        if(i > 0){ 
            const arr = localEducationItems;
            var element = arr[i];
            arr.splice(i, 1);
            arr.splice(i-1, 0, element); 
    
            setLocalEducationItems(arr) 
            dispatch(updateAllEducationHistoryItems(arr));
            dispatch(updateUserCVData({ value: {educationHistory : arr}, test: "education" }))
    
        }
    }
    const moveDown = (i) =>{ 

        if(i < localEducationItems.length - 1){ 
            const arr = localEducationItems;
            var element = arr[i];
            arr.splice(i, 1);
            arr.splice(i+1, 0, element); 
            
            setLocalEducationItems(arr) 
            dispatch(updateAllEducationHistoryItems(arr));
            dispatch(updateUserCVData({ value: {educationHistory : arr}, test: "education" }))
        }
        
    }

    return ( 
        <EducationHistoryReviewContainer>
             <div className="educationitem-title">
                <h1>Education history summary</h1> 
            </div>
            <div className="educationhistoryitems-container"> 
                
                {
                    localEducationItems.map((item, i) =>{

                        return (
                            <div  className="educationhistoryitem-outer-container" key={i}>
                                <div className="ordering-buttons">
                                    <button  onClick={() => {moveUp(i)}}></button>
                                    <button  onClick={() => {moveDown(i)}}></button>
                                </div>
                                <div onClick={() => {cardEditItem(item.uid)}}  className="educationhistoryitem-container"> 
                                    <button data-uid={item.uid} onClick={removeItem} className="remove-item"></button>
                                    <div className="educationhistoryitem-title">
                                        <span>{i + 1}</span>
                                        <p><span>{item.qualification}</span> | {item.institutionName} | {item.startDate} - {item.endDate}</p>
                                        <button  data-uid={item.uid} onClick={editItem}  className="edit"></button>
                                    </div>
                                    <div className="educationhistoryitem-content">
                                        <div className="educationhistoryitem-innercontent" >
                                            {
                                                item.description ?
                                                <p>{item.description}</p>
                                                :
                                                <p data-uid={item.uid} onClick={editItem}>Add a description</p>
                                            }
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        )
                    })
                }
                
            </div>
            <div className="add-more-items">
                <button onClick={handleNewItemClick}>ADD ANOTHER QUALIFICATION</button>
            </div>
            
            <div  className="selection-buttons">

            {
                isReviewingLocalState ? 
                    <> 
                        <Button type="primarySmall" text="SAVE AND REVIEW"  onClick={reviewStep}/>
                    </>   
                :
                    <>
                        <Button type="primarySmall" text="BACK"  onClick={backStep}/>
                        <Button type="primarySmall" text="SAVE AND CONTINUE"  onClick={nextStep}/>
                    </>
            }
            
            </div>
        </EducationHistoryReviewContainer>
    )
}
           