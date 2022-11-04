import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Card from './Card';


const TripList = () => {
    const location = useLocation();
    
    const [props, setProps] = useState();
    const [newPrecio, setNewPrecio] = useState();
    useEffect(() => {
        api();
      }, []);

    const api = async () => {
        let res = await fetch("http://localhost:8080/flight/"+ location.state.departureDate + "/" + location.state.departure + "/" + location.state.arrival);
        let data = await res.json();
        if(data!=undefined){
            setProps(data);
        }
    }; 
    const variable = [80, Number(location.state.children0), Number(location.state.children2), Number(location.state.children9)];
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const url = "http://localhost:8081/price/" + variable[0] + "/" + variable[1] + "/" + variable[2] + "/" + variable[3];
    
    if(typeof props != "undefined"){
        fetch(url)
            .then(response => response.text())
            .then(result => setNewPrecio(result))
            .catch(error => console.log('error', error));

            //props.precio = newPrecio;
            console.log(newPrecio);
            props[0].precio = newPrecio;
            return(
                <div>
                    <Card props={props}/>
                </div>
            )
        }
    }
export default TripList;