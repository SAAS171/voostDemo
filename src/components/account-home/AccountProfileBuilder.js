import React, {useState, useEffect} from 'react'; 
import Button from '../shared-components/button'; 
import {  NavLink } from "react-router-dom";
    
//Styles
import {CardDiv, CardTop} from './styles/accountSettingsCard';
import {BorderContainer, H6} from '../../styles/components/shared-components';
import CvPreviewModal from '../profile-builder/cvPreviewModal';
import { 
    updateIsReviewingState,
    updateCvModal,
    updateAllEducationHistoryItems,
    updateAllWorkHistoryItems,
    updateSummary,
    updateSkillsList,
    updateProfileBuilderSelection,
    updateProfileBuilderState
} from '../../store/actions/actions'; 
import {auth, db, storage} from '../../firebase';
import {useDispatch, useSelector} from 'react-redux'; 
import { useHistory } from "react-router-dom";
import styled from 'styled-components';   


const OuterContainer = styled.div`

    @media screen and (max-width: 992px) {
        .card-text-container{
            padding: 0 10px;
        }
    }
`


export default function AccountProfileBuilder() {  
    
    const dispatch = useDispatch();  
    const [profileExists, setProfileExists] = useState(false)
    const profileBuilderState = useSelector(state => state.profileBuilder)

    const history = useHistory();
 


    useEffect(() =>{

        console.log("env: ",  process.env.NODE_ENV , "- endpint : ",  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'  ?  process.env.REACT_APP_TEST_NODE_ENDPOINT  : process.env.REACT_APP_LIVE_NODE_ENDPOINT  );
       
        // console.log("HELLOO.....", profileBuilderState)
        if(auth.currentUser){

            const user = db.collection('users').doc(auth.currentUser.uid );
            user.get().then((doc) => {
                if (doc.exists) {
                    let cvProfile = doc.data().cvProfile;
                    // console.log("CV PROFILE", cvProfile)
                    if(cvProfile){
                        setProfileExists(true)
                        if(cvProfile.workHistory){
                            dispatch(updateAllWorkHistoryItems(cvProfile.workHistory));
                        }
                        if(cvProfile.educationHistory){
                            dispatch(updateAllEducationHistoryItems(cvProfile.educationHistory));
                        }
                        if(cvProfile.summary){
                            dispatch(updateSummary(cvProfile.summary));
                        }
                        if(cvProfile.skillsList){
                            dispatch(updateSkillsList(cvProfile.skillsList));
                        }
                    }  
                     

                } else { 
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            }); 
        }



    }, [ auth ])

    const getStarted = () =>{
        dispatch(updateIsReviewingState(false)) 
        dispatch(updateProfileBuilderSelection("selection"))  
        dispatch(updateProfileBuilderState(""))  
        history.push("/profile-builder");   
    }

    function goToReviewPage(){    
        dispatch(updateProfileBuilderState("reviewCV"))  
        dispatch(updateProfileBuilderSelection("createcv-review"))  
        history.push("/profile-builder");   
    }
    
    const showPreviewModal = (e) =>{
        e.preventDefault();
        console.log("show modal....") 
        dispatch(updateCvModal({showModal: true}))  
    }


    return(
        <OuterContainer>
            
            <BorderContainer>
                {
                    profileExists ?
                    <> 
                        <CardDiv>
                            <CardTop>
                                <H6>Candidate Profile</H6>
                                <div> 
                                    <Button type="primarySmall" text="Edit" onClick={goToReviewPage} /> 
                                    <Button type="primarySmall" text="VIEW" onClick={showPreviewModal}/>
                                </div>
                                
                            </CardTop>
                            <div className="card-text-container"> 
                                <p>View your professional candidate profile</p> 
                            </div>                
                        </CardDiv>
                        <CvPreviewModal/>
                    </>
                    :
                    <> 
                        <CardDiv>
                            <CardTop>
                                <H6>Profile Builder</H6>
                                <div> 
                                    <Button type="primarySmall" text="GET STARTED" onClick={getStarted}/>
                                </div>
                                
                            </CardTop>
                            <div className="card-text-container"> 
                                <p>Your profile is a proffessional CV that employers can see.</p> 
                            </div>                
                        </CardDiv> 
                    </> 

            }  
            </BorderContainer>
        </OuterContainer>
    )
}