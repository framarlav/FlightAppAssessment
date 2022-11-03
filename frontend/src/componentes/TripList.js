import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const TripList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    // let tripType = searchParams.get("tripType");
    // let departure = searchParams.get("departure");
    // let arrival = searchParams.get("arrival");
    // let departureDate = searchParams.get("departureDate");
    // let returnDate = searchParams.get("returnDate");
    // let adult = searchParams.get("adult");
    // let children0 = searchParams.get("children0");
    // let children2 = searchParams.get("children2");
    // let children9 = searchParams.get("children9");
    // let airline = searchParams.get("airline");

    const tripType = searchParams.get("tripType");
    console.log(location.state.arrival);


    return(
        <div>
            <p>TripList</p>
            <p>{location.state.tripType}</p>
            <p>{location.state.departure}</p>
            <p>{location.state.arrival}</p>
            <p>{location.state.departureDate}</p>
            <p>{location.state.returnDate}</p>
            <p>{location.state.adult}</p>
            <p>{location.state.children0}</p>
            <p>{location.state.children2}</p>
            <p>{location.state.children9}</p>
            <p>{location.state.airline}</p>
            {/*<p>{departure}</p>
            <p>{arrival}</p>
             <p>{departureDate}</p>
            <p>{returnDate}</p>
            <p>{adult}</p>
            <p>{children0}</p>
            <p>{children2}</p>
            <p>{children9}</p>
            <p>{airline}</p> */}
        </div>
    )
}
export default TripList;