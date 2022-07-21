import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../shared-components/button'; 

import {useDispatch, useSelector} from 'react-redux'; 
import plus from '../../../assets/svg/add.svg'; 


import { 
    updateProfileBuilderEducationHistory,
    updateUserCVData,
    updateCvHighlightBuilder,
    updateWorkHistoryItem, 
    updateProfileBuilderState, 
    updateProfileBuilderWorkHistory, 
    updateAllWorkHistoryItems
} from  '../../../store/actions/actions'; 


import exit from '../../../assets/svg/exit.svg'; 
import editfield from '../../../assets/svg/edit-field.svg'; 

import firebase from 'firebase'; 
import { db } from '../../../firebase';


const WorkHistoryReviewContainer = styled.div` 
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
        .workhistoryitems-container {
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
            .workhistoryitem-content{
                padding: 5px 40px!important;
            }

            .workhistoryitem-title{ 
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

    .workitem-title{
        margin-bottom: 30px;   
    }
    .workhistoryitems-container{
        display: flex;
        flex-direction: column;
        > div{ 
            height: auto;
            border-radius: 10px;
            box-shadow: 0 0 40px -10px rgba(0,0,0,0.5);
            position: relative;
            margin-bottom: 50px;  
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
            .workhistoryitem-title{
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

            .workhistoryitem-content{
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
                background-image: url(${plus});
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
export default function WorkHistoryReview() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();     
    const allWorkHistoryItems = useSelector(state => state.allWorkHistoryItems);   
    const [localWorkItems, setLocalWorkItems] = useState([]);
 
    const isReviewing = useSelector(state => state.isReviewingState);   

    const [isReviewingLocalState, setIsReviewingLocalState] = useState(false); 

    useEffect(() =>{
       //  console.log("is reviewing......", isReviewing.isReviewing)
        setIsReviewingLocalState(isReviewing.isReviewing)
        //  console.log("IS REVIEWING STATE...." + isReviewingLocalState)
    },[isReviewing])

    useEffect(()=>{
        setLocalWorkItems(allWorkHistoryItems.allWorkHistoryItems)
        // if(allWorkHistoryItems.allWorkHistoryItems.length > 0 ) {
            // console.log("WORK HISTORY: ", allWorkHistoryItems.allWorkHistoryItems  )
        // }

    }, [allWorkHistoryItems])


    const backStep = (e) =>{
        e.preventDefault();
        dispatch(updateProfileBuilderState("workHistory"))
        dispatch(updateProfileBuilderWorkHistory("itemStart"))
    }

    const nextStep = (e) =>{
        e.preventDefault();
        dispatch(updateProfileBuilderState("preEducation"))
        dispatch(updateProfileBuilderEducationHistory("itemStart"))
    }
    const reviewStep = (e) =>{
        e.preventDefault();

        dispatch(updateCvHighlightBuilder(""))
        dispatch(updateProfileBuilderState("reviewCV"))
        dispatch(updateProfileBuilderWorkHistory(""))
    }
    
    const handleNewItemClick = (e) =>{
        e.preventDefault();
        dispatch(updateProfileBuilderState("workHistory"))
        dispatch(updateProfileBuilderWorkHistory("itemStart"))
    }

    const removeItem = (e)=>{
        e.preventDefault(); 
        let uid = e.target.getAttribute("data-uid")  
        let x = localWorkItems.filter( o => o.uid !== uid )
        dispatch(updateAllWorkHistoryItems(x));
        dispatch(updateUserCVData({ value: {workHistory : x}, test: "work review" }))

    }
    
    const editItem = (e )=>{
        e.preventDefault()  
        let uid = e.target.getAttribute("data-uid")
        
        console.log("uid: ", e.target.getAttribute("data-uid"))
        const singleLocalWorkItem = localWorkItems.find( o => o.uid === uid ) 

        console.log("single item: ",  singleLocalWorkItem)
        dispatch(updateWorkHistoryItem(singleLocalWorkItem)) 
        dispatch(updateProfileBuilderState("workHistory"))
        dispatch(updateProfileBuilderWorkHistory("itemStart"))
 
    }
    
  
    return ( 
        <WorkHistoryReviewContainer>
             <div className="workitem-title">
                <h1>Work history summary</h1> 
            </div>
            <div className="workhistoryitems-container"> 
                
                {
                    localWorkItems.map((item, i) =>{

                        return (
                            <div className="workhistoryitem-container" key={i}> 
                                <button data-uid={item.uid} onClick={removeItem} className="remove-item"></button>
                                <div className="workhistoryitem-title">
                                    <span>{i + 1}</span>
                                    <p><span>{item.jobTitle}, {item.employer}</span> | {item.city} | {item.startDate} - {item.currentEmployer ? "Present" : item.endDate}</p>
                                    <button  data-uid={item.uid} onClick={editItem}  className="edit"></button>
                                </div>
                                <div className="workhistoryitem-content">
                                    <div className="workhistoryitem-innercontent" dangerouslySetInnerHTML={{__html: item.content}}></div>
                                </div>
                            </div> 
                        )
                    })
                }
                
            </div>
            <div className="add-more-items">
                <button onClick={handleNewItemClick}>ADD ANOTHER POSITION</button>
                
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
        </WorkHistoryReviewContainer>
    )
}
           