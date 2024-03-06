import React, { useState, useEffect } from "react";
import Meal from "../../Meal Components/Meal";

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("/api/meals");
      const data = await response.json();
      setMeals(data);
    };

    fetchMeals();
  }, []);

  return (
    <div className="meals-grid">
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </div>
  );
};

export default MealsList;