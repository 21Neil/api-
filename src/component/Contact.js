import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import UserForm from './UserForm';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { IconButton } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, gander, phone, email, note) {
    return { name, gander, phone, email, note };
}

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function CustomizedTables() {
    const classes = useStyles();
    const [rows, setRows] = React.useState([]);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(0);

    const addContact = (isAdd, name, gander, phone, email) => {
        if (isAdd) {
            const row = createData(name, gander, phone, email);
            const data = { func: 'insert', data:row };
            fetch('http://localhost/api/user_mgt.php', {
                method: 'POST',
                body: JSON.stringify(data), // 傳給後端API的參數
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data['status'] === 'success') {
                        row.id=data['id'];
                        const list = rows;
                        list.push(row);
                        setRows(list.slice(0));//slice 複製全陣列
                    }
                })
                .catch(e => {
                    console.log('Error: ', e);
                })
        }
        setOpenAdd(false)
    }

    const editContact = (isEdit, name, gander, phone, email, index) => {
        if (isEdit) {           
            const row = createData(name, gander, phone, email);
            row.id=rows[index].id;
            const data = { func: 'update', data:row };
            fetch('http://localhost/api/user_mgt.php', {
                method: 'POST',
                body: JSON.stringify(data), // 傳給後端API的參數
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data['status'] === 'success') {
                        const editList = rows;
                        editList[index] = row;
                        setRows(editList.slice(0));    
                    }
                })
                .catch(e => {
                    console.log('Error: ', e);
                })
        }
        setOpenEdit(false);
    }

    const delContact = (index) => {
        if (window.confirm('確認刪除: ' + rows[index].name + '?')) {           
            const data = { func: 'delete', id:rows[index].id };
            fetch('http://localhost/api/user_mgt.php', {
                method: 'POST',
                body: JSON.stringify(data), // 傳給後端API的參數
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data['status'] === 'success') {
                        const newList = rows;
                        newList.splice(index, 1);
                        setRows(newList.slice(0));
                    }
                })
                .catch(e => {
                    console.log('Error: ', e);
                })
        }
    }
    // componentDidMount
    React.useEffect(() => {
        const data = { func: 'query' };
        fetch('http://localhost/api/user_mgt.php', {
            method: 'POST',
            body: JSON.stringify(data), // 傳給後端API的參數
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data['status'] === 'success') {
                    setRows(data['data']);
                }
            })
            .catch(e => {
                console.log('Error: ', e);
            })
    }, []);

    return (
        <div>
            <Button variant='outlined' onClick={() => setOpenAdd(true)}>Add Contact</Button>
            {openAdd && <UserForm op='add' func={addContact} data={createData('', '', '', '')} />}
            {openEdit && <UserForm op='edit' func={editContact}
                data={rows[editIndex]} index={editIndex} />}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Gander</StyledTableCell>
                            <StyledTableCell align="center">Phone</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Edit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.gander}</StyledTableCell>
                                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton onClick={() => {
                                        setOpenEdit(true); setEditIndex(index)
                                    }}>
                                        <EditOutlinedIcon color='primary' />
                                    </IconButton>
                                    <IconButton onClick={() => delContact(index)}>
                                        <DeleteOutlinedIcon color='secondary' />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
