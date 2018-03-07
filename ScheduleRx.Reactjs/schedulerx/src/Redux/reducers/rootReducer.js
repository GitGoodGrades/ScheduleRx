const initialState = {
    userName: '',
    userRole: '',
    semester: '',
    currentSchedule: {},
    registrationSchedule: {},
    courseList: [],
    sectionList: [],
    roomList: [],
    conflictList: null,
    adminCalendar: [],
    scheduleList: [],
    userCalendar: []
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
    case 'SEARCH_CONFLICTS':
      return {
        ...state,
        conflictList: action.data
      }
    case 'ADMIN_CALENDAR':
      return {
        ...state,
        adminCalendar: action.data
      }
    case 'USER_CALENDAR':
      return {
        ...state,
        userCalendar: action.data
      }
    case 'SEARCH_SCHEDULE_LIST':
      return {
        ...state,
        scheduleList: action.data
      }
    default:
      return state;
    }
  };
  
  export default rootReducer;