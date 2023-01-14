import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // getData from Redux to UserRedux.js
         genderArr: [],
         positionArr: [],
         roleArr: [],
         isOpen: false,
         previewImageURL: '',
         // init State
         editUserId: '',
         email: '',
         password: '',
         firstName: '',
         lastName: '',
         address: '',
         phoneNumber: '',
         gender: '',
         position: '',
         role: '',
         avatar: '',
         // actions
         action: '',
      };
   }

   async componentDidMount() {
      this.props.getGenderStart();
      this.props.getPositionStart();
      this.props.getRoleStart();
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      // present(this) vs past(previous)
      if (prevProps.genderRedux !== this.props.genderRedux) {
         let arrGenders = this.props.genderRedux;
         this.setState({
            genderArr: arrGenders,
            gender:
               arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
         });
      }
      if (prevProps.positionRedux !== this.props.positionRedux) {
         let arrPositions = this.props.positionRedux;
         this.setState({
            positionArr: arrPositions,
            position:
               arrPositions && arrPositions.length > 0
                  ? arrPositions[0].keyMap
                  : '',
         });
      }
      if (prevProps.roleRedux !== this.props.roleRedux) {
         let arrRoles = this.props.roleRedux;
         this.setState({
            roleArr: arrRoles,
            role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
         });
      }
      if (prevProps.listUsers !== this.props.listUsers) {
         let arrGenders = this.props.genderRedux;
         let arrRoles = this.props.roleRedux;
         let arrPositions = this.props.positionRedux;
         this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender:
               arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            position:
               arrPositions && arrPositions.length > 0
                  ? arrPositions[0].keyMap
                  : '',
            role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
            avatar: '',
            action: CRUD_ACTIONS.CREATE,
            previewImageURL: ''
         });
      }
   }
   handleOnChangeImage = async (event) => {
      let dataFile = event.target.files;
      let file = dataFile[0];
      if (file) {
         let base64 = await CommonUtils.getBase64(file);
         // api của html hỗ trợ xuất file ảnh xem trước
         let imageURL = URL.createObjectURL(file);
         this.setState({
            previewImageURL: imageURL,
            avatar: base64,
         });
      }
   };
   openPreviewImage = () => {
      this.setState({
         isOpen: true,
      });
   };
   // Check ValidateInput
   checkValidateInput = () => {
      let isValid = true;
      let arrCheck = [
         'email',
         'password',
         'firstName',
         'lastName',
         'address',
         'phoneNumber',
      ];
      for (let i = 0; i < arrCheck.length; i++) {
         if (!this.state[arrCheck[i]]) {
            isValid = false;
            alert('This Input is required: ' + arrCheck[i]);
            break;
         }
      }
      return isValid;
   };
   // change Data from Dataform
   onChangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
         ...copyState,
      });
      //console.log('check input', copyState);
   };
   // handleSaveUser
   handleSaveUser = () => {
      let isValid = this.checkValidateInput();
      if (isValid === false) return;
      // call action redux from Api to create a New User 
      let action = this.state.action
      if (action === CRUD_ACTIONS.CREATE) {
         this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            avatar: this.state.avatar,
         });

      }
      if (action === CRUD_ACTIONS.EDIT) {
         this.props.editAnUserRedux({
            id: this.state.editUserId,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            avatar: this.state.avatar,
         });

      }
   };
   handleEditUserFromParent = (user) => {
      let imageBase64 = '';
      if (user.image) {
         imageBase64 = new Buffer(user.image, 'base64').toString('binary');
      }
      this.setState({
         editUserId: user.id,
         email: user.email,
         password: '*****',
         firstName: user.firstName,
         lastName: user.lastName,
         address: user.address,
         phoneNumber: user.phonenumber,
         gender: user.gender,
         position: user.positionId,
         role: user.roleId,
         avatar: '',
         previewImageURL: imageBase64,
         action: CRUD_ACTIONS.EDIT,
      });
   };
   render() {
      let genders = this.state.genderArr;
      let positions = this.state.positionArr;
      let roles = this.state.roleArr;
      let languages = this.props.language;
      let getIsLoadingGender = this.props.isLoadingGender;

      let {
         email,
         password,
         firstName,
         lastName,
         address,
         phoneNumber,
         role,
         position,
         gender,
      } = this.state;
      return (
         <div className='container-fluid'>
            <div className='row'>
               <div className='col-5'>
                  <div className="title">
                     {this.state.action === CRUD_ACTIONS.EDIT ?
                        <FormattedMessage id="manage-user.edit" /> :
                        <FormattedMessage id="manage-user.add" />
                     }
                  </div>
                  <div>{getIsLoadingGender === true ? 'Loading Genders' : ''}</div>
                  <br></br>
                  <div className="container">
                     <div className="row ">
                        <div className="row mb-2">
                           <div className={this.state.action === CRUD_ACTIONS.EDIT ? "col-12" : "col-6"}>
                              <div className="form-outline mb-2 text-primary text-capitalize">
                                 <label
                                    className="form-label"
                                    htmlFor="form6Example5"
                                 >
                                    <FormattedMessage id="manage-user.email" />
                                 </label>
                                 <input
                                    placeholder=" Email"
                                    type="text"
                                    className="form-control"
                                    value={email}
                                    onChange={(event) => {
                                       this.onChangeInput(event, 'email');
                                    }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                 />
                              </div>
                           </div>
                           <div className="col-6">
                              {this.state.action === CRUD_ACTIONS.EDIT ? "" :
                                 <div className="form-outline mb-2 text-primary text-capitalize">
                                    <label
                                       className="form-label"
                                       htmlFor="form6Example3"
                                    >
                                       <FormattedMessage id="manage-user.password" />
                                    </label>
                                    <input
                                       //  {
                                       placeholder="Password"
                                       type="password"
                                       className="form-control"
                                       value={password}
                                       onChange={(event) => {
                                          this.onChangeInput(event, 'password');
                                       }}
                                       disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                       hidden={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                 </div>
                              }
                           </div>
                        </div>
                        <div className="row mb-2">
                           <div className="col">
                              <div className="form-outline text-primary text-capitalize">
                                 <label
                                    className="form-label"
                                    htmlFor="form6Example1"
                                 >
                                    <FormattedMessage id="manage-user.last-name" />
                                 </label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last name"
                                    value={firstName}
                                    onChange={(event) => {
                                       this.onChangeInput(event, 'firstName');
                                    }}
                                 />
                              </div>
                           </div>
                           <div className="col">
                              <div className="form-outline text-primary text-capitalize">
                                 <label
                                    className="form-label"
                                    htmlFor="form6Example2"
                                 >
                                    <FormattedMessage id="manage-user.first-name" />
                                 </label>
                                 <input
                                    placeholder=" First name"
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(event) => {
                                       this.onChangeInput(event, 'lastName');
                                    }}
                                 />
                              </div>
                           </div>
                        </div>
                        <div className="row mb-2">
                           <div className="col">
                              <div className="form-outline mb-2 text-primary text-capitalize">
                                 <label
                                    className="form-label"
                                    htmlFor="form6Example4"
                                 >
                                    <FormattedMessage id="manage-user.address" />
                                 </label>
                                 <input
                                    placeholder="Address"
                                    type="text"
                                    className="form-control"
                                    value={address}
                                    onChange={(event) => {
                                       this.onChangeInput(event, 'address');
                                    }}
                                 />
                              </div>
                           </div>
                           <div className="col">
                              <div className="form-outline mb-2 text-primary text-capitalize">
                                 <label
                                    className="form-label"
                                    htmlFor="form6Example6"
                                 >
                                    <FormattedMessage id="manage-user.phone-number" />
                                 </label>
                                 <input
                                    placeholder="Phone"
                                    type="text"
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(event) => {
                                       this.onChangeInput(event, 'phoneNumber');
                                    }}
                                 />
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-3 form-outline mb-2 text-primary text-capitalize">
                              <label
                                 className="form-label"
                                 htmlFor="form6Example7"
                              >
                                 <FormattedMessage id="manage-user.gender" />
                              </label>
                              <select
                                 className="form-select"
                                 onChange={(event) => {
                                    this.onChangeInput(event, 'gender');
                                 }}
                                 value={gender}
                              >
                                 {genders &&
                                    genders.length > 0 &&
                                    genders.map((item, index) => {
                                       return (
                                          <option key={index} value={item.keyMap}>
                                             {languages === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                          </option>
                                       );
                                    })}
                              </select>
                           </div>
                           <div className="col-3 form-outline mb-2 text-primary text-capitalize">
                              <label
                                 className="form-label"
                                 htmlFor="form6Example7"
                              >
                                 <FormattedMessage id="manage-user.position" />
                              </label>
                              <select
                                 className="form-select"
                                 onChange={(event) => {
                                    this.onChangeInput(event, 'position');
                                 }}
                                 value={position}
                              >
                                 {positions &&
                                    positions.length > 0 &&
                                    positions.map((item, index) => {
                                       return (
                                          <option key={index} value={item.keyMap}>
                                             {languages === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                          </option>
                                       );
                                    })}
                              </select>
                           </div>
                           <div className="col-3 form-outline mb-2 text-primary text-capitalize">
                              <label
                                 className="form-label"
                                 htmlFor="form6Example7"
                              >
                                 <FormattedMessage id="manage-user.role" />
                              </label>
                              <select
                                 className="form-select"
                                 onChange={(event) => {
                                    this.onChangeInput(event, 'role');
                                 }}
                                 value={role}
                              >
                                 {roles &&
                                    roles.length > 0 &&
                                    roles.map((item, index) => {
                                       return (
                                          <option key={index} value={item.keyMap}>
                                             {languages === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                          </option>
                                       );
                                    })}
                              </select>
                           </div>
                           <div className="col-3 form-outline mb-2 text-primary text-capitalize ">
                              <label
                                 className="form-label"
                                 htmlFor="form6Example2"
                              >
                                 <FormattedMessage id="manage-user.image" />
                              </label>

                              <div>
                                 <input
                                    type="file"
                                    className="form-control"
                                    id="previewImg"
                                    onChange={(event) =>
                                       this.handleOnChangeImage(event)
                                    }
                                 />

                                 <div
                                    style={{
                                       border: '1px solid grey',
                                       height: '150px',

                                       backgroundImage: `url(${this.state.previewImageURL})`,
                                       background: 'center center no-repeat',
                                       backgroundSize: 'contain',
                                    }}
                                    onClick={() => this.openPreviewImage()}
                                 ></div>
                              </div>
                              {/* thư viên hỗ trợ xem trước ảnh */}
                              {this.state.isOpen === true && (
                                 <Lightbox
                                    mainSrc={this.state.previewImageURL}
                                    onCloseRequest={() =>
                                       this.setState({ isOpen: false })
                                    }
                                 />
                              )}
                           </div>
                           <div className="text-center">
                              <button
                                 type="submit"
                                 className={
                                    this.state.action === CRUD_ACTIONS.EDIT
                                       ? 'btn btn-warning px-5 py-3'
                                       : 'btn btn-primary px-5 py-3'
                                 }
                                 onClick={() => this.handleSaveUser()}
                              >
                                 {this.state.action === CRUD_ACTIONS.EDIT ?
                                    <FormattedMessage id="manage-user.edit" />
                                    :
                                    <FormattedMessage id="manage-user.save" />
                                 }

                              </button>
                           </div>
                        </div>
                     </div>

                     <hr></hr>
                  </div>
               </div>
               <div className='col-7'>
                  <div className="container-fluid mb-5 pb-5">
                     <TableManageUser
                        // truyền Dữ liệu hàm sang cho TableManageUser(child)

                        handleEditUserFromParent={
                           this.handleEditUserFromParent
                        }
                     />
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      //admin Reducer
      genderRedux: state.admin.genders,
      positionRedux: state.admin.positions,
      roleRedux: state.admin.roles,
      isLoadingGender: state.admin.isLoadingGender,
      listUsers: state.admin.users,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getGenderStart: () => dispatch(actions.fetchGenderStart()),
      getPositionStart: () => dispatch(actions.fetchPositionStart()),
      getRoleStart: () => dispatch(actions.fetchRoleStart()),
      createNewUser: (data) => dispatch(actions.createNewUser(data)),
      fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
      editAnUserRedux: (data) => dispatch(actions.editAnUser(data)),
      // processLogout: () => dispatch(actions.processLogout()),
      // changeLanguageAppRedux: (language) =>
      //    dispatch(actions.changeLanguageApp(language)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
