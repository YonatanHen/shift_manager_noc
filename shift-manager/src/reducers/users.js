const Users = (state=[], action) => {
    switch(action.type) {
      case "get_users": return action.list;
      default: return state;
    }
  };
  export default Users