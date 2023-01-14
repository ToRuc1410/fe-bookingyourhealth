import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { getAllClinics } from '../../../services/userService';
import { withRouter } from 'react-router';
import Slider from 'react-slick';
class MedicalFacility extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dataClinic: [],
      };
   }
   async componentDidMount() {
      let res = await getAllClinics();

      if (res && res.errCode === 0) {
         this.setState({
            dataClinic: res.data ? res.data : [],
         });
      }
   }
   handleViewDetailClinic = (clinicId) => {
      if (this.props.history)
         this.props.history.push(`/detail-clinic/${clinicId.id}`);
   };
   render() {
      let { dataClinic } = this.state;
      return (
         <div className="section-share section-medical-facility">
            <div className="section-container">
               <div className="section-header">
                  <span className="title-section">Cơ Sở Y Tế Nổi Bật</span>
                  <button className="btn-section">Xem Thêm</button>
               </div>
               <div className="section-body">
                  <Slider {...this.props.settings}>
                     {dataClinic &&
                        dataClinic.length > 0 &&
                        dataClinic.map((item, index) => {
                           return (
                              <div
                                 className="section-customize"
                                 key={index}
                                 onClick={() =>
                                    this.handleViewDetailClinic(item)
                                 }
                              >
                                 <div
                                    className="bg-img section-medical-facility"
                                    style={{
                                       backgroundImage: `url(${item.image})`,
                                    }}
                                 />
                                 <div>{item.name}</div>
                              </div>
                           );
                        })}
                  </Slider>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default withRouter(
   connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
