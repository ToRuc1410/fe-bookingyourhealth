import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllSpecialty } from '../../../services/userService'

class Specialty extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dataSpecialty: []
      }
   }
   async componentDidMount() {
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
         this.setState({
            dataSpecialty: res.data ? res.data : []
         })
      }
   }
   handleViewDetailSpecialty = (item) => {
      if (this.props.history) {
         this.props.history.push(`/detail-specialty/${item.id}`)
      }
   }
   render() {
      let { dataSpecialty } = this.state;
      return (
         <div className="section-share section-specialty">
            <div className="section-container">
               <div className="section-header">
                  <span className="title-section"><FormattedMessage id="homepage.specialty-popular" /></span>
                  <button className="btn-section"><FormattedMessage id="homepage.more-infor" /></button>
               </div>
               <div className="section-body">
                  <Slider {...this.props.settings}>
                     {dataSpecialty && dataSpecialty.length > 0
                        && dataSpecialty.map((item, index) => {
                           return (
                              <div className="section-customize section-specialty"
                                 key={index}
                                 onClick={() => this.handleViewDetailSpecialty(item)}
                              >
                                 <div className="bg-img mb-2"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                 />
                                 <div>{item.name}</div>
                              </div>
                           )
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
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
