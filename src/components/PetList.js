import React from "react";
import PropTypes from "prop-types";
import PetCard from "./PetCards";
import { Link } from "react-router-dom";

const PetList = (props) => {
    console.log(props.petCardData);
    return (
        <div className="PetList">
            {props.petCardData.map((petCard) => (
                <Link to={`/pet/${petCard.id}`}>
                    <PetCard
                        key={petCard.id}
                        id={petCard.id}
                        name={petCard.name}
                        age={petCard.age}
                        picture={petCard.picture}
                    />
                </Link>
            ))}
        </div>
    )
}

PetList.propTypes = {
    petCardData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            age: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired
        })
    )
}


export default PetList;