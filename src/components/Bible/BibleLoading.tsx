import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const BibleLoading = () => (
  <>
    <Skeleton
      variant="text"
      animation="wave"
      width="50%"
      height={50}
      style={{ marginBottom: 20 }}
    />
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
      <Skeleton
        key={item}
        variant="text"
        animation="wave"
        width="90%"
        height={30}
        style={{ marginBottom: 5 }}
      />
    ))}
  </>
)

export default BibleLoading
