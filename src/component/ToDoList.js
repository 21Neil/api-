import { useEffect, useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {ToDo, Done} from './MyTable';
import { IconButton } from '@material-ui/core';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';

function App() {
  const [text, setText] = useState('');
  const [task, setTask] = useState([]);
  const [done, setDone] = useState([]); 
  const [status, setStatus] = useState('Loading...')
  /*  按鈕點擊變換 
  const [flag, setFlag] = useState(false);
  const [buttonFace, setButFace] = useState('Click Me :)')
  const handleClick = () => {
    if(flag) 
      setButFace('Click Me :)');
    else 
      setButFace('Click Me AGAIN!!!!!');
    setFlag(!flag);
  }*/

  const handleClick = () => {
    const list = task;
    list.push(text);
    setTask(list);
    setText('');
  }
  
  const getList = (newList) => {
    setTask(newList);
  }
  
  const getDone = (newDone) => {
    setDone(newDone);
  }

  const enter = (e) => {
    console.log(e.key);
    if(e.key === 'Enter')
      handleClick();
  }

  const toDoClear = () => {alert('Clear All?');setTask([])};

  const doneClear = () => {alert('Clear All?');setDone([])};

  const save = () => {
    const data = {
      task: task,
      done: done
    };
    fetch('http://127.0.0.1/WD/Week4/api/saveData.php',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if (data['status'] === 'success')
        alert('Save Completed');
      else
        alert('Save Failed');
    })
    .catch(err => {
      alert(err);
    })
  }

  const load = () => {
    fetch('http://127.0.0.1/WD/Week4/api/loadData.php',{
      method: 'GET'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('data: ', data);
      setTask(data['task']);
      setDone(data['done']);
    })
    .catch(err => {
      alert(err);
    })
  }

  useEffect(() => {
    console.log('useEffect()');
    load()
    if(status !== '')
      setStatus('');
  },[status]);

  return (
    <div className='App'>
      <TextField id="standard-basic" label="Task" value={text}
        onChange={(e) => { setText(e.target.value) }} onKeyPress = {enter} />
      <Button variant='outlined' onClick={handleClick} style = {{verticalAlign: 'bottom'}}>
        Add
      </Button>
      <IconButton style = {{padding: '6px', verticalAlign: 'bottom'}} onClick = {save}>
        <CloudUploadOutlinedIcon/>
      </IconButton>
      <IconButton style = {{padding: '6px', verticalAlign: 'bottom'}} onClick = {load}>
        <CloudDownloadOutlinedIcon/>
      </IconButton>
      <br />{status}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>TO Do List</h1>
        </Grid>
        <Grid item xs={6}>
          <ToDo done={done} task={task} getList = {getList} getDone = {getDone} 
          toDoClear = {toDoClear} title = {'To Do'}/>
        </Grid>
        <Grid item xs={6}>
          <Done done={done} getDone = {getDone} doneClear = {doneClear} title = {'Done'}/>
        </Grid>
      </Grid>
    </div >
  )
}

export default App;
