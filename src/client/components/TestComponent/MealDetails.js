import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MealDetails = () => {
  const { id } = useParams(); 
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`/api/meals/${id}`);
        const data = await response.json();
        setMeal(data);
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    };

    fetchMealDetails();
  }, [id]);

  const handleReservationSubmit = (event) => {
    event.preventDefault();
    // Handle form submission to create a new reservation
    // You can use fetch or any other method to send the reservation data to the server
  };

  if (!meal) {
    return <p>Loading...</p>; // Render loading indicator while fetching meal details
  }

  return (
    <div>
      <h2>{meal.title}</h2>
      <p>Description: {meal.description}</p>
      <p>Price: {meal.price}</p>

      {/* Reservation form */}
      <form onSubmit={handleReservationSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <button type="submit">Book Seat</button>
      </form>
    </div>
  );
};

export default MealDetails;
