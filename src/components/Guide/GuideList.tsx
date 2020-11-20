import { Card, CardContent } from '@material-ui/core'

// Components
import GuideLoading from './GuideLoading'
import GuideItem from './GuideItem'

// Types
import type { GuideListProps } from '../../types'

const GuideList: React.FC<GuideListProps> = ({ data }) => (
  <div className="container--fluid" style={{ paddingBottom: 55 }}>
    <Card className="guidecard">
      <CardContent style={{ padding: '16px 10%', height: !data ? '80vh' : '' }}>
        {!data
          ? [1, 2, 3, 4, 5, 6].map((item) => (
              <GuideLoading key={item} item={item} />
            ))
          : data.data.map((item, index) => (
              <GuideItem key={index} index={index} item={item} />
            ))}
      </CardContent>
    </Card>
  </div>
)

export default GuideList
