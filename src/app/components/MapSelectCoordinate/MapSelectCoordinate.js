import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapSelectCoordinate = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={{ lat: props.lat, lng: props.long }}
    defaultOptions={{
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      gestureHandling: 'cooperative'
    }}
  >
    {props.isMarkerShown && <Marker
      position={{ lat: props.lat, lng: props.long }}
      draggable={props.draggable}
      onDragEnd={e => {
        props.onLatChange(e.latLng.lat())
        props.onLngChange(e.latLng.lng())
      }}
      />
    }
  </GoogleMap>
))

export default MapSelectCoordinate