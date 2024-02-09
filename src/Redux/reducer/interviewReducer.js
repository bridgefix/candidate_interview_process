import { EMPLOYEE_RESPONSE, GET_QUESTION_LIST, INTERVIEW_POST_RESPONSE, GET_RESULT_LIST, GET_DASHBOARD_RESPONSE } from "../action/interviewAction";

const initialState = {
    employeeList: [],
    quetionsList: [],
    resultList: [],
    interviewPostResponse: false,
    dashboardData: null
}

const InterviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYEE_RESPONSE:
            return {
                ...state,
                employeeList: action.payload
            }
        case GET_QUESTION_LIST:
            return {
                ...state,
                quetionsList: action.payload
            }
        case INTERVIEW_POST_RESPONSE:
            return {
                ...state,
                interviewPostResponse: action.payload
            }
        case GET_RESULT_LIST:
            return {
                ...state,
                resultList: action.payload
            }
        case GET_DASHBOARD_RESPONSE:
            return {
                ...state,
                dashboardData: action.payload
            }
        default:
            return state
    }

}

export default InterviewReducer;