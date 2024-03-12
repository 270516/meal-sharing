import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';
import './MealDetails.css'

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);

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

    const fetchReviewDetails = async () => {
      try {
        const response = await fetch(`/api/reviews/meals/${id}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error in fetching reviews:', error);
      }
    };

    fetchReviewDetails();
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
        alert('Reservation successfully created!');
      } else {
        alert('Failed to create reservation. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
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
          <label htmlFor="guests">Number of Guests:</label>
          <div className="guests-input">
            <button type="button" onClick={decrementGuests}>-</button>
            <input type="number" id="guests" name="guests" min="1" max="10" defaultValue="1" required />
            <button type="button" onClick={incrementGuests}>+</button>
          </div>
        </div>
        <div className="form-group">
          <button type="submit">Book Seat</button>
        </div>
      </form>

      <hr/>

      <ReviewList reviews={reviews} />

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
          <label htmlFor="guests">Comments</label>
          <textarea className="guests-input"/>
          <div className="guests-input" id="guests" name="guests" rows="4" cols="50">
          </div>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>

    </div>
  );
};
const decrementGuests = () => {
  const guestsInput = document.getElementById('guests');
  const currentValue = parseInt(guestsInput.value);
  if (currentValue > 1) {
    guestsInput.value = currentValue - 1;
  }
};

const incrementGuests = () => {
  const guestsInput = document.getElementById('guests');
  const currentValue = parseInt(guestsInput.value);
  if (currentValue < 10) {
    guestsInput.value = currentValue + 1;
  }
};

export default MealDetails;