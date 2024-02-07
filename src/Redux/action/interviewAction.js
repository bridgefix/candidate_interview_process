import axios from "axios";
import swal from "sweetalert";
export const EMPLOYEE_RESPONSE = "EMPLOYEE_RESPONSE"
export const GET_QUESTION_LIST = "GET_QUESTION_LIST"
export const GET_RESULT_LIST = "GET_RESULT_LIST"
export const INTERVIEW_POST_RESPONSE = "INTERVIEW_POST_RESPONSE"

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
export const getResultResponse = (data) => {
    return {
        type: GET_RESULT_LIST,
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

export const interViewResultApi = (result, payload, token) => {
    return (dispatch) => {
        dispatch({
            type: INTERVIEW_POST_RESPONSE,
            payload: false
        });
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/interview_create/?action=${result}`, payload, token)
            .then((res) => {
                swal({
                    title: result == "pass" ? "Good Job" : "Bad luck",
                    text: result == "pass" ? " You are selected for Next round" : "you Are Not Selected Please try again after 3 month",
                    icon: result == "pass" ? "success" : "error",
                    timer: "5000",
                    buttons: false
                });
                dispatch({
                    type: INTERVIEW_POST_RESPONSE,
                    payload: true
                });
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export const candidateResultList = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/result-interview/`, token)
            .then((res) => {
                dispatch(getResultResponse(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
