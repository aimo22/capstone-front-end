import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();
    const [zipcode, setZipcode] = useState('');
    const [radius, setRadius] = useState('');
    const [zipcodeError, setZipcodeError] = useState('');
    const [radiusError, setRadiusError] = useState('');


    console.log(zipcode)

    const handleSearch = () => {
        let isValid = true;

        if (zipcode.length !== 5) {
            setZipcodeError('Please input a valid 5-digit zipcode');
            isValid = false;
            return;
        }

        if (radius === '') {
            setRadiusError('Please select a radius');
            isValid = false;
            return;
        }

        if (isValid) {
            navigate(`/search-results/${zipcode}/${radius}`);
        }
    }

    return (
        <div className="Search-Page">
            <h1 className="Search-Title">Start the search to meet your future furbaby!</h1>
            <div className="Search-Container">
                <input
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder="Zipcode"
                    className="Search-Zipcode"
                    autoFocus
                />
                <select value={radius} onChange={(e) => setRadius(e.target.value)} className="Search-Radius">
                    <option value="">Select</option>
                    <option value="5">5 miles</option>
                    <option value="10">10 miles</option>
                    <option value="25">25 miles</option>
                    <option value="50">50 miles</option>
                </select>
                <button className="Search-Submit" onClick={handleSearch}>Search</button>
            </div>
            <div className="Search-Error">
                {zipcodeError && <p>{zipcodeError}</p>}
                {radiusError && <p>{radiusError}</p>}
            </div>
        </div>
    );
};

export default Search;
