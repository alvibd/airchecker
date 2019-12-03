import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
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
				base_url : 'https://api.openaq.org/v1/',
				date: moment().format('YYYY-M-DD'),
                pos: {},
                results: [],
                // handleShow: this.show.bind(this),
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

    

        // return this.state.pos;
    }

    componentWillMount()
    {
        this.initialPosition();
        // console.log(infoWindow);
    }

    componentDidUpdate(prevProps, prevState){
        // console.log(prevProps);
        if(this.state.pos != prevState.pos)
        {
            this.airQuality();
        }
    
    }

    airQuality()
    {
        // console.log(this.state.pos);

        let data = {
            'coordinates': this.state.pos.lat+", "+this.state.pos.lng,
            'radius' : 10000,
            'date_from': this.state.date,
            'date_to': this.state.date
        }
        let results = [];
        axios.get(this.state.base_url+'measurements', {params: data}).then(response => {
            // console.log(response.data.results);
            this.setState((state, props) => ({
                results : response.data.results
              }));
        }).catch(function (error) {
            console.log(error);
        });
    }

    markers()
    {
        const results = this.state.results;

        console.log(results);
        const markers = results.map( (marker, index) => 
            (<Marker 
                key={index} 
                position={{lat: marker.coordinates.latitude, lng: marker.coordinates.longitude}}
                label={"Air quality index: "+marker.value}
                onClick={(e) => this.show(marker.value, e)}
            />)
        );
        
        return markers;
    }

    show(value)
    {
        alert("Air pollution level: "+value);
    }
    
    render(){
        return (<MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAKYf39eiTIuJn2YC_4qeqPpk89fJ8ZFGc&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            position={ this.state.pos }
            markers= {this.markers()}
            />);
    }
}

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
    defaultZoom={8}
    defaultCenter={ props.position }
    >
    {props.markers}
    </GoogleMap>
    ));