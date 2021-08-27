import React from 'react';
import { useCookies } from 'react-cookie';
import { 
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Contact from './Contact';
import ToDoList from './ToDoList';
import LoginForm from './LoginForm';
import Album from './Album'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);//null 在布林值裡是false
  const [task, setTask] = React.useState(0);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['username', 'password']);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTask = (taskid) => {
    if(cookies.username) {
      setTask(taskid);
    }
    else {
      alert('Please Login')
      handleClose();
    }
  }

  const handleLogout = () => {
    if (window.confirm('Logout?')) {
      removeCookie('username', {path:'/'});
      setTask(0);
    }
    handleClose();
  }

  const title = ['Home', 'Contact', 'To Do List', 'Logout']

  return (
    <div className={classes.root}>
      <AppBar position="static">{/*  position="static" 不會動*/}
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" 
          aria-label="menu" onClick = {handleClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title[task]}
          </Typography>
          {
            (cookies.username !== undefined)
            ?'Hi! '+cookies.username
            :<Button color="inherit" onClick = {() => setOpenLogin(true)}>
              Login
            </Button>
          }
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {handleTask(1);handleClose()}}>{title[1]}</MenuItem>
        <MenuItem onClick={() => {handleTask(2);handleClose()}}>{title[2]}</MenuItem>
        {
          cookies.username &&
          <MenuItem onClick={handleLogout}>{title[3]}</MenuItem>
        }
        </Menu><br/>
      {openLogin && <LoginForm open = {true} close = {() => setOpenLogin(false)}/>}
      {task === 1 && <Contact/>}{/*if(task === 1) <Contact/>*/}
      {task === 2 && <ToDoList/>}
      {task === 0 && <Album/>}
    </div>
  );
}
