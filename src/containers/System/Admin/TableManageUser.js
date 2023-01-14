import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';


/*
 * Life cycle
 * Run component:
 * 1. Run constructor -> init States
 * 2. Run DidMount -> set States
 * 3. Run Render
 */
class TableManageUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         usersRedux: [],
      };
   }
   componentDidMount() {
      this.props.fetchUserRedux();
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.listUsers !== this.props.listUsers) {
         this.setState({
            usersRedux: this.props.listUsers,
         });
      }
   }
   handleDeleteUser = (user) => {
      this.props.deleteAnUserRedux(user.id);
   };
   handleEditUser = (user) => {
      // console.log('check user from list Users ', user);
      this.props.handleEditUserFromParent(user);
   };
   render() {
      let arrUsers = this.state.usersRedux;

      return (
         <React.Fragment>
            <div className="title mb-3">
               <FormattedMessage id="manage-user.listUsers" />
            </div>
            <table className="table table-hover">
               <thead style={{ backgroundColor: '#CC99FF' }}>
                  <tr>
                     <th>Email</th>
                     <th>Firstname</th>
                     <th>Lastname</th>
                     <th>Address</th>
                     <th>phoneNumber</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {arrUsers &&
                     arrUsers.length > 0 &&
                     arrUsers.map((item, index) => {
                        return (
                           <tr key={index}>
                              <td>{item.email}</td>
                              <td>{item.firstName}</td>
                              <td>{item.lastName}</td>
                              <td>{item.address}</td>
                              <td>{item.phonenumber}</td>
                              <td>
                                 <button
                                    className="btn btn-outline-warning rounded-pill"
                                    onClick={() => this.handleEditUser(item)}
                                 >
                                    <i className="fas fa-edit btn-lg "></i>
                                 </button>

                                 <button
                                    className="btn btn-outline-danger rounded-pill"
                                    onClick={() => this.handleDeleteUser(item)}
                                 >
                                    <i className="fas fa-trash btn-lg "></i>
                                 </button>
                              </td>
                           </tr>
                        );
                     })}
               </tbody>
            </table>
            {/* <div className="title mb-3">
               Markdown
               <p> Note:"Images get My Git clone to My Web" </p>
            </div>
            <MdEditor style={{ height: '500px' }}
               renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
         </React.Fragment>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      listUsers: state.admin.users,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
      deleteAnUserRedux: (id) => dispatch(actions.deleteAnUser(id)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
