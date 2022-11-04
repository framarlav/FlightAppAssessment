import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn
} from 'mdb-react-ui-kit';
import styles from './Card.modules.css';

export default function Card(props){
  if(typeof props.props!="undefined"){
    props = props.props[0];
  return (
    <MDBCard styles={styles} alignment='center'>
    <MDBCardHeader>Vuelo nº {props.airline} {props.id} </MDBCardHeader>
    <MDBCardBody>
      <MDBCardTitle>{props.origin + " - " + props.destination}</MDBCardTitle>
      <MDBCardText>Flight from {props.origin} to {props.destination}.</MDBCardText>
      <MDBCardText>Price with your conditions {props.precio}</MDBCardText>
      <MDBBtn href='#' className="w-full h-12 font-bold text-3xl uppercase rounded-lg bg-green-100 hover:bg-white">Book Flight!</MDBBtn>
    </MDBCardBody>
    <MDBCardFooter className='text-muted'>Free Seats: {props.numAsientos}</MDBCardFooter>
  </MDBCard>
  );
}else{
  return (
    null
  );
}
}

