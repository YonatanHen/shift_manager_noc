const Shifts = (state=[], action) => {
    switch(action.type) {
      case "get_shifts": return action.shifts;
      default: return state;
    }
  };
  export default Shifts