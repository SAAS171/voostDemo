import React from 'react';
import {categoryData} from '../job-search/categoryData';
import RichTextEditor from './richTextEditor';

//Bootstrap
import {Dropdown} from 'react-bootstrap';

//Styles
import {PillWrap, SmallPill, Label, Select_jobType, Select_jobCategory, InputDescription, Form, Wrap, InputCompanyLogo, InputText,InputNumber } from './styles/postJobInput';

export function JobFullName(props) {
    const jobFullName =
    <Form>
        <InputText {...props} type="text" name="jobTitle" placeholder="Full name" required/>
    </Form>

    return(jobFullName);
}

export function JobTypePill(props) {
    const pill =
    <SmallPill {...props} >{props.text}</SmallPill>
    
    return(pill);
}
export function PillWraper(props) {
    const wrap =
    <PillWrap {...props} ></PillWrap>
    
    return(wrap);
}

export function JobTitle(props) {
    const jobTitle =
    <Form>
        <label htmlFor="jobTitle">Job Title</label>
        <InputText {...props} type="text" name="jobTitle" placeholder="Job Title" required/>
    </Form>

    return(jobTitle);
}


export function Location(props) {
    const location =
    <Form>
        <label htmlFor="location">Location</label>
        <InputText {...props} type="text" placeholder="Location" name="location" required/>
    </Form>

    return(location);
}

export function Salary(props) {
    const salary =
    <Form>
        <label htmlFor="salary">Salary</label> 
        <InputNumber {...props} type="number" placeholder="Salary" name="salary" required/>
    </Form>

    return(salary);
}
export function SalaryRange(props) {
    const salaryRange =
    <Form>
        <label htmlFor="salaryRange">Salary Highest Range (Optional)</label> 
        <InputNumber {...props} type="number" placeholder="Salary Range" name="salaryRange"/>
    </Form>

    return(salaryRange);
}

export function JobType(props) {
    const jobType =
        <Form onClick={props.link}>
            <Dropdown>
                <Dropdown.Toggle id="type-toggle">
                    Job Type
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <div id="type-item" name="jobType">
                        <input type="radio" name="jobType" id="21" value="Full-Time" required/>
                        <label name="jobType" htmlFor='21' className="checked-container">
                            <span className="checked"/>
                            Full-time
                        </label>
                    </div>

                    <div id="type-item">
                        <input type="radio" name="jobType" id="22" value="PartTime"/>
                        <label name="jobType" htmlFor='22' className="checked-container">
                            <span className="checked"/>
                            Part-time
                        </label>
                    </div>

                    <div id="type-item">
                        <input type="radio" name="jobType" id="23" value="Permanent"/>
                        <label name="jobType" htmlFor='23' className="checked-container">
                            <span className="checked"/>
                            Permanent
                        </label>
                    </div>

                    <div id="type-item">
                        <input type="radio" name="jobType" id="24" value="Temporary"/>
                        <label name="jobType" htmlFor='24' className="checked-container">
                            <span className="checked"/>
                            Temporary
                        </label>
                    </div>

                    <div id="type-item">
                        <input type="radio" name="jobType" id="25" value="Aprenticeship"/>
                        <label name="jobType" htmlFor='25' className="checked-container">
                            <span className="checked"/>
                            Apprenticeship
                        </label>
                    </div>

                    <div id="type-item">
                        <input type="radio" name="jobType" id="26" value="Internship"/>
                        <label name="jobType" htmlFor='26' className="checked-container">
                            <span className="checked"/>
                            Internship
                        </label>
                    </div>

                    <div id="type-item">
                        <input type="radio" name="jobType" id="27" value="Volunteership"/>
                        <label name="jobType" htmlFor='27' className="checked-container">
                            <span className="checked"/>
                            Volunteership
                        </label>
                    </div>
                    <div id="type-item">
                        <input type="radio" name="jobType" id="28" value="Contract"/>
                        <label name="jobType" htmlFor='28' className="checked-container">
                            <span className="checked"/>
                            Contract
                        </label>
                    </div>
                </Dropdown.Menu>
            </Dropdown> 
        </Form>
    return(jobType);
}


export function JobCategory(props) {
    const jobCategory = 
        
            <Dropdown>
                <Form>
                    <Dropdown.Toggle id="category-toggle">
                        Cagtegory
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                                {categoryData.map((index) => {
                                return(
                                    <div id="category-item" key={index} name={index}>
                                        <input type="checkbox" id={categoryData.indexOf(index)} {...props} name={index} value={index} required/>
                                        <label name={index} htmlFor={categoryData.indexOf(index)} className="checked-container">
                                            <span className="checked"/>
                                            {props[categoryData[index]] ? props[categoryData[index].toLowerCase()] : index}
                                        </label>
                                    </div>
                                )
                            })}
                    </Dropdown.Menu>
                    {
                        props.marketingAndAdvertising === true ? <SmallPill >Marketing & Advertising</SmallPill> : ''
                    }
                    {
                        props.arts === true &&  <SmallPill>Arts</SmallPill>
                    }
                    {
                        props.education === true && <SmallPill >Education</SmallPill>
                    }
                    {
                        props.development === true  && <SmallPill >development</SmallPill>
                    }
                    {
                       props.manufactoring === true && <SmallPill >manufactoring</SmallPill>
                    }
                    {
                        props.hospitality === true && <SmallPill >hospitality</SmallPill>
                    }
                    {
                        props.production === true && <SmallPill >production</SmallPill>
                    }
                    {
                        props.sales === true && <SmallPill >Sales</SmallPill>
                    }
                </Form>
            </Dropdown>
      

    return(jobCategory);
}


export function JobDescription(props) {
    const jobDescription =
        <Form>
            <label htmlFor="jobDescription">Job Description</label>
            <InputDescription {...props} name ='jobDescription'> </InputDescription>      
        </Form>

    return(jobDescription);
}

//COMPANY

export function CompanyName(props) {
    const companyName = 
    <div>
        <InputText type="text" {...props} placeholder="Company Name" name="companyName" />
    </div>
    return(companyName);
}

export function CompanyEmail(props) {
    const companyEmail = 
    <div>
        <InputText {...props} type="email" placeholder="Email" name="companyEmail" />
    </div>

    return(companyEmail);
}

export function CompanyDescription(props) {
    const companyDescription = 
    <div>
        <InputDescription {...props}  type="text" name="companyDescription" />
    </div>
    
    return(companyDescription);
}

export function CompanyWebsite(props) {
    const companyWebsite =
        <div>
            <InputText type="text" {...props} name="companyWebsite" placeholder="Company website" />
        </div>
    return(companyWebsite);
}

export function CompanyPhone() {
    const companyPhone =
    <Form>
        <InputText type="text" name="companyPhone" placeholder="Phone number" />
    </Form>

    return(companyPhone);
}


export function CompanyLogo() {
    const companyLogo =
    <Form>
        <InputCompanyLogo type="file" name="companyLogo" />
    </Form>

    return(companyLogo);
}


export function QuestionsContainer() {
    const companyLogo =
    <Form>
        <InputCompanyLogo type="file" name="companyLogo" />
    </Form>

    return(companyLogo);
}
