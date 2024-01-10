import React, { useEffect } from 'react'
import './Result.css'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'name', label: 'Name', minWidth: 100, textAlign: "center" },
    { id: 'date', label: 'Date', minWidth: 100, textAlign: "center" },
    { id: 'interviewer', label: 'interviewer Name', minWidth: 100, textAlign: "center" },
    { id: 'count', label: 'Count', minWidth: 100 },
    { id: 'round', label: 'Round', minWidth: 100 },
    { id: 'result', label: 'Result', minWidth: 100 },
];

function createData(name, date, interviewer, count, round, result) {
    return { name, date, interviewer, count, round, result };
}

const rows = [
    createData('user1 ', '12/23/2022', "harshita", "20", "1st", "pass"),
    createData('user2 ', '12/23/2022', "anand", "20", "2nd", "fail"),
    createData('user3 ', '12/23/2022', "monika", "12", "3rd", "pass"),
    createData('user4', '12/23/2022', "manish", "23", "1st", "pass"),
    createData('user5', '12/23/2022', "anand", "25", "2nd", "fail"),
    createData('user6', '12/23/2022', "manish", "34", "1st", "pass"),
    createData('user7', '12/23/2022', "manish", "34", "1st", "pass"),
    createData('user8', '12/23/2022', "manish", "34", "1st", "pass"),
    createData('user9', '12/23/2022', "manish", "34", "1st", "pass"),
    createData('user10', '12/23/2022', "manish", "34", "1st", "pass"),
    createData('user11', '12/23/2022', "manish", "34", "1st", "pass"),
    createData('user12', '12/23/2022', "manish", "34", "1st", "pass"),
    createData('user13', '12/23/2022', "manish", "34", "1st", "pass"),
    createData('user14', '12/23/2022', "manish", "34", "1st", "pass"),
    createData('user15', '12/23/2022', "manish", "34", "1st", "pass"),
];

function Result() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className=' container resultStyle'>
            <Paper sx={{ width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{ maxHeight: 550 }}>
                    <Table stickyHeader >
                        <TableHead >
                            <TableRow >
                                {columns.map((column,i) => (
                                    <TableCell
                                        key={i}
                                        sx={{ color: "white",background:"black",textAlign:"center"}}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row,i) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                            {columns.map((column,index) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={index} align={column.align}   sx={{ textAlign:"center"}}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </div>
    )
}

export default Result
