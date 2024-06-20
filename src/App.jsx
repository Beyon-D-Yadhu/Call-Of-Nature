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

    // console.log('geoLocation = ',dataa)
    const {lat,lon} = dataa[0]
    console.log('lat=',lat,' lon=',lon)
    setCoordinates({lat,lon})

    console.log('coordinates = ',coordinates)
    getData(lat,lon)
  }

  const API_key = import.meta.env.VITE_API_KEY
  // const api_link = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_key}`
  function getData(lat,lon){
  const api_link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
    axios.get(api_link)
    .then((res)=>{
      console.log(res)
      setData(res.data)
    })
    .catch((err)=>{
      console.error(err);
    })
  }
// useEffect(()=>{
//   console.log('data = ',data)
// },[data])

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
            <p>{data.name || "Hi there"}</p>
          </div>
        <div className="temp">
        {data.main?<h1>{data.main.temp}'F</h1>:<h1>How is the weather today</h1>}
          
        </div>
        <div className="description">
         {data.weather? <p>{data.weather[0].main}</p> : null}
        </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main?<p>{data.main.feels_like}'F</p>:null}
            <p>feels like</p>
          </div>
          <div className="humidity">
          {data.main?<p>{data.main.humidity}%</p>:null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind?<p>{data.wind.speed}MPH</p>:null}

            <p>wind speed</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
