import React from 'react';
import JobCard from '../job-card/card';

//Styles
import {SavedWrap, Job, SavedDiv} from './styles/saved';
import {BorderContainer} from '../../styles/components/shared-components'; 

import {  NavLink } from "react-router-dom";

export default function Saved() {
    return(
        <>
            <SavedWrap>

                <BorderContainer>
                    <NavLink to="/account">
                        <a>&lt; Back</a>
                    </NavLink>
                    <SavedDiv>
                        <Job>
                            <div className="x-svg"/>
                            <JobCard />
                        </Job>
                        
                        <Job>
                            <div className="x-svg"/>
                            <JobCard />
                        </Job>

                        <Job>
                            <div className="x-svg"/>
                            <JobCard />
                        </Job>

                        <Job>
                            <div className="x-svg"/>
                            <JobCard />
                        </Job>
                    </SavedDiv>
                </BorderContainer>
            </SavedWrap>
        </>
    )
}