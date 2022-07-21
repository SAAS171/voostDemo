import React, { useEffect, useState } from 'react'

//Styles
import * as global from '../../styles/components/globalVariables';
import { FeaturedCard } from '../../components/job-card'
import { BorderContainer, H2 } from '../../styles/components/shared-components'
import { Container, GridWrap } from './styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ButtonStyle } from '../../styles/components/shared-components';



export default function FeaturedSection() {

    const getJobs = useSelector(state => state.jobs.vacancies);
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        setJobs(getJobs);
    }, [getJobs])

    const featured = <Container >
        <BorderContainer>
            <H2 color={global.colorBlue}>
                LIVE JOBS 
            </H2>
            <GridWrap className="container-fluid">
                <div className="row"> 
                {Array.isArray(jobs) && Object.keys(jobs).slice(0, 4).map(job => {
                    return (<div className="col-sm-12 col-md-6 job_item" id={jobs[job].id} key={jobs[job].id}>
                                <FeaturedCard  noFeedback={true} job={jobs[job].data()}/>
                            </div>)
                })}
                   
                </div>

            </GridWrap>
            <div style={{paddingTop: '40px'}}>
                <Link to='/jobs'>
                    <ButtonStyle type="primaryLarge" text="GET YOUR PERFECT JOB">
                        View all jobs
                    </ButtonStyle>
                </Link>
            </div>
        </BorderContainer>
    </Container>


    return (featured)
}
