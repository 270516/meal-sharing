import React from "react";
import "./Meal.css";

const Meal = ({ meal }) => {
  return (
    <div className="meal-card">
      <h2>{meal.title}</h2>
      <p>{meal.description}</p>
      <p>Price: {meal.price}</p>
    </div>
  );
};

export default Meal;