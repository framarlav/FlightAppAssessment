import React, { useEffect, useState } from "react";
import { FaPlaneArrival, FaPlaneDeparture, FaChild } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";

const Booking = () => {
  // handle event
  const {
    register,
    watch,
    //handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    tripType: "",
    departure: "",
    arrival: "",
    departureDate: "",
    returnDate: "",
    adult: 1,
    children0: 0,
    children2: 0,
    children9: 0,
    airline: "",
  });

  const [searchParams, setSearchParams] = useSearchParams({ reg: register });
  const [destinationsReceived, setDestinationsReceived] = useState([]);
  const [disableReturnTrip, setDisableReturnTrip] = useState(false);
  const navigate = useNavigate();
  //const [formData, setFormData] = useState([]);

  // useEffect(() => {
  //    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  //       .then((response) => response.json())
  //       .then((data) => {
  //          console.log(data);
  //          setPosts(data);
  //       })
  //       .catch((err) => {
  //          console.log(err.message);
  //       });
  // }, activeAPI);

  const requestAvailableDestinationsByOrigin = (origin) => {
    fetch("http://127.0.0.1:8080/flights/destinations/" + origin)
      .then((response) => response.json())
      .then((data) => {
        //  console.log(data);
        setDestinationsReceived(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // handle submit
  const onSubmit = (data) => alert(JSON.stringify(data));

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    navigate("/trips", {state:formData});
  };

  console.log(formData);
  return (
    <React.Fragment>
      <section>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="bg-white w-auto h-auto pb-10 mt-5 mx-5 px-5 rounded-lg sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto">
            {
              /* header section */

              console.log(destinationsReceived)
            }
            <div className="h-24 flex justify-center items-center shadow ">
              <p className="uppercase font-bold text-4xl text-center">
                flight booking app
              </p>
            </div>

            {/* body section */}
            <div>
              <div className="grid justify-center space-y-5 bg-indigo-50 pb-10">
                <div>
                  <div className="flex space-x-8 mt-5">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        className={`w-6 h-6 ${
                          errors.tripType &&
                          " focus:border-red-500 focus:ring-red-500 border-red-500"
                        }`}
                        value="round trip"
                        {...register("tripType", {
                          required: {
                            value: true,
                            message: "Trip type is required",
                          },
                        })}
                        onClick={() => {
                          setDisableReturnTrip(false);
                          formData.tripType="round trip";
                        }}
                      />
                      <p className="text-xl font-bold uppercase">Round trip</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        className={`w-6 h-6 ${
                          errors.tripType &&
                          " focus:border-red-500 focus:ring-red-500 border-red-500"
                        }`}
                        value="one way"
                        {...register("tripType", {
                          required: {
                            value: true,
                            message: "Trip type is required",
                          },
                        })}
                        onClick={() => {
                          setDisableReturnTrip(true);
                          formData.tripType="one way";
                        }}
                      />
                      <p className="text-xl font-bold uppercase">one way</p>
                    </div>
                  </div>
                  <div>
                    {errors.tripType && (
                      <span className="text-sm text-red-500">
                        {errors.tripType.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* departure section */}
                <div>
                  <div>
                    <div className="relative">
                      <p className="font-bold text-xl uppercase">flying from</p>
                      <select
                        className={`w-full h-16 text-2xl pl-20 rounded-lg ${
                          errors.departure &&
                          " focus:border-red-500 focus:ring-red-500 border-red-500"
                        }`}
                        {...register("departure", {
                          required: {
                            value: true,
                            message: "Departure is required",
                          },
                        })}
                        onChange={(e) =>{
                          requestAvailableDestinationsByOrigin(e.target.value);
                          formData.departure=e.target.value;}
                        }
                      >
                        <option value="" selected disabled hidden>
                          --Select Airport--
                        </option>
                        <option value="Madrid"> Madrid</option>
                        <option value="Sevilla"> Sevilla</option>
                        <option value="Barcelona"> Barcelona</option>
                        <option value="Paris"> Paris</option>
                        <option value="Berlin"> Berlin</option>
                      </select>
                      <FaPlaneDeparture className="text-4xl absolute left-5 top-10 " />
                    </div>
                    <div>
                      {errors.departure && (
                        <span className="text-sm text-red-500">
                          {errors.departure.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* arrival section */}
                <div>
                  <div>
                    <div className="relative">
                      <p className="font-bold text-xl uppercase">flying to</p>
                      <select
                        className={`w-full h-16 text-2xl pl-20 rounded-lg ${
                          errors.arrival &&
                          " focus:border-red-500 focus:ring-red-500 border-red-500"
                        }`}
                        {...register("arrival", {
                          required: {
                            value: true,
                            message: "Arrival is required",
                          },
                        })}
                        onChange={(e) =>{
                          console.log(e.target.value);
                          formData.arrival=e.target.value;}
                        }
                      >
                        <option value="" selected disabled hidden>
                          --Select Airport--
                        </option>
                        {destinationsReceived.length !== 0 ? (
                          destinationsReceived.map((destination) => {
                            console.log(destination);
                            return (
                              <option value={destination}>{destination}</option>
                            );
                          })
                        ) : (
                          <option value="" selected disabled hidden>
                            No available destinations
                          </option>
                        )}
                        {/* <option value="" selected disabled hidden>
                          --Select Airport--
                        </option>
                        <option value="ENIA">
                          {" "}
                          England Newcastle International Airport
                        </option>
                        <option value="INIA">
                          {" "}
                          Italy Naples International Airport
                        </option>
                        <option value="MMA"> Malaysia Mulu Airport</option>
                        <option value="KMA"> Kenya Malindi Airport</option> */}
                      </select>
                      <FaPlaneArrival className="text-4xl absolute left-5 top-10 " />
                    </div>
                    <div>
                      {errors.arrival && (
                        <span className="text-sm text-red-500">
                          {errors.arrival.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* date section */}
                <div className="flex space-x-2">
                  {/* departure section */}
                  <div>
                    <div>
                      <div className="relative">
                        <p className="font-bold text-xl uppercase">
                          departure date
                        </p>
                        <input
                          type="date"
                          className={`w-full h-16 text-2xl rounded-lg ${
                            errors.departureDate &&
                            " focus:border-red-500 focus:ring-red-500 border-red-500"
                          }`}
                          {...register("departureDate", {
                            required: {
                              value: true,
                              message: "Departure date is required",
                            },
                          })}
                          onClick={(e) =>{
                            formData.departureDate=e.target.value;}
                          }
                        />
                      </div>
                      <div>
                        {errors.departureDate && (
                          <span className="text-sm text-red-500">
                            {errors.departureDate.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* return section */}
                  <div>
                    <div>
                      {!disableReturnTrip ? (
                        <div className="relative">
                          <p className="font-bold text-xl uppercase">
                            return date
                          </p>
                          <input
                            type="date"
                            className={`w-full h-16 text-2xl rounded-lg ${
                              errors.returnDate &&
                              " focus:border-red-500 focus:ring-red-500 border-red-500"
                            }`}
                            {...register("returnDate", {
                              required: {
                                value: true,
                                message: "Return date is required",
                              },
                            })}
                            disabled={disableReturnTrip}
                            onClick={(e) =>{
                              formData.returnDate=e.target.value;}
                            }
                          />
                        </div>
                      ) : null}
                      <div>
                        {errors.returnDate && (
                          <span className="text-sm text-red-500">
                            {errors.returnDate.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* passenger section */}
                <div className="flex space-x-2">
                  {/* adult section */}
                  <div className="w-full">
                    <div>
                      <div className="relative">
                        <p className="font-bold text-md uppercase">
                          {" "}
                          adults (18+)
                        </p>
                        <select
                          className="w-full h-16 rounded-lg text-2xl pl-20"
                          {...register("adult", {
                            required: {
                              value: true,
                              message: "Trip type is required",
                            },
                          })}
                          onChange={(e) =>{
                            formData.adult=e.target.value;}
                          }
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                        <GiPerson className="text-4xl absolute left-5 top-10 " />
                      </div>
                      {/* <div>Error</div> */}
                    </div>
                  </div>

                  {/* childrens section */}
                  <div className="w-full">
                    <div>
                      <div className="relative">
                        <p className="font-bold text-md uppercase">
                          {" "}
                          children (0-2)
                        </p>
                        <select
                          className="w-full h-16 rounded-lg text-2xl pl-20"
                          {...register("children0", {
                            required: {
                              value: true,
                              message: "Trip type is required",
                            },
                          })}
                          onChange={(e) =>{
                            formData.children0=e.target.value;}
                          }
                        >
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                        <FaChild className="text-xl absolute left-5 top-10 " />
                      </div>
                      {/* <div>Error</div> */}
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <div className="relative">
                        <p className="font-bold text-md uppercase">
                          {" "}
                          children (2-9)
                        </p>
                        <select
                          className="w-full h-16 rounded-lg text-2xl pl-20"
                          {...register("children2", {
                            required: {
                              value: true,
                              message: "Trip type is required",
                            },
                          })}
                          onChange={(e) =>{
                            formData.children2=e.target.value;}
                          }
                        >
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                        <FaChild className="text-xl absolute left-5 top-10 " />
                      </div>
                      {/* <div>Error</div> */}
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <div className="relative">
                        <p className="font-bold text-md uppercase">
                          {" "}
                          children (9{">"})
                        </p>
                        <select
                          className="w-full h-16 rounded-lg text-2xl pl-20"
                          {...register("children9", {
                            required: {
                              value: true,
                              message: "Trip type is required",
                            },
                          })}
                          onChange={(e) =>{
                            formData.children9=e.target.value;}
                          }
                        >
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                        <FaChild className="text-xl absolute left-5 top-10 " />
                      </div>
                      {/* <div>Error</div> */}
                    </div>
                  </div>
                </div>

                {/* Airline section */}
                <div className="flex space-x-2">
                  <div className="w-full">
                    <div>
                      <div>
                        <p className="font-bold text-xl uppercase"> Airline </p>
                        <select
                          className="w-full h-16 rounded-lg text-2xl pl-20"
                          {...register("airline", {
                            required: {
                              value: true,
                              message: "Trip type is required",
                            },
                          })}
                          onSelect={(e) =>{
                            formData.airline=e.target.value;}
                          }
                        >
                          <option value="">Anyone</option>
                          <option value="Iberia">Iberia</option>
                          <option value="Ryanair">Ryanair</option>
                          <option value="Easyjet">Easyjet</option>
                          <option value="Vueling">Vueling</option>
                        </select>
                      </div>
                      {/* <div>Error</div> */}
                    </div>
                  </div>
                </div>

                {/* btn section */}
                <div>
                  {/* <Link to="/trips" > */}
                    <input
                      type="submit"
                      value="Find flight"
                      className="w-full h-16 font-bold text-3xl uppercase rounded-lg bg-green-100 hover:bg-white"
                    />
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default Booking;
