import * as constants from '../constants/contstants'; 





export const isReviewingState = (state={'isReviewing': false}, action) =>{
    switch (action.type) {
        case constants.IS_REVIEWING:
            console.log("PAPYLOAD: ", action.payload)
            return { isReviewing: action.payload}  
        default:
            return state  
    } 
}

export const cvModalUpdate = (state={'showModal': false}, action) =>{
    switch (action.type) {
        case constants.CV_MODAL:
            return { showModal: action.payload}  
        default:
            return state  
    } 
}

export const profileBuilderVideoSrc = (state={'videoSrc': ""}, action) =>{
    switch (action.type) {
        case constants.PROFILE_BUILDER_VIDEO_SOURCE:
            return {...state, videoSrc: action.payload.videoSrc}  
        default:
            return state  
    } 
}

export const localUser = (state={'profile': null}, action) =>{
    switch (action.type) {
        case constants.LOCAL_USER_PROFILE:
            return {...state, profile: action.payload}  
        default:
            return state  
    } 
}




/************** component selection **************** */

export const profileBuilderSelection = (state={'selection': "selection"}, action) =>{
    switch (action.type) {
        case constants.PROFILE_BUILDER_SELECTION:
            return {...state, selection: action.payload}  
        default:
            return state  
    } 
}

export const profileBuilderState = (state={'profileBuilder': "unset"}, action) =>{
    switch (action.type) {
        case constants.PROFILE_BUILDER_STATE:
            return {...state, profileBuilder: action.payload}  
        default:
            return state  
    } 
}

export const profileBuilderVideoModal = (state={'open': false}, action) =>{
    switch (action.type) {
        case constants.PROFILE_BUILDER_VIDEO_MODAL:
            return {...state, open: action.payload.open}  
        default:
            return state  
    } 
}





/************** workhistory **************** */

export const profileBuilderWorkHistory = (state={'workHistory': "unset"}, action) =>{
    switch (action.type) {
        case constants.PROFILE_BUILDER_WORK_HISTORY:
            return {...state, workHistory: action.payload}  
        default:
            return state  
    } 
}

export const workHistoryItem = (state={'workHistoryItem': {}}, action) =>{
    switch (action.type) {
        case constants.WORK_HISTORY_ITEM:
            return {...state,  workHistoryItem:action.payload}  
        default:
            return state  
    } 
}
export const allWorkHistoryItems = (state={'allWorkHistoryItems': []}, action) =>{
    switch (action.type) {
        case constants.ALL_WORK_HISTORY_ITEMS:
            return {...state, allWorkHistoryItems: action.payload}  
        default:
            return state  
    } 
}



 

export const skillsList = (state={'skillsList': []}, action) =>{
    switch (action.type) {
        case constants.SKILLS_LIST:
            return {...state,  skillsList:action.payload}  
        default:
            return state  
    } 
}

 

export const summary = (state={'summary': ""}, action) =>{
    switch (action.type) {
        case constants.PROFILE_SUMMARY:
            return {...state,  summary:action.payload}  
        default:
            return state  
    } 
}

/************** education **************** */

export const profileBuilderEducationHistory = (state={'educationHistory': "unset"}, action) =>{
    switch (action.type) {
        case constants.PROFILE_BUILDER_EDUCATION_HISTORY:
            return {...state, educationHistory: action.payload}  
        default:
            return state  
    } 
}

export const educationHistoryItem = (state={'educationHistoryItem': {}}, action) =>{
    switch (action.type) {
        case constants.EDUCATION_HISTORY_ITEM:
            return {...state,  educationHistoryItem:action.payload}  
        default:
            return state  
    } 
}
export const allEducationHistoryItems = (state={'allEducationHistoryItems': []}, action) =>{
    switch (action.type) {
        case constants.ALL_EDUCATION_HISTORY_ITEMS:
            return {...state, allEducationHistoryItems: action.payload}  
        default:
            return state  
    } 
}


export const cvHighlight = (state={'cvHighlight': ""}, action) =>{
    switch (action.type) {
        case constants.CV_HIGHLIGHT:
            return {...state, cvHighlight: action.payload}  
        default:
            return state  
    } 
}

export const cvHighlightBuilder = (state={'cvHighlightBuilder': ""}, action) =>{
    switch (action.type) {
        case constants.CV_HIGHLIGHT_BUILDER:
            return {...state, cvHighlightBuilder: action.payload}  
        default:
            return state  
    } 
}

