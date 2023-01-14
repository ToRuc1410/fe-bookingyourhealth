import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt(/* Markdown-it options */);
/*
 * Life cycle
 * Run component:
 * 1. Run constructor -> init States
 * 2. Run DidMount -> set States
 * 3. Run Render
 */
class ManageDoctor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // save to markDown table
         contentMarkdown: '',
         contentHTML: '',
         description: '',
         hasOldData: false,
         listDoctors: [],
         selectedDoctor: '',
         // save to doctor_infor table
         listPrice: [],
         listPayment: [],
         listProvince: [],
         listClinic: [],
         listSpecialty: [],
         selectedPrice: '',
         selectedPayment: '',
         selectedProvince: '',
         selectedClinic: '',
         selectedSpecialty: '',
         nameClinic: '',
         addressClinic: '',
         note: '',
         clinicId: '',
         specialtyId: '',
      };
   }
   componentDidMount() {
      this.props.fetchAllDoctor();
      this.props.getRequiredDoctorInfor();
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      // Update changed AllDoctors
      if (prevProps.allDoctors !== this.props.allDoctors) {
         let dataSelect = this.buildDataInputSelect(
            this.props.allDoctors,
            'USERS'
         );
         this.setState({
            listDoctors: dataSelect,
         });
      }
      if (
         prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
      ) {
         let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
            this.props.allRequiredDoctorInfor;
         let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
         let dataSelectPayment = this.buildDataInputSelect(
            resPayment,
            'PAYMENT'
         );
         let dataSelectProvince = this.buildDataInputSelect(
            resProvince,
            'PROVINCE'
         );
         let dataSpecialty = this.buildDataInputSelect(
            resSpecialty,
            'SPECIALTY'
         );
         let dataClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
         // let dataClinic = this.buildDataInputSelect(resClinic, "CLINIC")
         this.setState({
            listPrice: dataSelectPrice,
            listPayment: dataSelectPayment,
            listProvince: dataSelectProvince,
            listSpecialty: dataSpecialty,
            listClinic: dataClinic,
         });
      }
      // Update when change languages
      if (prevProps.language !== this.props.language) {
         let dataSelect = this.buildDataInputSelect(
            this.props.allDoctors,
            'USERS'
         );
         let { resPayment, resPrice, resProvince } =
            this.props.allRequiredDoctorInfor;
         let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
         let dataSelectPayment = this.buildDataInputSelect(
            resPayment,
            'PAYMENT'
         );
         let dataSelectProvince = this.buildDataInputSelect(
            resProvince,
            'PROVINCE'
         );
         let dataSelectClinic = this.buildDataInputSelect(
            resProvince,
            'CLINIC'
         );
         this.setState({
            listDoctors: dataSelect,
            listPrice: dataSelectPrice,
            listPayment: dataSelectPayment,
            listProvince: dataSelectProvince,
            listClinic: dataSelectClinic,
         });
      }
   }
   // get data with type with Name
   buildDataInputSelect = (inputData, type) => {
      let result = [];
      let language = this.props.language;
      if (inputData && inputData.length > 0) {
         if (type === 'USERS') {
            inputData.map((item, index) => {
               let object = {};
               let labelEn = `${item.lastName} ${item.firstName}`;
               let labelVi = `${item.firstName} ${item.lastName}`;
               object.label = language === LANGUAGES.VI ? labelVi : labelEn;
               object.id = item.id;
               result.push(object);
            });
         } else if (type === 'PRICE') {
            inputData.map((item, index) => {
               let object = {};
               let labelEn = `${item.valueEn} USD`;
               let labelVi = `${item.valueVi}`;
               object.label = language === LANGUAGES.VI ? labelVi : labelEn;
               object.key = item.keyMap;
               result.push(object);
            });
         } else if (type === 'PAYMENT' || type === 'PROVINCE') {
            inputData.map((item, index) => {
               let object = {};
               let labelEn = `${item.valueEn}`;
               let labelVi = `${item.valueVi}`;
               object.label = language === LANGUAGES.VI ? labelVi : labelEn;
               object.key = item.keyMap;
               result.push(object);
            });
         } else if (type === 'SPECIALTY') {
            inputData.map((item, index) => {
               let object = {};
               object.label = item.name;
               object.key = item.id;
               result.push(object);
            });
         } else if (type === 'CLINIC') {
            inputData.map((item, index) => {
               let object = {};
               object.label = item.name;
               object.key = item.id;
               result.push(object);
            });
         }
      }
      return result;
   };

   // Finish!
   handleEditorChange = ({ html, text }) => {
      this.setState({
         contentMarkdown: text,
         contentHTML: html,
      });
   };
   handleSaveContentMarkdown = () => {
      let { hasOldData } = this.state;
      this.props.saveDetailADoctor({
         contentHTML: this.state.contentHTML,
         contentMarkdown: this.state.contentMarkdown,
         description: this.state.description,
         doctorId: this.state.selectedDoctor.id,
         // if a have data => Edit : CREATE
         action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
         selectedPrice: this.state.selectedPrice.key,
         selectedPayment: this.state.selectedPayment.key,
         selectedProvince: this.state.selectedProvince.key,
         nameClinic: this.state.nameClinic,
         addressClinic: this.state.addressClinic,
         note: this.state.note,
         specialtyId: this.state.selectedSpecialty.key,
         clinicId:
            this.state.selectedClinic && this.state.selectedClinic.key
               ? this.state.selectedClinic.key
               : '',
      });
      this.setState({
         contentHTML: '',
         contentMarkdown: '',
         description: '',
         hasOldData: false,
         selectedDoctor: '',
         selectedPrice: '',
         selectedPayment: '',
         selectedProvince: '',
         selectedSpecialty: '',
         selectedClinic: '',
         nameClinic: '',
         addressClinic: '',
         note: '',
      });
   };
   handleChangeSelect = async (selectedDoctor) => {
      this.setState({ selectedDoctor });
      let { listPrice, listPayment, listProvince, listSpecialty, listClinic } =
         this.state;
      let res = await getDetailInforDoctor(selectedDoctor.id);
      if (res && res.errCode === 0 && res.data && res.data.Markdown) {
         let markDown = res.data.Markdown;
         let addressClinic = '',
            nameClinic = '',
            clinicId = '',
            note = '',
            paymentId = '',
            priceId = '',
            provinceId = '',
            selectedPrice = '',
            selectedPayment = '',
            selectedProvince = '',
            selectedSpecialty = '',
            selectedClinic = '',
            specialtyId = '';
         if (res.data.Doctor_Infor) {
            addressClinic = res.data.Doctor_Infor.addressClinic;
            nameClinic = res.data.Doctor_Infor.nameClinic;
            note = res.data.Doctor_Infor.note;
            paymentId = res.data.Doctor_Infor.paymentId;
            priceId = res.data.Doctor_Infor.priceId;
            provinceId = res.data.Doctor_Infor.provinceId;
            specialtyId = res.data.Doctor_Infor.specialtyId;
            clinicId = res.data.Doctor_Infor.clinicId;
            selectedProvince = listProvince.find((item) => {
               return item && item.key === provinceId;
            });
            selectedPrice = listPrice.find((item) => {
               return item && item.key === priceId;
            });
            selectedPayment = listPayment.find((item) => {
               return item && item.key === paymentId;
            });
            selectedSpecialty = listSpecialty.find((item) => {
               return item && item.key === specialtyId;
            });
            selectedClinic = listClinic.find((item) => {
               return item && item.key === clinicId;
            });
         }
         this.setState({
            contentHTML: markDown.contentHTML,
            contentMarkdown: markDown.contentMarkdown,
            description: markDown.description,
            addressClinic: addressClinic,
            nameClinic: nameClinic,
            note: note,
            selectedPayment: selectedPayment,
            selectedPrice: selectedPrice,
            selectedProvince: selectedProvince,
            selectedSpecialty: selectedSpecialty,
            selectedClinic: selectedClinic,
            hasOldData: true,
         });
      } else {
         this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            addressClinic: '',
            nameClinic: '',
            note: '',
            hasOldData: false,
            selectedPayment: '',
            selectedPrice: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
         });
      }
   };

   handleSelectDrInfor = async (selectedOption, Optionname) => {
      let stateName = Optionname.name;
      // get select data drInfor name
      let stateCopy = { ...this.state };
      stateCopy[stateName] = selectedOption;
      this.setState({
         ...stateCopy,
      });
   };
   handleOnChangeText = (event, id) => {
      let stateCopy = { ...this.state };
      stateCopy[id] = event.target.value;
      this.setState({
         ...stateCopy,
      });
   };
   render() {
      let { hasOldData } = this.state;
      console.log('check data :', this.state);
      return (
         <div className="container-fluid">
            <div className="title mb-3">
               <FormattedMessage id={'admin.manage-doctor.title'} />
               <p> Note:"Images get My Git clone to My Web" </p>
            </div>
            <div className="container-fluid">
               <div className="row mb-3">
                  <div className="col-5 ">
                     <label>
                        <FormattedMessage
                           id={'admin.manage-doctor.choose-doctor'}
                        />
                     </label>
                     <Select
                        className="bg-light"
                        value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.listDoctors}
                        placeholder={'Chọn bác sĩ'}
                        name="selectedDr"
                        theme={(theme) => ({
                           ...theme,
                           colors: {
                              ...theme.colors,
                              primary: '#a9accd',
                           },
                        })}
                     />
                  </div>
                  <div className="col-7 form-floating">
                     <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        style={{ height: '90px' }}
                        onChange={(event) =>
                           this.handleOnChangeText(event, 'description')
                        }
                        value={this.state.description}
                     />

                     <label htmlFor="floatingTextarea">
                        <FormattedMessage
                           id={'admin.manage-doctor.introduce'}
                        />
                     </label>
                  </div>
               </div>
               <div className="row">
                  <div className="col-4 mb-3">
                     <label>
                        <FormattedMessage id={'admin.manage-doctor.price'} />
                     </label>
                     <Select
                        className="bg-light"
                        value={this.state.selectedPrice}
                        onChange={this.handleSelectDrInfor}
                        options={this.state.listPrice}
                        placeholder={
                           <FormattedMessage id={'admin.manage-doctor.price'} />
                        }
                        name="selectedPrice"
                        theme={(theme) => ({
                           ...theme,
                           borderRadius: 0,
                           colors: {
                              ...theme.colors,
                              primary: '#a9accd',
                           },
                        })}
                     />
                  </div>
                  <div className="col-4 mb-3">
                     <label>
                        <FormattedMessage id={'admin.manage-doctor.payment'} />
                     </label>
                     <Select
                        className="bg-light"
                        value={this.state.selectedPayment}
                        onChange={this.handleSelectDrInfor}
                        options={this.state.listPayment}
                        placeholder={
                           <FormattedMessage
                              id={'admin.manage-doctor.payment'}
                           />
                        }
                        name="selectedPayment"
                        theme={(theme) => ({
                           ...theme,
                           borderRadius: 0,
                           colors: {
                              ...theme.colors,
                              primary: '#a9accd',
                           },
                        })}
                     />
                  </div>
                  <div className="col-4 mb-3">
                     <label>
                        <FormattedMessage id={'admin.manage-doctor.province'} />
                     </label>
                     <Select
                        className="bg-light"
                        value={this.state.selectedProvince}
                        onChange={this.handleSelectDrInfor}
                        options={this.state.listProvince}
                        placeholder={
                           <FormattedMessage
                              id={'admin.manage-doctor.province'}
                           />
                        }
                        name="selectedProvince"
                        theme={(theme) => ({
                           ...theme,
                           borderRadius: 0,
                           colors: {
                              ...theme.colors,
                              primary: '#a9accd',
                           },
                        })}
                     />
                  </div>
                  <div className="col-4 mb-3">
                     <label>
                        <FormattedMessage
                           id={'admin.manage-doctor.nameClinic'}
                        />
                     </label>
                     <input
                        className="form-control"
                        onChange={(event) =>
                           this.handleOnChangeText(event, 'nameClinic')
                        }
                        value={this.state.nameClinic}
                     />
                  </div>
                  <div className="col-4 mb-3">
                     <label>
                        <FormattedMessage
                           id={'admin.manage-doctor.addressClinic'}
                        />
                     </label>
                     <input
                        className="form-control"
                        onChange={(event) =>
                           this.handleOnChangeText(event, 'addressClinic')
                        }
                        value={this.state.addressClinic}
                     />
                  </div>
                  <div className="col-4 mb-3">
                     <label>
                        <FormattedMessage id={'admin.manage-doctor.note'} />
                     </label>
                     <input
                        className="form-control"
                        onChange={(event) =>
                           this.handleOnChangeText(event, 'note')
                        }
                        value={this.state.note}
                     />
                  </div>
               </div>
               <div className="row">
                  <div className="col-4 mb-3">
                     <label>
                        <FormattedMessage
                           id={'admin.manage-doctor.select-speciality'}
                        />
                     </label>
                     <Select
                        className="bg-light"
                        value={this.state.selectedSpecialty}
                        onChange={this.handleSelectDrInfor}
                        options={this.state.listSpecialty}
                        placeholder={
                           <FormattedMessage
                              id={'admin.manage-doctor.select-speciality'}
                           />
                        }
                        name="selectedSpecialty"
                        theme={(theme) => ({
                           ...theme,
                           borderRadius: 0,
                           colors: {
                              ...theme.colors,
                              primary: '#a9accd',
                           },
                        })}
                     />
                  </div>
                  <div className="col-4 mb-3">
                     <label>
                        <FormattedMessage
                           id={'admin.manage-doctor.select-clinic'}
                        />
                     </label>
                     <Select
                        className="bg-light"
                        value={this.state.selectedClinic}
                        onChange={this.handleSelectDrInfor}
                        options={this.state.listClinic}
                        placeholder={
                           <FormattedMessage
                              id={'admin.manage-doctor.select-clinic'}
                           />
                        }
                        name="selectedClinic"
                        theme={(theme) => ({
                           ...theme,
                           borderRadius: 0,
                           colors: {
                              ...theme.colors,
                              primary: '#a9accd',
                           },
                        })}
                     />
                  </div>
               </div>
            </div>
            <div>
               <h3 className="card-header text-center">
                  <b>
                     <FormattedMessage id={'admin.manage-doctor.information'} />
                  </b>
               </h3>
               <MdEditor
                  style={{ height: '300px' }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={this.state.contentMarkdown}
               />
            </div>
            <div>
               <button
                  onClick={() => this.handleSaveContentMarkdown()}
                  className={
                     hasOldData === false
                        ? 'btn btn-outline-primary m-3 px-auto'
                        : 'btn btn-outline-warning m-3 px-auto'
                  }
               >
                  {hasOldData === false ? (
                     <span>
                        <FormattedMessage id={'admin.manage-doctor.add'} />
                     </span>
                  ) : (
                     <span>
                        <FormattedMessage id={'admin.manage-doctor.save'} />
                     </span>
                  )}
               </button>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      allDoctors: state.admin.allDoctors,
      allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
      getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
      saveDetailADoctor: (data) => dispatch(actions.saveDetailADoctor(data)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
