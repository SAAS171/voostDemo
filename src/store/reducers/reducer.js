// import * as actions from '../actions/actions'
import * as constants from '../constants/contstants'; 
import { combineReducers } from 'redux';
import { 
    localUser, 
    profileBuilderState, 
    profileBuilderSelection, 
    profileBuilderVideoModal,
    profileBuilderVideoSrc,
    profileBuilderWorkHistory,
    workHistoryItem,
    allWorkHistoryItems,
    profileBuilderEducationHistory,
    educationHistoryItem,
    allEducationHistoryItems,
    skillsList,
    summary,
    cvHighlight,
    cvHighlightBuilder,
    cvModalUpdate,
    isReviewingState

} from "./profileBuilderReducers";




const participantList = (state ={participantArray: []}, action ) => {
    switch (action.type){
        case constants.PARTICIPANTS_LIST_CHANGE: 
                return {...state, participantArray: action.payload} 
        default:
            return state; 
    }
}


const myVoostRoomUser = (state ={id: null, name: null}, action ) => {
    switch (action.type){
        case constants.MY_VOOST_ROOM_USER: 
                return {...state, id: action.payload.id, name:  action.payload.name} 
        default:
            return state; 
    }
}



const meetingChatRoomId = (state ={id: null }, action ) => {
    switch (action.type){
        case constants.SET_MEETING_CHAT_ID: 
                return {...state, id: action.payload } 
        default:
            return state; 
    }
}




const changeAuth = (state = {user: null, loading: false, errors: null}, action) => {
    switch (action.type) {
        case constants.LOADING_USER: 
                return{...state, loading: action.payload}
        case constants.USER_LOGGED_IN:
            return {...state,  loading:false, user:action.payload};
        case constants.LOGIN_ERRORED: 
            return {...state, errors: action.payload}
        case constants.SIGNUP_ERRORED: 
            return {...state,  signup_error: action.payload}
        case constants.CLEARED_LOGIN_ERROR: 
            return {...state, errors: null}
        case constants.USER_LOGGED_OUT: 
            return {...state, user: null}
        default:
            return state; 
    }
}
const updateUser = (state={'profile': null, 'loading': false, 'error': null}, action) =>{
    switch (action.type) {
        case constants.USER_PROFILE_UPDATED:
            return {...state, profile: action.payload} 
        case constants.LOADING_PROFILE: 
            return {...state, loading: action.payload}
        case constants.FETCHED_USER_PROFILE: 
            return {...state, profile: action.payload, error: null} 
        case constants.FETCHING_USER_PROFILE_FAILED: 
            return {...state, 'error':action.payload} 
        default:
            return state  
    } 
}






const posts = (state = {'loading':false, 'vacancies': [], 'errors': null, success: null, newVacancy: ""}, action)=> {
    switch (action.type) {
        
        case constants.NEW_VACANCY_DATA:
            return {...state, 'newVacancy': action.payload} ; 
        case constants.SAVE_IN_PROGRESS:
            return {...state, 'loading': action.payload} ; 
        case constants.NEW_VACANCY_SAVE_ERROR: 
            return {...state, errors: action.payload}; 
        case constants.NEW_VACANCY_SAVED:
            return {...state, 'vacancies': [...state.vacancies, action.payload], success: true}; 
        case constants.FETCHED_POSTS: 
            return {...state, 'vacancies':action.payload}; 
        case constants.CLEAR_POST_JOB_STATE: 
            return {...state, 'loading':false, 'errors': null, 'success': null} 
        default:
            return state; 
    } 
}

const cv = (state = {'url': null, 'name': null, 'error': null, 'loading': false, 'success' :null}, action) => {
    switch (action.type) {
        case constants.FETCHED_CV_META:
             return {...state, cv: action.payload, loading: false, success: null} 
        case constants.SAVED_CV:
            return {...state, cv: action.payload, loading: false, success: true} 
        case constants.LOADING_CV_META: 
            return {...state, loading: action.payload};  
        case constants.SAVE_CV_IN_PROGRESS: 
            return {...state, loading: action.payload};  
        case constants.FAILED_SAVING_CV: 
            return {...state, error: action.payload, loading: false};  
        case constants.FAILED_FETCHING_CV_META: 
            return {...state, error: action.payload, loading: false};  
        case constants.RESET_CV: 
            return {...state, 'error': null, 'loading': false, success: null};
        default: return state;  
    } 
}
const getJobs = (state = {'loading': false, 'vacancies': [], 'error': null}, action) =>{
    switch (action.type) {
        case constants.LOADING_VACANCIES:
                return {...state, loading: action.payload} 
        case constants.FETCHED_JOBS: 
                return {...state, loading: false, vacancies: [...action.payload]} 
        case constants.ERROR_LOADING_VACANCIES: 
            return {...state, loading: false, error: action.payload} 
    
        default: return state 
    } 
}





const isDeleted = (state=null, action) => {
    switch (action.type) {
        case constants.JOB_POST_DELETED: 
            return action.payload
        default: return state 
    } 
}

const regModalType = (state=null, action) => {
    switch (action.type) {
        case constants.REGISTER_MODAL_TYPE: 
            return action.payload
        default: return state 
    } 
}

const loginRedirect = (state=null, action) => {
    switch (action.type) {
        case constants.LOGIN_REDIRECT: 
            return action.payload
        default: return state 
    } 
}

const isLoginModalOpen = (state={switchTrigger:false, redirect:null }, action) => {
    switch (action.type) {
        case constants.LOGIN_MODAL_OPEN:
            return {switchTrigger :true, redirect:action.payload } 
        case constants.LOGIN_MODAL_CLOSED: 
            return {switchTrigger :false, redirect:null };  
        default: return state 
    } 
}

 const isRegisterModalOpen = ( state= false, action) => {
    switch (action.type) {
        case constants.REGISTER_MODAL_OPEN:
            return  true
        case constants.REGISTER_MODAL_CLOSED: 
            return  false
        default: return state 
    } 
 }
 const isRecruiter = (state = false, action) => {
     switch (action.type) {
         case constants.IS_RECRUITER_SET:
            return action.payload 
     
         default: return state;  
     } 
 }

const myJobs = (state = {loading: false, error: null, my_jobs: []}, action) => {
    switch (action.type) {
        case constants.LOADING_MY_VACANCIES:
            return {...state, loading: action.payload} 
        case constants.FETCHED_MY_VACANCIES:
            console.log("PAYLOAD:" , action.payload)
            return {...state, my_jobs: action.payload, error: null} 
        case constants.ERROR_FETCHING_MY_VACANCIES:
            return {...state, error: action.payload} 

        default: return state; 
    } 
}

const resetUserPass = (state={loading:false, success: null, error: null, clear: false}, action) => {
    switch (action.type) {
        case constants.LOADING_PASSWORD_RESET:
            return {...state, loading: action.payload, error: null};  
        case constants.PASSWORD_RESET_SUCCESS: 
            return {...state, success: action.payload, error: null} 
        case constants.PASSWORD_RESET_FAILED: 
            return {...state, error: action.payload, success:null} 
        case constants.CLEAR_PASSWORD_RESET_INPUTS: 
        return {...state, clear: true} 
        case constants.CLEAR_PASS_RESET: 
            return {loading:false, success: null, error: null, clear: false}; 
        default: return state 
    } 
}
const updateRecruiter = (state = {loading: false, errors: null, update: null}, action) => {
    switch (action.type) {

        case constants.USER_UPDATE_IN_PROGRESS: 
            return {...state, loading: action.payload} 
        case constants.USER_PHONE_UPDATED:
            return {...state, update: 'phone'} 
        
        case constants.USER_PHONE_UPDATE_FAILED: 
            return {...state, errors: action.payload} 
        case constants.USER_EMAIL_UPDATED:
            return {...state, update: 'email'} 
        case constants.USER_EMAIL_UPDATE_FAILED: 
            return {...state, errors: action.payload} 
        case constants.USER_WEBSITE_UPDATED: 
            return {...state, update: 'website'} 
        case constants.USER_WEBSITE_UPDATE_FAILED: 
            return {...state, errors: action.payload};  
        case constants.USER_DISPLAYNAME_UPDATED: 
            return {...state, update: 'name'} 
        case constants.USER_DISPLAYNAME_UPDATE_FAILED: 
            return {...state, errors: action.payload} 
        case constants.UPDATE_RECRUITER_IMAGE: 
            return {...state, update: 'image'} 
        case constants.UPDATE_RECRUITER_IMAGE_IN_PROGRESS: 
            return {...state, loading: action.payload};  
        case constants.UPDATE_RECRUITER_IMAGE_FAILED:
            return {...state, errors: action.payload} 
        case constants.CLEAR_RECRUITER_UPDATE: 
            return {loading: false, errors: null, update: null};  
        default: return state 
    } 
}

const apply = (state={'loading': false, 'errors': null, 'success':false}, action) => {
    switch (action.type) {
        case constants.APPLICATION_IN_PROGRESS:
            return {...state, loading: action.payload} 
        case constants.APPLICATION_SUCCESS: 
            return {...state, loading: false, error: null, success: true}; 
        case constants.APPLICATION_FAILED: 
            return {...state, error: action.payload} 
        case constants.CLEAR_APPLICATION: 
            return {'loading': false, 'errors': null, 'success':false} 
        default: return state 
    }  
}


const scheduledInterviewResponse = (state={'isLoading': false,   'responded':null}, action) => {
    switch (action.type) {
        case constants.LOADING_INTERVIEW_RESPONSE:
            return {...state, isLoading: action.payload} 
        case constants.RESPONDED_INTERVIEW: 
            return {...state, loading: false, responded: action.payload };  
        default: return state 
    }  
}




const getCurrentApplicant  = (state = {  currentApplicant: {}, loading: false, error: false }, action) => {
    switch (action.type) { 

        case constants.FETCHED_CURRENT_APPLICANT:
            return { ...state, currentApplicant: action.payload, loading: false, error: false  }  
    
        case constants.LOADING_CURRENT_APPLICANT:
            return {...state, loading: action.payload}  

        case constants.FAILED_CURRENT_APPLICANT:
            return {...state,  loading: false, error: action.payload}  
            
        default: return state 
    } 
}

const getApplicants  = (state = {loading: false, error: null, applicants: [] }, action) => {
    switch (action.type) {
        case constants.LOADING_APPLICANTS:
                return {...state, loading: action.payload} 
        case constants.FETCHED_APPLICANTS:
            return {...state, loading: false, error: null, applicants: action.payload} 
        case constants.FAILED_FETCHING_APPLICANTS:
            return {...state, loading: false, error: action.payload} 
        case constants.CLEAR_APPLICANTS:
            return {...state, loading: false, error: null,} 
    
        default: return state 
    } 
}
const getMyApplications = (state={loading: false, errors: null, my_applications:[]}, action) => {
    switch (action.type) {
        case constants.LOADING_MY_APPLICATIONS:
                return {...state, loading: action.payload} 
        case constants.FETCHED_MY_APPLICATIONS: 
            return {...state, my_applications: action.payload} 
        case constants.FAILED_FETCHING_MY_APPLICATIONS: 
            return {...state, errors: action.payload} 
        default: return state 
} 
}
const setMeetingName = (state = '' ,action) => {
    switch (action.type) {
        case constants.STORED_USER_MEETING_NAME:
                return {name: action.payload} 
    
        default: return state 
    } 
}
const savedMeeting = (state ={loading: false, error: null}, action) => {
    switch (action.type) {
        case constants.SAVE_SCHEDULE_IN_PROGRESS:
                return {...state, loading: action.payload} 
        case constants.SAVED_SCHEDULE: 
            return {loading: false, error: null, success: true} 
        case constants.FAILED_SAVING_SCHEDULE: 
            return {...state, loading: false, error: action.payload} 
        case constants.RESET_SCHEDULE: 
            return {loading: false, error: null}; 
        default: return state 
    } 
}  
const myMeetings = (state = {loading: false, meetings: null, error: null}, action) => {
    switch (action.type) {
        case constants.FETCH_MY_MEETINGS_IN_PROGRESS:
                return {...state, loading: action.payload} 
        case constants.FETCHED_MY_MEETINGS: 
                return {...state, meetings: action.payload}  
        case constants.FAILED_FETCHING_MY_MEETINGS: 
                return {...state, error: action.payload} 
        default: return state 
    } 
}
// const statusInitState = {
//     applicantStatus: {loading: false, error: null, success: null}
// }
const applicantStatus = (state = {loading: false, error: null, success: null}, action) => {
    switch (action.type) {
        case constants.APPLICANT_STATUS_UPDATED:
                return {...state, success: action.payload } 
        case constants.APPLICANT_STATUS_UPDATE_IN_PROGRESS:
            return {...state, loading: action.payload } 
        case constants.FAILED_UPDATING_APPLICANT_STATUS:
            return {...state, error: action.payload } 
        case constants.RESET_APPLICANT_STATUS:
            return {loading: false, error: null, success: null} 
    
        default: return state 
    }  
    
}
const signup_completed = (state =false, action) => {
    switch (action.type) {
        case constants.REGISTER_COMPLETED:
                return action.payload 
        case constants.RESET_REGISTER_COMPLETED:
            const reset = false; 
            return reset 
        default: return state 
    } 
} 
 

const allMessages = (state = {messages: []}, action) => {
    switch (action.type) {  
        case constants.SET_MESSAGES:
            return {messages: action.payload}; 
        default:
            return state; 
    }
}


const fetchedJobOffer = (state = {fetchedJobOffer: {}, loading: false, errors: null}, action) => {
    switch (action.type) {  
        case constants.CLEAR_JOBOFFER:
            return {...state,  fetchedJobOffer: {}};

            case constants.LOADING_JOBOFFER:
                return {...state,  loading: action.payload};
    
        case constants.FETCHED_JOBOFFER:
            return {...state, fetchedJobOffer: action.payload}; 

        case constants.FAILED_JOBOFFER:
            return {...state, errors: action.payload} 

        default:
            return state; 
    }
}


const feedbackRequestId = (state = {id: 0 }, action) => {
    switch (action.type) {  
        case constants.UPDATE_FEEDBACK_ID:
            return {id: action.payload};
     
        default:
            return state; 
    }
}
const fetchedContract = (state = {fetchedContract: {}, loading: false, errors: null}, action) => {
    switch (action.type) {  
        case constants.LOADING_FETCHED_CONTRACT:
            return {...state,  loading: action.payload};
    
        case constants.FETCHED_CONTRACT:
            return {...state, fetchedContract: action.payload}; 

        case constants.FAILED_FETCHED_CONTRACT:
            return {...state, errors: action.payload} 

        case constants.CLEAR_CONTRACT:
            return {...state,  fetchedContract: {}};

        default:
            return state; 
    }
}

const feedbackModal = (state ={isOpen: false, modalContent: {}}, action) => {
    switch (action.type) {
        case constants.IS_OPEN:
            return {...state, isOpen: action.payload}   
        case constants.FEEDBACK_CONTENT:
            return {...state,  modalContent: action.payload};
        case constants.CLOSE_FEEDBACK_MODAL:
            return {isOpen: false, modalContent: {}};
        default: return state 
    } 
}  

const feedbackResponse = (state ={loading: false, jobInfo: {}, sent: false}, action) => {
    switch (action.type) {
        case constants.PREP_FEEDBACK_RESPONSE:
            return {...state, loading: action.payload}   
        case constants.SENDING_FEEDBACK_RESPONSE:
            return {...state,  loading: action.payload};
        case constants.SENT_FEEDBACK_RESPONSE:
            return {...state,  loading: false, sent:action.payload, jobInfo: {} };
        case constants.FEEDBACK_RESPONSE_CONTENT:
            return {...state, loading: false, jobInfo: action.payload};
        default: return state 
    } 
}  

const fetchFeedbackResponse = (state ={loading: false, feedbackData: {}, error: false}, action) => {
    switch (action.type) {
        case constants.GETTING_FEEDBACK_RESPONSE:
            return {...state, loading: action.payload}   
        case constants.FETCHED_FEEDBACK_RESPONSE:
            return {...state,   feedbackData: action.payload};
        case constants.ERROR_FEEDBACK_RESPONSE:
            return {...state,  loading: false, error:action.payload  };
        default: return state 
    } 
}  


const cvCreated = (state = {  cvCreated: false, cvEmailed: false, loading: false, errors: null}, action) => {
    switch (action.type) {  
        case constants.LOADING_CV_CREATE:
            return {...state, loading: action.payload};
    
        case constants.CV_CREATED:
            return {...state, loading: false, errors: null, cvCreated: action.payload}; 

        case constants.CV_EMAILED:
            return {...state, loading: false, errors: null, cvEmailed: true}; 
            
        case constants.FAILED_CREATE_CV:
            return {...state, loading: false,  errors: action.payload} 
  
        case constants.RESET_CV_ACTION:
            return { cvCreated: false, loading: false, cvEmailed: false, errors: null} 
      
        default:
            return state; 
    }
}



const emailSent = (state = {emailSent: false, loading: false, errors: null}, action) => {
    switch (action.type) {  
        case constants.SENDING_EMAIL:
            return {emailSent: false,  errors: null, loading: action.payload } ;
    
        case constants.SENT_EMAIL:
            return {  loading: false, errors: null, emailSent: action.payload}; 

        case constants.EMAIL_FAILED:
            return {emailSent: false, loading: false,  errors: action.payload} 
 
        default:
            return state; 
    }
}


const fetchNotifications = (state = {fetchedNotifications: [], loading: false, errors: null}, action) => {
    switch (action.type) { 

        case constants.LOADING_NOTIFICATIONS:
            return {...state,  loading: action.payload};

        case constants.FETCHED_NOTIFICATIONS:
            return {...state, fetchedNotifications: action.payload}; 

        case constants.FAILED_NOTIFICATIONS:
            return {...state, errors: action.payload} 

        default:
            return state; 
    }
}


const offerCreation = (state = {offerCreated: false, loading: false, errors: null}, action) => {
    switch (action.type) {
        case constants.CREATED_OFFER: 
                return{...state, offerCreated: action.payload}
        case constants.LOADING_OFFER:
            return {...state,  loading: action.payload};
        case constants.FAILED_OFFER: 
            return {...state, errors: action.payload} 
        default:
            return state; 
    }
}

const contractCreation = (state = {contractCreated: false, loading: false, errors: null}, action) => {
    switch (action.type) {
        case constants.CREATED_CONTRACT: 
                return{ contractCreated: action.payload, loading: false, errors: null}
        case constants.LOADING_CONTRACT:
            return { loading: action.payload, contractCreated: false, errors: null};
        case constants.FAILED_CONTRACT: 
            return { errors: action.payload,  loading: false, contractCreated: false} 
        default:
            return state; 
    }
}



const offerSent = (state = {sentOffer: false, loading: false, errors: null}, action) => {
    switch (action.type) {
        case constants.SENT_OFFER: 
                return{...state, sentOffer: action.payload}
        case constants.SENDING_OFFER:
            return {...state,  loading: action.payload};
        case constants.SEND_OFFER_FAILED: 
            return {...state, errors: action.payload} 
        default:
            return state; 
    }
}

const contractSent = (state = {sentContract: false, loading: false, errors: null}, action) => {
    switch (action.type) {
        case constants.SENT_CONTRACT: 
                return{...state, sentContract: action.payload}
        case constants.SENDING_CONTRACT:
            return {...state,  loading: action.payload};
        case constants.SEND_CONTRACT_FAILED: 
            return {...state, errors: action.payload} 
        default:
            return state; 
    }
}

const questionsAdded = (state = {completed: false, loading: false, errors: null}, action) => {
    switch (action.type) {
        case constants.SAVED_QUESTIONS: 
                return{...state, completed: action.payload}
        case constants.SAVING_QUESTIONS:
            return {...state,  loading: action.payload};
        case constants.SEND_CONTRACT_FAILED: 
            return {...state, errors: action.payload} 
        default:
            return state; 
    }
}

const editableJob = (state = {job: null, loading: false, errors: null}, action) => {
    switch (action.type) {
        case constants.FETCHED_EDITABLE_JOB: 
                return{...state,  loading: false, job: action.payload}
        case constants.LOADING_EDITABLE_JOB:
            return {...state,  loading: action.payload};
        case constants.FAILED_EDITABLE_JOB: 
            return {...state, errors: action.payload} 
        default:
            return state; 
    }
}

 
const reducers = combineReducers({
    user: changeAuth, 
    signup_completed, 
    profile: updateUser,
    posts, 
    cv,
    isDeleted: isDeleted,
    jobs: getJobs,
    regModalType: regModalType,
    loginRedirect: loginRedirect,
    login_modal: isLoginModalOpen,
    register_modal: isRegisterModalOpen,  
    isRecruiter, 
    my_jobs: myJobs,
    password_reset: resetUserPass,
    updateRecruiter,
    apply, 
    applicants: getApplicants, 
    currentApplicant: getCurrentApplicant, 
    my_applications: getMyApplications, 
    meeting_name: setMeetingName,
    savedMeeting,
    myMeetings,
    applicantStatus,
    // profile builder
    localUserProfile:                   localUser,
    profileBuilder:                     profileBuilderState,
    profileBuilderSelection:            profileBuilderSelection,
    profileBuilderVideoModal:           profileBuilderVideoModal,
    profileBuilderVideoSrc:             profileBuilderVideoSrc,
    profileBuilderWorkHistory:          profileBuilderWorkHistory,
    workHistoryItem:                    workHistoryItem,
    allWorkHistoryItems:                allWorkHistoryItems,

    profileBuilderEducationHistory:     profileBuilderEducationHistory,
    educationHistoryItem:               educationHistoryItem,
    allEducationHistoryItems:           allEducationHistoryItems,
    skillsList:                         skillsList,
    summary:                            summary,
    cvHighlight:                        cvHighlight,
    cvHighlightBuilder:                 cvHighlightBuilder,
    cvModalUpdate:                      cvModalUpdate,
    isReviewingState:                   isReviewingState,
    contractCreation:                   contractCreation,
    offerCreation:                      offerCreation,
    offerSent:                          offerSent,
    contractSent:                       contractSent,
    fetchNotifications:                 fetchNotifications,
    fetchedJobOffer:                    fetchedJobOffer,
    fetchedContract:                    fetchedContract,
    allMessages:                        allMessages,
    emailSent:                          emailSent,
    cvCreated:                          cvCreated,
    feedbackModal:                      feedbackModal,
    feedbackResponse:                   feedbackResponse,
    fetchFeedbackResponse:              fetchFeedbackResponse,
    questionsAdded:                     questionsAdded,
    feedbackRequestId:                  feedbackRequestId,
    scheduledInterviewResponse:         scheduledInterviewResponse,
    editableJob:                        editableJob,
    participantList:                    participantList,
    myVoostRoomUser:                    myVoostRoomUser,
    meetingChatRoomId:                  meetingChatRoomId
})
export default reducers