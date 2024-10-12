// src/components/About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our Food Delivery App! We are committed to bringing you delicious food from the best restaurants in your area, straight to your door. Our mission is to make food delivery fast, easy, and convenient, so you can enjoy your favorite meals without any hassle.
      </p>
      
      <h2>What We Offer</h2>
      <ul>
        <li>Wide selection of local and popular restaurants</li>
        <li>Easy-to-use platform with seamless ordering</li>
        <li>Real-time order tracking</li>
        <li>Exclusive deals and discounts</li>
        <li>Fast and reliable delivery service</li>
      </ul>

      <h2>Our Commitment</h2>
      <p>
        We are dedicated to providing you with a top-notch experience. Our team works hard to ensure that your order arrives on time and is prepared just the way you like it. Thank you for choosing us as your food delivery service!
      </p>

      <p>
        For any inquiries or feedback, feel free to contact us at <a href="mailto:support@fooddelivery.com">support@fooddelivery.com</a>. We value your input and are always looking to improve our service.
      </p>
    </div>
  );
};

export default About;
