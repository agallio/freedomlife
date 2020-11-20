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
  altSpaceSplit,
  plList,
  altList,
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
            primary="Perjanjian Lama 1"
            secondary={
              plSpaceSplit.length === 3
                ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                    plList.length === 0 ? plSpaceSplit[2] : plList[0]
                  }`
                : `${plSpaceSplit[0]} ${
                    plList.length === 0 ? plSpaceSplit[1] : plList[0]
                  }`
            }
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
              primary="Perjanjian Lama 2"
              secondary={
                plSpaceSplit.length === 3
                  ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[1]}`
                  : `${plSpaceSplit[0]} ${plList[1]}`
              }
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
              primary="Perjanjian Lama 3"
              secondary={
                plSpaceSplit.length === 3
                  ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[2]}`
                  : `${plSpaceSplit[0]} ${plList[2]}`
              }
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
              primary="Perjanjian Lama 4"
              secondary={
                plSpaceSplit.length === 3
                  ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[3]}`
                  : `${plSpaceSplit[0]} ${plList[3]}`
              }
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
            primary="Perjanjian Baru"
            secondary={guideData.pb_name || ''}
            className="bible__modal__text"
            secondaryTypographyProps={{
              className: 'bible__modal__text--secondary',
            }}
            onClick={() => changePassage('pb', 'pb')}
          ></ListItemText>
        </ListItem>
        {guideData.alt_name && altList.length === 0 && (
          <ListItem button>
            <ListItemText
              primary="Tambahan"
              secondary={guideData.alt_name}
              className="bible__modal__text"
              secondaryTypographyProps={{
                className: 'bible__modal__text--secondary',
              }}
              onClick={() => changePassage('alt-1', 'alt_1')}
            ></ListItemText>
          </ListItem>
        )}
        {guideData.alt_name && altList.length > 1 && (
          <>
            <ListItem button>
              <ListItemText
                primary="Tambahan 1"
                secondary={`${altSpaceSplit[0]} ${altList[0]}`}
                className="bible__modal__text"
                secondaryTypographyProps={{
                  className: 'bible__modal__text--secondary',
                }}
                onClick={() => changePassage('alt-1', 'alt_1')}
              ></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="Tambahan 2"
                secondary={`${altSpaceSplit[0]} ${altList[1]}`}
                className="bible__modal__text"
                secondaryTypographyProps={{
                  className: 'bible__modal__text--secondary',
                }}
                onClick={() => changePassage('alt-2', 'alt_2')}
              ></ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </Dialog>
  )
}

export default BiblePassageDialog
