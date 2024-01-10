import { EMPLOYEE_RESPONSE, GET_QUESTION_LIST } from "../action/interviewAction";

const initialState = {
    employeeList: [],
    quetionsList: []
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
        default:
            return state
    }

}

export default InterviewReducer;