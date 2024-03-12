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

  const handleReservationSubmit = async (event) => {
    event.preventDefault();

    // Extract form data
    const formData = {
      name: event.target.name.value,
      phone: event.target.phone.value,
      email: event.target.email.value
    };

    try {
      // Send POST request to create reservation
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Reservation successfully created
        alert('Reservation successfully created!');
        // Optionally, you can redirect the user to a success page or do something else
      } else {
        // If the request failed, show an error message
        alert('Failed to create reservation. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      // Show an error message if there's an error with the request
      alert('An error occurred while creating the reservation. Please try again later.');
    }
  };

  if (!meal) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      <h2>{meal.title}</h2>
      <p>Description: {meal.description}</p>
      <p>Price: {meal.price}</p>

      {/* Reservation form */}
      <form onSubmit={handleReservationSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <button type="submit">Book Seat</button>
        </div>
      </form>
    </div>
  );
};

export default MealDetails;