import styles from './MapSummary.module.scss'
import React from 'react'
import cx from 'classnames'

import Button from '../Button/Button'
import Container from '../../layouts/Container/Container'
import Text from '../Text/Text'
import MonthSelector from '../MonthSelector/MonthSelector'
import YearSelector from '../YearSelector/YearSelector'

const MapSummary = ({
  className,
  setShow,
  done,
  mission,
  invalid,
  accomplished,
  ...restProps
  }) => {

  let [month, selectedMonth] = React.useState()

  React.useEffect(() => {
    if(month) {
      // console.log(month)
    }
  }, [month])

  return (
    <Container narrow className={cx(styles.root)} {...restProps}>
      <div className={styles.area}>
        <div style={{paddingBottom: '24px'}}>
          <Text heading2 component="h2" style={{marginBottom: '12px'}}>Reports Location</Text>
          <Text medium component="p" style={{maxWidth: '560px'}}>
            Learn and understand the concentration of the reports in our city. We can use this data as consideration to plan our next improvement and socializing area.
          </Text>
        </div>
        <div style={{display: 'inline-flex', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <Button style={{marginRight: '12px'}} small secondary onClick={() => setShow(done)}>{done && done.length} Active</Button>
            <Button style={{marginRight: '12px'}} small secondary onClick={() => setShow(mission)}>{mission && mission.length} Mission</Button>
            <Button style={{marginRight: '12px'}} small secondary onClick={() => setShow(accomplished)}>{accomplished && accomplished.length} Accomplished</Button>
            <Button style={{marginRight: '12px'}} small secondary onClick={() => setShow(invalid)}>{invalid && invalid.length} Invalid</Button>
          </div>
          <div>
            <div style={{marginRight: '12px', display: 'inline-flex'}}>
              <YearSelector />
            </div>
            <div style={{width: '128px', display: 'inline-flex'}}>
              <MonthSelector getSelectedValue={value => selectedMonth(value)} small/>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default MapSummary