import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import { postBookAppointment } from '../../../../services/userService';
import * as action from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import { toast } from 'react-toastify';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
class BookingModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // fullName: '',
         lastName: '',
         firstName: '',
         phoneNumber: '',
         email: '',
         address: '',
         reason: '',
         birthday: '',
         selectedGender: '',
         doctorId: '',
         genders: '',
         timeType: '',
      };
   }
   componentDidMount() {
      this.props.getGenders();
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.language !== prevProps.language) {
         this.setState({
            genders: this.buildDataGenders(this.props.genders),
         });
      }
      if (this.props.genders !== prevProps.genders) {
         this.setState({
            genders: this.buildDataGenders(this.props.genders),
         });
      }
      if (this.props.dataTime !== prevProps.dataTime) {
         if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
            let doctorId = this.props.dataTime.doctorId;
            let timeType = this.props.dataTime.timeType;
            this.setState({
               doctorId: doctorId,
               timeType: timeType,
            });
         }
      }
   }
   // build genders from API
   buildDataGenders = (data) => {
      let result = [];
      let { language } = this.props;
      if (data && data.length > 0) {
         data.map((item) => {
            let object = {};
            object.label =
               language === LANGUAGES.VI ? item.valueVi : item.valueEn;
            object.value = item.keyMap;
            result.push(object);
         });
      }
      return result;
   };
   buildDoctorName = (dataTime) => {
      let { language } = this.props;
      if (dataTime && !_.isEmpty(dataTime)) {
         let name =
            language === LANGUAGES.VI
               ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
               : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
         return name;
      }
      return '';
   };
   buildTimeBooking = (dataTime) => {
      let { language } = this.props;
      if (dataTime && !_.isEmpty(dataTime)) {
         let time =
            language === LANGUAGES.VI
               ? dataTime.timeTypeData.valueVi
               : dataTime.timeTypeData.valueEn;
         let date =
            language === LANGUAGES.VI
               ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
               : moment
                    .unix(+dataTime.date / 1000)
                    .locale('en')
                    .format('ddd - MM/DD/YYYY');
         return `${time} | ${date}`;
      }
      return '';
   };
   handleOnchangeInput = (event, id) => {
      let valueInput = event.target.value;
      let copyState = { ...this.state };
      copyState[id] = valueInput;
      this.setState({
         ...copyState,
      });
   };
   handleOnchangeDatePicker = (date) => {
      this.setState({
         birthday: date[0],
      });
   };
   handleOnchangeSelect = (selectedOption) => {
      this.setState({
         selectedGender: selectedOption,
      });
   };
   // push up data to API server
   handleConfirmBooking = async () => {
      let date = new Date(this.state.birthday).getTime();
      let timeString = this.buildTimeBooking(this.props.dataTime);
      let doctorName = this.buildDoctorName(this.props.dataTime);
      let res = await postBookAppointment({
         // fullName: this.state.fullName,
         firstName: this.state.firstName,
         lastName: this.state.lastName,
         phoneNumber: this.state.phoneNumber,
         email: this.state.email,
         address: this.state.address,
         reason: this.state.reason,
         birthday: date,
         date: this.props.dataTime.date,
         selectedGender: this.state.selectedGender.value,
         doctorId: this.state.doctorId,
         timeType: this.state.timeType,
         timeString: timeString,
         doctorName: doctorName,
         language: this.props.language,
      });
      if (res && res.errCode === 0) {
         this.setState({
            lastName: '',
            firstName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
         });
         toast.success(
            'Booking a new appointment is Successed. Please Check your mail...'
         );
         this.props.closeModal();
      } else {
         toast.error('Booking a new appointment is Errored...');
      }
   };
   render() {
      // toggle = { toggle }
      let { dataTime, closeModal, isOpenModal } = this.props;
      let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
      return (
         <Modal isOpen={isOpenModal} size="lg" centered>
            <div className="card-body bg-light">
               <div className="d-flex justify-content-between">
                  <h5 className="card-title">
                     <FormattedMessage id="patient.booking-modal.title" />
                  </h5>
                  <span onClick={closeModal}>
                     <i className="fas fa-times"></i>
                  </span>
               </div>
               <div>
                  <ProfileDoctor
                     doctorId={doctorId}
                     dataTime={dataTime}
                     price={true}
                     isShowLinkDetails={false}
                  />
               </div>
            </div>
            <div className="container my-3">
               <div className="row">
                  <div className="col-6 form-group">
                     <label>
                        <FormattedMessage id="patient.booking-modal.lastName" />
                     </label>
                     <input
                        className="form-control"
                        value={this.state.lastName}
                        onChange={(event) =>
                           this.handleOnchangeInput(event, 'lastName')
                        }
                     />
                  </div>
                  <div className="col-6 form-group">
                     <label>
                        <FormattedMessage id="patient.booking-modal.firstName" />
                     </label>
                     <input
                        className="form-control"
                        value={this.state.firstName}
                        onChange={(event) =>
                           this.handleOnchangeInput(event, 'firstName')
                        }
                     />
                  </div>
                  <div className="col-12 form-group">
                     <label>
                        <FormattedMessage id="patient.booking-modal.phone" />
                     </label>
                     <input
                        className="form-control"
                        value={this.state.phoneNumber}
                        onChange={(event) =>
                           this.handleOnchangeInput(event, 'phoneNumber')
                        }
                     />
                  </div>
                  <div className="col-6 form-group">
                     <label>
                        <FormattedMessage id="patient.booking-modal.email" />
                     </label>
                     <input
                        className="form-control"
                        value={this.state.email}
                        onChange={(event) =>
                           this.handleOnchangeInput(event, 'email')
                        }
                     />
                  </div>
                  <div className="col-6 form-group">
                     <label>
                        <FormattedMessage id="patient.booking-modal.address" />
                     </label>
                     <input
                        className="form-control"
                        value={this.state.address}
                        onChange={(event) =>
                           this.handleOnchangeInput(event, 'address')
                        }
                     />
                  </div>
                  <div className="col-12 form-group">
                     <label>
                        <FormattedMessage id="patient.booking-modal.reason" />
                     </label>
                     <input
                        className="form-control"
                        value={this.state.reason}
                        onChange={(event) =>
                           this.handleOnchangeInput(event, 'reason')
                        }
                     />
                  </div>
                  <div className="col-6 form-group">
                     <label>
                        <FormattedMessage id="patient.booking-modal.birthday" />
                     </label>
                     <DatePicker
                        placeholder="Choose Date..."
                        //selected={this.state.currentDate}
                        onChange={this.handleOnchangeDatePicker}
                        className="form-control"
                        value={this.state.birthday}
                     />
                  </div>
                  <div className="col-6 form-group">
                     <label>
                        <FormattedMessage id="patient.booking-modal.gender" />
                     </label>
                     <Select
                        value={this.state.selectedGender}
                        onChange={this.handleOnchangeSelect}
                        options={this.state.genders}
                     />
                  </div>
               </div>
            </div>
            <div className="card-footer py-3">
               <span className="float-end ">
                  <button
                     className="btn btn-warning me-2"
                     onClick={() => this.handleConfirmBooking()}
                  >
                     <FormattedMessage id="patient.booking-modal.confirm" />
                  </button>
                  <button className="btn btn-secondary" onClick={closeModal}>
                     <FormattedMessage id="patient.booking-modal.close" />
                  </button>
               </span>
            </div>
         </Modal>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      genders: state.admin.genders,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      getGenders: () => dispatch(action.fetchGenderStart()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
