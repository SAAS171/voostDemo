
import React, {  useEffect} from 'react';
// import {Route, useHistory} from "react-router-dom"; 
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'; 

// import {useSelector, useDispatch} from 'react-redux';

import {auth} from './firebase'; 
import AuthRoute from './routes'; 
// import { Sidebar } from './styles/components/sidebarNav';
import AccountRecruiter from './pages/Account-Recruiter';
import ChangePassword from './pages/changePassword';
import Home from './pages/home';
import ContactUs from './pages/contactUs';
import Jobs from './pages/jobs';
// import RecruiterAccount from './pages/Account-Recruiter';
import About from './pages/about';
import PostJob from './pages/postJob';
import Apply from './pages/apply';
import Account from './pages/account';
import ProfileBuilder from './pages/profileBuilder';
import VoostRooms from './pages/VoostRooms';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy'; 
// import Cookies from './pages/Cookies';
import AcceptableUse from './pages/acceptableUse';

import ApplicantQuestions from './pages/applicant-questions';
import RecruiterQuestions from './pages/recruiter-questions';

//INT LINKS
import EditJobPost from './pages/editJobPost';
import Settings from './pages/settings';
import MeetingRoom from './pages/meetingRoom';
import Applications from './pages/applications';
import MyPosts from './pages/myPosts';
import SavedJobs from './pages/savedJobs';

import ApplicantProfilePage from './pages/view-applicant';
import CreateContractPage from './pages/create-contract';
import CompleteDocumentPage from './pages/complete-document';
import CreateOfferLetterPage from './pages/create-offerletter';

import {useSelector } from 'react-redux';
//NAV
import {Header} from './components/header';
import Footer from './components/footer/footer';
import SidebarNav from './components/header/sidebarNav';
import SidebarNavRecruiter from './components/header/sidebarNavRecruiter';
import SidebarNavSeeker from './components/header/sidebarNavSeeker';
import ScrollToTop from './ScrollToTop';

import QuestionsEnd from './pages/questionsEnd'
import QuestionsIntro from './pages/questionsIntro'
import Review from './pages/reviewquestions'
import QuestionIntroSelect from './pages/questionsIntroSelect';

import ApplicantQuestionsEnd from './pages/applicantQuestionsEnd';
import ApplicantQuestionsIntro from './pages/applicantQuestionsIntro';
import ApplicantQuestionsPreStart from './pages/applicantQuestionsPreStart';
import ApplicantQuestionsStart from './pages/applicantQuestionsStart';
import ApplicantQuestionsPreEnd from './pages/applicantQuestionsPreEnd';
import Notifications from './pages/notifications'; 
import ViewOfferPage from './pages/view-offer';
import ViewContractPage from './pages/view-contract';
import GiveFeedbackPage from './pages/give-feedback';
import FeedbackThankyouPage from './pages/feedback-thankyou';
import FeedbackContentPage from './pages/view-feedback';
import StartPreRecordedQuestions from './pages/start-pre-recorded';
import StartPreRecordedInterview from './pages/pre-recorded-interview-start';
import ConfirmStartInterview from './pages/confirm-interview-start';
import RecordInterview from './pages/record-interview';
import ReviewApplication from './pages/review-application';
import ViewAnswers from './pages/view-answers';
import Verification from './pages/verification';
import ResetPass from './pages/email-reset';


import MessengerPage from './pages/messenger';
import ConversationsPage from './pages/conversations';

import ReactPixel from 'react-facebook-pixel';


function RouterApp() {
    // const isRecruiter = useSelector(state => state.isRecruiter);

    const user = useSelector(state => state.user);
    const isRecruiter = useSelector(state => state.isRecruiter); 
    const recruiter =   useSelector(state => state.isRecruiter); 
    const history = useHistory();
  
 
    useEffect(()=>{   
        ReactPixel.init('986257758603082',  { autoConfig: true, debug: false});   
        ReactPixel.pageView(); // For tracking page view   
      
    },[]);
 
    useEffect(()=>{ 
        // console.log("HISTORY....")
        if(history){
            return history.listen((location)=>{
                console.log("push to datalayer.");
                ReactPixel.pageView(); // For tracking page view  
                
                window.dataLayer.push({ event: 'PageView' });
                return window._mfq.push(['newPageView', location.pathname]); 
            })
        } 
    },[history]);
 

  return (
    <> 
    <Router>  
    <ScrollToTop />

        <div className="App">
            <Header user={user}/>
            {(user.user === null ? <SidebarNav />  : recruiter ? <SidebarNavRecruiter /> : <SidebarNavSeeker />)}
            <ScrollToTop >
                <Switch> 
                    {/* <Route path="/Account" render={(props) =>  {return (auth.currentUser != null ? <AccountRecruiter {...props}/> : <Redirect to='/'/>)}}/> */}
                    {/* <Route path="/Account" render={(props) =>  {return (auth.currentUser != null ? <Account {...props}/> : isRecruiter ? <RecruiterAccount {...props} /> : <Redirect to='/'/>)}}/> */}
                    {/* <AuthRoute type='private' render={Account} path="/Account" isRecruiter={isRecruiter} isAuthUser = {auth.currentUser} /> */}
                    
                    <AuthRoute type='private' path="/account"           isAuthUser = {auth.currentUser} mustBe='applicant'>
                        {isRecruiter ? <AccountRecruiter  /> : <Account /> }
                    </AuthRoute>


                    {/** RECRUITER */} 

                    <AuthRoute type='private' path="/accountRecruiter"  isRecruiter={isRecruiter} isAuthUser = {auth.currentUser} > 
                        <AccountRecruiter />
                    </AuthRoute>

                    <AuthRoute type='private' path="/edit-job/:id"      isRecruiter={isRecruiter} isAuthUser = {auth.currentUser} render = {(props) => <EditJobPost {...props} />}/>
                    <AuthRoute type='private' path="/applicants/:id"    isRecruiter={isRecruiter} isAuthUser = {auth.currentUser} render ={(props) => <Applications {...props} />} />
                    
                    <AuthRoute type='private' path="/Post-job"          isAuthUser = {auth.currentUser}>
                        <PostJob />
                    </AuthRoute>


                    <AuthRoute type='private' path="/recruiter/confirm-job-posts" isAuthUser={auth.currentUser} isRecruter={isRecruiter}>
                        <QuestionIntroSelect/>
                    </AuthRoute>


                    <AuthRoute type='private' path='/recruiter/questions/intro/tutorial' isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <QuestionsIntro/>
                    </AuthRoute>


                    <AuthRoute type='private' path="/recruiter/questions/review" isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <Review/>
                    </AuthRoute>

                    <AuthRoute type='private' path='/recruiter/questions/thankyou' isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <QuestionsEnd/>
                    </AuthRoute>

                    <AuthRoute type='private' path="/recruiter/questions" isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <RecruiterQuestions/>
                    </AuthRoute>




                    
                    <AuthRoute type='private' path="/applicant-profile" isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <ApplicantProfilePage/>
                    </AuthRoute>
                    
                    <AuthRoute type='private' path="/create-contract" isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <CreateContractPage/>
                    </AuthRoute> 

                    <AuthRoute type='private' path="/create-offer-letter" isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <CreateOfferLetterPage/>
                    </AuthRoute> 

                    <AuthRoute type='private' path="/recruiter-notifications" isAuthUser = {auth.currentUser} isRecruiter={isRecruiter} >
                        <Notifications /> 
                    </AuthRoute>

                    
                    <AuthRoute type='private' path="/complete-document" isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <CompleteDocumentPage/>
                    </AuthRoute> 


                    <AuthRoute type='private' path="/give-feedback" isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <GiveFeedbackPage/>
                    </AuthRoute>
                    <AuthRoute type='private' path="/feedback-thankyou" isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <FeedbackThankyouPage/>
                    </AuthRoute>
                    <AuthRoute type='private' path="/view-answers" isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <ViewAnswers/>
                    </AuthRoute> 
                    
                    <AuthRoute type='private' path="/recruiter-messenger" isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <MessengerPage /> 
                    </AuthRoute>  
 
                    <AuthRoute type='private' path="/conversations" isAuthUser={auth.currentUser} isRecruiter={isRecruiter}>
                        <ConversationsPage /> 
                    </AuthRoute>  
                    





                    {/* APPLICATANT*/}
                    <AuthRoute  path="/profile-builder"   isAuthUser = {auth.currentUser}>
                        <ProfileBuilder />
                    </AuthRoute>

                    <AuthRoute type='private' path="/applications"      isAuthUser = {auth.currentUser} render={Applications}  />
                    <AuthRoute type='private' path="/saved-jobs"        isAuthUser = {auth.currentUser} render={SavedJobs}  />
                    <AuthRoute type='private' path="/apply/:id"         isAuthUser = {auth.currentUser} render ={(props) => <Apply {...props} />} />

                    <AuthRoute type='private' path="/settings"          isAuthUser = {auth.currentUser} >
                        <Settings />
                    </AuthRoute>
                    <AuthRoute type='private' path="/myPosts"           isAuthUser = {auth.currentUser} >
                        <MyPosts />
                    </AuthRoute>

                    <AuthRoute type='private' path="/notifications"     isAuthUser = {auth.currentUser}  >
                        <Notifications /> 
                    </AuthRoute>


                    <AuthRoute type='private' path="/view-offer"        isAuthUser = {auth.currentUser}  >
                        <ViewOfferPage /> 
                    </AuthRoute> 

                    <AuthRoute type='private' path="/view-contract"     isAuthUser = {auth.currentUser}  >
                        <ViewContractPage /> 
                    </AuthRoute>
 
                    <AuthRoute type='private' path="/messenger"         isAuthUser = {auth.currentUser}  >
                        <MessengerPage /> 
                    </AuthRoute>
                    <AuthRoute type='private' path="/view-feedback"         isAuthUser = {auth.currentUser}  >
                        <FeedbackContentPage /> 
                    </AuthRoute>



                    <AuthRoute type='private' path="/pre-recorded-questions"         isAuthUser = {auth.currentUser}  >
                        <StartPreRecordedQuestions /> 
                    </AuthRoute>


                    <AuthRoute type='private' path="/start-pre-recorded-interview"         isAuthUser = {auth.currentUser}  >
                        <StartPreRecordedInterview /> 
                    </AuthRoute>

                    
                    <AuthRoute type='private' path="/confirm-interview-start"         isAuthUser = {auth.currentUser}  >
                        <ConfirmStartInterview /> 
                    </AuthRoute>

                    <AuthRoute type='private' path="/record-interview"         isAuthUser = {auth.currentUser}  >
                        <RecordInterview /> 
                    </AuthRoute>

                    <AuthRoute type='private' path="/review-application"         isAuthUser = {auth.currentUser}  >
                        <ReviewApplication /> 
                    </AuthRoute>

                    
                    

                    {/* WIP: Questions for applicants */}
                    <AuthRoute type='private' path="/applicant/questions/end" isAuthUser={auth.currentUser}>
                        <ApplicantQuestionsPreEnd/>
                    </AuthRoute>

                    {/* WIP: Questions for applicants */}
                    <AuthRoute type='private' path="/applicant/questions/thankyou" isAuthUser={auth.currentUser}>
                        <ApplicantQuestionsEnd/>
                    </AuthRoute>

                    {/* WIP: Questions for applicants */}
                    <AuthRoute type='private' path="/applicant/questions/prestart" isAuthUser={auth.currentUser}>
                        <ApplicantQuestionsPreStart/>
                    </AuthRoute>

                    {/* WIP: Questions for applicants */}
                    <AuthRoute type='private' path="/applicant/questions/start" isAuthUser={auth.currentUser}>
                        <ApplicantQuestionsStart/>
                    </AuthRoute>

                    {/* WIP: Questions for applicants */}
                    <AuthRoute type='private' path="/applicant/questions/intro" isAuthUser={auth.currentUser}>
                        <ApplicantQuestionsIntro/>
                    </AuthRoute>

                    {/* WIP: Questions for applicants */}
                    <AuthRoute type='private' path="/applicant/questions" isAuthUser={auth.currentUser}>
                        <ApplicantQuestions/>
                    </AuthRoute>
                   

                   
                   
                    {/** OPEN ROUTES */}
                    <Route path="/" exact component={Home} />
                    <Route path="/ContactUs" component={ContactUs}/>
                    <Route path="/Jobs" component={Jobs} />
                    <Route path="/About" component={About}/>
                    <AuthRoute path="/voost-rooms" type='guest' isAuthUser = {auth.currentUser}>
                        <VoostRooms />
                    </AuthRoute>

                    <Route path="/verification" component={Verification}/>


                    <AuthRoute type='guest' path="/meeting-room/:id"    render ={(props) => <MeetingRoom {...props} />} isAuthUser = {auth.currentUser} />
                    <AuthRoute type='guest' path="/forgot-password"     render ={(props) => <ChangePassword {...props} />} />
                    <AuthRoute type='guest' path="/terms"               render ={(props) => <Terms {...props} />} />
                    <AuthRoute type='guest' path="/privacy-policy"      render ={(props) => <Privacy {...props} />} />
                    <AuthRoute type='guest' path="/acceptable-use"      render ={(props) => <AcceptableUse {...props} />} />
                    <AuthRoute type='guest' path="/email-reset"     component={ResetPass}/>
                    {/* <AuthRoute type='guest' path="/cookie-policy" render ={(props) => <Cookies {...props} />} /> */}

                </Switch>
            </ScrollToTop>
            <Footer />
        </div>
    </Router>
    </>
  );
}

export default RouterApp;
