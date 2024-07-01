import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";

function CompanyList() {
  const [companies, setCompanies] = useState(null);

  useEffect(function getListOfCompanies() {
    console.log("searching companies on load");
    searchCompanies();
  }, []);

  async function searchCompanies(name) {
    const comps = await JoblyApi.getCompanies(name);
    console.log(comps);
    setCompanies(comps);
  }

  if (!companies) return <p>LOADING...</p>;

  return (
    <div className="companylist">
      {companies.length ? (
        companies.map((c) => (
          <CompanyCard
            key={c.handle}
            name={c.name}
            description={c.description}
            handle={c.handle}
          />
        ))
      ) : (
        <p>No companies found</p>
      )}
    </div>
  );
}

export default CompanyList;
