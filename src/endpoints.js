export function getEndpoint(){
    let apiEndpoint = "";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        apiEndpoint = process.env.REACT_APP_DEV_API_ENDPOINT; 
        return apiEndpoint; 
    } else {


        if(process.env.REACT_APP_STAGE == "development"){
            apiEndpoint = process.env.REACT_APP_DEV_API_ENDPOINT;     
        }else{
            apiEndpoint = process.env.REACT_APP_PROD_API_ENDPOINT; 

        }
        // production code
        return apiEndpoint; 
    }
}

export function getDomainUrl(){
    let url = "";
    if (!process.env.NODE_ENV || process.env.REACT_APP_STAGE === 'development') {
        url = process.env.REACT_APP_DEV_URL; 
        return url; 
    }else {
        url = process.env.REACT_APP_PROD_URL; 
        return url; 
    } 
   
}