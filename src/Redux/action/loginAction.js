import axios from "axios";
import swal from "sweetalert";

export const loginFormApi = (payload, navigate) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/employee_login/`, payload)
            .then((res) => {
                localStorage.setItem("token", res.data.access_token)
                localStorage.setItem("employee_profile",  JSON.stringify(res.data.employee_profile));
                navigate('/registration')
            })
            .catch((err) => {
                swal({
                    title:"Error",
                    text:"User Not available",
                    icon:"error",
                    buttons:false,
                    timer:2000
                })

            })
    }
}
