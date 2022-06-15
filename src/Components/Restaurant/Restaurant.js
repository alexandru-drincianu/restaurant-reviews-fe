import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Header from "./Header";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const Column = styled.div`
  background: #fff;
  max-width: 50%;
  width: 50%;
  float: left;
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &:last-child {
    background: black;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

const Main = styled.div`
  padding-left: 60px;
`;

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

  const handleChange = (e) => {
    setReview(Object.assign({}, review, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const restaurant_id = restaurant.data.id;
    axios
      .post("http://localhost:3000/api/reviews", { review, restaurant_id })
      .then((resp) => {
        const included = [...restaurant.included, resp.data];
        setRestaurant({ ...restaurant, included });
        setReview({ title: "", description: "", score: 0 });
      })
      .catch((resp) => {});
  };

  const setRating = (score, e) => {
    e.preventDefault();

    setReview({ ...review, score });
  };

  return (
    <Wrapper>
      {loaded && (
        <Fragment>
          <Column>
            <Main>
              <Header
                attributes={restaurant.data.attributes}
                reviews={restaurant.included}
              />
            </Main>
            <div className="reviews"></div>
          </Column>
          <Column>
            <ReviewForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
              attributes={restaurant.data.attributes}
              review={review}
            />
          </Column>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Restaurant;
