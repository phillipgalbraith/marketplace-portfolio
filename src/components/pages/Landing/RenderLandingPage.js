import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RenderLandingPage(props) {
  return (
    <div className="landing-page">
      <div className="top-content image">
        <div className="shop-cta">
          <h2>
            Bring the markets directly to you!
          </h2>
          <h3>Where local products thrive with competitive prices.</h3>
          <div>
            <button>
              <Link to="/shop">Shop</Link>
            </button>
            <button>
              <Link to="/login">Owner Login</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RenderLandingPage;
