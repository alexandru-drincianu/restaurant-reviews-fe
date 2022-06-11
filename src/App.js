import "./App.css";
import React from "react";
import Restaurants from "./Components/Restaurants/Restaurants";
import Restaurant from "./Components/Restaurant/Restaurant";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/restaurants/:slug" element={<Restaurant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
