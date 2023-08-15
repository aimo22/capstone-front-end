import React, { useEffect, useState } from "react";
import axios from "axios";
import PetList from "../components/PetList";
import { useNavigate } from "react-router-dom";

const ViewFavorites = ({ isAuthenticated }) => {
    const [favoritePets, setFavoritePets] = useState([]);
    const [favoritePetResults, setFavoritePetResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const REACT_APP_BACKEND = process.env.REACT_APP_BACKEND;


    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                const token = localStorage.getItem('access_token');
                if (token) {
                    axios
                        .get(`${REACT_APP_BACKEND}/favorites`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((res) => {
                            setFavoritePets(res.data.favorite_pets);
                            console.log(res.data);
                        })
                        .catch((err) => {
                            console.log('Error fetching favorites id:', err);
                            setIsLoading(false);
                        })
                }
            }
        };

        fetchData();
    }, [REACT_APP_BACKEND, isAuthenticated]);


    useEffect(() => {

        console.log(favoritePets)

        if (favoritePets.length > 0) {

            const petIds = favoritePets.join(",");
            console.log(petIds)
            console.log(favoritePets)

            axios
                .get(`${REACT_APP_BACKEND}/fav_id?ids=` + petIds)

                .then((res) => {
                    console.log(res.data)
                    setFavoritePetResults(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('Error fetching favorite pets', err);
                })
        }
    }, [REACT_APP_BACKEND, favoritePets]);


    const paginatedItems = favoritePetResults.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(favoritePetResults.length / itemsPerPage);


    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        window.scrollTo(0, 0);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleLoginFromFavorites = async () => {
        navigate(`/login?redirect=/favorites`);
    };
    console.log(isAuthenticated)


    return (
        <div className="Favorite-Page">
            <h2>Favorite Pets</h2>
            {isAuthenticated ? (
                <div>
                    {isLoading ? (
                        <div className="Favorite-Loading">Loading...</div>
                    ) : (
                        <div>
                            {favoritePetResults.length > 0 ? (
                                <div>
                                    <PetList petCardData={paginatedItems} />
                                    {favoritePetResults.length > itemsPerPage && (
                                        <div className="Favorite-Pagination">
                                            <button
                                                onClick={handlePrevPage}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </button>
                                            <span>
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <button
                                                onClick={handleNextPage}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="Favorite-NoneSaved">No pets saved yet</p>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="Favorite-Login">
                    <p>Log in to start saving your favorite pets</p>
                    <button onClick={handleLoginFromFavorites}>Login</button>
                </div>
            )}
        </div>
    );
};

export default ViewFavorites;
