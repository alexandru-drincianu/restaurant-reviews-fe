import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useParams } from "react-router-dom";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState({});
  const [review, setReview] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { slug } = useParams();
  console.log(slug);
  useEffect(() => {
    const url = `http://localhost:3000/api/restaurants/${slug}`;
    axios
      .get(url)
      .then((resp) => {
        setRestaurant(resp.data);
        setLoaded(true);
      })
      .catch((resp) => console.log(resp));
  }, [slug]);

  return (
    <div className="wrapper">
      <div className="column">
        {loaded && (
          <Header
            attributes={restaurant.data.attributes}
            reviews={restaurant.included}
          />
        )}
        <div className="reviews"></div>
      </div>
      <div className="column">
        <div className="review-form">Review Form</div>
      </div>
    </div>
  );
};

export default Restaurant;
