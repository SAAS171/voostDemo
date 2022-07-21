import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Question } from '../components'
import {useDispatch, useSelector} from 'react-redux'; 

import {getMyJobs} from '../store/actions/actions';
import styled from 'styled-components';   


const OutContainer  = styled.div`

    @media screen and (max-width: 992px) { 
        h1{
            font-size: 30px!important;
            line-height: 1.4!important;
        }
        .question-title-container{
            flex-direction: column;
            text-align: left;
            > div{
                flex-direction: column;
                width: 100%;
            }
        }
    }
`
const MyJobInput = styled.input `  
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    border: NONE;
    box-shadow: 0 0 10px -3px rgb(0,0,0,.4);
`

const SelectAllGroup = styled.div `   
    display: flex;
    justify-content: flex-start;
    align-items: center;
    input {
        margin-right: 10px;
    }
    input, label{
        cursor: pointer;
        font-size: 18px;
        margin: 0 5px;
        color: #4C567C;
    } 
`
const JobGroup = styled.div `  
    width: 100%;
    display: flex;
    margin-top: 15px;
    flex-wrap: wrap;


    @media screen and (max-width: 992px) { 
        flex-direction: column!important;
        > div{    
            width: 100%!important;
        }
    }
    > div{
        width: 25%;
        flex-shrink: 0;
        text-align: left;
        input {
            margin-right: 10px;
        }
        input, label{
            cursor: pointer;
            font-size: 18px;
            color: #4C567C;
        }
    }
`



function QuestionIntroSelect(props) {

    const dispatch = useDispatch(); 
    const history = useHistory();
    const { jobTitle, jobId } = history.location.state ? history.location.state  : {}; 

    const [myLocalJobs,  setMyLocalJobs] = useState([]);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const my_jobs = useSelector(state => state.my_jobs); 

    const handleNext = (e) => {
        e.preventDefault();
        history.push( {pathname: '/recruiter/questions/intro/tutorial', state: {   selectedJobs: selectedJobs }});
    }

    useEffect(()=>{ 
 
        if(typeof jobTitle != "undefined" && typeof jobId != "undefined"){
            dispatch(getMyJobs())
            setSelectedJobs([jobId]); 
        }else{
            history.push("/account")
        }

    }, [])
 
    useEffect(()=>{ 
        if(my_jobs && my_jobs.my_jobs.length){
            setMyLocalJobs(my_jobs.my_jobs);
        }
    }, [my_jobs])
 
    const selectCheckbox = (id) =>{ 
        const tmpArr = [...selectedJobs];
        const isAdded = tmpArr.find(eid => eid === id) 
        if(isAdded ){
            setSelectedJobs(tmpArr.filter(eid => eid != id));
        }else{
            setSelectedJobs([...tmpArr, id]);
        }
    }

    useEffect(()=>{ 
        if(selectAll){ 
            let tmpArr = [];
            myLocalJobs.forEach((obj) =>{
                tmpArr.push(obj.data().id) 
            }) 
            setSelectedJobs([...tmpArr]); 
            
        }else{ 
            setSelectedJobs([jobId]); 
            setMyLocalJobs([...myLocalJobs]) 
        }  
        setMyLocalJobs([...myLocalJobs])
    }, [selectAll])

 
    

    return (
        <React.Fragment>
            <OutContainer>    
                <Question.Section className="">
                <Question.Title>Pre-Recorded Interview Questions</Question.Title>
                    <Question>
                        <Question.Form>
                            <Question.Field>
                                <Question.Label>Job</Question.Label>
                                <MyJobInput type="text" name="jobtitle" id="jobtitle" value={jobTitle} disabled="true"/>
                            </Question.Field>
                            <Question.Break/>
                            <Question.HorizontalDivider/>
                        </Question.Form>
                        <div className="question-title-container" style={{ paddingTop: '40px' }}>
                            <div style={{ marginBottom:'40px', display: 'flex', maxWidth: '1200px', justifyContent: 'space-between'}}>
                                <Question.Label>Would you like to apply these interview questions to more job postings?</Question.Label>
                                <SelectAllGroup>
                                    <input id="select-all" onChange={ ()=> setSelectAll(!selectAll)} type="checkbox"   /> 
                                    <label for="select-all">Select all</label>
                                </SelectAllGroup>
                            </div>
                            <JobGroup className="my-jobs-group">
                                {
                                    myLocalJobs.map( (job, key) =>{
                                        const job_data = job.data();
                                        // console.log("job", )
                                        return( 
                                            <div key={key}> 
                                                    <input id={key} onChange={e => selectCheckbox(job_data.id)} type="checkbox" disabled={jobId === job_data.id} checked={selectedJobs.find(eid => eid == job_data.id)} /> 
                                                    <label for={key}>
                                                        {job_data.jobTitle}
                                                    </label>
                                            </div>
                                        )
                                    } )
                                }
                            </JobGroup>
                            <div style={{ paddingTop: '40px'}}>
                                <Question.ButtonWrapper>
                                    <Question.Button onClick={handleNext}>Next</Question.Button>
                                </Question.ButtonWrapper>
                            </div>
                        </div>
                    </Question>
                    <Question.Break/>
            </Question.Section>
       
            </OutContainer> 
        </React.Fragment>
    )
}

export default QuestionIntroSelect;