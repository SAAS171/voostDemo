import React from 'react';
import Button from '../shared-components/button';
import ApplicantCard from '../applications/applicantsCard';
import {
    Link, NavLink
} from "react-router-dom";

import companyLogo from '../../assets/teslaLogo.png';

//Styles
import {BorderContainer, H6} from '../../styles/components/shared-components';
import {CardBody, Application, Status} from './styles/accountApplicationsCard';
import {CardDiv, CardTop} from './styles/accountSettingsCard';

export default function AccountApplicants() {
    return(
        <>
        <BorderContainer>
            <CardDiv>
                <CardTop>
                    <H6>Applicants</H6>
                </CardTop>
                <CardBody>
                        
                    <Application shadow="none">
                        <ApplicantCard className="this" shadow="none"/>
                    </Application>

                    <NavLink to="/applicants">
                        <button className="card-button">SHOW MORE</button>
                    </NavLink>
        
                </CardBody>
            </CardDiv>
        </BorderContainer>
        </>
    )
}