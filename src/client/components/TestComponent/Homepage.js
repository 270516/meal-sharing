import React from 'react';
import { Link } from 'react-router-dom';
import MealsList from './MealsList';
import Footer from './Footer'; // Import the Footer component
import './HomePage.css'; // Import CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Page Title and Subtitle */}
      <h1 className="title">Meal Sharing App</h1>
      <p className="subtitle">Help us to build a food sustainable society. We need more people like you who can save the food waste.</p>
      
      {/* Render some meals */}
      <MealsList limit={3} />

      {/* Button or link to navigate to the "/meals" page */}
      <Link to="/meals">
        <button className="view-more-btn">View More Meals</button>
      </Link>
      
      {/* Add additional elements like footer, menu, logo, etc. */}
      <Footer />
    </div>
  );
};

export default HomePage;