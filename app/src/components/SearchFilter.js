import React, { useState } from "react";

import s from "./SearchFilter.module.scss";

import filtersData from "./filters.json";

function SearchFilter({ professions, specialties, professionId, setProfessionId, queryParams, setQueryParams }) {

  const specialtiesList = specialties || filtersData.specialties;

  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState(queryParams.stateCode || "");
  
  const handleSubmit = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
    setQueryParams({
      specialtyId: value2,
      stateCode: value3,
    });
  };

  return (
    <div className={s.SearchFilter}>
        <select value={professionId || "" } className={professionId ? 'has-value' : ''} onChange={(e) => {
          setProfessionId(e.target.value);
        }}>
          <option value="">All Professions</option>
          {professions &&
            professions.map((item, index) => 
            <option value={item.id} key={index}>{item.name}</option>
          )}
        </select>
        <select value={value2 || ""} className={value2 ? 'has-value' : ''} onChange={(e) => setValue2(e.target.value)}>
          <option value="">All Specialties</option>
          {specialtiesList && 
            specialtiesList.map((item, index) => 
              <option value={item.value} key={index}>{item.text}</option>
            )
          }
        </select>
        <select value={value3 || ""} className={value3 ? 'has-value' : ''} onChange={(e) => setValue3(e.target.value)}>
          <option value="">All States</option>
          {filtersData.us_states.map((item, index) => 
            <option value={item.abbreviation} key={index}>{item.name}</option>
          )}
        </select>
        <button className="button" onClick={handleSubmit}>Search <i aria-hidden="true" className="icon icon-search"></i></button>
    </div>
  );
}

export default SearchFilter;
