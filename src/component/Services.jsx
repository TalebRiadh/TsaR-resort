import React, { Component } from 'react'
import Title from './Title'
import { FaHiking, FaShuttleVan } from 'react-icons/fa'
import { IoIosRestaurant, IoMdWine } from "react-icons/io";

export default class Services extends Component {

    state = {
        services: [
            {
                icon: <IoIosRestaurant />,
                title: "Free Cocktails",
                info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
            },
            {
                icon: <FaHiking />,
                title: "Free Hiking",
                info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
            },
            {
                icon: <FaShuttleVan />,
                title: "Free Shuttle",
                info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
            },
            {
                icon: <IoMdWine />,
                title: "open parties",
                info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
            },
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center" >
                    {this.state.services.map(item => {
                        return (
                            <article key={`item-${item.title}`} className="service">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}
