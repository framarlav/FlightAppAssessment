import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
} from "mdb-react-ui-kit";
import styles from "./Card.modules.css";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    navigate("/booking", {state:props});
  };

  if (typeof props.props != "undefined") {
    props = props.props;
    console.log(props)
    return (
      <MDBCard styles={styles} alignment="center" style={{ padding: 20 }}>
        <MDBCardHeader
          className="uppercase font-bold text-xl text-center bg-blue-100"
          style={{ padding: 10 }}
        >
          Flight nº {props.id} {props.airline}
        </MDBCardHeader>
        <MDBCardBody>
          <MDBCardText
            className="uppercase font-bold text-l text-center"
            style={{ marginTop: 10 }}
          >
            Flight from {props.origin} to {props.destination}.
          </MDBCardText>
          <MDBCardText
            className="flex justify-center items-center"
            style={{ marginBottom: 10 }}
          >
            Price with your conditions:
            <p className="uppercase font-bold text-xl text-center">
              {" "}
              {props.precio}€
            </p>
          </MDBCardText>
          <MDBBtn
            onClick={handleSubmit}
            className="w-full h-12 font-bold text-3xl uppercase rounded-lg bg-green-100 hover:bg-white"
          >
            Book Flight!
          </MDBBtn>
        </MDBCardBody>
        <MDBCardFooter className="text-muted">
          Free Seats: {props.numAsientos}
        </MDBCardFooter>
      </MDBCard>
    );
  } else {
    return <p>No available flights</p>;
  }
}
