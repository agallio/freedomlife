import React from 'react'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'

interface GuideLoadingProps {
  item: number
}

const GuideLoading = ({ item }: GuideLoadingProps): JSX.Element => (
  <Grid
    key={item}
    container
    direction="row"
    justify="flex-start"
    alignItems="center"
    spacing={4}
  >
    <Grid item sm={4} md={4}>
      <Skeleton
        variant="rect"
        animation="wave"
        width={105}
        height={90}
        style={{ borderRadius: 5 }}
      />
    </Grid>
    <Grid item sm={8} md={8}>
      <Skeleton variant="text" animation="wave" width={150} />
      <Skeleton variant="text" animation="wave" width={150} />
      <Skeleton variant="text" animation="wave" width={150} />
    </Grid>
  </Grid>
)

export default GuideLoading
