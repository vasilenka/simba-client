import React from 'react'
import { compose, withProps, withHandlers } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'

const MapCluster = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBNREXU2Q7SUSMuBdiDxHRzY_SRd-_QVGc&v=3.exp&libraries=geometry,drawing,places`,
    containerElement: <div style={{
      // position: 'fixed',
      // top: 0,
      // right: 0,
      // bottom: 0,
      willChange: 'transform',
      width: '100%',
    }} />,
    loadingElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `72vh`}} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => marker => {
      const clickedMarkers = marker.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap)(props =>
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: -6.9094089, lng: 107.6369749 }}
      defaultOptions={{
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        gestureHandling: 'cooperative'
      }}
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {props.markers.map(marker => (
          <Marker
            onClick={() =>
              marker.status === 'active' ? window.location.href = `/#/active/${marker._id}`
                : marker.status === 'mission' ? window.location.href = `/#/missions/${marker._id}`
                  : marker.status === 'accomplished' ? window.location.href = `/#/completed/${marker._id}`
                    : null
            }
            key={marker._id}
            position={{ lat: Number(marker.latitude), lng: Number(marker.longitude) }}
          />
        ))}
      </MarkerClusterer>
    </GoogleMap>
)

export default MapCluster