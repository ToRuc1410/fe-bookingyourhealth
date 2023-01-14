import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from '../../../components/Input/DatePicker';
import {
   getAllPatientForDoctor,
   postSendRemedy,
} from '../../../services/userService';
import './ManagePatient.scss';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import RemedyModal from './RemedyModal';
class ManagePatient extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currentDate: moment(new Date()).startOf('day').valueOf(),
         dataPatient: [],
         isOpenRemedyModal: false,
         dataModal: {},
         isShowLoading: false,
      };
   }
   async componentDidMount() {
      this.getDataPatient();
   }
   componentDidUpdate(prevProps, prevState, snapshot) {}

   getDataPatient = async () => {
      let { user } = this.props;
      let { currentDate } = this.state;
      let formatedDate = new Date(currentDate).getTime();
      let res = await getAllPatientForDoctor({
         doctorId: user.id,
         date: formatedDate,
      });
      if (res && res.errCode === 0) {
         this.setState({
            dataPatient: res.data,
         });
      }
   };

   handleOnchangeDatePicker = (date) => {
      this.setState(
         {
            currentDate: date[0],
         },
         async () => {
            await this.getDataPatient();
         }
      );
   };
   // !data.email ||
   // !data.doctorId ||
   // !data.patientId ||
   // !data.timeType ||
   // !data.imgBase64
   handleConfirm = (item) => {
      console.log(item);
      let data = {
         doctorId: item.doctorId,
         patientId: item.patientId,
         email: item.patientData.email,
         timeType: item.timeType,
         patientLastName: item.patientData.lastName,
         patientFirstName: item.patientData.firstName,
      };
      this.setState({
         isOpenRemedyModal: true,
         dataModal: data,
      });
   };
   closeRemedyModal = () => {
      this.setState({
         isOpenRemedyModal: false,
         dataModal: {},
      });
   };
   sendRemedy = async (dataChild) => {
      let { dataModal } = this.state;
      this.setState({
         isShowLoading: true,
      });
      let res = await postSendRemedy({
         email: dataChild.email,
         imgBase64: dataChild.imgBase64,
         doctorId: dataModal.doctorId,
         patientId: dataModal.patientId,
         timeType: dataModal.timeType,
         language: this.props.language,
         patientLastName: dataModal.patientLastName,
         patientFirstName: dataModal.patientFirstName,
      });
      if (res && res.errCode === 0) {
         this.setState({
            isShowLoading: false,
         });
         toast.success('Send Success...');
         this.closeRemedyModal();
         await this.getDataPatient();
      } else {
         this.setState({
            isShowLoading: false,
         });
         toast.error('Send wrongs...');
         this.closeRemedyModal();
      }
   };

   render() {
      let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
      let { language } = this.props;
      return (
         <React.Fragment>
            <LoadingOverlay
               active={this.state.isShowLoading}
               spinner
               text="Loading..."
            >
               <div className="bg-light">
                  <div className="container-fluid">
                     <h3 className="card-title text-uppercase fw-bolder p-3 text-center">
                        {/* <FormattedMessage id="manage-schedule.title" /> */}
                        Quản Lý Bệnh Nhân Khám Bệnh
                     </h3>
                     <div className="container pb-3">
                        <div className="col-6 form-group rounded-3 mb-3">
                           <label>
                              {/* <FormattedMessage id="manage-schedule.date" /> */}
                              Chọn Ngày Khám
                           </label>
                           <DatePicker
                              placeholder="Choose Date..."
                              //selected={this.state.currentDate}
                              onChange={this.handleOnchangeDatePicker}
                              className="form-control"
                              value={this.state.currentDate}
                           />
                        </div>
                        <table className="table table-hover">
                           <thead>
                              <tr>
                                 <th>STT</th>
                                 <th>Thời Gian</th>
                                 <th>Họ Và Tên</th>
                                 <th>Địa Chỉ</th>
                                 <th>Giới Tính</th>
                                 <th>Lý do Khám</th>
                                 <th></th>
                              </tr>
                           </thead>
                           <tbody>
                              {dataPatient && dataPatient.length > 0 ? (
                                 dataPatient.map((item, index) => {
                                    let time =
                                       language === LANGUAGES.VI
                                          ? item.timeTypeBooking.valueVi
                                          : item.timeTypeBooking.valueEn;
                                    let gender =
                                       language === LANGUAGES.VI
                                          ? item.patientData.genderData.valueVi
                                          : item.patientData.genderData.valueEn;

                                    return (
                                       <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>
                                             {item.timeTypeBooking.valueVi}
                                          </td>
                                          <td>
                                             {item.patientData.lastName}
                                             {item.patientData.firstName}
                                          </td>
                                          <td>{item.patientData.address}</td>
                                          <td>
                                             {
                                                item.patientData.genderData
                                                   .valueVi
                                             }
                                          </td>
                                          <td>{item.reason}</td>
                                          <td>
                                             <button
                                                className="btn btn-danger mx-3"
                                                onClick={() =>
                                                   this.handleConfirm(item)
                                                }
                                             >
                                                Xác Nhận
                                             </button>
                                          </td>
                                       </tr>
                                    );
                                 })
                              ) : (
                                 <tr>
                                    <td
                                       colSpan="6"
                                       style={{ textAlign: 'center' }}
                                    >
                                       nodata
                                    </td>
                                 </tr>
                              )}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
               <RemedyModal
                  isOpenModal={isOpenRemedyModal}
                  dataModal={dataModal}
                  closeRemedyModal={this.closeRemedyModal}
                  sendRemedy={this.sendRemedy}
               ></RemedyModal>
            </LoadingOverlay>
         </React.Fragment>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      user: state.user.userInfo,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
