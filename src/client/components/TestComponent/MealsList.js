import React, { useState, useEffect } from "react";

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
    <div>
      {meals.map((meal) => (
        <div key={meal.id}>
          <h3>{meal.title}</h3>
          <p>{meal.description}</p>
          <p>Price: {meal.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MealsList;