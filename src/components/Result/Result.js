import React, { useEffect } from 'react'
import './Result.css'
import { useDispatch, useSelector } from 'react-redux';
import { candidateResultList } from '../../Redux/action/interviewAction';
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import MUIDataTable from 'mui-datatables';
import { createTheme } from "@mui/material/styles";

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
});


function Result() {
    const dispatch = useDispatch()
    const [rows, setRows] = React.useState([]);
    const [responsive, setResponsive] = React.useState("standard");
    const [tableBodyHeight, setTableBodyHeight] = React.useState("480px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = React.useState("");
    const resultList = useSelector((state) => state.InterviewReducer.resultList)

    const column = [
        { name: "S.N.", options: { filter: false } },
        { name: "Name", options: { filterOptions: { fullWidth: true } } },
        { name: "Date", options: { filter: false } },
        { name: "Email", options: { filter: false } },
        { name: "Phone", options: { filter: false } },
        { name: "Interviewer Name", options: { filter: false } },
        { name: "Rating", options: { filter: false } },
        { name: "Experience", options: { filter: false } },
        { name: "Technology", options: { filterOptions: { fullWidth: true } } },
        { name: "Round", options: { filter: false } },
        { name: "Result", options: { filterOptions: { fullWidth: true } } },

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

    useEffect(() => {
        if (resultList.length > 0) {
            const newRows = resultList.map((data, i) => 
                [
                    i + 1,
                    data.full_name,
                    data.interview_date,
                    data.email,
                    data.phone_number,
                    Array.isArray(data.interviewer) ? data.interviewer.join(', ') : data.interviewer,
                    data.interview_rating,
                    data.work_experience,
                    data.technology,
                    data.interview_round_done,
                    data.result,
                ]
            );

            setRows(newRows);
        }
    }, [resultList])

    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    useEffect(() => {
        dispatch(candidateResultList(config))
    }, [])

    return (
        <div className='resultStyle'>
            <CacheProvider value={muiCache}>
                <ThemeProvider theme={createTheme()}>
                    <MUIDataTable
                        title={"Final Result"}
                        data={rows}
                        columns={column}
                        options={options}
                    />
                </ThemeProvider>
            </CacheProvider>

        </div>
    )
}

export default Result
