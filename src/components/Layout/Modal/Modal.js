import React from "react";
import debounce from "just-debounce-it";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Modal(props) {
  const {
    open,
    setOpen,
    children,
    title,
    confirm,
    decline,
    confirmActionHandler,
  } = props;

  const handleClose = () => setOpen(false);

  const debouncedConfirm = debounce(confirmActionHandler, 400);
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby={title} open={open}>
        <DialogTitle id={title} onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          {decline && (
            <Button onClick={handleClose} color="primary">
              {decline}
            </Button>
          )}
          {confirm && (
            <Button onClick={debouncedConfirm} color="primary">
              {confirm}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
  ]),
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  confirm: PropTypes.string,
  confirmActionHandler: PropTypes.func,
  decline: PropTypes.string,
};

export default React.memo(Modal, (prevProps, nextProps) => {
  return (
    prevProps.open === nextProps.open &&
    prevProps.children === nextProps.children
  );
});
