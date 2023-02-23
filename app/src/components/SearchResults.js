import React from "react";
import s from "./SearchResults.module.scss";

function SearchResults({ data, loading, resultInfo }) {
  const { profession, specialty, state } = resultInfo;

  return (
    <div className={s.SearchResults}>
      <h5 style={{ display: "block" }}>
        <b>{profession ? profession : "All Professions"}</b> working in <b>{specialty ? specialty : "All Specialities"} Salary</b> in{" "}
        <b>{state ? state : "All States"}</b>
      </h5>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Profession</th>
            <th>Location</th>
            <th>Pay Rate</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {loading ?
            <tr><td colSpan="5"><div className="animated-loader"></div></td></tr>
            :
            (data.length > 0 ?
              data.map((item, index) => (
                <DataRow itemData={item} key={index} />
              ))
              :
              <tr><td colSpan="5" style={{textAlign: "center"}}>No jobs found for selected filter...</td></tr>
            )
          }
        </tbody>
      </table>
      <div>
        <a
          className="view-all button"
          href="https://stabilityhealthcare.com/travel-nursing/jobs"
          target={"_blank"}
          rel="noreferrer"
        >
          View All Jobs
        </a>
      </div>
    </div>
  );
}

export default SearchResults;

const DataRow = ({ itemData }) => {
  const {
    city,
    state,
    weekly_rate,
    id_job_verified,
    profession,
    clinical_name,
  } = itemData;
  const jobLink = `https://stabilityhealthcare.com/apply?job_id=${id_job_verified}`;
  return (
    <tr>
      <td>{clinical_name}</td>
      <td>{profession}</td>
      <td>
        {city}, {state}
      </td>
      <td>${parseFloat(weekly_rate.toFixed(2))}/wk</td>
      <td>
        <a href={jobLink} target={"_blank"} rel="noreferrer">
          View Details &rarr;
        </a>
      </td>
    </tr>
  );
};
