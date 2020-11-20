import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

// Types
import type { BibleVersionDialogProps } from '../../types'

const BibleVersionDialog: React.FC<BibleVersionDialogProps> = ({
  versionModal,
  changeVersion,
  closeVersionModal,
}) => (
  <Dialog
    onClose={closeVersionModal}
    open={versionModal}
    PaperProps={{ className: 'bible__modal' }}
  >
    <DialogTitle className="bible__modal__title">
      Pilih Versi Alkitab
    </DialogTitle>
    <List>
      <ListItem button>
        <ListItemText
          primary="TB"
          secondary="Terjemahan Baru"
          className="bible__modal__text"
          secondaryTypographyProps={{
            className: 'bible__modal__text--secondary',
          }}
          onClick={() => changeVersion('tb')}
        ></ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="BIS"
          secondary="Bahasa Indonesia Sehari-Hari"
          className="bible__modal__text"
          secondaryTypographyProps={{
            className: 'bible__modal__text--secondary',
          }}
          onClick={() => changeVersion('bis')}
        ></ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="FAYH"
          secondary="Firman Allah Yang Hidup"
          className="bible__modal__text"
          secondaryTypographyProps={{
            className: 'bible__modal__text--secondary',
          }}
          onClick={() => changeVersion('fayh')}
        ></ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="MSG"
          secondary="The Message"
          className="bible__modal__text"
          secondaryTypographyProps={{
            className: 'bible__modal__text--secondary',
          }}
          onClick={() => changeVersion('msg')}
        ></ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="NKJV"
          secondary="New King James Version"
          className="bible__modal__text"
          secondaryTypographyProps={{
            className: 'bible__modal__text--secondary',
          }}
          onClick={() => changeVersion('nkjv')}
        ></ListItemText>
      </ListItem>
    </List>
  </Dialog>
)

export default BibleVersionDialog
