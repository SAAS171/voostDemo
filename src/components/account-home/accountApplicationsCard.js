import React, {useState, useEffect} from 'react';
import Button from '../shared-components/button';
import {  NavLink
} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';  

//Styles
import {BorderContainer, H6} from '../../styles/components/shared-components';
import {CardBody, Application, Status} from './styles/accountApplicationsCard';
import {CardDiv, CardTop} from './styles/accountSettingsCard';
import { getMyApplications } from '../../store/actions/actions';
import {useHistory} from 'react-router-dom'; 
import { CardFooter } from '../job-card/styles/styles';

export default function AccountApplications(){
    const history = useHistory();
    const dispatch = useDispatch(); 
    const myApplications = useSelector(state => state.my_applications.my_applications); 
    const [applications, setApplications] = useState([]); 

    useEffect(() => {
        dispatch(getMyApplications())
    }, [])

    useEffect(() => {
        // console.log(myApplications);
        if(myApplications.length){
            // console.log(myApplications);
            setApplications(myApplications);
        }
    }, [myApplications])

    const handleView = (e) => {
        history.push(`/jobs?jobId=${e.target.id}`)
    }
    return(
        <BorderContainer>
            <CardDiv>
                <CardTop>
                    <H6>Applications</H6>
                </CardTop>
                <CardBody>
                    {applications.length > 0 ? (
                        applications.slice(0, 3).map(app => {
                            return (
                                <Application key={app.id}>
                                    <div className="app-left">

                                    { app.data().recruiter_image ?  
                                        <img src={`${app.data().recruiter_image ? app.data().recruiter_image.url : ''}`} alt="recruiter" />
                                     : "" } 
                                        
                                        <div>
                                            <H6>{app.data().recruiter_name ? app.data().recruiter_name : ''}</H6>
                                            <p className="job-title">{app.data().jobTitle ? app.data().jobTitle : ''}</p>
                                        </div>
                                    </div>

                                    <div className="app-right">
                                        <Status>{`${app.data().status ? app.data().status : 'Applied'}`}</Status>
                                        <Button type="primarySmall" text="View job" onClick = {e => handleView(e)} id={app.data().jobId ? app.data().jobId : ''}/>
                                    </div>
                                </Application>
                            ) 
                        })
                    ): '' } 
                    {applications.length < 1 && (
                        <>
                            <p>You have no open applications</p>
                            <NavLink to="/jobs">
                            <Button type="primarySmall" text="View jobs" />
                            </NavLink>
                        </>
                    )}
                    
                     
                    <NavLink to="/applications">
                        <button className="card-button">SHOW MORE</button>
                    </NavLink> 
        
                </CardBody> 
            </CardDiv>
        </BorderContainer>
    )
}