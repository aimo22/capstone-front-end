import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PetList from "../components/PetList";
import axios from "axios";


const SearchResults = () => {
    const { zipcode: initialZipcode, radius: initialRadius } = useParams();
    const [currentZipcode, setCurrentZipcode] = useState(initialZipcode);
    const [currentRadius, setCurrentRadius] = useState(initialRadius);

    console.log(currentZipcode)
    console.log(currentRadius)

    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);

    const [searchResults, setSearchResults] = useState([]);

    const [speciesFilter, setSpeciesFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [zipcode, setNewZipcode] = useState(initialZipcode);
    const [radius, setNewRadius] = useState(initialRadius);
    const [zipcodeError, setZipcodeError] = useState('');
    const [radiusError, setRadiusError] = useState('');
    const navigate = useNavigate();

    const REACT_APP_BACKEND = process.env.REACT_APP_BACKEND;


    useEffect(() => {
        const fetchSearchResults = () => {
            axios
                .get(`${REACT_APP_BACKEND}/search`, {
                    params: {
                        "miles_query": currentRadius,
                        "postalcode_query": currentZipcode
                    },
                })
                .then((res) => {
                    console.log("response:", res.data);
                    setSearchResults(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log("Error fetching search results:", err);
                    setIsLoading(false);
                });
        };

        fetchSearchResults();
    }, [currentZipcode, currentRadius, REACT_APP_BACKEND]);


    const filteredResults = searchResults.filter((petCard) =>
        petCard.species.toUpperCase().includes(speciesFilter.toUpperCase())
    );

    const paginatedItems = filteredResults.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        window.scrollTo(0, 0);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleSearch = () => {
        if (zipcode.length !== 5) {
            setZipcodeError('Please input a valid 5-digit zipcode');
            return;
        }

        if (radius === '') {
            setRadiusError('Please select a radius');
            return;
        }
        setIsLoading(true);
        setCurrentZipcode(zipcode);
        setCurrentRadius(radius);
        navigate(`/search-results/${zipcode}/${radius}`);
        setRadiusError(null)
        setZipcodeError(null)
        setCurrentPage(1)

    }

    console.log("Search Results:", searchResults);

    return (
        <div className="Search-Result-Page">
            <h2 className="Search-Result-Title">Search Results</h2>
            {isLoading ? (
                <div className="Search-Result-Loading">Loading...</div>
            ) : (
                <>
                    <div className="Search-Result-Container">
                        <div className="Search-Result-Filters">
                            <select className="Search-Result-Filter" value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
                                <option value="">Pet Type</option>
                                <option value="Dog">Dogs</option>
                                <option value="Cat">Cats</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="Search-Result-Zipcode-Container">
                                <p className="Search-Result-Zipcode-Text">Zipcode:</p>
                                <input className="Search-Result-Zipcode"
                                    type="text"
                                    placeholder="Enter new zipcode"
                                    value={zipcode}
                                    onChange={(e) => setNewZipcode(e.target.value)}
                                />
                            </div>
                            <div className="Search-Result-Radius-Container">
                                <p className="Search-Result-Radius-Text">Radius:</p>
                                <select className="Search-Result-Radius" value={radius}
                                    onChange={(e) => setNewRadius(e.target.value)}
                                >
                                    <option value="">Select radius</option>
                                    <option value="5">5 miles</option>
                                    <option value="10">10 miles</option>
                                    <option value="25">25 miles</option>
                                    <option value="50">50 miles</option>
                                </select>
                            </div>
                            <button className="Search-Result-Button" onClick={handleSearch}>New Search</button>
                            {zipcodeError && <p style={{ color: 'red' }} className="Search-Error">{zipcodeError}</p>}
                            {radiusError && <p style={{ color: 'red' }} className="Search-Error">{radiusError}</p>}
                        </div>
                        <div>
                            {filteredResults.length > 0 ? (
                                <>
                                    <div className="Search-Result-Cards">
                                        <PetList petCardData={paginatedItems} />
                                    </div>
                                    {filteredResults.length > itemsPerPage && (
                                        <div className="Search-Result-Pagination">
                                            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                                Previous
                                            </button>
                                            <span>Page {currentPage} of {totalPages}</span>
                                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="Search-Result-None">No pets available, try widening your radius</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchResults;
