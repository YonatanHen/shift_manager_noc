const Reports = (state=[], action) => {
    switch(action.type) {
      case "get_reports": return action.list;
      default: return state;
    }
  };
  export default Reports