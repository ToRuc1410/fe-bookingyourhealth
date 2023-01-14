import actionTypes from './actionTypes';
import {
   getAllCodeService,
   createNewUserService,
   getAllUsers,
   deleteUserService,
   editUserService,
   getTopDoctorHomeService,
   getAllDoctors,
   saveDetailDoctor,
   getDetailInforDoctor,
   getAllSpecialty,
   getAllClinics,
} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//    type: actionTypes.FETCH_GENDER_START,
// });
// GENDER
export const fetchGenderStart = () => {
   return async (dispatch, getState) => {
      try {
         dispatch({ type: actionTypes.FETCH_GENDER_START });
         let res = await getAllCodeService('GENDER');
         if (res && res.errCode === 0) {
            dispatch(fetchGenderSuccess(res.data));
         } else {
            dispatch(fetchGenderFailed());
         }
      } catch (e) {
         dispatch(fetchGenderFailed());
         console.log('fetchGenderStart', e);
      }
   };
};
export const fetchGenderSuccess = (genderData) => ({
   type: actionTypes.FETCH_GENDER_SUCCESS,
   data: genderData,
});
export const fetchGenderFailed = () => ({
   type: actionTypes.FETCH_GENDER_FAILED,
});

// POSITION
export const fetchPositionStart = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getAllCodeService('POSITION');
         if (res && res.errCode === 0) {
            dispatch(fetchPositionSuccess(res.data));
         } else {
            dispatch(fetchPositionFailed());
         }
      } catch (e) {
         dispatch(fetchPositionFailed());
         console.log('fetchGenderStart', e);
      }
   };
};
export const fetchPositionSuccess = (positionData) => ({
   type: actionTypes.FETCH_POSITION_SUCCESS,
   data: positionData,
});
export const fetchPositionFailed = () => ({
   type: actionTypes.FETCH_POSITION_FAILED,
});

//ROLE
export const fetchRoleStart = () => {
   return async (dispatch, getState) => {
      try {
         dispatch({ type: actionTypes.FETCH_GENDER_START });
         let res = await getAllCodeService('ROLE');
         if (res && res.errCode === 0) {
            dispatch(fetchRoleSuccess(res.data));
         } else {
            dispatch(fetchRoleFailed());
         }
      } catch (e) {
         dispatch(fetchRoleFailed());
         console.log('fetchGenderStart', e);
      }
   };
};
export const fetchRoleSuccess = (roleData) => ({
   type: actionTypes.FETCH_ROLE_SUCCESS,
   data: roleData,
});
export const fetchRoleFailed = () => ({
   type: actionTypes.FETCH_ROLE_FAILED,
});

// CRUD Read_all_USER Redux GetAllUsersRedux
export const fetchAllUsersStart = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getAllUsers('ALL');

         if (res && res.errCode === 0) {
            dispatch(fetchAllUsersSuccess(res.users));
         } else {
            toast.error('Get All Users is Failed');
            dispatch(fetchAllUsersFailed());
         }
      } catch (e) {
         toast.error('Get All Users is Failed');
         dispatch(fetchAllUsersFailed());
         console.log('fetchAllUsersFailed', e);
      }
   };
};
export const fetchAllUsersSuccess = (data) => ({
   type: actionTypes.FETCH_ALL_USERS_SUCCESS,
   users: data,
});
export const fetchAllUsersFailed = () => ({
   type: actionTypes.FETCH_ALL_USERS_FAILED,
});

//CRUD Create_USER Redux
export const createNewUser = (data) => {
   return async (dispatch, getState) => {
      try {
         let res = await createNewUserService(data);
         if (res && res.errCode === 0) {
            toast.success('You Create a new User Success');
            dispatch(saveUserSuccess());
            dispatch(fetchAllUsersStart());
         } else if (res.errCode === 1) {
            toast.error(res.errMessage);
            dispatch(saveUserFailed());
         } else {
            dispatch(saveUserFailed());
         }
      } catch (e) {
         toast.error('Create a new User Error');
         dispatch(saveUserFailed());
      }
   };
};
export const saveUserSuccess = () => ({
   type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
   type: actionTypes.CREATE_USER_FAILED,
});

//CRUD Delete_USER Redux
export const deleteAnUser = (userId) => {
   return async (dispatch, getState) => {
      try {
         if (window.confirm('Are you sure you want to delete this User?')) {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
               toast.success('Delete An User is Successed');
               dispatch(deleteUserSuccess());
               dispatch(fetchAllUsersStart());
            } else {
               dispatch(deleteUserFailed());
            }
         }
      } catch (e) {
         toast.error('Delete An User is Failed');
         dispatch(deleteUserFailed());
      }
   };
};
export const deleteUserSuccess = () => ({
   type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
   type: actionTypes.DELETE_USER_FAILED,
});
// //CRUD Update_USER Redux
export const editAnUser = (data) => {
   return async (dispatch, getState) => {
      try {
         let res = await editUserService(data);

         if (res && res.errCode === 0) {
            toast.success('Update An User is Successed');
            dispatch(editUserSuccess());
            dispatch(fetchAllUsersStart());
         } else {
            dispatch(editUserFailed());
         }
      } catch (e) {
         toast.error('Update An User is Failed');
         dispatch(editUserFailed());
      }
   };
};
export const editUserSuccess = () => ({
   type: actionTypes.UPDATE_USER_SUCCESS,
});
export const editUserFailed = () => ({
   type: actionTypes.UPDATE_USER_FAILED,
});

// get top Doctor is number people || limit default= 10
export const fetchTopDoctor = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getTopDoctorHomeService('');
         if (res && res.errCode === 0) {
            dispatch({
               type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
               dataDoctors: res.data,
            });
         } else {
            dispatch({
               type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            });
         }
      } catch (e) {
         console.log('FETCH_TOP_DOCTORS_FAILED', e);
         dispatch({
            type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
         });
      }
   };
};
//get All Doctor
export const fetchAllDoctor = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getAllDoctors();
         if (res && res.errCode === 0) {
            dispatch({
               type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
               dataDr: res.data,
            });
         } else {
            dispatch({
               type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            });
         }
      } catch (e) {
         console.log('FETCH_ALL_DOCTORS_FAILED', e);
         dispatch({
            type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
         });
      }
   };
};

// Save Detail Doctor
export const saveDetailADoctor = (data) => {
   return async (dispatch, getState) => {
      try {
         let res = await saveDetailDoctor(data);
         if (res && res.errCode === 0) {
            toast.success('Save Detail Doctor is Successed');
            dispatch({
               type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
            });
         } else {
            toast.error('Save Detail Doctor is Errored');
            dispatch({
               type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
         }
      } catch (e) {
         toast.error('Save Detail Doctor is Errored');
         console.log('SAVE_DETAIL_DOCTOR_FAILED', e);
         dispatch({
            type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
         });
      }
   };
};
export const getDetailDoctor = (inputId) => {
   return async (dispatch, getState) => {
      try {
         let res = await getDetailInforDoctor(inputId);
         if (res && res.errCode === 0) {
            dispatch({
               type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
               dataDetail: res.data,
            });
         } else {
            toast.error('GET_DETAIL_DOCTOR_is Errored');
            dispatch({
               type: actionTypes.GET_DETAIL_DOCTOR_FAILED,
            });
         }
      } catch (e) {
         toast.error('GET_DETAIL_DOCTOR is Errored');
         console.log('GET_DETAIL_DOCTOR_FAILED', e);
         dispatch({
            type: actionTypes.GET_DETAIL_DOCTOR_FAILED,
         });
      }
   };
};
//get AllScheduleTime for Doctor
export const fetchAllScheduleTime = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getAllCodeService('TIME');
         if (res && res.errCode === 0) {
            dispatch({
               type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
               dataTime: res.data,
            });
         } else {
            dispatch({
               type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
         }
      } catch (e) {
         console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED', e);
         dispatch({
            type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
         });
      }
   };
};
// get all informatio doctor
export const getRequiredDoctorInfor = () => {
   return async (dispatch, getState) => {
      try {
         let resPrice = await getAllCodeService('PRICE');
         let resPayment = await getAllCodeService('PAYMENT');
         let resProvince = await getAllCodeService('PROVINCE');
         let resSpecialty = await getAllSpecialty();
         let resClinic = await getAllClinics();
         if (
            resPrice &&
            resPrice.errCode === 0 &&
            resPayment &&
            resPayment.errCode === 0 &&
            resProvince &&
            resProvince.errCode === 0 &&
            resSpecialty &&
            resSpecialty.errCode === 0 &&
            resClinic &&
            resClinic.errCode === 0
         ) {
            let data = {
               resPrice: resPrice.data,
               resPayment: resPayment.data,
               resProvince: resProvince.data,
               resSpecialty: resSpecialty.data,
               resClinic: resClinic.data,
            };
            dispatch(fetchRequiredDoctorInforSuccess(data));
         } else {
            dispatch(fetchRequiredDoctorInforFailed());
         }
      } catch (e) {
         console.log('fetch_Required_Doctor_Infor_Failed', e);
         dispatch(fetchRequiredDoctorInforFailed());
      }
   };
};
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
   type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
   data: allRequiredData,
});
export const fetchRequiredDoctorInforFailed = () => ({
   type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});
