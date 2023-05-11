import { useState, useEffect } from "react";
import Weathers from "./components/Weathers";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {

  //Estado de setear la data de la api
  const [data, setData] = useState();
  // Estado para setear la ciudad a buscar
  const [cityOut, setCityOut] = useState("");

  // function para obtener los datos desde la api del clima
  // usando las coordenadas iniciales o la ciudad a buscar
  function getDataApi(pos) {
    const apiKey = "e4ca6c2ed7034356b50bface8b98779b";
    let api = "https://api.openweathermap.org/data/2.5/weather";
    (pos.coords === undefined ) ? api = `${api}?q=${pos}&appid=${apiKey}&lang=es`: 
    api = `${api}?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${apiKey}&lang=es`;
    axios.get(api)
      .then((res) => {
        setData({
          data: res.data,
          grades: {
            celsius: res.data.main.temp - 273.15,
            farenheit: 1.8 * (res.data.main.temp - 273) + 32,
          },
        });
      })
      .catch((err) => console.error(err));
  }

  //fucntion para obtener las coordenadas de tu ubicacion 
  const getCoordinates = async (data = null) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (data) {
      getDataApi(data);
    } else {
      navigator.geolocation.getCurrentPosition(
        getDataApi,
        (err) => {
          console.error(err);
        },
        options
      );
    }
  };

  //fucntion que recibe el dato de retorno desde el componente navbar, 
  // el dato es el nombre de la ciudad y setea el nombre dela ciudad en
  // su estado correspondiente
  const getCityOut = (a) => {
    setCityOut(a);
  };

  //  useffect para obtener datos cada vez que se setea el estado de la ciudad a buscar
  useEffect(() => {
    getCoordinates(cityOut);
  }, [cityOut]);

  // use effect inicializador que obtiene las coordenadas y dato de la api de tu ciudad local
  useEffect(() => {
    getCoordinates();
  }, []);

  return (
    <>
      {data ? (
        <div className="container">
          <Navbar valueOut={getCityOut} />
          <div>
            <Weathers data={data} />
          </div>
        </div>
      ) : (
        <div className="center-body">
          <div className="loader-circle-11">
            <div className="arc"></div>
            <div className="arc"></div>
            <div className="arc"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
