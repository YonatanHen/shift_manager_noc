const TableData = (state=[], action) => {
    switch(action.type) {
      case "create_reports_header": return action.headers;
      default: return state;
    }
  };
  export default TableData