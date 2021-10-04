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
        dispatch({
            type: 'get_reports',
            reports: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const getShifts = () => async (dispatch) => {
    axios.get('/get-shifts').then((res) => {
        console.log('new data');
        console.log(res.data);
        dispatch({
            type: 'get_shifts',
            shifts: res.data
        })
    }).catch((err) => {
        console.log(err);
    })
}
export const setAlerts = (alerts) => async (dispatch) => {
    await dispatch({
        type: 'set_alerts',
        alertsData: alerts
    })
}

export const updateComments = (reportId, comment) => async (dispatch) => {
    axios.put('/add-comment', {reportId, comment}).then((res) => { //comment is Object!
        dispatch({
            type:'add_comment'
        })
    }).catch((err) => {
        console.log(err)
    })
}
 
export const sendReport = (alerts, reporter) => async (dispatch) => {
    axios.post('/add-report', { alerts, reporter}).then((res) => {
        dispatch({
            type: 'send_report', 
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const addShift = (user, start, end) => async (dispatch) => {
    axios.post('/add-shift', {
        title: user.name,
        start: start,
        end: end
    }).then((res) => {
        axios.get('/get-shifts').then((res) => {
            console.log('new data');
            console.log(res.data);
            dispatch({
                type: 'get_shifts',
                shifts: res.data
            })
        }).catch((err) => {
            console.log(err);
        })
        
}).catch(err => {
        console.log(err)
    })
}

export const deleteShift = (id) => async (dispatch) => {
    axios.delete(`/delete-shift/${id}`).then((res) => {
        axios.get('/get-shifts').then((res) => {
            console.log('new data');
            console.log(res.data);
            dispatch({
                type: 'get_shifts',
                shifts: res.data
            })
        }).catch((err) => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err)
    })
}
export const updateShift = (data) => async (dispatch) => {
    axios.post('/update-shift', data).then((res) => {
        axios.get('/get-shifts').then((res) => {
            dispatch({
                type: 'get_shifts',
                shifts: res.data
            })
        }).catch((err) => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err)
    })
}