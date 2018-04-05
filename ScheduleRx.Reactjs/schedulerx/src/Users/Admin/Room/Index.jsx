import React, { Component } from 'react';
import RoomTable from './components/RoomTable';
import RoomForm from './components/RoomForm';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';
import history from '../../../App/History';

const mapStateToProps = (state) => ({
    rooms: state.roomList
  });
  
  const mapDispatchToProps = (dispatch) => ({

    onLoad: () => dispatch(action.searchRooms())
});





class Rooms extends Component{
    state = {
        roomId: '',
        capacity: '',
        roomName: '',
        rooms:[]

    }
    componentDidMount = () =>{
        this.props.onLoad();
    }

    reload = (room) => {
        let tempRoom = this.state.rooms;
        const newRoom = {
            ROOM_ID: room.ROOM_ID,
            CAPACITY: room.CAPACITY,
            ROOM_NAME: room.ROOM_NAME,
            LOCATION: room.LOCATION,
            DESCRIPTION: room.DESCRIPTION,
        }
        tempRoom.push(newRoom);
        this.setState({rooms: tempRoom, dialogOpen: false})
    }

    reload = (room) => {
        let tempRoom = this.state.rooms;
        const newRoom = {
            ROOM_ID: room.ROOM_ID,
            CAPACITY: room.CAPACITY,
            ROOM_NAME: room.ROOM_NAME,
            LOCATION: room.LOCATION,
            DESCRIPTION: room.DESCRIPTION,
        }
        tempRoom.push(newRoom);
        this.setState({rooms: tempRoom, dialogOpen: false})
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
            DESCRIPTION: room.DESCRIPTION,
        })
            .then(function (response) {
                console.log(response);
                if (response.data === "") {
                    alert("Invalid Data, Please Try Again...");     
                }
                else {
                    history.push("/room/List");               
                }  
            })
            .catch(function (error) {
                console.log(error);
            });
            
    }

    render(){
        return(
           
                <div style={{paddingTop: 35}}> 
                    <RoomTable handleState={this.handleState} save={this.update} roomList = {this.props.rooms} open={this.openDialog}/>
                    <RoomForm onSave={this.handleSave} open={this.state.dialogOpen} onCancel={this.cancel} resubmit={this.reload}/>
               </div>
            
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Rooms);