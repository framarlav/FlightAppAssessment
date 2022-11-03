import React, { useState } from "react";

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

  return (
    <React.Fragment>
      <section>
        <form
          onSubmit={(event) => {
            console.log(formData);
          }}
        >
          <div className="bg-white w-auto h-auto pb-10 mt-5 mx-5 px-5 rounded-lg sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto">
            {/* header section */}
            <div className="h-24 flex justify-center items-center shadow ">
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
                    <p className="uppercase">Sevilla</p>
                  </div>

                  <div className="justify-center items-center space-x-2">
                    <p className="font-bold uppercase">Destination</p>
                    <p className="uppercase">Madrid</p>
                  </div>
                  <div className="justify-center items-center space-x-2">
                    <p className="font-bold uppercase">Number of tickets</p>
                    <p className="uppercase">2</p>
                  </div>
                  <div className="justify-center items-center space-x-2">
                    <p className="font-bold uppercase">Price</p>
                    <p className="uppercase">750.0€</p>
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
      </section>
    </React.Fragment>
  );

  function getEdad(dateString) {
    let hoy = new Date()
    let fechaNacimiento = new Date(dateString)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--
    }
    return edad
  }
  function calcular_edad(fecha){

    //calculo la fecha de hoy
    var hoy=new Date()
    //alert(hoy)

    //calculo la fecha que recibo
    //La descompongo en un array
    var array_fecha = fecha.split("-")
    //si el array no tiene tres partes, la fecha es incorrecta
    if (array_fecha.length!=3)
       return false

    //compruebo que los ano, mes, dia son correctos
    var ano
    ano = parseInt(array_fecha[0]);
    if (isNaN(ano))
       return false

    var mes
    mes = parseInt(array_fecha[1]);
    if (isNaN(mes))
       return false

    var dia
    dia = parseInt(array_fecha[2]);
    if (isNaN(dia))
       return false


    //si el año de la fecha que recibo solo tiene 2 cifras hay que cambiarlo a 4
    if (ano<=99)
       ano +=1900

    //resto los años de las dos fechas
    var edad=hoy.getYear()- ano - 1; //-1 porque no se si ha cumplido años ya este año

    //si resto los meses y me da menor que 0 entonces no ha cumplido años. Si da mayor si ha cumplido
    if (hoy.getMonth() + 1 - mes < 0) //+ 1 porque los meses empiezan en 0
       return edad
    if (hoy.getMonth() + 1 - mes > 0)
       return edad+1

    //entonces es que eran iguales. miro los dias
    //si resto los dias y me da menor que 0 entonces no ha cumplido años. Si da mayor o igual si ha cumplido
    if (hoy.getUTCDate() - dia >= 0)
       return edad + 1

    return edad
}
function calculateAge(birthday) {
    var birthday_arr = birthday.split("-");
    var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
    var ageDifMs = Date.now() - birthday_date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
};

export default BookingData;
