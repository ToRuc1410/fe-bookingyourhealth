import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
   constructor(props) {
      super(props)
      this.state = {
         arrDoctors: []
      }
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
         this.setState({
            arrDoctors: this.props.topDoctorsRedux
         })
      }
   }

   componentDidMount() {
      this.props.loadTopDoctors();
   }
   handleViewDetailDoctor = (doctor) => {
      // console.log('check detail doctor: ', doctor)
      this.props.history.push(`/detail-doctor/${doctor.id}`)
   }

   render() {
      // console.log('check data top doctor ', this.props.topDoctorsRedux)
      let arrDoctors = this.state.arrDoctors;
      let language = this.props.language;
      // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
      return (
         <div className="section-share section-outstanding-doctor">
            <div className="section-container">
               <div className="section-header">
                  <span className="title-section"><FormattedMessage id="homepage.outStanding-doctor" /></span>
                  <button className="btn-section"><FormattedMessage id="homepage.more-infor" /></button>
               </div>
               <div className="section-body">
                  <Slider {...this.props.settings}>

                     {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                        let imageBase64 = ''
                        if (item.image) {
                           imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                        }
                        let nameVi = `${item.positionData.valueVi},${item.firstName} ${item.lastName} `
                        let nameEn = `${item.positionData.valueEn},${item.lastName} ${item.firstName}  `
                        return (
                           <div className="section-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                              <div className="outer-bg" style={{ cursor: "pointer" }}>
                                 <div className="bg-img section-outstanding-doctor"
                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                 />
                                 <div className="position text-center">
                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                    <div>Cơ Xương Khớp 1</div>
                                 </div>
                              </div>
                           </div>
                        )
                     })
                     }
                  </Slider>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      isLoggedIn: state.user.isLoggedIn,
      topDoctorsRedux: state.admin.topDoctors
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
   };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
