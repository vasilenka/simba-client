import styles from './BroadcastCreatePage.module.scss'
import React from 'react'
import cx from 'classnames'
import axios from 'axios'

import Container from '../../layouts/Container/Container'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import FieldInput from '../../components/FieldInput/FieldInput'
import Navbar from '../../components/Navbar/Navbar'
import PreviewBroadcast from '../../broadcast/PreviewBroadcast/PreviewBroadcast'
import Luna from '../../components/Luna/Luna'
import Image from '../../components/Image/Image'
import MapSelectCoordinate from '../../components/MapSelectCoordinate/MapSelectCoordinate';

const BroadcastCreatePage = ({
  className,
  ...restProps
  }) => {

  let [title, setTitle] = React.useState("")
  let [body, setBody] = React.useState("")
  let [image, setImage] = React.useState()
  let [latitude, setLatitude] = React.useState(-6.871154247567597)
  let [longitude, setLongitude] = React.useState(107.62324781513212)
  let [address, setAddress] = React.useState("")

  React.useEffect(() => {
    if(longitude && latitude) {
      console.log("COORD: ", latitude, longitude)
    }
  }, [longitude, latitude])

  const sendBroadcast = () => {
    if(title && body && image) {
      postBroadcast(title, body, image, address, longitude, latitude)
    }
  }

  const postBroadcast = (title, body, image, address, lng, lat,) => {

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    let data = new FormData()

    data.append("title", title)
    data.append("body", body)
    data.append("broadcasts", image.file)
    data.append("address", address)
    data.append("lng", lng)
    data.append("lat", lat)

    axios.post(`${process.env.REACT_APP_WEB_HOST}/broadcasts`, data, config)
    .then(res => {
      if(res.status === 200) {
        console.log(res)
      }
    })
    .catch(err => console.log(err))

  }

  return (
    <React.Fragment>
      <Navbar/>
      <Container
        fixLeft
        fixRight
        className={cx(styles.broadcastView)}>
        <div style={{maxWidth: '560px'}}>
          <Text heading1 component="h1" className={styles.pageTitle}>Broadcast message</Text>
          <br/>
          <br/>
          <Text heading5 component="label" style={{display: 'block', marginBottom: '8px'}}>Pilih gambar pesan (optional)</Text>
          <Luna>
            {({ onClick, images, input, deleteImage}) =>
              <div>
                <Button small primary onClick={onClick}>Browse files</Button>
                { images && images.length > 0 && images.map(image => setImage(image))}
                {image && <div style={{width: '100%', height: '400px' }}><Image src={image.url} fit="contain" alt="broadcast image"/></div>}
              </div>
            }
          </Luna>
          <br/>
          <br/>
          <Text heading5 component="label" style={{display: 'block', marginBottom: '8px'}}>Judul</Text>
          <FieldInput
            placeholder="Isikan judul broadcast"
            id="title"
            name="title"
            value={title}
            setValue={v => setTitle(v)}
            />
          <br/>
          <br/>
          <Text heading5 component="label" style={{display: 'block', marginBottom: '8px'}}>Pesan</Text>
          <textarea placeholder="Isikan pesan broadcast" className={cx(styles.textarea, styles.normal)} name="body" rows="6" onChange={e => setBody(e.target.value)} value={body}/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Text heading4 component="h2" style={{display: 'block', marginBottom: '24px'}}>Tambahkan alamat (optional)</Text>
          <Text heading5 component="label" style={{display: 'block', marginBottom: '8px'}}>Alamat</Text>
          <FieldInput
            id="title"
            placeholder="Isikan alamat"
            name="title"
            value={title}
            setValue={value => setAddress(value)}
            />
          <br/>
          <br/>
          <Text heading5 component="label" style={{display: 'block', marginBottom: '8px'}}>Posisi pada peta</Text>
          <MapSelectCoordinate
            lat={-6.871154247567597}
            long={107.62324781513212}
            isMarkerShown
            zoom={15}
            onLatChange={lat => setLatitude(lat)}
            onLngChange={lng => setLongitude(lng)}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNREXU2Q7SUSMuBdiDxHRzY_SRd-_QVGc&v=3.exp&libraries=geometry,drawing,places"
            containerElement={<div style={{
              willChange: 'transform',
              width: '100%',
            }} />}
            loadingElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `400px`}} />}
            draggable
            />
          <br/>
          <br/>
          <footer style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
            <Button primary onClick={sendBroadcast}>Send broadcast message</Button>
          </footer>
        </div>
      </Container>
      <PreviewBroadcast />
    </React.Fragment>
  )
}

export default BroadcastCreatePage