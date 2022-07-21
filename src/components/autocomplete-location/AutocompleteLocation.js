import React, { useState } from "react";
import { cities } from "./citiesData";
import styled from 'styled-components';

const Wrap = styled.div`
width: 540px;
@media(max-width:768px){
    width: 100%;
    margin-bottom: 30px;
}

`
function AutocompleteLocation({ handleAutocompletion, className, label }) {
  const [listId, setListId] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length > 2) {
      setListId("cities");
      handleAutocompletion(e.target.value);
    } else {
      setListId("");
    }
  };

  return (
    <Wrap className={className} >
      {label && <label htmlFor='location'>Location</label> }
      <input
        list="cities"
        name="location"
        id="location"
        placeholder="Location"
        onChange={handleChange}
        autoComplete="off"
      />

      <datalist id={listId}>
        {cities.map((city) => (
          <option key={city.name + city.lat} value={city.name} />
        ))}
      </datalist>
    </Wrap>
  );
}

export default AutocompleteLocation;
