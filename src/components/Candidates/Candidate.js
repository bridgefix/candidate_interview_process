import React from 'react'
import './Candidate.css'
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { candidateListApi } from '../../Redux/action/RegistrationAction';
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import MUIDataTable from 'mui-datatables';
import { createTheme } from "@mui/material/styles";

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
});

function Candidate() {
    const dispatch = useDispatch()
    const candidateList = useSelector((state) => state.RegistrationReducer.candidates_list)
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }

    React.useEffect(() => {
        dispatch(candidateListApi(config))
    }, []);
   
    const [responsive, setResponsive] = React.useState("standard");
    const [tableBodyHeight, setTableBodyHeight] =React.useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = React.useState("");
    const [row, setRow] = React.useState([])

    const column = [
        { name: "S.N.",options: { filter: false }},
        { name: "Name", options: { filterOptions: { fullWidth: true } } },
        { name: "DOB", options: { filter: false } },
        { name: "Work Experience", options: { filter: false } },
        { name: "Branch", options: { filter: false } },
        { name: "Email", options: { filter: false } },
        { name: "Phone", options: { filter: false } },
        { name: "Technology", options: { filter: false } },
        { name: "University", options: { filter: false } },
        { name: "Pass Out Year", options: { filter: false } },
    ];

    const options = {
        search: true,
        download: true,
        print: true,
        viewColumns: true,
        filter: true,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        setCellProps: (cellValue, columnIndex) => {
            return { style: { textAlign: 'center' } };
        },
        selectableRows: 'none',

    };
    React.useEffect(() => {
        if (candidateList.length > 0) {
            const newRows = candidateList.map((data, i) => [
                i + 1,
                data.full_name,
                data.date_of_birth,
                data.work_experience.name,
                data.branch.name,
                data.email,
                data.phone_number,
                data.technology.name,
                data.university.name,
                data.pass_out_year
            ]);

            setRow(newRows);
        }
    }, [candidateList]);


    return (
        <div className='container candidateStyle'>
            <CacheProvider value={muiCache}>
                <ThemeProvider theme={createTheme()}>
                    <MUIDataTable
                        title={"Candidate List"}
                        data={row}
                        columns={column}
                        options={options}
                    />
                </ThemeProvider>
            </CacheProvider>
        </div>
    )
}

export default Candidate
