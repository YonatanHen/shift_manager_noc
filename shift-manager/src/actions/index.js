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

export const getReports = () => async (dispatch) => {
    axios.get('/getreports').then((res) => {
        // console.log(res)
        dispatch({
            type: 'get_reports',
            reports: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const setAlerts = (alerts) => async (dispatch) => {
    console.log('HIIIIIIIIIIIIIIIIIII')
    dispatch({
        type: 'set_alerts',
        AlertsData: alerts
    })
}
