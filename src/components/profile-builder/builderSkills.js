import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../shared-components/button'; 

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState,Modifier, convertFromHTML , SelectionState } from 'draft-js';
import { convertToHTML } from 'draft-convert';

import { skill_list } from "./profile-data/skills";

import Notiflix from 'notiflix'; 

import { v4 as uuidv4 } from 'uuid';


import plus from '../../assets/svg/add.svg'; 
import bin from '../../assets/svg/trash.svg'; 
import searchImg from '../../assets/svg/search-tags.svg'; 
import minus from '../../assets/svg/minus.svg'; 
import add from '../../assets/svg/add.svg'; 

import {useDispatch, useSelector} from 'react-redux'; 
import {updateCvHighlightBuilder, updateUserCVData, updateSkillsList, updateProfileBuilderState} from '../../store/actions/actions'; 

import firebase from 'firebase'; 
import { db } from '../../firebase';


const BuilderSkillsContainer = styled.div` 
    max-width: 1140px;
    margin: 50px auto;  

    @media screen and (max-width: 992px) { 
        max-width: 100vw;
        margin: 20px auto;
        padding: 0 15px;
        h1{
            text-align: center;
            margin-top: 80px;
            font-size: 25px;
        }
        .skillsContent-container{
            flex-wrap: wrap;
            flex-direction: column;
            > div{
                width: 100%!important;
                margin-bottom: 30px;
                .rich-text-editor {
                    height: 300px!important;
                }
                .search-results { 
                    max-height: 450px!important;
                    height: auto!important;
                }
            }
        }
    }


    .skills-title{
        text-align: left;
    }
    .skillsContent-container{
        display: flex;
        justify-content: space-between;
        .left-item-content{
            width: calc(70% - 30px);
            flex-shrink: 0;
            /* border-radius: 10px; */
            /* border: 1px solid transparent; */
            /* box-shadow: 0 0 20px -7px rgba(0,0,0,0.5); */ 
            /* max-height: 600px; */
            .skils-inputs{

                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                width: 100%;
                fieldset{
                    width: 100%;
                    position: relative;
                    input[type=text]{
                        background-color: white;
                        border-radius: 10px;
                        border: 1px solid transparent;
                        box-shadow: 0 0 20px -7px rgba(0,0,0,0.5); 
                        margin-bottom: 20px;
                        width: 100%; 
                        padding: 18px;
                        outline: none;
                    }
                    button{
                        position: absolute;
                        right: 15px;
                        top: 50%;
                        height: 30px;
                        transform: translateY(-90%);
                        width: 20px;
                        background-color: transparent;
                        border: none;
                        background-image: url(${bin});
                        background-size: 80%;
                        background-position: center;
                        background-repeat: no-repeat;


                    }
                }
            }
          
            .add-more-items{
                text-align: left;
                margin-top: 35px;
                button{
                    background-color: #4C567C;
                    color: white;
                    border-radius: 4px; 
                    display: inline-block;
                    border: none;
                    box-shadow: none;
                    padding: 10px 20px;
                    display: flex;
                    align-items: center;
                    &:before{
                        content: ""; 
                        height: 20px;
                        width: 15px;
                        display: inline-block;
                        vertical-align: initial;
                        background-image: url(${plus});
                        background-size: 100%;
                        background-position: center;
                        background-repeat: no-repeat;
                        margin: 0 10px;
                    }
                }
            }
          
        }
        .right-item-content{
            width: 30%;
            flex-shrink: 0;
            border-radius: 10px;
            border: 1px solid transparent;
            box-shadow: 0 0 20px -7px rgba(0,0,0,0.5);
            background-color: white;
            .search-container{
                padding: 15px;
                border-bottom: 1px solid lightgrey;
                p{
                    margin-bottom: 10px;
                    text-align: left;

                }
                form, fieldset {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    input{
                        width: calc(100% - 35px);
                        flex-shrink: 0;
                        border: 1px solid #B6B6B6;
                        padding: 7px;
                        border-bottom-left-radius: 4px;
                        border-top-left-radius: 4px;
                        outline: none;
                    }
                    button{
                        background-color: #dd3566;
                        border-top-right-radius: 4px;
                        border-bottom-right-radius: 4px;
                        border: 1px solid #dd3566;
                        width: 100%;
                        color: white;
                        background-image: url('${searchImg}');
                        background-size: 50%;
                        background-position: center;
                        background-repeat: no-repeat;
                        outline: none;
                        
                    }
                }
            }
            .search-results{
                padding: 15px;
                text-align: left;
                height: 500px;
                overflow: scroll;
                p {
                    color: #4C567C;
                    margin: 0 0 15px;
                    letter-spacing: 1px;
                    span{
                        margin: 0;
                        display: none;
                        &.show-search-span{
                            display: inline-block;
                            > span {
                                display: inline-block;
                                font-weight: 700;
                            }
                        }
                    }
                }
                .single-result{
                    margin-bottom: 15px;
                    border: 1px solid lightgrey;
                    border-radius: 4px;
                    padding: 8px;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    p{
                        width: 100%;
                        font-size: 11px;
                        margin: 0;
                    }
                    button{
                        margin-left: 10px;
                        background-color: #dd3566;
                        border-radius: 4px;
                        border: 1px solid #dd3566;
                        width: 40px;
                        height: 40px;
                        flex-shrink: 0;

                        background-position: center;
                        background-size: 50%;
                        background-repeat: no-repeat;
                        background-image: url(${add}); 
                    }
                
                    &.isSelected button{
                        background-color: #6FC7BA;
                        background-image: url(${minus});
                    }
                }

            }
        }

    }
    .selection-buttons{
        margin-top: 35px;
    }
    
    .hidden {
        display: none;
    }
`
export default function BuilderSkills() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();  
   
    const skillsListState = useSelector(state => state.skillsList);    
    const [skillsListLocal, setSkillsListLocal]   = useState( [
        {
            uid: uuidv4(),
            text: "",
            tags: []
        } 
    ]); 
  
    const [searchTerm, setSearchTerm] = useState(""); 
    const [search, setSearch] = useState(""); 
    const [searchedResults, setSearchedResults] = useState([]);  
    const [searchable, setSearchable] = useState(skill_list ); 

    const isReviewing = useSelector(state => state.isReviewingState);   
    const [isReviewingLocalState, setIsReviewingLocalState] = useState(false); 

    useEffect(() =>{ 
        setIsReviewingLocalState(isReviewing.isReviewing) 
    },[isReviewing])

 
    const backStep = (e) =>{
        e.preventDefault(); 
        dispatch(updateProfileBuilderState("preSkills")) 
    }
    

    useEffect(()=>{ 
        if(!skillsListState.skillsList){ 
            setTimeout(() => { 
                setSearchTerm("")
                setSearch("") 
                setSearchedResults([])
            }, 3000);
             
     
        }else{ 
            const sl = skillsListState.skillsList;
            if(sl.length){
                setSkillsListLocal([...sl]); 
            }
            
        }
    }, [skillsListState])

    const nextStep = (e) =>{
        e.preventDefault();
        // console.log("CLICKED....next ")   
        dispatch(updateSkillsList(skillsListLocal));
        dispatch(updateProfileBuilderState("preSummary")) 
        dispatch(updateUserCVData({ value: {skillsList : skillsListLocal}, test: "skills" } )) 

        
    } 

    const handleSearch = (e) =>{
        e.preventDefault();
        if(e.target.value.length < 1 ){
            setSearchedResults([]);
            setSearchTerm("");
        }
        setSearch(e.target.value);
    }
 
    const handleSearchClick= (e) =>{
        e.preventDefault();
        setSearchTerm(search);  
        const filtered = searchable.filter(snip=> snip.tags.find(phrase  =>  phrase ==  search) );
        setSearchedResults(filtered)

    }
    
    const isObjSelected = (id) =>{
        const searchableId = id;
        let obj = skillsListLocal.find(o => o.uid === searchableId); 
        return obj ? true : false;
    }
  

    const selectResult = (e) =>{
        e.preventDefault();  
        
        const searchableId = e.target.getAttribute("data-tagid");  
        let snippetExists = skillsListLocal.find(o => o.uid === searchableId);   
        console.log("skills searchableId:" , searchableId)
        if(snippetExists){   
            let updatedSkillsListLocal = skillsListLocal.filter(o => o.uid !== searchableId );   
            if(skillsListLocal.length === 1){
                setSkillsListLocal( [ { uid: uuidv4(), text: ""   }] ) 
            }else{
                setSkillsListLocal( [ ...updatedSkillsListLocal ] ) 
            } 
        }else{  
            console.log("SEARCHABLE : ", searchable)
            let obj = searchable.find(o => o.uid === searchableId);  
            if(obj){ 


                const lastItem = skillsListLocal.slice(-1)[0]
                if(skillsListLocal.length !== 1 &&  lastItem.text.length < 1){ 
                    let updatedSkillsListLocal = skillsListLocal.filter(o => o.uid !== lastItem.uid); 
                    setSkillsListLocal( [ ...updatedSkillsListLocal, obj ] )   

                } else if(skillsListLocal.length === 1  && lastItem.text.length < 1){
                    setSkillsListLocal( [obj ] )  
                }else{
                    setSkillsListLocal( [ ...skillsListLocal, obj ] )  
                }
 
            }else{
                Notiflix.Notify.Warning('Please select a different snippet');
            }
        }
    }


    const handleAddClick = (e) =>{
        e.preventDefault();    
        if(skillsListLocal.slice(-1)[0].text.length < 1){
            Notiflix.Notify.Warning('Please enter a skill for all fields before adding a new one.');
            return;
        } 
        setSkillsListLocal([...skillsListLocal,{ uid: uuidv4(), text: ""}])  
 
    }


    const handleChangeObj= (e) =>{
        e.preventDefault();  
        let skillsListTmp = skillsListLocal; 
        skillsListTmp.forEach( (o) => { 
            if(o.uid ===  e.target.id){ 
                o.text = e.target.value 
            } 
        }) 
        setSkillsListLocal([...skillsListTmp])
    }

    const reviewStep = (e) =>{
        e.preventDefault();        
        console.log("skillsListLocal",  skillsListLocal)
        dispatch(updateSkillsList(skillsListLocal));
        dispatch(updateUserCVData({ value: {skillsList : skillsListLocal}, test: "skils" } )) 
        dispatch(updateCvHighlightBuilder(""))
        dispatch(updateProfileBuilderState("reviewCV"))
    }
  
    
    
    return ( 
        <BuilderSkillsContainer>
            <div className="skills-title">
                <h1>Highlight relevant skills</h1>
                <p>Choose from our expert recommendations.</p>
            </div>
            <div className="skillsContent-container"> 
                <div className="left-item-content">
                    <div className="skils-inputs">
                        {
                            skillsListLocal.map((item, i) =>{
                                return (
                                    <fieldset key={i}>
                                        <input type="text" onChange={handleChangeObj} name={`skill-item-${i}`}   id={item.uid} value={item.text} placeholder="Add your skill level here..." />
                                        <button  data-tagid={item.uid}  className="removeSkill" onClick={selectResult}></button>
                                    </fieldset>
                                )
                            })
                        }

                    </div>
                    <div className="add-more-items">
                        <button  onClick={handleAddClick} className="add-another">ADD ANOTHER SKILL</button>
                    </div>
                </div>
                <div className="right-item-content">
                    <div className="search-container">
                        <p>Search for examples</p>
                        <form>
                            <fieldset>
                                <input type="search" name="search-examples" id="search-examples" onChange={handleSearch} value={search} placeholder="E.g. Marketing" />
                                <button onClick={handleSearchClick} id="search-btn"></button>
                            </fieldset>
                        </form>
                    </div>


                    <div className="search-results">
                        <p>Showing results <span className={` ${ (searchTerm) ? "show-search-span" : "" } `} > for <span> {  searchTerm } </span></span> </p>
                        {
                            (searchedResults.length ) ? 

                            searchedResults.map((obj) =>{ 
                                return  (
                                     <div key={obj.uid} className={`single-result ${ isObjSelected(obj.uid) ? "isSelected" : "" }   `}>
                                         <p>{obj.text} </p>
                                         <button data-tagid={obj.uid} onClick={selectResult}></button>
                                     </div> 
                                )
                             })
                            :
                            searchable.map((obj) =>{ 
                               return  (
                                    <div key={obj.uid} className={`single-result ${ isObjSelected(obj.uid) ? "isSelected" : "" }   `}>
                                        <p>{obj.text} </p>
                                        <button data-tagid={obj.uid} onClick={selectResult}></button>
                                    </div> 
                               )
                            })
                        }
                    </div> 
                </div> 
            </div> 
            <div className="selection-buttons"> 
                {
                    isReviewingLocalState ? 
                        <> 
                            <Button type="primarySmall" text="SAVE AND REVIEW"  onClick={reviewStep}/>
                        </>   
                    :
                        <>
                            <Button type="primarySmall" text="BACK"  onClick={backStep}/>
                            <Button type="primarySmall" text="SAVE AND CONTINUE"  onClick={nextStep}/>
                        </>
                }
            </div>
        </BuilderSkillsContainer>
    )
}
           