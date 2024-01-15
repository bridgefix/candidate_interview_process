import { UNIVERSITY_RESPONSE, BRANCHES_RESPONSE, TECHNOLOGIES_RESPONSE, CANDIDATE_REGISTER, CANDIDATE_LIST_RESPONSE, EXPERIRNCE_RESPONSE } from '../action/RegistrationAction'

const initialState = {
    universityList: [],
    branchList: [],
    experienceList: [],
    technologyList: [],
    candidates_list: [],
}

const RegistrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case UNIVERSITY_RESPONSE:
            return {
                ...state,
                universityList: action.payload
            }
        case BRANCHES_RESPONSE:
            return {
                ...state,
                branchList: action.payload
            }
        case TECHNOLOGIES_RESPONSE:
            return {
                ...state,
                technologyList: action.payload
            }
        case EXPERIRNCE_RESPONSE:
            return {
                ...state,
                experienceList: action.payload
            }
        case CANDIDATE_LIST_RESPONSE:
            return {
                ...state,
                candidates_list: action.payload
            }
        default:
            return state
    }

}

export default RegistrationReducer;