import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../shared-components/button'; 

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState,Modifier, convertFromHTML , SelectionState } from 'draft-js';
import { convertToHTML } from 'draft-convert';


import Notiflix from 'notiflix'; 

import { snippets  } from "./profile-data/snippets";

import { v4 as uuidv4 } from 'uuid';

import searchImg from '../../assets/svg/search-tags.svg'; 
import minus from '../../assets/svg/minus.svg'; 
import add from '../../assets/svg/add.svg'; 

import {useDispatch, useSelector} from 'react-redux'; 
import {updateCvHighlightBuilder,updateUserCVData, updateSummary, updateProfileBuilderState} from '../../store/actions/actions'; 

import firebase from 'firebase'; 
import { db } from '../../firebase';


const BuilderSummaryContainer = styled.div` 
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
        .summaryContent-container{
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
    .summary-title{
        text-align: left;
    }
    .summaryContent-container{
        display: flex;
        justify-content: space-between;
        .left-item-content{
            width: calc(70% - 30px);
            flex-shrink: 0;
            border-radius: 10px;
            border: 1px solid transparent;
            box-shadow: 0 0 20px -7px rgba(0,0,0,0.5);
            background-color: white;
            overflow: hidden;
            max-height: 600px;
            .rdw-editor-main{  
                max-height: calc(100% - 50px);
            }
            .rich-text-editor{
                padding: 10px 0;
                height: 100%;
                > *{
                    height: 100%; 
                }
                .rdw-editor-main{
                    padding: 0 15px;
                }
                span{
                    margin-left: 0!important;
                }
                .toolbarElem{
                    border: none;
                    border-bottom: 1px solid #d6d6d6;
                    padding: 7px;
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
      
    const summaryState = useSelector(state => state.summary);   
    
     const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [search, setSearch] = useState(""); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [preAdd, setPreAdd] = useState(""); 
    const [addedSnippets, setAddedSnippets] = useState([]); 

    const [searchable, setSearchable] = useState(snippets); 
    const [searchedResults, setSearchedResults] = useState([]);  

    const isReviewing = useSelector(state => state.isReviewingState);    
    const [isReviewingLocalState, setIsReviewingLocalState] = useState(false); 

    useEffect(() =>{
       //  console.log("is reviewing......", isReviewing.isReviewing)
        setIsReviewingLocalState(isReviewing.isReviewing)
        //  console.log("IS REVIEWING STATE...." + isReviewingLocalState)
    },[isReviewing])

    useEffect(() => {  
        const searchableId = preAdd;
        if(searchableId){
            
            let obj = searchable.find(o => o.id === searchableId);  
            if(obj){
                
                // console.log("searchable : " , searchable)
                // console.log("clicked selected result", obj.id)  
                // console.log("added snippets array : " , addedSnippets)

                let x = null;
                if(addedSnippets.length){
                    x = addedSnippets.find(snippetObj => snippetObj.id ===  searchableId); 
                } 
                if(typeof x === "undefined" || x === null){ 

                    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
                    const blocksFromHTML = convertFromHTML(currentContentAsHTML + `<p>${obj.text}</p>`);
                    const myContentState = ContentState.createFromBlockArray(
                        blocksFromHTML.contentBlocks,
                        blocksFromHTML.entityMap,
                    );
                    setEditorState(EditorState.createWithContent(myContentState))
                    setAddedSnippets( [ ...addedSnippets, obj ] ) 
                }else{
                    Notiflix.Notify.Warning('You can only add a snippet once.');

                }
            }else{
                Notiflix.Notify.Warning('Please select a different snippet');
            }
            setPreAdd(""); 
        }
    }, [preAdd])


    const onEditorStateChange = (editorState) => {

        // let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        // console.log("state :  " , editorState.getCurrentContent() );
        // console.log("state SEL :  " , raw);
        
        let raw = convertToRaw(editorState.getCurrentContent());
        addedSnippets.forEach(snippet => {
            const snippetExists = raw.blocks.find(o => o.text.includes(snippet.text));    
            if(!snippetExists){
                const removedSnippet = addedSnippets.filter(snip => snip.id !== snippet.id );
                setAddedSnippets(removedSnippet)
            }         
        }); 
        setEditorState(editorState)
    } 

    const backStep = (e) =>{
        e.preventDefault();
        dispatch(updateProfileBuilderState("preSkills")) 
    }
    

    useEffect(()=>{
        // console.log("skills item: ", summaryState.summary)
        if(!summaryState.summary){
            // console.log("EMPTY FORM....");
            setTimeout(() => {
                setEditorState(EditorState.createEmpty())
                setSearchTerm("")
                setSearch("")
                setAddedSnippets([])
                setSearchedResults([])
            }, 3000);
     
        }else{
            if(summaryState.summary){ 
                const blocksFromHTML = convertFromHTML(summaryState.summary);
                const myContentState = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap,
                );
                setEditorState(EditorState.createWithContent(myContentState))
            }

            
        }
    }, [ summaryState])

    const nextStep = (e) =>{
        e.preventDefault();
        // console.log("CLICKED....next ")  

        let s =  convertToHTML(editorState.getCurrentContent())
        dispatch(updateCvHighlightBuilder(""))
        dispatch(updateSummary(s));
        dispatch(updateUserCVData({ value: {summary : s}, test: "summary" }))
        dispatch(updateProfileBuilderState("reviewCV")) 

 
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
        let obj = addedSnippets.find(o => o.id === searchableId); 
        return obj ? true : false;
    }
  
    const selectResult = (e) =>{
        e.preventDefault();  
        const searchableId = e.target.getAttribute("data-tagid");
  
        let raw = convertToRaw(editorState.getCurrentContent()); 
        let snippetExists = addedSnippets.find(o => o.id === searchableId); 

        if(snippetExists){

            let contentState = editorState.getCurrentContent();
            let block  = raw.blocks.find(o => o.text.includes(snippetExists.text));   
  
            const removeSelection = new SelectionState({
                anchorKey: block.key,
                anchorOffset: 0,
                focusKey: block.key ,
                focusOffset:  block.text.length+1
            });
         
        
            let newEditorState = EditorState.push(
                editorState,
                Modifier.removeRange(  contentState, removeSelection, "forward" ),
                "remove-range"
            );
        
            setEditorState(newEditorState); 
            let updatedAddedSnippets = addedSnippets.filter(o => !o.text.includes(snippetExists.text));   
            setAddedSnippets( [ ...updatedAddedSnippets ] ) 


        }else{ 
            setPreAdd(searchableId); 
        
        }
    }
    

    
    
    return ( 
        <BuilderSummaryContainer>
            <div className="summary-title">
                <h1>Tell us about your background</h1>
                <p>Use our expert recommendations below to get started.</p>
            </div>
            <div className="summaryContent-container"> 
                <div className="left-item-content">
                    <div className="rich-text-editor">
                    <Editor
                        onEditorStateChange={onEditorStateChange}
                        defaultEditorState={editorState}
                        editorState={editorState} 
                        toolbarClassName="toolbarElem" 
                        toolbar={{ 
                            options: ['inline', 'list','history'],
                            list: { inDropdown: true,     options: ['unordered']}, 
                            inline: {options: ['bold', 'italic', 'underline']},
                            history: { inDropdown: false }
                            }}
                        />
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
                                     <div key={obj.id} className={`single-result ${ isObjSelected(obj.id) ? "isSelected" : "" }   `}>
                                         <p>{obj.text} </p>
                                         <button data-tagid={obj.id} onClick={selectResult}></button>
                                     </div> 
                                )
                             })
                            :
                            searchable.map((obj) =>{ 
                               return  (
                                    <div key={obj.id} className={`single-result ${ isObjSelected(obj.id) ? "isSelected" : "" }   `}>
                                        <p>{obj.text} </p>
                                        <button data-tagid={obj.id} onClick={selectResult}></button>
                                    </div> 
                               )
                            })
                        }
                    </div> 
                </div> 
            </div>  
            <div className="selection-buttons">
                {
                    isReviewingLocalState  ? 
                        <Button type="primarySmall" text="Review Details"  onClick={nextStep}/>
                    : 
                    <>
                        <Button type="primarySmall" text="BACK" onClick={backStep}/>
                        <Button type="primarySmall" text="NEXT" onClick={nextStep}/>
                    </>
                }
            </div>
           

        </BuilderSummaryContainer>
    )
}
           