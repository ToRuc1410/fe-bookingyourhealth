import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModelEditUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         id: '',
         email: '',
         password: '',
         firstName: '',
         lastName: '',
         address: '',
      };
   }
   componentDidMount() {
      let user = this.props.currentUser;
      if (user && !_.isEmpty(user)) {
         this.setState({
            id: user.id,
            email: user.email,
            // password: 'hashPassword',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
         });
      }
   }
   toggle = () => {
      this.props.toggleFromUserManage();
   };
   handleOnChangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
         ...copyState,
      });
   };
   checkValideInput = () => {
      let isValid = true;
      let arrInput = ['email', 'firstName', 'lastName', 'address'];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            isValid = false;
            alert('Missing Parameter: ' + arrInput[i]);
            break;
         }
      }
      return isValid;
   };
   handleSaveUser = () => {
      let isValid = this.checkValideInput();
      if (isValid) {
         // call ApI edit User
         this.props.editUser(this.state);
      }
   };
   render() {
      return (
         <Modal
            isOpen={this.props.isOpen}
            toggle={() => {
               this.toggle();
            }}
            className={'abcClassName'}
            size="lg"
            centered
         >
            <ModalHeader
               toggle={() => {
                  this.toggle();
               }}
            >
               Edit a New User
            </ModalHeader>
            <ModalBody>
               <div className="container">
                  <div className="row">
                     <div className="row mb-3">
                        <div className="col-12 form-group">
                           <label>Email</label>
                           <input
                              type="email"
                              className="form-control"
                              id="inputEmail4"
                              placeholder="Email"
                              name="email"
                              disabled
                              onChange={(event) => {
                                 this.handleOnChangeInput(event, 'email');
                              }}
                              value={this.state.email}
                           />
                        </div>
                        {/* <div className="col-6 form-group ">
                           <label>Password</label>
                           <input
                              type="password"
                              className="form-control"
                              id="inputPassword4"
                              placeholder="Password"
                              name="password"
                              onChange={(event) => {
                                 this.handleOnChangeInput(event, 'password');
                              }}
                              value={this.state.password}
                           />
                        </div> */}
                     </div>
                     <div className="row mb-3">
                        <div className="form-group col-6">
                           <label>First Name</label>
                           <input
                              type="text"
                              className="form-control"
                              id="FirstName"
                              placeholder="FirstName"
                              name="firstname"
                              onChange={(event) => {
                                 this.handleOnChangeInput(event, 'firstName');
                              }}
                              value={this.state.firstName}
                           />
                        </div>
                        <div className="form-group col-6">
                           <label>Last Name</label>
                           <input
                              type="text"
                              className="form-control"
                              id=">LastName"
                              placeholder="LastName"
                              name="lastname"
                              onChange={(event) => {
                                 this.handleOnChangeInput(event, 'lastName');
                              }}
                              value={this.state.lastName}
                           />
                        </div>
                     </div>
                     <div className="form-group mb-3">
                        <label>Address</label>
                        <input
                           type="text"
                           className="form-control"
                           id="inputAddress"
                           placeholder="1234 Main St"
                           name="address"
                           onChange={(event) => {
                              this.handleOnChangeInput(event, 'address');
                           }}
                           value={this.state.address}
                        />
                     </div>
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button
                  className="btn btn-primary mt-3 px-3"
                  color="primary"
                  onClick={() => {
                     this.handleSaveUser();
                  }}
               >
                  Save Changes
               </Button>{' '}
               <Button
                  className="btn mt-3 px-3"
                  color="secondary"
                  onClick={() => {
                     this.toggle();
                  }}
               >
                  Close
               </Button>
            </ModalFooter>
         </Modal>
      );
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);
