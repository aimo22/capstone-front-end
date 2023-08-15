import React from "react";
import PropTypes from "prop-types";

const PetCard = (props) => {
    return (
        <div className="pet-card">
            <img className="pet-card-img" src={props.picture} alt={props.name} />
            <div>
                <h3 className="pet-card-name">{props.name}</h3>
                <p className="pet-card-age">Age: {props.age}</p>
            </div>
        </div>
    );
};

PetCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
};

export default PetCard;
