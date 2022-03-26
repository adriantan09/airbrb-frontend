import { React } from 'react'
import PropTypes from 'prop-types'

import {
  Snackbar,
  Alert,
} from '@mui/material'

const Prompt = ({ open, setOpen, message, severity }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

Prompt.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  message: PropTypes.string,
  severity: PropTypes.string
}

export default Prompt
