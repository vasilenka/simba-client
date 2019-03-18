import React from 'react'
import _ from "lodash"
import { compose, withProps, lifecycle } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
// import FieldInput from '../FieldInput/FieldInput'
// import styles from './MapPlace.module.scss'

const google = window.google = window.google ? window.google : {}

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNREXU2Q7SUSMuBdiDxHRzY_SRd-_QVGc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{
      willChange: 'transform',
      width: '100%',
    }} />,
    mapElement: <div style={{ height: `400px`}} />,
  }),
  lifecycle({
    componentWillMount() {

      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: -6.8709322, lng: 107.6186963
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()
          const bounds = new google.maps.LatLngBounds()

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          })
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }))

          const nextCenter = _.get(nextMarkers, '0.position', this.state.center)

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          })
          // refs.map.fitBounds(bounds)
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props => {

  let [lat, setLat] = React.useState()
  let [lng, setLng] = React.useState()

  React.useEffect(() => {
    if(lat && lng) {
      console.log(lat, lng)
    }
  }, [lat, lng])

  React.useEffect(() => {
    if (navigator.geolocation) {
      console.log("HELLO!")
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      })
    } else {
      console.log('GEOLOCATION NOT SUPPORTED')
    }
  }, [])

  return(
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={15}
      center={{lat: Number(lat), lng: Number(lng)}}
      onBoundsChanged={props.onBoundsChanged}
      defaultOptions={{
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        gestureHandling: 'cooperative'
      }}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        {/* <div className={styles.searchBoxContainer}>
          <FieldInput id="placeSearch" type="text" placeholder="Search places" className={styles.searchBox}/>
        </div> */}
        <input
          // defaultValue={props.searchValue}
          type="text"
          placeholder="Search places..."
          style={{
            boxSizing: `border-box`,
            border: `1px solid rgba(0,0,0,.12)`,
            width: `240px`,
            background: "#FFFFFF",
            // height: `32px`,
            marginTop: `24px`,
            marginLeft: `24px`,
            padding: `12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.20)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      {props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} />
      )}
    </GoogleMap>
  )}
)

export default MapWithASearchBox