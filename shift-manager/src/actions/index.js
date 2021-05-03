import axios from 'axios'
const URL = 'http://localhost:3001'
export const setUser = (user) => async (dispatch) => {
            dispatch({
                type: 'set_user',
                user: user
            })
}
export const getUsers = () => async (dispatch) => {
    axios.get('/getusers').then((res) => {
        console.log(res);
        dispatch({
            type: 'get_users',
            list: res.data
        })
    }).catch((err) => {
        console.log(err);
    })
}