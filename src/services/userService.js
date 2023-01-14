import axios from '../axios';

// API for User
const handleLoginApi = (userEmail, userPassword) => {
   return axios.post('/api/login', {
      email: userEmail,
      password: userPassword,
   });
};

const getAllUsers = (inputId) => {
   // template String of ES6
   return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
   return axios.post('/api/create-new-user', data);
};
const deleteUserService = (userId) => {
   // return axios.delete('/api/delete-user', { id: userId });
   return axios.delete('/api/delete-user', {
      data: { id: userId },
   });
};
const editUserService = (inputData) => {
   return axios.put('/api/edit-user', inputData);
};
const getAllCodeService = (inputType) => {
   return axios.get(`/api/allcode?type=${inputType}`);
};

// API handle Doctor
const getTopDoctorHomeService = (limit) => {
   return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
   return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctor = (data) => {
   return axios.post('/api/save-infor-doctor', data);
};
const getDetailInforDoctor = (inputId) => {
   return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
const getDoctorMarkdown = (inputId) => {
   return axios.get(`/api/get-doctor-markdown?id=${inputId}`);
};
const saveBulkScheduleDoctor = (data) => {
   return axios.post('/api/bulk-create-schedule', data);
};

const getScheduleByDate = (doctorId, date) => {
   return axios.get(
      `/api/get-schedule-of-doctor?doctorId=${doctorId}&date=${date}`
   );
};
const getExtraInforDrById = (doctorId) => {
   return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
   return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postBookAppointment = (data) => {
   return axios.post('/api/patient-book-appointment', data);
};
const postVerifyAppointment = (data) => {
   return axios.post('/api/verify-book-appointment', data);
};
const createNewSpecialty = (data) => {
   return axios.post('/api/create-new-specialty', data);
};
const getAllSpecialty = () => {
   return axios.get(`/api/get-all-specialties`);
};
const getDetailSpecialtyById = (data) => {
   return axios.get(
      `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
   );
};

// API handle Clinic
const createNewClinic = (data) => {
   return axios.post('/api/create-new-clinic', data);
};
const getAllClinics = () => {
   return axios.get(`/api/get-all-clinics`);
};
// API get detail clinic by Id
const getDetailClinicById = (id) => {
   return axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
};
// handle Patient
const getAllPatientForDoctor = (data) => {
   return axios.get(
      `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
   );
};
const postSendRemedy = (data) => {
   return axios.post('/api/send-remedy', data);
};
export {
   handleLoginApi,
   getAllUsers,
   createNewUserService,
   deleteUserService,
   editUserService,
   getAllCodeService,
   getTopDoctorHomeService,
   getAllDoctors,
   saveDetailDoctor,
   getDetailInforDoctor,
   getDoctorMarkdown,
   saveBulkScheduleDoctor,
   getScheduleByDate,
   getExtraInforDrById,
   getProfileDoctorById,
   postBookAppointment,
   postVerifyAppointment,
   createNewSpecialty,
   getAllSpecialty,
   getDetailSpecialtyById,
   createNewClinic,
   getDetailClinicById,
   getAllClinics,
   getAllPatientForDoctor,
   postSendRemedy,
};
