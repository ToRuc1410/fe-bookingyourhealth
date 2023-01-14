import actionTypes from '../actions/actionTypes';

const initialState = {
   isLoadingGender: false,
   genders: [],
   roles: [],
   positions: [],
   users: [],
   topDoctors: [],
   allDoctors: [],
   doctorId: [],
   allScheduleTime: [],

   allRequiredDoctorInfor: []
};

const adminReducer = (state = initialState, action) => {
   switch (action.type) {
      // GENDER
      case actionTypes.FETCH_GENDER_START:
         let copyState = { ...state };
         copyState.isLoadingGender = true;
         return {
            ...copyState,
         };
      case actionTypes.FETCH_GENDER_SUCCESS:
         state.genders = action.data;
         state.isLoadingGender = false;
         return {
            ...state,
         };
      case actionTypes.FETCH_GENDER_FAILED:
         state.genders = [];
         state.isLoadingGender = false;
         return {
            ...state,
         };
      // POSITION
      case actionTypes.FETCH_POSITION_SUCCESS:
         state.positions = action.data;
         return {
            ...state,
         };
      case actionTypes.FETCH_POSITION_FAILED:
         state.positions = [];
         return {
            ...state,
         };
      // ROLE
      case actionTypes.FETCH_ROLE_SUCCESS:
         state.roles = action.data;
         return {
            ...state,
         };
      case actionTypes.FETCH_ROLE_FAILED:
         state.roles = [];
         return {
            ...state,
         };
      // GetAllUsersRedux
      case actionTypes.FETCH_ALL_USERS_SUCCESS:
         state.users = action.users;
         return {
            ...state,
         };
      case actionTypes.FETCH_ALL_USERS_FAILED:
         state.users = [];
         return {
            ...state,
         };
      // Get All Top Doctors
      case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
         state.topDoctors = action.dataDoctors;
         return {
            ...state,
         };
      case actionTypes.FETCH_TOP_DOCTORS_FAILED:
         state.topDoctors = [];
         return {
            ...state,
         };
      // Get All Doctors
      case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
         state.allDoctors = action.dataDr;
         return {
            ...state,
         };
      case actionTypes.FETCH_ALL_DOCTORS_FAILED:
         state.allDoctors = [];
         return {
            ...state,
         };

      // Get a Doctor by Id
      case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
         state.doctorId = action.dataDetail;
         return {
            ...state,
         };
      case actionTypes.GET_DETAIL_DOCTOR_FAILED:
         state.doctorId = [];
         return {
            ...state,
         };
      // get scheduleTime for Doctor
      case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
         state.allScheduleTime = action.dataTime;
         return {
            ...state,
         };
      case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
         state.allScheduleTime = [];
         return {
            ...state,
         };
      // get all information Doctor
      case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
         state.allRequiredDoctorInfor = action.data;
         return {
            ...state,
         };
      case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
         state.allScheduleTime = [];
         return {
            ...state,
         };
      default:
         return state;
   }
};

export default adminReducer;
