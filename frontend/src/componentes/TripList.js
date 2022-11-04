import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Card from './Card';


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
    
    const [props, setProps] = useState();
    const [newPrecio, setNewPrecio] = useState();
    useEffect(() => {
        api();
        //api2();
      }, []);

    const api = async () => {
        let res = await fetch("http://localhost:8080/flight/"+ location.state.departureDate + "/" + location.state.departure + "/" + location.state.arrival);
        let data = await res.json();
        if(data!=undefined){
            setProps(data);
        }
    }; 
    const variables = [80, Number(location.state.children0), Number(location.state.children2), Number(location.state.children9)];
    useEffect(() => {
        async function setNewMoney() {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(variables)
            };
            const response = await fetch('http://localhost:8081/price', requestOptions);
            const data = await response.json();
            if(typeof data!="undefined"){
                setNewPrecio(JSON.parse(data));
                console.log(data);
            }
        }
       setNewMoney();
    }, []);

    console.log(newPrecio);

    return(
        <div>
            <Card props={props}/>
        </div>
    )
}
export default TripList;