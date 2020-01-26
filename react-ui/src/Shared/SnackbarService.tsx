import React, { useState, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { amber, green } from '@material-ui/core/colors';
import WarningIcon from '@material-ui/icons/Warning';
import ReactDOM from 'react-dom';
import { SnackbarContent, Snackbar, IconButton } from '@material-ui/core';
// @ts-ignore
// import { createWrapper } from 'Web/react2angular/renderReactComponent/renderReactComponent';

type Variant = 'success' | 'warning' | 'error' | 'info';
interface Args {
  message: string;
  variant: Variant;
}
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const uniqueId = 'SnackbarContainer-12345';

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));
export const SimpleSnackbar: FC<Args> = ({ message, variant }) => {
  //@ts-ignore
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  function handleClose(_event: React.SyntheticEvent, reason: string) {
    if (reason === 'clickaway') return;
    setOpen(false);
  }
  const Icon = variantIcon[variant];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={4500}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes[variant]}
        message={
          <span className={classes.message}>
            <Icon className={classes.icon} />
            {message}
          </span>
        }
        action={[
          // @ts-ignore
          <IconButton
            key='close'
            aria-label='close'
            color='inherit'
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export const SnackbarContainer = () => {
  return <div id={uniqueId} style={{ position: 'absolute' }} />;
};

export default class SnackbarService {
  static success(message: string) {
    this.showSnackbar(message, 'success');
  }

  static warning(message: string) {
    this.showSnackbar(message, 'warning');
  }

  static error(message: string) {
    this.showSnackbar(message, 'error');
  }

  static info(message: string) {
    this.showSnackbar(message, 'info');
  }

  private static showSnackbar(message: string, variant: Variant) {
    const snackbarContainer = document.getElementById(uniqueId) || document.createElement('div');
    snackbarContainer.id = uniqueId;
    document.body.appendChild(snackbarContainer);
    const SnackbarBody = () => <SimpleSnackbar message={message} variant={variant} />;
    // @ts-ignore
    // const WrappedSnackbarBody = createWrapper(SnackbarBody);
    ReactDOM.render(<SnackbarBody />, snackbarContainer);
  }
}
