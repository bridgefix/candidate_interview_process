import { EMPLOYEE_RESPONSE, GET_QUESTION_LIST, INTERVIEW_POST_RESPONSE } from "../action/interviewAction";

const initialState = {
    employeeList: [],
    quetionsList: [],
    interviewPostResponse: false
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
        default:
            return state
    }

}

export default InterviewReducer;