import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Booking from "./componentes/Booking";
import TripList from "./componentes/TripList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingData from "./componentes/BookingData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Booking />}></Route>
        <Route path="/trips" element={<TripList/>}></Route> 
        <Route path="/booking" element={<BookingData/>}></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
