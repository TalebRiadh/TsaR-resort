import React from 'react';
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import { withRoomConsumer } from "../context"
import Loading from '../component/Loading'

function RoomContainer({ context }) {
    const { loading, sortedRooms, rooms } = context
    if (loading) {
        return <Loading />;
    }
    return (
        <div>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </div>
    )
}
export default withRoomConsumer(RoomContainer)




/*import React from 'react';
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import { RoomConsumer } from "../context"
import Loading from '../component/Loading'
const RoomContainer = () => {
    return (
        <RoomConsumer>
            {
                (value) => {
                    const { loading, sortedRooms, rooms } = value
                    if (loading) {
                        return <Loading />;
                    }
                    console.log(value);
                    return (
                        <div>
                            <RoomsFilter rooms={rooms} />
                            <RoomsList rooms={sortedRooms} />
                        </div>
                    )
                }
            }
        </RoomConsumer>

    );
}
export default RoomContainer;
*/