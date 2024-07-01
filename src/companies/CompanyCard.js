import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

function CompanyCard({ name, description, handle }) {
  return (
    <Link className="company-card" to={`/companies/${handle}`}>
      <div>
        <h6 className="card-title">{name}</h6>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default CompanyCard;
