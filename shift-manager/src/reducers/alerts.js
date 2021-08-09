const AlertsData = (state = [], action) => {
    switch (action.type) {
        case "set_alerts": return action.AlertsData
        default: return state;
    }
};
export default AlertsData