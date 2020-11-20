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
          primary="Terjemahan Baru"
          secondary="TB"
          className="bible__modal__text"
          secondaryTypographyProps={{
            className: 'bible__modal__text--secondary',
          }}
          onClick={() => changeVersion('tb')}
        ></ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="Bahasa Indonesia Sehari-Hari"
          secondary="BIS"
          className="bible__modal__text"
          secondaryTypographyProps={{
            className: 'bible__modal__text--secondary',
          }}
          onClick={() => changeVersion('bis')}
        ></ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="Firman Allah Yang Hidup"
          secondary="FAYH"
          className="bible__modal__text"
          secondaryTypographyProps={{
            className: 'bible__modal__text--secondary',
          }}
          onClick={() => changeVersion('fayh')}
        ></ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="The Message"
          secondary="MSG"
          className="bible__modal__text"
          secondaryTypographyProps={{
            className: 'bible__modal__text--secondary',
          }}
          onClick={() => changeVersion('msg')}
        ></ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="New King James Version"
          secondary="NKJV"
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
