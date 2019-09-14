import React from 'react'
import Hero from '../component/Hero'
import Banner from '../component/Banner'
import { Link } from 'react-router-dom'
import Services from '../component/Services'
import FeaturedRooms from '../component/FeaturedRooms'
import StyleHero from '../component/StyledHero'
const Home = () => {
    return (
        <>
            <Hero >
                <Banner title="Luxurious Rooms"
                    subtitle="Deluxe Rooms starting at 15.000 da" >
                    <Link to="/rooms" className="btn-primary">
                        Our Rooms
               </Link>
                </Banner>
            </Hero>
            <Services />
            <FeaturedRooms />
        </>
    )
}

export default Home
