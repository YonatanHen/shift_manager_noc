const User = (state=null, action) => {
    switch(action.type) {
      case "set_user": return action.user;
      default: return state;
    }
  };
  export default User