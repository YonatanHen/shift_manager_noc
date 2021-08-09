const AlertsData = (state = [], action) => {
    switch (action.type) {
        case "set_alerts": return action.alertsData
        default: return state;
    }
};
export default AlertsData