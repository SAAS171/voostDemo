import React, {useState, useEffect} from 'react'; 
import Button from '../shared-components/button'; 
import {  Link, NavLink } from "react-router-dom";
    
//Styles
import styled from 'styled-components';   
import {auth, db, rdb, storage} from '../../firebase';
import {useDispatch, useSelector} from 'react-redux'; 
import { useHistory } from "react-router-dom";
import PreviewDocument from "../preview-document/preview-document";   
import {clearContract, updateNotification} from  "../../store/actions/actions"

import Notiflix from 'notiflix'; 
import { FactorPage } from 'twilio/lib/rest/verify/v2/service/entity/factor';

const ViewContractContainer = styled.div` 
    max-width: 1140px;
    margin: 0 auto 50px;  
    .header-content{
        padding: 50px 0;
        position: relative;
        border-bottom: 1px solid lightgrey;
        margin-bottom: 50px;
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
            top: 50% ;
            transform: translateY( -50% );
            cursor: pointer;

        }
    } 
    .hidden {
        display: none;
    }
    .preview-outer-component{
        padding: 15px;
    }
`

export default function ViewContract() {  
    
    const dispatch = useDispatch();   
    const history = useHistory();
 
    const { documentType, documentData, notificationToClear } = history.location.state ; 
    const pathToDoc = `documents/${auth.currentUser.uid}/${documentData.application_id}/contract.pdf`;
    useEffect(()=>{ 
        dispatch(clearContract()) 
        dispatch(updateNotification({uid:documentData.applicant_uid, id:notificationToClear }))
    })

    const goBack = ()=> {
        history.goBack()
    }
 
    const previewDoc = () =>{   
        storage.ref(pathToDoc).getDownloadURL() 
        .then((url) => { 
            var win = window.open(url, '_blank');
            win.focus(); 
        })
        .catch((error) => { 
            Notiflix.Report.Failure( 'Preview Failed', `We were unable to create a download link for this contract. Please try again.`, 'Try Again' ); 
        });
    }

    const downloadDoc =   () =>{     
        storage.ref(pathToDoc).getDownloadURL().then((url) => { 
            var win = window.open(url, '_blank');
            win.focus(); 
        })
        .catch((error) => { 
            Notiflix.Report.Failure( 'Download Failed', 'We were unable to display the preview for this contract. Please try again.', 'Try Again'  ); 
            
        }); 
    }

    return( 
        <ViewContractContainer> 
            <div className="header-content">
                <span onClick={  goBack } >Back</span>
                <h1>CONTRACT</h1>
            </div>

            <div className="preview-outer-component"> 
                <PreviewDocument documentType={documentType} documentData={documentData} /> 
            </div>
            <div className="preview-actions"> 
                {/* <Button  
                      type="greenSmall"
                      text="Preview"
                      onClick={previewDoc} 
                /> */}
                <Button  
                      type="greenSmall"
                      text="Download"
                      onClick={downloadDoc} 
                />
                

            </div>
        </ViewContractContainer>
    )
}