import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Payment from "./Payment";

const BookingData = () => {
  const [formData, setFormData] = useState({
    //Objecto Booking que se le va a pasar a BookingAPI
    firstName: "",
    lastName: "",
    identification: "",
    nationality: "",
    age: 0,
    price: 750.0,
    id_flight: 10,
  });
  const location = useLocation();

  const changeSeats = () => {
    fetch("http://localhost:8080/flight/reserva/" + formData.id_flight)
      .then((response) => response.text())
      .then((result) => (formData.price = result))
      .catch((error) => console.log("error", error));
  };

  return (
    <React.Fragment>
      <section>
        <form
          onSubmit={(event) => {
            console.log(formData);
            changeSeats();
          }}
        >
          <div className="bg-white w-auto h-auto pb-10 mt-5 mx-5 px-5 rounded-lg sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto">
            {/* header section */}
            <div className="h-24 flex justify-center items-center shadow bg-blue-100 ">
              <p className="uppercase font-bold text-4xl text-center">
                Booking information
              </p>
            </div>
            <p className="h-24 flex justify-center text-xl items-center">
              Insert customer information
            </p>

            {/* flight section */}

            <div
              className="justify-center items-center shadow"
              style={{
                width: "100%",
                alignItems: "center",
                flex: 1,
                marginBottom: 20,
                padding: 30,
              }}
            >
              <p className="uppercase font-bold text-2xl text-center">
                flight booking app
              </p>
              <div style={{ width: "100%" }}>
                <div className="flex space-x-8 items-center  mt-5">
                  <div className="justify-center items-center space-x-2">
                    <p className="font-bold uppercase">Origin</p>
                    <p className="uppercase">{location.state.origin}</p>
                  </div>
                  <div className="justify-center items-center space-x-2">
                    <p className="font-bold uppercase">Destination</p>
                    <p className="uppercase">{location.state.destination}</p>
                  </div>
                  <div className="justify-center items-center space-x-2">
                    <p className="font-bold uppercase">Airline</p>
                    <p className="uppercase">{location.state.airline}</p>
                  </div>
                  <div className="justify-center items-center space-x-2">
                    <p className="font-bold uppercase">Date</p>
                    <p className="uppercase">
                      {location.state.date[2] +
                        "/" +
                        location.state.date[1] +
                        "/" +
                        location.state.date[0]}
                    </p>
                  </div>
                  <div className="justify-center items-center space-x-2">
                    <p className="font-bold uppercase">Price</p>
                    <p className="uppercase">{location.state.precio}€</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="grid justify-center space-y-5 bg-indigo-50 pb-10">
                <div>
                  <div className="flex space-x-8 mt-5">
                    <div className="flex items-center space-x-2">
                      <p>First name</p>
                      <input
                        type="text"
                        onChange={(e) => {
                          formData.firstName = e.target.value;
                          console.log(formData);
                          console.log();
                        }}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <p>Last name</p>
                      <input
                        type="text"
                        onChange={(e) => {
                          formData.lastName = e.target.value;
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-8 mt-5">
                    <div className="flex items-center space-x-2">
                      <p>Identification</p>
                      <input
                        type="text"
                        onChange={(e) => {
                          formData.identification = e.target.value;
                        }}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <p>Nationality</p>
                      <input
                        type="text"
                        onChange={(e) => {
                          formData.nationality = e.target.value;
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="flex space-x-8 mt-5">
                      <p className="flex items-center space-x-2">Birthdate</p>
                      <input
                        type="date"
                        onChange={(e) => {
                          formData.age = calculateAge(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {/* <Link to="/trips" > */}
                <input
                  type="submit"
                  value="Book flight"
                  className="w-full h-16 font-bold text-3xl uppercase rounded-lg bg-green-100 hover:bg-white"
                />
                {/* </Link> */}
              </div>
            </div>
          </div>
        </form>
        <Payment />
      </section>
    </React.Fragment>
  );

  function calculateAge(birthday) {
    var birthday_arr = birthday.split("-");
    var birthday_date = new Date(
      birthday_arr[0],
      birthday_arr[1] - 1,
      birthday_arr[2]
    );
    var ageDifMs = Date.now() - birthday_date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
};

export default BookingData;
