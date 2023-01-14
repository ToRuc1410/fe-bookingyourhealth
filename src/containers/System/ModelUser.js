import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModelUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         firstName: '',
         lastName: '',
         address: '',
      };
      this.listenToEmitter();
   }
   listenToEmitter() {
      emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
         this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
         });
      });
   }
   componentDidMount() { }
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
      let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            isValid = false;
            alert('Missing Parameter: ' + arrInput[i]);
            break;
         }
      }
      return isValid;
   };
   handleAddNewUser = () => {
      let isValid = this.checkValideInput();
      if (isValid) {
         this.props.createNewUser(this.state);
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
               Create a New User
            </ModalHeader>
            <ModalBody>
               <div className="container">
                  <div className="row">
                     <div className="row mb-3">
                        <div className="col-6 form-group ">
                           <label>Email</label>
                           <input
                              className="form-control"
                              type="email"
                              placeholder="Email"
                              name="email"
                              onChange={(event) => {
                                 this.handleOnChangeInput(event, 'email');
                              }}
                              value={this.state.email}
                           />
                        </div>
                        <div className="col-6 form-group ">
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
                        </div>
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
                     this.handleAddNewUser();
                  }}
               >
                  Add New User
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);
