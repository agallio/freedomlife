import React from 'react'
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

interface BibleVersionDialogProps {
  versionModal: boolean
  changeVersion: (version: string) => void
  closeVersionModal: () => void
}

const BibleVersionDialog = ({
  versionModal,
  changeVersion,
  closeVersionModal,
}: BibleVersionDialogProps) => {
  return (
    <Dialog
      onClose={closeVersionModal}
      open={versionModal}
      PaperProps={{ className: 'modal-passage' }}
    >
      <DialogTitle className="modal-passage-title">
        Pilih Versi Alkitab
      </DialogTitle>
      <List>
        <ListItem button>
          <ListItemText
            primary="TB"
            secondary="Terjemahan Baru"
            className="modal-passage-list-text"
            secondaryTypographyProps={{
              className: 'modal-passage-list-text-secondary',
            }}
            onClick={() => changeVersion('tb')}
          ></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="BIS"
            secondary="Bahasa Indonesia Sehari-Hari"
            className="modal-passage-list-text"
            secondaryTypographyProps={{
              className: 'modal-passage-list-text-secondary',
            }}
            onClick={() => changeVersion('bis')}
          ></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="FAYH"
            secondary="Firman Allah Yang Hidup"
            className="modal-passage-list-text"
            secondaryTypographyProps={{
              className: 'modal-passage-list-text-secondary',
            }}
            onClick={() => changeVersion('fayh')}
          ></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="MSG"
            secondary="The Message"
            className="modal-passage-list-text"
            secondaryTypographyProps={{
              className: 'modal-passage-list-text-secondary',
            }}
            onClick={() => changeVersion('msg')}
          ></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="NKJV"
            secondary="New King James Version"
            className="modal-passage-list-text"
            secondaryTypographyProps={{
              className: 'modal-passage-list-text-secondary',
            }}
            onClick={() => changeVersion('nkjv')}
          ></ListItemText>
        </ListItem>
      </List>
    </Dialog>
  )
}

export default BibleVersionDialog
