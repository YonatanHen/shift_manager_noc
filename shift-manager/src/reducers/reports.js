const ReportsData = (state=[], action) => {
    switch(action.type) {
      case "get_reports": return action.reports;
      default: return state;
    }
  };
  export default ReportsData