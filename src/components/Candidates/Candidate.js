import React from 'react'
import './Candidate.css'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { candidateListApi } from '../../Redux/action/RegistrationAction';

function Candidate() {
    const dispatch = useDispatch()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const candidateList = useSelector((state) => state.RegistrationReducer.candidates_list)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const columns = [
        { id: 'name', label: 'Name', minWidth: 100, textAlign: "center" },
        { id: 'dob', label: 'DOB', minWidth: 100, textAlign: "center" },
        { id: 'experience', label: 'Work Experience', minWidth: 100, textAlign: "center" },
        { id: 'branch', label: 'Branch', minWidth: 100, textAlign: "center" },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'phone', label: 'Phone', minWidth: 100 },
        { id: 'technology', label: 'Technology', minWidth: 100 },
        { id: 'university', label: 'University', minWidth: 100 },
        { id: 'year', label: 'Year', minWidth: 100 },
    ];

    function createData(name, dob, experience, branch, email, phone, technology, university, year) {
        return { name, dob, experience, branch, email, phone, technology, university, year };
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }

    React.useEffect(() => {
        dispatch(candidateListApi(config))
    }, []);

    React.useEffect(() => {
        if (candidateList.length > 0) {
            const newRows = candidateList.map(data => createData(
                data.full_name,
                data.date_of_birth,
                data.work_experience.name,
                data.branch.name,
                data.email,
                data.phone_number,
                data.technology.name,
                data.university.name,
                data.pass_out_year
            ));
            setRows(newRows);
        }
    }, [candidateList])


    return (
        <div className='container candidateStyle'>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 550 }}>
                    <Table stickyHeader >
                        <TableHead >
                            <TableRow >
                                {columns.map((column, i) => (
                                    <TableCell
                                        key={i}
                                        sx={{ color: "white", background: "black", textAlign: "center" }}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 &&
                                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                                {columns.map((column, index) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={index} align={column.align} sx={{ textAlign: "center" }}>
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
                    rowsPerPageOptions={[10, 25, 100]}
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

export default Candidate
