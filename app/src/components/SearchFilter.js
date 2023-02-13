import React, { useState } from "react";

import s from "./SearchFilter.module.scss";

import filtersData from "./filters.json";

function SearchFilter({ professions, specialties, professionId, setProfessionId, queryParams, setQueryParams }) {

  // console.log("specialties: ", specialties);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  
  const handleSubmit = () => {
    console.log(`handleSubmit: ${value1}|${value2}|${value3} `, );
    setQueryParams({
      // professionId: professionId,
      specialtyId: value2,
      stateCode: value3,
    });
  };

  return (
    <div className={s.SearchFilter}>
        <select value={professionId} onChange={(e) => {
          setProfessionId(e.target.value);
        }}>
          <option value="">Select Profession</option>
          {professions.map((item, index) => 
            <option value={item.id} key={index}>{item.name}</option>
          )}
        </select>
        <select value={value2} onChange={(e) => setValue2(e.target.value)}>
          <option value="">Select Specialty</option>
          {specialties && 
            specialties.map((item, index) => 
              <option value={item.value} key={index}>{item.text}</option>
            )
          }
        </select>
        <select value={value3} onChange={(e) => setValue3(e.target.value)}>
          <option value="">Select Location</option>
          {filtersData.us_states.map((item, index) => 
            <option value={item.abbreviation} key={index}>{item.name}</option>
          )}
        </select>
        <button onClick={handleSubmit}>Search <i>Icon</i></button>
    </div>
  );
}

export default SearchFilter;
