import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postVerifyAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';

class VerifyEmail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         statusVerify: false,
         errCode: 0,
      };
   }
   async componentDidMount() {
      if (this.props.location && this.props.location.search) {
         let urlParams = new URLSearchParams(this.props.location.search);
         let token = urlParams.get('token');
         let doctorId = urlParams.get('doctorId');
         let res = await postVerifyAppointment({
            token: token,
            doctorId: doctorId,
         });
         if (res && res.errCode === 0) {
            this.setState({
               statusVerify: true,
               errCode: res.errCode,
            });
         } else {
            this.setState({
               statusVerify: false,
               errCode: res && res.errCode ? res.errCode : -1,
            });
         }
      }
   }

   async componentDidUpdate(prevProps, prevState, snapshot) {}

   render() {
      let { statusVerify, errCode } = this.state;
      return (
         <>
            <HomeHeader />
            <div>
               {statusVerify === true ? (
                  <div>
                     <h3 className="text-danger">
                        {' '}
                        Xác Nhận Lịch Hẹn Thành Công!!!
                     </h3>
                  </div>
               ) : (
                  <div>
                     {statusVerify === false && errCode === 2 ? (
                        <h3 className="text-danger">
                           Lịch Hẹn Của Bạn Đã Được Xác Nhận
                        </h3>
                     ) : (
                        <h3 className="text-danger">Loading....</h3>
                     )}
                  </div>
               )}
            </div>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
