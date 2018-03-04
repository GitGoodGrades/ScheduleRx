const initialState = {
    userName: '',
    userRole: '',
    semester: '',
    currentSchedule: {},
    registrationSchedule: {}
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        userName: action.name,
        userRole: action.role,
        semester: action.semester
      };
    case 'UPDATE_SCHEDULE':
      return {
        ...state,
        currentSchedule: action.current,
        registrationSchedule: action.reg
      };
    case 'REMOVE_USER':
      return {
        ...state,
        userName: '',
        userRole: '',
        semester: ''
      };
    case 'CHANGE_REGISTRATION':
      return {
        ...state,
        registrationSchedule:action.reg
      }
    default:
      return state;
    }
  };
  
  export default rootReducer;