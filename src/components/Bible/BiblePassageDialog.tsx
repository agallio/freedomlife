import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

import { useGuide } from '../../store'

// Types
import type { BiblePassageDialogProps } from '../../types'

const BiblePassageDialog: React.FC<BiblePassageDialogProps> = ({
  passageModal,
  plSpaceSplit,
  inSpaceSplit,
  plList,
  inList,
  changePassage,
  closePassageModal,
}) => {
  const { guideData } = useGuide()

  return (
    <Dialog
      onClose={closePassageModal}
      open={passageModal}
      PaperProps={{ className: 'bible__modal' }}
    >
      <DialogTitle className="bible__modal__title">
        Pilih Panduan Baca
      </DialogTitle>

      <List>
        <ListItem button>
          <ListItemText
            primary={
              plSpaceSplit.length === 3
                ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                    plList.length === 0 ? plSpaceSplit[2] : plList[0]
                  }`
                : `${plSpaceSplit[0]} ${
                    plList.length === 0 ? plSpaceSplit[1] : plList[0]
                  }`
            }
            secondary="Perjanjian Lama 1"
            className="bible__modal__text"
            secondaryTypographyProps={{
              className: 'bible__modal__text--secondary',
            }}
            onClick={() => changePassage('pl-1', 'pl_1')}
          ></ListItemText>
        </ListItem>
        {plList.length > 1 && (
          <ListItem button>
            <ListItemText
              primary={
                plSpaceSplit.length === 3
                  ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[1]}`
                  : `${plSpaceSplit[0]} ${plList[1]}`
              }
              secondary="Perjanjian Lama 2"
              className="bible__modal__text"
              secondaryTypographyProps={{
                className: 'bible__modal__text--secondary',
              }}
              onClick={() => changePassage('pl-2', 'pl_2')}
            ></ListItemText>
          </ListItem>
        )}
        {plList.length > 2 && (
          <ListItem button>
            <ListItemText
              primary={
                plSpaceSplit.length === 3
                  ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[2]}`
                  : `${plSpaceSplit[0]} ${plList[2]}`
              }
              secondary="Perjanjian Lama 3"
              className="bible__modal__text"
              secondaryTypographyProps={{
                className: 'bible__modal__text--secondary',
              }}
              onClick={() => changePassage('pl-3', 'pl_3')}
            ></ListItemText>
          </ListItem>
        )}
        {plList.length > 3 && (
          <ListItem button>
            <ListItemText
              primary={
                plSpaceSplit.length === 3
                  ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[3]}`
                  : `${plSpaceSplit[0]} ${plList[3]}`
              }
              secondary="Perjanjian Lama 4"
              className="bible__modal__text"
              secondaryTypographyProps={{
                className: 'bible__modal__text--secondary',
              }}
              onClick={() => changePassage('pl-4', 'pl_4')}
            ></ListItemText>
          </ListItem>
        )}
        <ListItem button>
          <ListItemText
            primary={guideData.pb_name || ''}
            secondary="Perjanjian Baru"
            className="bible__modal__text"
            secondaryTypographyProps={{
              className: 'bible__modal__text--secondary',
            }}
            onClick={() => changePassage('pb', 'pb')}
          ></ListItemText>
        </ListItem>
        {guideData.in_name && inList.length === 0 && (
          <ListItem button>
            <ListItemText
              primary={guideData.in_name}
              secondary="Kitab Injil"
              className="bible__modal__text"
              secondaryTypographyProps={{
                className: 'bible__modal__text--secondary',
              }}
              onClick={() => changePassage('in-1', 'in_1')}
            ></ListItemText>
          </ListItem>
        )}
        {guideData.in_name && inList.length > 1 && (
          <>
            <ListItem button>
              <ListItemText
                primary={`${inSpaceSplit[0]} ${inList[0]}`}
                secondary="Kitab Injil 1"
                className="bible__modal__text"
                secondaryTypographyProps={{
                  className: 'bible__modal__text--secondary',
                }}
                onClick={() => changePassage('in-1', 'in_1')}
              ></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                primary={`${inSpaceSplit[0]} ${inList[1]}`}
                secondary="Kitab Injil 2"
                className="bible__modal__text"
                secondaryTypographyProps={{
                  className: 'bible__modal__text--secondary',
                }}
                onClick={() => changePassage('in-2', 'in_2')}
              ></ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </Dialog>
  )
}

export default BiblePassageDialog
