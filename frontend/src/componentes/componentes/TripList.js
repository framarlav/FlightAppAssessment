import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Card from "./Card";

const TripList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const tripType = searchParams.get("tripType");
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
  const [props, setProps] = useState(
    []
    // {
    //   id: 116,
    //   airline: "Ryanair",
    //   date: [2022-12-12],
    //   origin: "Madrid",
    //   destination: "Berlin",
    //   luggage: true,
    //   numAsientos: 150,
    //   precio: 80,
    //   scales: null,
    // }
  );

  const [array, setArray] = useState(["AA", "BB"]);
  const [newPrecio, setNewPrecio] = useState();
  useEffect(() => {
    api();
    //api2();
  }, []);

  const api = async () => {
    let res = await fetch(
      "http://localhost:8080/flight/" +
        location.state.departureDate +
        "/" +
        location.state.departure +
        "/" +
        location.state.arrival
    );
    let data = await res.json();
    if (data != undefined) {
      console.log(data);
      setProps(data);
      console.log(props);
    }
  };
  const variable = [
    80,
    Number(location.state.children0),
    Number(location.state.children2),
    Number(location.state.children9),
  ];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const url =
    "http://localhost:8081/price/" +
    variable[0] +
    "/" +
    variable[1] +
    "/" +
    variable[2] +
    "/" +
    variable[3];
  if (typeof props != "undefined") {
    fetch(url)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        console.log(props); 
        setNewPrecio(result);})
      .catch((error) => console.log("error", error));

    // //props.precio = newPrecio;
    // console.log(newPrecio);
    // props[0].precio = newPrecio;
    props.map((i)=>{i.precio=newPrecio});

    // const variables = [80, Number(location.state.children0), Number(location.state.children2), Number(location.state.children9)];
    // useEffect(() => {
    //     async function setNewMoney() {
    //         const requestOptions = {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(variables)
    //         };
    //         const response = await fetch('http://localhost:8081/price', requestOptions);
    //         const data = await response.json();
    //         if(typeof data!="undefined"){
    //             setNewPrecio(JSON.parse(data));
    //             console.log(data);
    //         }
    //     }
    //    setNewMoney();
    // }, []);

    return (
      <div className="bg-white w-auto h-auto pb-10 mt-5 mx-5 px-5 rounded-lg sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto">
        {/* header section */}
        <div className="h-24 flex justify-center items-center shadow ">
          <p className="uppercase font-bold text-4xl text-center">
            Available Flights
          </p>
        </div>
        <div className="flex justify-center items-center shadow ">
          {
            props.length!=0?props.map((i) => (
              <Card props={i} />
            )):(<p>No available trips</p>)
          }
        </div>
      </div>
    );
  }
};
export default TripList;
