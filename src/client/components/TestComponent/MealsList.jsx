import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Meal from "../../MealComponents/Meal";

function MealsList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('/api/meals');
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="meals-list">
      {meals.map((meal, index) => (
        <div key={index}>
          <Meal meal={meal} />
          {index === meals.length - 1 && ( 
            <Link to={`/meals/${meal.id}`}>
              <p>See Details...</p>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default MealsList;
