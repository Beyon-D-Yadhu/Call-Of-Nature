import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });
  const [error,setError] = useState('')
 
  async function findLocation(){
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
    const dataa = await response.json();

    console.log('geoLocation = ',dataa)
    const {lat,lon} = dataa[0]
    setCoordinates({lat,lon})
  }

  const API_key = import.meta.env.VITE_API_KEY
  const api_link = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_key}`
  // const api_link = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_key}`
  function getData(){
    axios.get(api_link)
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err)=>{
      console.error(err);
    })
  }
  useEffect(()=>{
    getData();
  },[])

  // console.log(navigator.geolocation)

  return (
    <>
    <div className='app'>
      <div className="search">
        <div className="inside">
          <input type="text"
          name="" id="" 
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          placeholder='Enter Location'
          />
          <button onClick={findLocation}>Search</button>
        </div>
      </div>
      <div className="container" >
        <div className="top">
          <div className="location">
            <p>Kanodi</p>
          </div>
        <div className="temp">
          <h1>60'F</h1>
        </div>
        <div className="description">
          <p>Clouds</p>
        </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>60'F</p>
            <p>feels like</p>
          </div>
          <div className="humidity">
            <p>20%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p>120MPH</p>
            <p>wind speed</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
