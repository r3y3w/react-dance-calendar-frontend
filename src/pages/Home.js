import {useState, useEffect } from 'react'
import { Card } from '../components/Card'

const Home = () => {

    const [venuecollection, setVenueCollection] = useState([])

    // Render Mongo DB collection
    useEffect(() => {
        
        fetch(`${process.env.REACT_APP_API_ENDPOINT}`)
            .then((res) => res.json())
            .then((data) => setVenueCollection(data))
            .catch((err) => console.error(err))
        console.log('Getting Data')
        console.log(venuecollection)
    }, [])

    const allVenues = venuecollection.map((venue, index) => {
        return < Card key={venue._id} venue={venue} index={index} className="venue-item"/>
    })

    return(
        <div>
        <h1>Where to Dance?</h1>
        <div className='venues'>{allVenues}</div>
        </div>
    )
}

export default Home