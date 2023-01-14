import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';

import './HomePage.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class HomePage extends Component {
   render() {
      let settings = {
         dots: true,
         // infinite: lướt vô hạn
         infinite: false,
         speed: 500,
         slidesToShow: 4,
         slidesToScroll: 2,
      };
      let settingDoctor = {
         dots: true,
         infinite: false,
         speed: 500,
         slidesToShow: 3,
         slidesToScroll: 1,
      };
      let setting3 = {
         dots: true,
         infinite: false,
         speed: 500,
         slidesToShow: 4,
         slidesToScroll: 2,
      };
      return (
         <div>
            <HomeHeader isShowBanner={true} />
            <Specialty settings={settings} />
            <MedicalFacility settings={settings} />
            <OutStandingDoctor settings={settingDoctor} />
            <HandBook settings={setting3} />
            <About />
            <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
