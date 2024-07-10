import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import '../assest/style.css'
import axios from 'axios';
import History from './History';

const { REACT_APP_API } = process.env;
const Googlemap = () => {
  const  API_KEY  = ''
  const token = localStorage.getItem('accessToken')
  const id = localStorage.getItem('id')
  const [src, setsrc] = useState()
  const [lat, setlat] = useState()
  const [long, setlong] = useState()
  const [places, setplaces] = useState([])
  const [history, sethistory] = useState([])
  useEffect(() => {
    setsrc(`https://www.google.com/maps/embed/v1/place?q=${lat},${long}&key=${API_KEY}`)
gethistoryById()
  }, [lat, long])


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setlat(position?.coords?.latitude);
        setlong(position?.coords?.longitude)
        console.log(lat, long);
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const handlePlaceSelect = async (place) => {
    console.log(place);
  
    try {
      const results = await geocodeByPlaceId((place.value.place_id ? place.value.place_id : place).toString());
      const latt = results[0].geometry.location.lat();
      setlat(latt);
      const lng = results[0].geometry.location.lng();
      setlong(lng);
      await setplaces(place); 
      await handleHistory(); 
    } catch (error) {
      console.error('Error handling place:', error);
    }
  };

  
  const handleHistory = async () => {
    try {
      const response = await axios.post(`${REACT_APP_API}/users/addhistory`, {
        place: places, 
        id: localStorage.getItem('id'),
      });
  
      console.log(response.data);
      gethistoryById()
    } catch (error) {
      console.error('Error adding history:', error);
    }
  };
  
  const gethistoryById =async()=>{
    await axios({
      url: REACT_APP_API + `/users/get-history/${id}`,
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    ).then((res) => {
      console.log(
        res.data
      );
      sethistory(res.data.data); 

    }).catch((err) => {
      console.log(err);
    })
  }
 
  return (
    <div>
     <div className="d-flex">
        {history?.length > 0 &&
        
       <div className='col-3 history'>
        <h4>History</h4>
        {history?.map((obj,index)=>{
            return(
                <div className='raw d-flex'>
                    <div className="col-10" style={{cursor:'pointer'}}>
        {obj?.place[0]?.label}
      </div>
      {obj?.place[0]?.label && 
      <div className="col-2">
      <i class="fa-solid fa-xmark" ></i>
      </div> 
      }
                </div>
            )
        })}
      </div>
        }
      <div className='searchbox'>
        <GooglePlacesAutocomplete
          apiKey={API_KEY}
          selectProps={{
            placeholder: 'Search Location',
            onChange: handlePlaceSelect,
            
          }}


        />
      </div>
     </div>
     
      <iframe
        className='map'
        title="Google Maps"
        width="100%"
        height="800"
        frameBorder="0"
        style={{ border: 0 }}
        src={src}

      />


    </div>
  );
}

export default Googlemap
