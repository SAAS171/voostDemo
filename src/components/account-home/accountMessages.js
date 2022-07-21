import React, {useState, useEffect} from 'react'; 
import Button from '../shared-components/button'; 
import {  Link, NavLink } from "react-router-dom";
    
//Styles
import styled from 'styled-components';  
import {CardDiv, CardTop} from './styles/accountSettingsCard';
import {BorderContainer, H6} from '../../styles/components/shared-components';
import CvPreviewModal from '../profile-builder/cvPreviewModal';
import {  
    handleInterviewRequest, 
    getMyNotifications,
    fetchJobOffer,
    fetchContract,
    updateProfileBuilderState,
    updateNotification
} from '../../store/actions/actions'; 
import {auth, db, rdb, storage} from '../../firebase';
import {useDispatch, useSelector} from 'react-redux'; 
import { useHistory } from "react-router-dom";
  
import bell from '../../assets/svg/bell.svg';
 
const NotificationsCardInner = styled.div` 
    > div > div > h6{
        position:relative;
        width: 100%;
        padding-right: 50px;
        &:after{
            content: "";
            right: 15px;
            top: 50%;
            position: absolute;
            height: 30px;
            width: 30px; 
            background-color: transparent;
            transform: translateY(-50%);
            background-image: url(${bell});
            background-size: 60%;
            background-position: center;
            background-repeat: no-repeat;

        }
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
            >div{ 
                display: flex;  
                align-items: center;
            }
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

export default function AccountMessages() {  
    
    const dispatch = useDispatch();   
    const history = useHistory();
  
    const notificationsReducer = useSelector(state => state.fetchNotifications); 
    const [currentNotification, setCurrentNotification] = useState(0) 
    // const recentNotifications = useSelector(state => state.fetchNotifications)
    const [localRecents, setLocalRecents] = useState([]);
 
   

    useEffect(()=>{
        dispatch(getMyNotifications());
    }, [])

  

    useEffect(()=>{

        let notifications = notificationsReducer.fetchedNotifications  
        const sortedUnread = notifications.filter((e) => { return !e.viewed }).sort((a, b) => b.sortDate - a.sortDate)  
        let filteredArr = [];
 
        sortedUnread.some((o)=> { 
            if(o.type === "Message"){ 
                if(filteredArr.findIndex(x => x.application_id === o.application_id) === -1) filteredArr.push(o) 
            }else{
                filteredArr.push(o) 
            }
            return false
        })
  
        setLocalRecents( filteredArr.slice(0, 3)) 
    }, [notificationsReducer])
 


    const replyToMessage = (e) =>{
        e.preventDefault();
        const aid =  e.target.getAttribute("data-aid"); 
        const id =  e.target.getAttribute("data-id"); 
        history.push( {pathname: "/messenger", state: { applicantId: auth.currentUser.uid, applicationId: aid }}); 
    }

 
    const notificationSwitch = (data, index) =>{
        const n = data;
        switch (data.type) {   
            case "Message": 
                return  (
                    <div key={index}>
                        <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                        <Button 
                            data-id={n.id}
                            data-aid={n.application_id}
                            type="primarySmall"
                            text="Reply"
                            onClick={replyToMessage}
                        />  
                    </div>     
                ) 
                break; 
           
            default: 
                break;
        }
    }
    
    return(

        <BorderContainer> 
            <NotificationsCardInner >
                <CardDiv>
                    <CardTop>
                        <H6>Messages</H6> 
                    </CardTop> 
                    <div className="card-main"> 
                        <div className="recent-notifications"> 
                            {
                                localRecents.length > 0 ? 
                                    localRecents.map((n, index) => 
                                        (  
                                            notificationSwitch(n, index)
                                        )
                                    )
                                :
                                    <div>
                                        <p>No New Messages</p>
                                    </div> 
                            }
                        </div>    
                    </div>     
                    <div className="card-bottom"> 
                        <Link to="/conversations" >View All</Link> 
                    </div> 
                </CardDiv> 
            </NotificationsCardInner>
        </BorderContainer>
    )
}