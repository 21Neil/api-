import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [imgurl, setImgurl] = React.useState(props.data.imgurl);
  const [heading, setHeading] = React.useState(props.data.heading);
  const [content, setContent] = React.useState(props.data.content);

  const handleSubscribe = () => {
      props.func(true, imgurl, heading, content, props.index);
      setOpen(false);
  }

  const handleClose = () => {
    props.func(false, '', '', '');
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            {(props.op === 'add')?'Add Contact':'Edit Contact'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter info
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="imgurl"
            label="Imgurl"
            type="text"
            fullWidth
            value = {imgurl}
            onChange = {(e) => setImgurl(e.target.value)}
          />
          <TextField
            margin="dense"
            id="heading"
            label="Heading"
            type="text"
            fullWidth
            value = {heading}
            onChange = {(e) => setHeading(e.target.value)}
          />
          <TextField
            margin="dense"
            id="content"
            label="Content"
            type="text"
            fullWidth
            value = {content}
            onChange = {(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubscribe} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
