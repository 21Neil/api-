import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [name, setName] = React.useState(props.data.name);
  const [gander, setGander] = React.useState(props.data.gander);
  const [phone, setPhone] = React.useState(props.data.phone);
  const [email, setEmail] = React.useState(props.data.email);

  const handleSubscribe = () => {
      props.func(true, name, gander, phone, email, props.index);
      setOpen(false);
  }

  const handleClose = () => {
    props.func(false, '', '', '', '');
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
            id="name"
            label="Name"
            type="text"
            fullWidth
            value = {name}
            onChange = {(e) => setName(e.target.value)}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row aria-label="gender" name="gender" value={gander}
                onChange={(e) => {
                  setGander(e.target.value)
                }}>
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
              </RadioGroup>
          </FormControl>
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            value = {phone}
            onChange = {(e) => setPhone(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
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
