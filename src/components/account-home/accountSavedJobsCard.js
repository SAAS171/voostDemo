import React from 'react';
import Button from '../shared-components/button';

//Styles 
import {BorderContainer, H6} from '../../styles/components/shared-components';
import {SavedJobs} from './styles/accountSavedJobsCard' 
import {CardDiv, CardTop} from './styles/accountSettingsCard';

import {  NavLink } from "react-router-dom";

export default function SavedJobsCards(){
    return(
        <BorderContainer>
            <CardDiv>
                <CardTop>
                    <H6>Saved Jobs</H6>
                    <NavLink to="/savedJobs">
                        <Button type="primarySmall" text="view"/>
                    </NavLink>
                </CardTop>
                <SavedJobs>
                    <p>View all your saved jobs, make sure to not leave applying until too late!</p>
                </SavedJobs>
            </CardDiv>
        </BorderContainer>
    )
}