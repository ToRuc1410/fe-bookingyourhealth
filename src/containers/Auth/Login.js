import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { LANGUAGES } from "../../utils";
import * as actions from "../../store/actions";
// design css login web
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
import { FormattedMessage } from "react-intl";
class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: "",
         password: "",
         errMessage: "",
      };
   }
   handleOnChangeUsername = (event) => {
      this.setState({
         username: event.target.value,
      });
   };
   handleOnChangePassword = (event) => {
      this.setState({
         password: event.target.value,
      });
   };
   handleLogin = async () => {
      this.setState({
         errMessage: "",
      });
      try {
         // if have data
         let data = await handleLoginApi(
            this.state.username,
            this.state.password
         );
         // if unsuccess then
         if (data && data.errCode !== 0) {
            this.setState({
               errMessage: data.message,
            });
         }
         // success
         if (data && data.errCode === 0) {
            this.props.userLoginSuccess(data.user);
            console.log("successed");
         }
      } catch (error) {
         if (error.response) {
            if (error.response.data) {
               this.setState({
                  errMessage: error.response.data.message,
               });
            }
         }
      }
   };
   handleKeyDown = (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
         this.handleLogin();
      }
   };
   handleChangeLanguage = (language) => {
      this.props.changeLanguageAppRedux(language);
   };
   render() {
      let { language } = this.props;
      return (
         <div className="limiter">
            <div className="container-login100">
               <div className="wrap-login100">
                  <div className="col-12 d-flex justify-content-end">
                     <button
                        className={
                           language === LANGUAGES.VI
                              ? "language-vi active btn btn-primary me-1"
                              : "language-vi btn btn-secondary me-1"
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                     >
                        VN
                     </button>
                     <button
                        className={
                           language === LANGUAGES.EN
                              ? "language-en active btn btn-primary"
                              : "language-en btn btn-secondary"
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                     >
                        EN
                     </button>
                  </div>
                  <div className="login100-pic js-tilt" data-tilt>
                     {/* <img src="images/img-01.png" alt="IMG" /> */}
                  </div>

                  {/* <form className="login100-form validate-form"> */}
                  <span className="login100-form-title">
                     <FormattedMessage id="login.login" />
                  </span>

                  <div className="wrap-input100 validate-input">
                     <input
                        className="input100"
                        type="text"
                        name="username"
                        placeholder="Email"
                        value={this.state.username}
                        onChange={(event) => this.handleOnChangeUsername(event)}
                     />
                     <span className="focus-input100"></span>
                     <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                     </span>
                  </div>

                  <div
                     className="wrap-input100 validate-input"
                     data-validate="Password is required"
                  >
                     <input
                        className="input100"
                        type="password"
                        name="pass"
                        placeholder="Password"
                        onChange={(event) => this.handleOnChangePassword(event)}
                        onKeyDown={(event) => this.handleKeyDown(event)}
                     />
                     <span className="focus-input100"></span>
                     <span className="symbol-input100">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                     </span>
                  </div>
                  <div className="txt2" style={{ color: "red" }}>
                     {this.state.errMessage}
                  </div>

                  <div className="container-login100-form-btn">
                     <button
                        className="login100-form-btn"
                        onClick={() => {
                           this.handleLogin();
                        }}
                     >
                        <FormattedMessage id="login.login" />
                     </button>
                  </div>

                  <div className="text-center p-t-12">
                     <span className="txt2">
                        <FormattedMessage id="login.forgot" />
                     </span>

                     <h5>Username / Password?</h5>

                     <hr></hr>
                  </div>

                  <div className="text-center p-t-136 txt2 ">
                     <span className="txt2"> Or Login With: </span>
                     <br></br>

                     <span className="icons">
                        <i className="fab fa-facebook" aria-hidden="true"></i>
                     </span>

                     <span className="icons">
                        <i
                           className="fab fa-google-plus-g"
                           aria-hidden="true"
                        ></i>
                     </span>
                  </div>
                  <div className="text-center p-t-12">
                     <span className="txt2">Sign Up </span>

                     <h5>Create your Account</h5>

                     <hr></hr>
                  </div>
                  {/* </form> */}
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      navigate: (path) => dispatch(push(path)),
      // userLoginFail: () => dispatch(actions.adminLoginFail()),
      userLoginSuccess: (userInfo) =>
         dispatch(actions.userLoginSuccess(userInfo)),
      changeLanguageAppRedux: (language) =>
         dispatch(actions.changeLanguageApp(language)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
