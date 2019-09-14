import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Hero from '../component/Hero'
import Banner from '../component/Banner'
import { Link } from 'react-router-dom'
import { RoomContext } from '../context';
import StyleHero from '../component/StyledHero'
import { MdPets } from "react-icons/md";

export default class SingleRoom extends Component {

    constructor(props) {
        super(props)
        // console.log(this.props)
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        }
    }
    static contextType = RoomContext;
    // componentDidMount() {}
    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug)
        if (!room) {
            return (
                <div className="error">
                    <h3>Room not found ...</h3>
                    <Link to='/rooms' className="btn-primary">
                        back to rooms
                    </Link>
                </div>
            )
        }
        const { name,
            description,
            capacity,
            size,
            price,
            extras,
            breakfast,
            pets,
            images } = room

        return (
            <>
                <StyleHero img={images[0]}>
                    <Banner title={`${name} room`}>
                        <Link to='/rooms' className="btn-primary" >
                            Back to rooms
                    </Link>
                    </Banner>
                </StyleHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {images.map((item, index) => {
                            return <img key={index} src={item} alt={name} />
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>Details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>Info</h3>
                            <h6><strong>Price:</strong>  {price} Da </h6>
                            <h6><strong>Size:</strong> {Math.floor(size / 10.764)} m² </h6>
                            <h6><strong>Max capacity:</strong>
                                {
                                    capacity > 1 ? ` ${capacity} people` : `${capacity} person`
                                }
                            </h6>
                            <h6><small><strong>{pets ? "pets allowed" : "no pets"}</strong></small></h6>
                            <h6><small><strong>{breakfast && "free breakfast included"}</strong></small></h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6><strong>extras</strong></h6>
                    <ul className="extras">
                        {extras.map((item, index) => {
                            return <li key={index}>- {item}</li>
                        })}
                    </ul>
                </section>
            </>
        )
    }
}

