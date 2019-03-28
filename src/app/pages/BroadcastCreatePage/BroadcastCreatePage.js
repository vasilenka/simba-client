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
import MapSelectCoordinate from '../../components/MapSelectCoordinate/MapSelectCoordinate'
import CheckLabel from '../../components/CheckLabel/CheckLabel'
import Checkbox from '../../components/Checkbox/Checkbox'
import CheckMark from '../../components/CheckMark/CheckMark'
// import MapWithASearchBox from '../../components/MapPlace/MapPlace';

const BroadcastCreatePage = ({
  className,
  ...restProps
  }) => {

  let [title, setTitle] = React.useState('')
  let [body, setBody] = React.useState('')
  let [address, setAddress] = React.useState('')
  let [place, setPlace] = React.useState('')
  let [image, setImage] = React.useState()
  let [latitude, setLatitude] = React.useState(-7.3505208)
  let [longitude, setLongitude] = React.useState(108.2184531)
  let [receivers, setReceivers] = React.useState([])

  let [sending, setSending] = React.useState(false)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      })
    } else {
      console.log('GEOLOCATION NOT SUPPORTED')
    }
  }, [navigator.geolocation])

  const validateReceivers = state => {
    if (state.isChecked) {
      receivers.push(state.value)
      setReceivers([...receivers])
    } else {
      setReceivers(receivers.filter(receiver => receiver !== state.value))
    }
  }

  const sendBroadcast = () => {
    if(title && body && image) {
      setSending(true)
      postBroadcast(receivers, title, body, image, place, address, longitude, latitude)
    }
  }

  const postBroadcast = (receivers, title, body, image, place, address, lng, lat,) => {

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    let data = new FormData()

    data.append("title", title)
    data.append("body", body)
    data.append("broadcasts", image.file)

    data.append("place", place)
    data.append("address", address)
    data.append("lng", lng)
    data.append("lat", lat)

    data.append("receivers", JSON.stringify(receivers))

    axios.post(`${process.env.REACT_APP_WEB_HOST}/broadcasts`, data, config)
    .then(res => {
      if(res.status === 200) {
        setSending(false)
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
          <Text heading1 component="h1" className={styles.pageTitle}>New Broadcast Message</Text>
          <div className={styles.section}>
            <Text heading3 component="h2" className={styles.sectionTitle}>Penerima pesan</Text>
            <div style={{padding: '12px 0'}}>
              <div className={styles.userSelect}>
                <Checkbox
                  setValue={state => validateReceivers(state)}
                  name="receivers"
                  id="1"
                  isChecked
                  value="reporter"
                >
                  <CheckMark className={styles.checkmark} />
                  <CheckLabel
                    label={
                      <Text heading5>
                        Reporters
                      </Text>
                    }/>
                </Checkbox>
              </div>
              <div className={styles.userSelect}>
                <Checkbox
                  setValue={state => validateReceivers(state)}
                  name="receivers"
                  id="2"
                  value="volunteer"
                  isChecked
                >
                  <CheckMark className={styles.checkmark} />
                  <CheckLabel
                    label={
                      <Text heading5>
                        Volunteers
                      </Text>
                    }
                  />
                </Checkbox>
              </div>
              <div className={styles.userSelect}>
                <Checkbox
                  setValue={state => validateReceivers(state)}
                  name="receivers"
                  id="3"
                  value="fireman"
                  isChecked
                >
                  <CheckMark className={styles.checkmark} />
                  <CheckLabel
                    label={
                      <Text heading5>
                        Firemans
                      </Text>
                    }
                  />
                </Checkbox>
              </div>
              <div className={styles.userSelect}>
                <Checkbox
                  setValue={state => validateReceivers(state)}
                  name="receivers"
                  id="4"
                  value="dispatcher"
                  isChecked
                >
                  <CheckMark className={styles.checkmark} />
                  <CheckLabel
                    label={
                      <Text heading5>
                        Admins
                      </Text>
                    }
                  />
                </Checkbox>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <Text heading3 component="h2" className={styles.sectionTitle}>Detail pesan</Text>
            <div className={styles.field}>
              <Text heading5 component="label" className={styles.fieldLabel}>Gambar pesan</Text>
              <Luna>
                {({ onClick, images, input, deleteImage}) =>
                  <div>
                    <Button small primary onClick={onClick}>Pilih gambar</Button>
                    { images && images.length > 0 && images.map(image => setImage(image))}
                    {image && <div style={{width: '100%', height: '560px', margin: '24px 0', backgroundColor: '#f8f8f8' }}><Image src={image.url} fit="contain" alt="broadcast image"/></div>}
                  </div>
                }
              </Luna>
            </div>
            <div className={styles.field}>
              <Text heading5 component="label" className={styles.fieldLabel}>Judul</Text>
              <FieldInput
                placeholder="misal: Himbauan Menjelang Mudik Lebaran 2019"
                id="title"
                name="title"
                value={title}
                setValue={v => setTitle(v)}
                />
            </div>
            <div className={styles.field}>
              <Text heading5 component="label" className={styles.fieldLabel}>Pesan</Text>
              <textarea
                className={cx(styles.textarea, styles.normal)}
                placeholder="misal: Himbauan kepada warga untuk selalu mematikan peralatan listrik sebelum berangkat pulang kampung."
                name="body"
                rows="6"
                onChange={e => setBody(e.target.value)}
                value={body}/>
            </div>
          </div>
          <div className={styles.section}>
            <Text heading3 component="h2" className={styles.sectionTitle}>Tambahkan alamat (optional)</Text>
            <div className={styles.field}>
              <Text heading5 component="label" className={styles.fieldLabel}>Nama tempat</Text>
              <FieldInput
                id="place"
                placeholder="misal: Gedung Sate"
                name="place"
                value={place}
                setValue={value => setPlace(value)}
                />
            </div>
            <div className={styles.field}>
              <Text heading5 component="label" className={styles.fieldLabel}>Alamat</Text>
              <FieldInput
                id="address"
                placeholder="misal: Komplek Ardhini, Jalan Cipaheut No.6"
                name="address"
                value={address}
                setValue={value => setAddress(value)}
                />
            </div>
            <div className={styles.field}>
              <Text heading5 component="label" className={styles.fieldLabel}>Posisi pada peta</Text>
              <MapSelectCoordinate
                lat={latitude}
                long={longitude}
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
            </div>
          </div>
          <footer style={{display: 'flex', width: '100%', padding: '12px 0', justifyContent: 'flex-start'}}>
            <Button
              primary
              onClick={sendBroadcast}
              disabled={sending}
              >Send broadcast message</Button>
          </footer>
        </div>
      </Container>
      <PreviewBroadcast />
    </React.Fragment>
  )
}

export default BroadcastCreatePage