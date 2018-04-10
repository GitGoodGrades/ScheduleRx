import React, { Component } from 'react';
import RoomTable from './components/RoomTable';
import RoomForm from './components/RoomForm';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';
import history from '../../../App/History';
import EditRoom from './components/EditRoom';

const mapStateToProps = (state) => ({
    rooms: state.roomList,
    capList: state.capList
  });
  
  const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(action.searchRooms()),
    getCapabilities: () => dispatch(action.searchCapabilities())
});


class Rooms extends Component{
    state = {
        room: {
            CAPABILITIES: []
        },
        rooms:[],
        capOptions: []
    }

    componentWillReceiveProps = (nextProps) => {
        let capabilityList = [];
        let room = [];

        nextProps.capList && nextProps.capList.map(cap => {
            capabilityList.push({label: cap.CAPABILITY, value: cap.CAPABILITY_ID})
        })

        this.setState({rooms: nextProps.rooms, capOptions: capabilityList })
    }

    componentDidMount = () =>{
        this.props.onLoad();
        this.props.getCapabilities();
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

    openEditDialog = (id) => {
        client.post(`Room/Detail.php`, {
            ROOM_ID: id
        }).then(res => {
            this.setState({
                editDialogOpen: true,
                room : res.data
            })
        })     
    }

    cancelEdit = () => {
        this.setState({
          editDialogOpen: false
        })
      };

    handleSave = (room) => {
        this.save(room);
    }

    save = (room) => {
        let capabilities = [];
        let capLabel = [];
        if(!Array.isArray(room.CAPABILITIES)){
            capabilities = room.CAPABILITIES.split(', ');
        } else {
            room.CAPABILITIES && room.CAPABILITIES.map(element => {
                capabilities.push(element.value);
                capLabel.push(element.label);
            })
        }

        let tempRooms = this.state.rooms;
        let newRoomList = this.state.rooms;

        let newRoom = {
            ROOM_ID: room.ROOM_ID,
            CAPACITY: room.CAPACITY,
            ROOM_NAME: room.ROOM_NAME,
            LOCATION: room.LOCATION,
            CAPABILITIES: capLabel,
            DESCRIPTION: room.DESCRIPTION,
        }

        client.post(`Room/Create.php`, {
            ROOM_ID: room.ROOM_ID,
            CAPACITY: room.CAPACITY,
            ROOM_NAME: room.ROOM_NAME,
            LOCATION: room.LOCATION,
            CAPABILITIES: capabilities,
            DESCRIPTION: room.DESCRIPTION,
        }).then(res => {
            tempRooms.push(newRoom)

            this.setState({rooms: tempRooms, dialogOpen: false})
        })   
    }

    handleUpdate =(room) => {

        let capabilities = [];
        let capLabel = [];

        if(!Array.isArray(room.CAPABILITIES)){
            capabilities = room.CAPABILITIES.split(', ');
        } else {
            room.CAPABILITIES && room.CAPABILITIES.map(element => {
                capabilities.push(element.value);
                capLabel.push(element.label);
            })
        }

        let newRoom = {
            ROOM_ID: room.ROOM_ID,
            CAPACITY: room.CAPACITY,
            ROOM_NAME: room.ROOM_NAME,
            LOCATION: room.LOCATION,
            CAPABILITIES: capLabel,
            DESCRIPTION: room.DESCRIPTION,
        }
        
        client.post(`Room/Update.php`, {
            ROOM_ID: room.ROOM_ID,
            CAPACITY: room.CAPACITY,
            ROOM_NAME: room.ROOM_NAME,
            LOCATION: room.LOCATION,
            CAPABILITIES: capabilities,
            DESCRIPTION: room.DESCRIPTION,
        }).then(res => {
            let tempRooms = this.state.rooms;
            this.state.rooms && this.state.rooms.map(item => {
                if(item.ROOM_ID === room.ROOM_ID){
                    tempRooms.splice((this.state.rooms.indexOf(item)), 1, newRoom)
                }
            })
            this.setState({rooms: tempRooms, editDialogOpen: false})
        })   
    }
        
    render(){
        return(
           
                <div style={{paddingTop: 35}}> 
                    <RoomTable capabilityOptions={this.state.capOptions} handleState={this.handleState} save={this.update} roomList = {this.state.rooms} open={this.openDialog} openEdit={this.openEditDialog}/>
                    <RoomForm capabilityOptions={this.state.capOptions} onCapChange={this.handleCapChange} onSave={this.handleSave} open={this.state.dialogOpen} onCancel={this.cancel} resubmit={this.reload}/>
                    <EditRoom capabilityOptions={this.state.capOptions} onCapChange={this.handleCapChange} room={this.state.room} onUpdate={this.handleUpdate} open={this.state.editDialogOpen} onCancel={this.cancelEdit} />
               </div>
            
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Rooms);