import Router from 'next/router'
import { ButtonBase, Grid, Typography } from '@material-ui/core'

import { useDispatchGuide } from '../../store'
import { dayjs } from '../../utils'

// Types
import type { GuideItemProps } from '../../types'

const GuideItem: React.FC<GuideItemProps> = ({ item, index }) => {
  const guideDispatch = useDispatchGuide()

  const toBibleWithDate = (date: string) => {
    guideDispatch({ type: 'SET_GUIDE_DATE', data: date })
    Router.push('/bible')
  }

  const isToday = (date: string) => {
    return dayjs().format('DD-MM-YYYY') === date
  }

  return (
    <Grid
      container
      key={index}
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={4}
    >
      <Grid item xs={4} sm={4} md={4}>
        <ButtonBase onClick={() => toBibleWithDate(item.date as string)}>
          <div
            className={`guidecard__box${
              isToday(item.date as string) ? '--primary' : ''
            }`}
          >
            <Typography
              className={`guidecard__box__title${
                isToday(item.date as string) ? '--primary' : ''
              }`}
            >
              {dayjs(item.date, 'DD-MM-YYYY').format('dddd')}
            </Typography>
            <Typography
              variant="h4"
              className={`guidecard__box__title${
                isToday(item.date as string) ? '--primary' : ''
              }`}
            >
              {item.date?.split('-')[0] || '-'}
            </Typography>
          </div>
        </ButtonBase>
      </Grid>
      <Grid item xs={8} sm={8} md={8}>
        <Typography
          className={`guidecard__text${
            isToday(item.date as string) ? '--primary' : ''
          }`}
        >
          {item.pl_name || '-'}
        </Typography>
        <Typography
          className={`guidecard__text${
            isToday(item.date as string) ? '--primary' : ''
          }`}
        >
          {item.pb_name || '-'}
        </Typography>
        {item.alt_name && (
          <Typography
            className={`guidecard__text${
              isToday(item.date as string) ? '--primary' : ''
            }`}
          >
            {item.alt_name || '-'}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default GuideItem
