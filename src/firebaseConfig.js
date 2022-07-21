export default function getFirebaseConfig(){
    let config = "";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        console.log("FIREBASE CONFIG: ", process.env.REACT_APP_STAGE)
        config = {
                apiKey: process.env.REACT_APP_DEV_APIKEY,
                authDomain: process.env.REACT_APP_DEV_AUTHDOMAIN,
                projectId: process.env.REACT_APP_DEV_PROJECTID,
                storageBucket: process.env.REACT_APP_DEV_STORAGEBUCKET,
                messagingSenderId: process.env.REACT_APP_DEV_MESSEGINGSENDERID,
                appId: process.env.REACT_APP_DEV_APPID,
                measurementId: process.env.REACT_APP_DEV_MEASUREMENTID,
                databaseURL: "https://voost-6ab1c.firebaseio.com",
              };
        return config; 
    } else {
        // production code
        console.log("FIREBASE CONFIG: ", process.env.REACT_APP_STAGE)

        if(process.env.REACT_APP_STAGE == "development"){
            config = {
                apiKey: process.env.REACT_APP_DEV_APIKEY,
                authDomain: process.env.REACT_APP_DEV_AUTHDOMAIN,
                projectId: process.env.REACT_APP_DEV_PROJECTID,
                storageBucket: process.env.REACT_APP_DEV_STORAGEBUCKET,
                messagingSenderId: process.env.REACT_APP_DEV_MESSEGINGSENDERID,
                appId: process.env.REACT_APP_DEV_APPID,
                measurementId: process.env.REACT_APP_DEV_MEASUREMENTID,
                databaseURL: "https://voost-6ab1c.firebaseio.com",
              };
            return config; 
        }else{
            config = {
                apiKey: process.env.REACT_APP_APIKEY,
                authDomain: process.env.REACT_APP_AUTHDOMAIN,
                projectId: process.env.REACT_APP_PROJECTID,
                storageBucket: process.env.REACT_APP_STORAGEBUCKET,
                messagingSenderId: process.env.REACT_APP_MESSEGINGSENDERID,
                appId: process.env.REACT_APP_APPID,
                measurementId: process.env.REACT_APP_MEASUREMENTID,
                databaseURL: "https://voost-ff725-default-rtdb.firebaseio.com/"
              };
            
            return config; 
        }

        
    }
}

