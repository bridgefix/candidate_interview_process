import axios from "axios";
export const UNIVERSITY_RESPONSE = "UNIVERSITY_RESPONSE"
export const BRANCHES_RESPONSE = "BRANCHES_RESPONSE"
export const TECHNOLOGIES_RESPONSE = "TECHNOLOGIES_RESPONSE"
export const EXPERIRNCE_RESPONSE = "EXPERIRNCE_RESPONSE"
export const CANDIDATE_REGISTER = "CANDIDATE_REGISTER"
export const CANDIDATE_LIST_RESPONSE = "CANDIDATE_LIST_RESPONSE"

export const getUniversityResponse = (data) => {
    return {
        type: UNIVERSITY_RESPONSE,
        payload: data
    }
}
export const getBranchesResponse = (data) => {
    return {
        type: BRANCHES_RESPONSE,
        payload: data
    }
}
export const getTechnologiesResponse = (data) => {
    return {
        type: TECHNOLOGIES_RESPONSE,
        payload: data
    }
}

export const candidateRegisterResponse = (value) => {
    return {
        type: CANDIDATE_REGISTER,
        payload: value
    }
}
export const candidateResponse = (data) => {
    return {
        type: CANDIDATE_LIST_RESPONSE,
        payload: data
    }
}
export const getExperienceResponse = (data) => {
    return {
        type: EXPERIRNCE_RESPONSE,
        payload: data
    }
}
export const universitiesList = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/universities/`, token)
            .then((res) => {
                dispatch(getUniversityResponse(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const branchesList = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches/`, token)
            .then((res) => {
                dispatch(getBranchesResponse(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export const technologiesList = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/technologies/`, token)
            .then((res) => {
                dispatch(getTechnologiesResponse(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export const candidateRegister = (payload, token, navigate) => {
    return (dispatch) => {
        dispatch(candidateRegisterResponse(false))
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate_register/`, payload, token)
            .then((res) => {
                dispatch(candidateRegisterResponse(true))
                navigate("/Interview_schedule")
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export const candidateListApi = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate_register/`, token)
            .then((res) => {
                dispatch(candidateResponse(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export const workExperienceList = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/work_experience/`, token)
            .then((res) => {
                dispatch(getExperienceResponse(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
