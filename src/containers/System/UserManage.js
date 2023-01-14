import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   getAllUsers,
   createNewUserService,
   deleteUserService,
   editUserService,
} from '../../services/userService';
import ModelUser from './ModelUser';
import ModelEditUser from './ModelEditUser';
import { emitter } from '../../utils/emitter';

/*
 * Life cycle
 * Run component:
 * 1. Run constructor -> init States
 * 2. Run DidMount -> set States
 * 3. Run Render
 */
class UserManage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrUsers: [],
         isOpenModelUser: false,
         isOpenModelEditUser: false,
         userEdit: {},
      };
   }

   async componentDidMount() {
      await this.getAllUsersFromReact();
   }
   getAllUsersFromReact = async () => {
      let response = await getAllUsers('ALL');
      if (response && response.errCode === 0) {
         this.setState({
            arrUsers: response.users,
         });
      }
   };
   handleAddNewUser = () => {
      this.setState({
         isOpenModelUser: true,
      });
   };
   toggleUserModel = () => {
      this.setState({
         isOpenModelUser: !this.state.isOpenModelUser,
      });
   };
   toggleUserEditModel = () => {
      this.setState({
         isOpenModelEditUser: !this.state.isOpenModelEditUser,
      });
   };
   createNewUser = async (data) => {
      try {
         let response = await createNewUserService(data);
         if (response && response.errCode !== 0) {
            alert(response.errMessage);
         } else {
            await this.getAllUsersFromReact();
            this.setState({
               isOpenModelUser: false,
            });
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
         }
      } catch (e) {
         console.log(e);
      }
   };
   handleDeleteUser = async (user) => {
      try {
         if (window.confirm('Are you sure you want to delete this User?')) {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
               return await this.getAllUsersFromReact();
            } else {
               return res.errMessege;
            }
         }
      } catch (e) {
         console.log(e);
      }
   };
   handleEditUser = (user) => {
      this.setState({
         isOpenModelEditUser: true,
         userEdit: user,
      });
   };
   doEditUser = async (user) => {
      try {
         let res = await editUserService(user);
         if (res && res.errCode === 0) {
            this.setState({
               isOpenModelEditUser: false,
            });
            await this.getAllUsersFromReact();
         } else {
            alert(res.errMessage);
         }
      } catch (e) {
         console.log(e);
      }
   };
   render() {
      let arrUsers = this.state.arrUsers;
      return (
         <div className="users-constainer">
            <ModelUser
               isOpen={this.state.isOpenModelUser}
               toggleFromUserManage={this.toggleUserModel}
               createNewUser={this.createNewUser}
            />
            {/* Xét nếu isOpenModelEditUser === True thì mới sinh mount(born) biến User qua cho ModelEditUser  */}
            {this.state.isOpenModelEditUser && (
               <ModelEditUser
                  isOpen={this.state.isOpenModelEditUser}
                  toggleFromUserManage={this.toggleUserEditModel}
                  currentUser={this.state.userEdit}
                  editUser={this.doEditUser}
               />
            )}
            <div className="title text-center">Manage Users With ToRuc</div>
            <div className="mx-1">
               <button
                  className="btn btn-primary px-3 m-3"
                  onClick={() => this.handleAddNewUser()}
               >
                  <i className="fas fa-user-plus"> Add New User</i>
               </button>
            </div>
            <div className="users-table">
               <table className="table table-hover">
                  <thead style={{ backgroundColor: '#CC99FF' }}>
                     <tr>
                        <th>Email</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Address</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {arrUsers &&
                        arrUsers.map((item, index) => {
                           return (
                              <tr key={index}>
                                 <td>{item.email}</td>
                                 <td>{item.firstName}</td>
                                 <td>{item.lastName}</td>
                                 <td>{item.address}</td>
                                 <td>
                                    <button
                                       className="btn btn-outline-warning rounded-pill"
                                       onClick={() => this.handleEditUser(item)}
                                    >
                                       <i className="fas fa-edit btn-lg "></i>
                                    </button>

                                    <button
                                       className="btn btn-outline-danger rounded-pill"
                                       onClick={() =>
                                          this.handleDeleteUser(item)
                                       }
                                    >
                                       <i className="fas fa-trash btn-lg "></i>
                                    </button>
                                 </td>
                              </tr>
                           );
                        })}
                  </tbody>
               </table>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
