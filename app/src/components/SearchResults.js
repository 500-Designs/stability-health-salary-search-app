import React, { } from 'react';
import s from "./SearchResults.module.scss";

function SearchResults({ data }) {

  return (
    <div className={s.SearchResults}>
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
          <tr>
            <td>Nurse Practitioner</td>
            <td>Healthcare</td>
            <td>New York, NY</td>
            <td>$100,000</td>
            <td>
              <a href="#">View Details</a>
            </td>
          </tr>
          <tr>
            <td>Software Engineer</td>
            <td>Technology</td>
            <td>San Francisco, CA</td>
            <td>$120,000</td>
            <td>
              <a href="#">View Details</a>
            </td>
          </tr>
          {data && 
            data.map((item, index) => (
              <DataRow itemData={item} key={index} />
            ))
          }
        </tbody>
      </table>
      <a className="view-all" href='https://stabilityhealthcare.com/travel-nursing/jobs' target={'_blank'} rel="noreferrer">
        View All Jobs
      </a>
    </div>
  );
}

export default SearchResults;

const DataRow = ({ itemData, key }) => {
  const { city, state, weekly_rate, id_job_verified, profession, clinical_name } = itemData;
  const jobLink = `https://stabilityhealthcare.com/apply?job_id=${id_job_verified}`;
  return (
    <tr key={key}>
      <td>{clinical_name}</td>
      <td>{profession}</td>
      <td>{city}, {state}</td>
      <td>${weekly_rate}/wk</td>
      <td>
        <a href={jobLink} target={'_blank'} rel="noreferrer">View Details</a>
      </td>
    </tr>
  )
}


const List2 = ({ post, setData, user }) => {
  const { id, name, username, email, address, phone, website, company } = user;
  const { catchPhrase, bs } = company;

  return (
    <>
      <div className={s.contact__container}>
        <div className={s.contact__item}>
          <span className={s.bold}>Name:</span> {name}
        </div>
        <div className={s.contact__item}>
          <span className={s.bold}>UserName:</span> {username}
        </div>
        <div className={s.contact__item}>
          <span className={s.bold}>Email: </span>
          {email}
        </div>
        {/* <div>address</div> */}
        <div className={s.contact__item}>
          <span className={s.bold}>Phone: </span>
          {phone}
        </div>
        <div className={s.contact__item}>
          <span className={s.bold}>Website:</span>
          {website}
        </div>
        {/* <div>company</div> */}

        <div className={s.contact__item}>
          <span className={s.bold}>Company Name:</span>
          {company.name}
        </div>
        <div className={s.contact__item}>
          <span className={s.bold}>Busines:</span>
          {catchPhrase}
        </div>
        <div className={s.contact__item}>
          <span className={s.bold}>Catch Phrase:</span>
          {bs}
        </div>
      </div>
    </>
  );
};