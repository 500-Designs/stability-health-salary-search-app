import React, { useEffect, useState } from "react";
import s from "./styles/index.module.scss";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phoneQuery, setPhoneQuery] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get("https://jsonplaceholder.typicode.com/users");

        let allData = res.data.filter((data) => {
          if (nameQuery) {
            return data.name.toLowerCase().includes(nameQuery.toLowerCase());
          }
          if (emailQuery) {
            return data.email.toLowerCase().includes(emailQuery.toLowerCase());
          }
          if (phoneQuery) {
            return data.phone.includes(phoneQuery.toLowerCase());
          } else {
            return data;
          }
        });
        setData(allData);
        console.log(allData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [nameQuery, emailQuery, phoneQuery]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Search For User Info TEST</h1>
      <label name="search" className={s.label}>
        ...search by email, name, or telephone number.
      </label>

      <input
        name="search"
        className={s.search__input}
        onChange={(e) => setNameQuery(e.target.value)}
        value={nameQuery}
        type="text"
        placeholder="search by name"
      />

      <input
        name="search"
        className={s.search__input}
        onChange={(e) => setEmailQuery(e.target.value)}
        value={emailQuery}
        type="text"
        placeholder="search by email"
      />
      <input
        name="search"
        className={s.search__input}
        onChange={(e) => setPhoneQuery(e.target.value)}
        value={phoneQuery}
        type="text"
        placeholder="search by phone number"
      />
      <div>
        {data.map((user) => (
          <List user={user} key={user.id} />
        ))}
      </div>
      {/* {data.map(post => <List data={post} key=post.id/>)} */}
    </div>
  );
}

const List = ({ post, setData, user }) => {
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
