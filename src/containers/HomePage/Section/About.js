import React, { Component } from 'react';
import { connect } from 'react-redux';
class About extends Component {
   render() {
      return (
         <div className="section-share section-about">
            <div className="section-about-header">
               Truyền thông nói gì về Bạn
            </div>
            <div className="section-about-content">
               <div className="content-left">
                  {/* <iframe
                     width="100%"
                     height="400"
                     src="https://www.youtube.com/embed/jL1bNa3ZItw"
                     title="Bác sĩ Tại Gia (In-Home Doctors)"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen>
                  </iframe> */}
                  {/* <iframe
                     width="100%"
                     height="400"
                     src="https://www.youtube.com/embed/jfKfPfyJRdk"
                     title="lofi hip hop radio - beats to relax/study to"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                  ></iframe> */}
               </div>
               <div className="content-right">

                  <p>
                     Booking Your Health là Nền tảng Y tế chăm sóc sức khỏe toàn diện
                     hàng đầu Việt Nam kết nối người dùng với trên 150 bệnh viện
                     - phòng khám uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và
                     hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                  </p>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
