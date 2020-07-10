import React from 'react'
import { Grid, Typography, ButtonBase } from '@material-ui/core'
import moment from 'moment'
import 'moment/locale/id'

// Redux
import { Guide } from '../../reducers'

interface GuideItemProps {
  item: Guide
  index: number
}

const GuideItem = ({ item, index }: GuideItemProps): JSX.Element => (
  <Grid
    container
    key={index}
    direction="row"
    justify="flex-start"
    alignItems="center"
    spacing={4}
  >
    <Grid item xs={4} sm={4} md={4}>
      <ButtonBase>
        <div
          className={
            moment().format('DD-MM-YYYY') === item.date
              ? 'guide-box-primary'
              : 'guide-box'
          }
        >
          <Typography
            className={
              moment().format('DD-MM-YYYY') === item.date
                ? 'bold-text'
                : 'bold-text primary'
            }
            style={{
              color: moment().format('DD-MM-YYYY') === item.date ? '#fff' : '',
            }}
          >
            {moment(item.date, 'DD-MM-YYYY').format('dddd')}
          </Typography>
          <Typography
            variant="h4"
            className={
              moment().format('DD-MM-YYYY') === item.date
                ? 'bold-text'
                : 'bold-text primary'
            }
            style={{
              color: moment().format('DD-MM-YYYY') === item.date ? '#fff' : '',
            }}
          >
            {item.date.split('-')[0] || '-'}
          </Typography>
        </div>
      </ButtonBase>
    </Grid>
    <Grid item xs={8} sm={8} md={8}>
      <Typography
        variant="subtitle1"
        className={
          moment().format('DD-MM-YYYY') === item.date
            ? 'regular-text primary'
            : 'regular-text'
        }
      >
        {item.pl_name || '-'}
      </Typography>
      <Typography
        variant="subtitle1"
        className={
          moment().format('DD-MM-YYYY') === item.date
            ? 'regular-text primary'
            : 'regular-text'
        }
      >
        {item.pb_name || '-'}
      </Typography>
      {item.alt_name && (
        <Typography
          variant="subtitle1"
          className={
            moment().format('DD-MM-YYYY') === item.date
              ? 'regular-text primary'
              : 'regular-text'
          }
        >
          {item.alt_name || '-'}
        </Typography>
      )}
    </Grid>
  </Grid>
)

export default GuideItem