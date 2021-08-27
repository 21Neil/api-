import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useCookies} from 'react-cookie';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(props.open);
  const [cookies, setCookie, removeCookie] = useCookies(['username', 'password']);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };

  const handleLogin = () => {
      if(username === 'tom' && password === '123') {
        setCookie('username', username, {path: '/'});
        props.close();
      }
      else alert('Wrong Username or Password')
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            value = {username}
            onChange = {(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}