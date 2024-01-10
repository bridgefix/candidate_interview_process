import axios from "axios";
export const EMPLOYEE_RESPONSE = "EMPLOYEE_RESPONSE"
export const GET_QUESTION_LIST = "GET_QUESTION_LIST"

export const getEmployeeResponse = (data) => {
    return {
        type: EMPLOYEE_RESPONSE,
        payload: data
    }
}
export const getQustionsList = (data) => {
    return {
        type: GET_QUESTION_LIST,
        payload: data
    }
}

export const employee_List = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/employee_list/`, token)
            .then((res) => {
                dispatch(getEmployeeResponse(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export const question_List = (quetionType, token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/interview_question/?question_type=${quetionType}`, token)
        .then((res) => {
                dispatch(getQustionsList(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
