import React, { useEffect, useState } from "react";
import s from "./styles/App.module.scss";
import axios from "axios";
import SearchResults from "./components/SearchResults";
import SearchFilter from "./components/SearchFilter";
import JSONViewer from "./components/JSONViewer";

// const wpUrl = process.env.NODE_ENV === 'local' ?
//   process.env.LOCAL_WP_URL :
//   // process.env.NODE_ENV === 'development' ?
//   //   process.env.DEV_WP_URL :
//   process.env.NODE_ENV === 'production' ?
//     process.env.PROD_WP_URL :
//     "https://stability-health.local";
const wpUrl = "https://stability-health.local";

export default function App() {
  const [options, setOptions] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [professionId, setProfessionId] = useState(2);
  const [specialties, setSpecialties] = useState([]);

  const [professionClinicalUnits, setProfessionClinicalUnits] = useState([]);

  const [clininicalUnit, setclininicalUnit] = useState("");
  const [cityState, setCityState] = useState("");

  const [queryParams, setQueryParams] = useState({
    specialtyId: "",
    stateCode: "",
  });

  useEffect(() => {
    setclininicalUnit(queryParams.specialtyId);
    setCityState(queryParams.stateCode);
  }, [queryParams]);

  useEffect(() => {
    const getSpecialties = (id) => {
      const res = professionClinicalUnits[id-1];
      // const res = professionClinicalUnits.filter((item) => item.id === id);
      return res ? res.specialties : null;
    };

    if (options && professionClinicalUnits) {
      setSpecialties(getSpecialties(professionId));
    }
  }, [options, professionClinicalUnits, professionId]);

  useEffect(() => {
    const getData = async (clinical_unit, city_state) => {
      try {
        const res1 = await axios.get(
          `${wpUrl}/wp-admin/admin-ajax.php?action=sh_all_options`
        );
        setOptions(res1.data.data);
        if (res1.data.data.professionClinicalUnits) {
          setProfessionClinicalUnits(res1.data.data.professionClinicalUnits);
        }

        // console.log(res1.data.data);

        const res2 = await axios.get(
          `${wpUrl}/wp-admin/admin-ajax.php?action=sh_jobs&clinical_unit=${clinical_unit}&city_state=${city_state}`
        );
        // setData(res2.data.data.jobs);
        console.log(res2.data.data);
        setData(res2.data.data.jobs.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getData(clininicalUnit, cityState);

    return () => {
      setLoading(true);
      setOptions(null);
      setData(null);
    };
  }, [clininicalUnit, cityState]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.App} id="SHAppWrapper">
      <section className={s.top}>
        <div className={s.container}>
          <div className="narrow">
            <h2 className="heading">Salary Guide</h2>
            <p>
              Our transparency policy that shows salaries upfront empowers
              clinicians to attain market-leading pay rates.
            </p>
          </div>
          {options.professionClinicalUnits && (
            <SearchFilter
              professions={options.professionClinicalUnits}
              specialties={specialties}
              queryParams={queryParams}
              professionId={professionId}
              setProfessionId={setProfessionId}
              setQueryParams={setQueryParams}
            />
          )}
        </div>
      </section>

      <section className={s.bottom}>
        <div className={s.container}>
          <SearchResults data={data} />
        </div>
      </section>
    </div>
  );
}
