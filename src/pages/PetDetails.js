import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const PetDetails = ({ isAuthenticated }) => {
    const { id } = useParams();
    const [petInfo, setPetInfo] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [userFavoritePets, setUserFavoritePets] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [limitReached, setLimitReached] = useState(false);

    const REACT_APP_BACKEND = process.env.REACT_APP_BACKEND;

    useEffect(() => {
        const fetchPetInfo = () => {
            setIsLoading(true);
            axios
                .get(`${REACT_APP_BACKEND}/id?id=${id}`)
                .then((res) => {
                    console.log("response:", res.data);
                    const petData = res.data;
                    setPetInfo(petData);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('Error fetching pet info:', err);
                    setIsLoading(false);
                })
        };

        fetchPetInfo();
    }, [REACT_APP_BACKEND, id]);


    useEffect(() => {
        if (isAuthenticated) {
            const fetchUserFavoritePets = () => {
                const access_token = localStorage.getItem("access_token");
                axios
                    .get(`${REACT_APP_BACKEND}/favorites`, {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            const favoritePets = res.data.favorite_pets;
                            setUserFavoritePets(favoritePets);
                            console.log(favoritePets)
                            const isPetFavorite = favoritePets.includes(petInfo.id);
                            console.log(isPetFavorite)
                            setIsFavorite(isPetFavorite);
                            setIsLoading(false);
                        }
                    })
                    .catch((err) => {
                        console.error("Error fetching user's favorite pets:", err);
                        setIsLoading(false);
                    })
            };

            fetchUserFavoritePets();
        }
    }, [REACT_APP_BACKEND, isAuthenticated, petInfo]);



    const handleFavorite = () => {
        const access_token = localStorage.getItem("access_token");

        if (!isAuthenticated) {
            navigate(`/login?redirect=/pet/${id}`);
            console.log(isAuthenticated)
            return;
        }

        console.log(isFavorite)
        console.log(petInfo.id)
        console.log(petInfo.id)
        console.log(userFavoritePets)

        if (!isFavorite) {
            if (userFavoritePets.length > 24) {
                setLimitReached(true);
                return;
            }

            axios
                .post(
                    `${REACT_APP_BACKEND}/favorites`,
                    { pet_id: petInfo.id },
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data.message);
                    setIsFavorite(true);
                    console.log("isFavorite after update:", !isFavorite);
                })
                .catch((err) => {
                    console.log("Error handling favorite status:", err);
                })
        } else {
            axios
                .delete(
                    `${REACT_APP_BACKEND}/favorites`,
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                        data: { pet_id: petInfo.id },
                    }
                )
                .then((res) => {
                    console.log(res.data.message);
                    setIsFavorite(false)
                    console.log("isFavorite after update:", !isFavorite);
                })
                .catch((err) => {
                    console.log("Error handling favorite status:", err);
                });
        }
    };

    return (
        <div className="PetDetails-Page">
            {isLoading === true ? (
                <p className="PetDetails-Loading" >Loading pet details...</p>
            ) : petInfo ? (
                <div>
                    <h2 className="PetDetails-Title">Meet {petInfo.name}</h2>
                    <div className="PetDetails-Content">
                        <img className="PetDetails-Img" src={petInfo.picture} alt={petInfo.name} />
                        <div className="PetDetails-Info">
                            <p className="PetDetails-Name">{petInfo.name}</p>
                            <p className="PetDetails-Age">{petInfo.age}</p>
                            <p className="PetDetails-Sex">{petInfo.sex}</p>
                            <p className="PetDetails-Desciption">{petInfo.description}</p>
                            <a href={petInfo.url} target="_blank" rel="noreferrer">Click here to learn more about {petInfo.name}!</a>
                        </div>
                    </div>
                    <div className="PetDetails-Fav-Button">
                        <button
                            className={isFavorite ? "unfavorite-button" : "favorite-button"}
                            onClick={handleFavorite}>
                            {isFavorite ? "Unfavorite" : "Favorite"}
                        </button>
                        {limitReached && <p className="PetDetails-Limit">You reached your favorite pet limit of 25.</p>}
                    </div>
                </div>
            ) : (
                isLoading === false && !petInfo && (
                    <div className="PetDetails-Loading">No Pet details Found</div>
                )
            )}
        </div>
    );

}

export default PetDetails;

