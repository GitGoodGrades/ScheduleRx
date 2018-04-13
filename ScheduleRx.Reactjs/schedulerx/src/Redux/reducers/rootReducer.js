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
    userCalendar: [],
    myCourses: [],
    conflicts: [],
    redirected: false,
    redirect_date: null,
    redirect_event: null,
    leadsCourses: null,
    messages: null, 
    capList: null,
    userList: null
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
                registrationSchedule: action.reg
            };
        case 'SEARCH_COURSES':
            return {
                ...state,
                courseList: action.data
            };
        case 'SEARCH_ROOMS':
            return {
                ...state,
                roomList: action.data
            };
        case 'SEARCH_CAPABILITIES':
            return {
                ...state,
                capList: action.data
            };
        case 'SEARCH_SECTIONS':
            return {
                ...state,
                sectionList: action.data
            };
        case 'SEARCH_SCHEDULES':
            return {
                ...state,
                currentSchedule: action.current,
                registrationSchedule: action.registration
            };
        case 'SEARCH_CONFLICTS':
            return {
                ...state,
                conflictList: action.data
            };
        case 'SEARCH_MESSAGES':
            return {
                ...state,
                messages: action.data
            };
        case 'ADMIN_CALENDAR':
            return {
                ...state,
                adminCalendar: action.data
            };
        case 'USER_CALENDAR':
            return {
                ...state,
                userCalendar: action.data
            };
        case 'SEARCH_SCHEDULE_LIST':
            return {
                ...state,
                scheduleList: action.data
            };
        case 'SEARCH_LEADS_COURSES':
            return {
                ...state,
                leadsCourses: action.data
            };
        case 'SEARCH_LEAD_COURSES':
            return {
                ...state,
                myCourses: action.data
            };
        case 'SEARCH_USERS':
            return {
                ...state,
                userList: action.users,
                facultyList: action.faculty
            };
        case 'SEARCH_CONFLICT_LIST':
            return {
                ...state,
                conflicts: action.data
            };
        case 'SET_EDIT':
            return {
                ...state,
                redirected: true,
                redirect_date: action.redirect_date,
                redirect_event: action.redirect_event
            };
        case 'CLEAR_EDIT':
            return {
                ...state,
                redirected: false,
                redirect_date: null,
                redirect_event: null
            };
        default:
            return state;
    }
};

export default rootReducer;