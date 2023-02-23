import React, { useEffect, useState } from "react";
import s from "./styles/App.module.scss";
import axios from "axios";
import SearchResults from "./components/SearchResults";
import SearchFilter from "./components/SearchFilter";
import JSONViewer from "./components/JSONViewer";

// const wpUrl = "https://stabhealthdev.wpengine.com";


export default function App() {

  const shLocation = window.shLocation;
  const shClinicalUnits = window.shClinicalUnits;
  const shProfessionClinicalUnits = window.shProfessionClinicalUnits;
  const shAllOPtions = window.shAllOPtions;

  let wpUrl = window.location.origin;
  if (wpUrl === "http://localhost:3000") {
    wpUrl = "https://stability-health.local";
  }

  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState(shAllOPtions || []);
  
  const [data, setData] = useState([]);

  const [professionId, setProfessionId] = useState(null);
  const [specialties, setSpecialties] = useState(shClinicalUnits || null);

  const [professionClinicalUnits, setProfessionClinicalUnits] = useState(shProfessionClinicalUnits || []);

  const [clininicalUnit, setclininicalUnit] = useState("");
  const [cityState, setCityState] = useState(shLocation || "");

  const [queryParams, setQueryParams] = useState({
    specialtyId: "",
    stateCode: cityState || "",
  });

  useEffect(() => {
    setclininicalUnit(queryParams.specialtyId);
    setCityState(queryParams.stateCode);
  }, [queryParams]);

  useEffect(() => {
    const getSpecialties = (id) => {
      const res = professionClinicalUnits[id-1];
      // const res = professionClinicalUnits.filter((item) => item.id === id);
      return res ? res.specialties : shClinicalUnits;
    };

    if (options && professionClinicalUnits) {
      setSpecialties(getSpecialties(professionId));
    }
  }, [options, professionClinicalUnits, professionId]);


  useEffect(() => {
    // refetch options from API
    const reloadOptions = async () => {
      try {
        const res1 = await axios.get(
          `${wpUrl}/wp-admin/admin-ajax.php?action=sh_all_options`
        );
        if (res1.data.data.professionClinicalUnits) {
          setOptions(res1.data.data);
          setProfessionClinicalUnits(res1.data.data.professionClinicalUnits);
        }
      } catch (e) {
        console.log(e);
      } finally {
        // setLoading(false);
      }
    };

    if (queryParams.specialtyId || queryParams.stateCode) {
      reloadOptions();
    }

  }, [queryParams]);

  useEffect(() => {
    const getData = async (clinical_unit, city_state) => {
      try {
        setLoading(true);
        const res2 = await axios.get(
          `${wpUrl}/wp-admin/admin-ajax.php?action=sh_jobs&clinical_unit=${clinical_unit}&city_state=${city_state}`
        );
        setData(res2.data.data.jobs.data);
      } catch (e) {
        console.log(e);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getData(clininicalUnit, cityState);

    return () => {
      setLoading(true);
      setData(null);
    };
  }, [clininicalUnit, cityState]);

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
            <h3 className="heading">Find Salaries</h3>
          </div>
          {professionClinicalUnits && (
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
          {(loading && data) ?
            <div className="animated-loader"></div>
            :
            <SearchResults data={data} loading={loading}/>
          }
        </div>
      </section>
    </div>
  );
}
