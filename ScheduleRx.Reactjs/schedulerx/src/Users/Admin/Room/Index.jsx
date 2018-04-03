import React, { Component } from 'react';
import RoomTable from './components/RoomTable';
import moment from 'moment';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';

const mapStateToProps = (state) => ({
    rooms: state.roomList
  });
  
  const mapDispatchToProps = (dispatch) => ({

    onLoad: () => dispatch(action.searchRooms())
});



class Rooms extends Component{
    
    handleDeleteRoom(room){
        Client.post('/Room/Delete.php',{ROOM_ID: schedule.ROOM_ID})
    }
    deleteRoom(id){
        this.props.onDelete(id);
    }
    componentDidMount() {
        this.props.onLoad();
    }

    openDialog = () => {
        this.setState({
            dialogOpen: true
        })
    }

    cancel = () => {
        this.setState({
          dialogOpen: false
        })
      };

      handleSave(room) {
        client.post(`Room/Create.php`, {
            ROOM_ID: room.ROOM_ID,
            CAPACITY: room.CAPACITY,
            ROOM_NAME: room.ROOM_NAME,
            LOCATION: room.LOCATION,
            CAPABILITY: room.CAPABILITY,
            DESCRIPTION: room.DESCRIPTION
        })
            .then(function (response) {
                console.log(response);
                if (response.data === "") {
                    alert("Invalid data, Please Try Again...");     
                }
                else {
                    history.push("/room/list");               
                }  
            })
            .catch(function (error) {
                console.log(error);
            });
            
    }

    render(){
        return(
           
                <div style={{paddingTop: 35}}> 
                    <RoomTable roomList = {this.props.rooms} onDelete = {this.deleteRoom.bind(this)}/>
                </div>
            
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Rooms);