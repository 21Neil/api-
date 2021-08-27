import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import './App.css';

function ToDo(props) {

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <h2>{props.title}
                                {<IconButton aria-label="delete" onClick = {props.toDoClear} >
                                    <DeleteIcon/>
                                </IconButton>}
                            </h2>
                        </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {console.log(props.task)}
                    {
                        props.task.map((task, index) => {
                            return (
                                <TableRow key={index} onClick={() => {
                                    console.log(index);
                                    const newDone = props.done;
                                    newDone.push(props.task[index]);
                                    props.getDone(newDone);

                                    props.task.splice(index, 1);
                                    //const newList = props.task.map(task => task);//(task) => {return task//to newList}
                                    props.getList(props.task.slice(0));
                                }}>
                                    <TableCell align='center'>{task}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function Done(props) {

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <h2 >{props.title}
                                {<IconButton aria-label="delete" onClick = {props.doneClear}>
                                    <DeleteIcon />
                                </IconButton>}
                            </h2>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {console.log(props.task)}
                    {
                        props.done.map((task, index) => {
                            return (
                                <TableRow key={index} onClick={() => {
                                    props.done.splice(index, 1);
                                    const newList = props.done.map(task => task);//(task) => {return task//to newList}
                                    props.getDone(newList);
                                }}>
                                    <TableCell align='center'>{task}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export { ToDo, Done };