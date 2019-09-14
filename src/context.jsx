import React, { Component } from 'react'
import Client from './contentful'

const RoomContext = React.createContext();
class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: true
    }

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "tsaResort"
            })
            let rooms = this.formatData(response.items)
            let featuredRooms = rooms.filter(room => room.featured === true)
            // get the max price from data 
            let maxPrice = Math.max(...rooms.map(item => item.price))
            //get the max size from data 
            let maxSize = Math.max(...rooms.map(item => item.size))
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice: maxPrice,
                maxSize: maxSize
            })
        } catch (error) {
            console.log(error)
        }

    }

    componentDidMount() {
        this.getData()
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image =>
                image.fields.file.url)
            let room = { id, ...item.fields, images }
            return room
        })
        return tempItems
    }

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    };
    // handle filter event
    handleChange = event => {
        const target = event.target
        // bcz we have a checkbox 
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = event.target.name
        this.setState({
            [name]: value
        }, this.filterRooms)
    };
    filterRooms = () => {
        let {
            rooms,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        } = this.state

        // all the rooms
        let tempRooms = [...rooms]

        // transform value
        capacity = parseInt(capacity)
        price = parseInt(price)

        // filter by type
        if (type !== "all") {
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        // filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }
        //  filter by price
        tempRooms = tempRooms.filter(room => room.price <= price)

        // filter by size 
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        // filter by breakfast
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }
        // filter by pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        // change state
        this.setState({
            sortedRooms: tempRooms
        })

    }
    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange
            }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (
            <RoomConsumer>
                {value => <Component {...props} context={value} />}
            </RoomConsumer>
        )
    }
}

export { RoomProvider, RoomConsumer, RoomContext }
