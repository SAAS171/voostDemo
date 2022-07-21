import React from 'react';
import { BorderContainer, H6} from '../../styles/components/shared-components';

//Syles
import {CardDiv, CardTop} from './styles/accountSettingsCard';
import {CardBody} from './styles/accountApplicationsCard';

export default function AccountJobsPosted(props){
    console.log(props.my_jobs);
    return(
        <>
            <BorderContainer>   
                <CardDiv>
                    <CardTop>
                        <H6>Posted Jobs</H6>
                    </CardTop>
                    <CardBody>
                        
                    </CardBody>
                </CardDiv>
            </BorderContainer>
        </>
    )
}