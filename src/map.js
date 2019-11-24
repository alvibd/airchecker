import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps"

export default class Map extends Component{
    
    
    constructor(props)
    {
        super(props);
        this.state = {
            pos : {}
        }
    }
    
    initialPosition()
    {
        let b = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                b.setState((state, props) => ({
                    pos : pos
                  }));
                
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        // console.log(this.state.position);

        return this.state.pos;
    }

    componentDidMount()
    {
        this.initialPosition();
        // console.log(infoWindow);
    }
    
    render(){
        return (<MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAKYf39eiTIuJn2YC_4qeqPpk89fJ8ZFGc&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            position={ this.state.pos }
            />);
    }
}

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
    defaultZoom={18}
    defaultCenter={ props.position }
    >
    <Marker
    position={props.position}
    />
    </GoogleMap>
    ));