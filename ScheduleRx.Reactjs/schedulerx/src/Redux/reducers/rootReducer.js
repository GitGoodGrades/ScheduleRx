const initialState = {
    userName: '',
    userRole: '',
    semester: '',
    currentSchedule: {},
    registrationSchedule: {},
    courseList: []
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
    case 'SEARCH_COURSES':
      return {
        ...state,
        courseList: action.data
      }
    case 'SEARCH_ROOMS':
      return {
        ...state,
        roomList: action.data
      }
    case 'SEARCH_SECTIONS':
      return {
        ...state,
        sectionList: action.data
      }  
    case 'SEARCH_SCHEDULES': 
      return {
        ...state,
        currentSchedule: action.current,
        registrationSchedule: action.registration
      }
    default:
      return state;
    }
  };
  
  export default rootReducer;