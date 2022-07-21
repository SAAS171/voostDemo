import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components'; 
import {useDispatch, useSelector} from 'react-redux'; 

import { getMyNotifications, fetchJobOffer, fetchContract, handleInterviewRequest, 
    updateNotification } from '../../store/actions/actions';  

import { useHistory } from "react-router-dom";
import Button from '../shared-components/button'; 
import {CardDiv, CardTop} from '../account-home/styles/accountSettingsCard';
import {BorderContainer, H6} from '../../styles/components/shared-components';
import {Animated} from "react-animated-css";  
import firebase from 'firebase'; 
import { db, rdb, auth } from '../../firebase';



const ConversationsCardInner = styled.div` 
    .no-border{
        border: none!important;   
        h6{
            margin: 0;
        }
    }
    .accept-reject-container{ 
        display: flex;
        /* flex-direction: column; */
    }
    h6{
        position:relative;
        width: 100%;
        padding-right: 50px; 
        border: none;
        span{
            font-size: 18px;
            font-weight: 100;

        }
 
    }
    .card-main{
        padding: 10px;
        .recent-notifications{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
    }
    .card-bottom{
        a{
            text-align: center;
            width: 100%;
            display: block;
            border-top: 1px solid lightgray;
            padding: 20px 0 0;
            color: grey;
            text-transform: uppercase;
            text-decoration: none;
            letter-spacing: 2px;
        }

    }
`
const ConversationsOuterContainer = styled.div` 
    max-width: 1140px;
    margin: 50px auto;  
    .selector-container{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .notification-type-selector{ 
            width: calc(50% - 50px );
            padding: 20px 0;
            color: grey;
            margin: 20px 0;
            background-color: whitesmoke;
            cursor: pointer;
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transform: none;
            transition: ease-in-out 200ms all;
            border: 1px solid transparent;
            border-radius: 4px;
            &:hover{
                transition: ease-in-out 200ms all;
                transform: scale(1.02)
            }
            &.show-list{
                color: #dc3163;
                border: 1px solid #dc3163;
            }
        }

    }

    .single-item.unread-message > div > div > div {
        position: relative;
        border: 2px solid red;
        span.unread-text {
            position: absolute;
            top: -16px;
            right: 0;
            color: red;
            font-size: 9px;
            font-weight: 800;
            text-transform: uppercase; 
            letter-spacing: 1px;
            margin: 0;
        }
    }
    .header-content{
        padding: 50px 0;
        position: relative;
        border-bottom: 1px solid lightgrey;
        h1{
            margin: 0;
            text-align: center;
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        span{
            position: absolute;
            left: 0;
            top: 0;
            cursor: pointer;

        }
    }

    @media screen and (max-width: 992px) {
        .selector-container{
            flex-direction: column;
            p{    
                width: 90%!important;
                margin: 10px 0!important;
            }
        }
        .notification-list-items{
            .single-item{ 
                .mobile-card-top{

                    padding: 0 15px;
                    text-align: left;
                    align-items: flex-start;
                    border-bottom: none;
                    h6{
                        padding: 0;
                        margin-bottom: 0;
                    }
                    button{ 
                        margin: 10px 0 0;
                        width: 100%; 
                    }
                }
                .card-main{
                    padding: 0 20px;
                }
            }
        }
    }


    .hidden {
        display: none;
    }
`
export default function ConversationsList() {
       
    const history = useHistory();
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();    
    const notificationsReducer = useSelector(state => state.fetchNotifications); 
    const [unreadCount, setUnreadCount] = useState(0) 

    const [sortedMessages, setSortedMessages] = useState([]) 
    const [um, setUm] = useState([]) 
    const [currentNotification, setCurrentNotification] = useState(0) 
    const [resetMessages, setResetMessages] = useState(false) 
 
 
    
    useEffect(()=>{
        dispatch(getMyNotifications())  
    }, [] )


    useEffect(()=>{ 
        console.log("UM,", um)
    }, [um ] )
 
    useEffect(()=>{ 
        setUm(sortedMessages) 
    }, [sortedMessages] )
 
    useEffect( ()=>{  
        if(notificationsReducer.fetchedNotifications.length > 1 && um.length < 1 ){ 
            (async () => { 
                let messages = await filterForGroupBy(notificationsReducer.fetchedNotifications)  
                setSortedMessages(messages)  
                setUnreadCount( messages.filter((e) => { return !e.viewed }) .length)
            })()
        }
    }, [notificationsReducer.fetchedNotifications ] )

    useEffect( ()=>{  
        if(resetMessages){ 
            dispatch(getMyNotifications())  
            setResetMessages(false)
        }
    }, [resetMessages ] )
    

    const filterForGroupBy  = async (ungroupedNotifications) =>{


        const orderedUngroupedNotifications = ungroupedNotifications.sort((a, b) => b.sortDate - a.sortDate)   
        console.log("orderedUngroupedNotifications :", orderedUngroupedNotifications);
        let filteredArr = []; 
        await orderedUngroupedNotifications.some((o)=> { 
            if(o.type=== "Message"){  
                if( filteredArr.findIndex(x => x.application_id === o.application_id) === -1) filteredArr.push(o) 
            }
            return false
        }) 

        const rdbFilteredArr = []; 
        const my_id = auth.currentUser.uid 

        const BreakException = {}; 
        try{
 
            await Promise.all( 
                filteredArr.map( async (elem, i) => {  

                    var messages = await rdb.ref('messages/' + elem.application_id );  
                    let x = await messages.once('value', async (snapshot) => {  

                        const data = await snapshot.val();    
                        if(data != null  ){ 
        
                            let arr = await Object.keys(data)
                                .filter((k) => { return k != "closed" })
                                .map((k) => data[k])  
                            let tmpName = "";
                            
                            const itemToAdd = await arr.sort( (x, y) => {  if(tmpName.length < 1 &&  x.uid != my_id ) tmpName = x.name;  return x.timestamp - y.timestamp} ).reverse()[0];
                            itemToAdd["conversationWith"] = tmpName
                            itemToAdd["viewed"] = elem.viewed
                            itemToAdd["application_id"] = elem.application_id
                            itemToAdd["notificationId"] = elem.id
                            await rdbFilteredArr.push(itemToAdd) 
                        }
                        return x;
                        Promise.resolve();
                    }); 
        
                }) 
            );  


        } catch (e) {
            console.log('FAILED....' );
            if (e !== BreakException) throw e; 
        } 
        const sortedRdbFilteredArr =  await rdbFilteredArr.sort((a, b) => b.timestamp - a.timestamp)   
        return sortedRdbFilteredArr; 
    } 

    const replyToMessage = (e) =>{
        e.preventDefault();
        const aid =  e.target.getAttribute("data-aid"); 
        const id =  e.target.getAttribute("data-id"); 
        const i = um.findIndex(x => x.application_id == aid);
        let newUm = [...um]
        newUm[i].viewed = true;
        setUm(newUm)


        const notificationToClear =  e.target.getAttribute("data-nid"); 
        dispatch(updateNotification({uid: auth.currentUser.uid, id:notificationToClear }))
        setResetMessages(true)

        history.push( {pathname: "/messenger", state: { applicantId: auth.currentUser.uid, applicationId: aid }}); 
    }
    

  


    return ( 
        <ConversationsOuterContainer>    
            <div className="header-content">
                <span onClick={() => history.goBack()}>Back</span>
                <h1>{ unreadCount == 0 ? "NO" : unreadCount } New Messages</h1>
            </div> 
            <div className="conversations-list-items">    
                {
                    um.length < 1 ? "" : 
                    um.map( (n, i)  =>  
                        ( 
                            <div key={n.application_id} className={` single-item ${n.viewed ? "" : "unread-message"}`}> 
                                <BorderContainer > 
                                    <ConversationsCardInner >
                                        <CardDiv  >
                                            { !n.viewed ? <span className="unread-text">Unread Message</span> : ""}
                                            <CardTop className=" mobile-card-top">
                                                <H6>{n.conversationWith} <span>{n.readableTime}, {n.readableDate} </span></H6> 
                                                <Button 
                                                    data-nid={n.notificationId}
                                                    data-aid={n.application_id}
                                                    data-id={n.id}
                                                    type="primarySmall"
                                                    text="Reply"
                                                    onClick={replyToMessage}
                                                />
                                            </CardTop>  
                                            <div className="card-main">  
                                                <p>{n.message}</p>
                                            </div> 
                                        </CardDiv>    
                                    </ConversationsCardInner>
                                </BorderContainer>
                            </div>   
                        )  
                    )
                } 
            </div>
        </ConversationsOuterContainer>
    )
}
           