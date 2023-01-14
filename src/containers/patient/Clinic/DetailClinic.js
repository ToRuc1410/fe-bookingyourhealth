import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {
   getAllCodeService,
   getDetailClinicById,
} from '../../../services/userService';
import _ from 'lodash';

class DetailClinic extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrDoctorId: [],
         dataDetailClinic: {},
      };
   }
   async componentDidMount() {
      if (
         this.props.match &&
         this.props.match.params &&
         this.props.match.params.id
      ) {
         let id = this.props.match.params.id;
         let res = await getDetailClinicById(id);
         if (res && res.errCode === 0) {
            let data = res.data;
            console.log(data);
            let arrDoctorId = [];
            if (data && !_.isEmpty(res.data)) {
               let arr = data.doctorClinic;
               if (arr && arr.length > 0) {
                  arr.map((item) => {
                     arrDoctorId.push(item.doctorId);
                  });
               }
            }
            this.setState({
               arrDoctorId: arrDoctorId,
               dataDetailClinic: res.data,
            });
         }
      }
   }
   componentDidUpdate(prevProps, prevState, snapshot) {}
   render() {
      let { arrDoctorId, dataDetailClinic } = this.state;
      console.log(this.state);

      let { language } = this.props;
      return (
         <>
            <HomeHeader />
            <div
               className="container"
               style={{
                  minHeight: '150px',
               }}
            >
               {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                  <>
                     {' '}
                     <div>{dataDetailClinic.name}</div>
                     <div
                        dangerouslySetInnerHTML={{
                           __html: dataDetailClinic.descriptionHTML,
                        }}
                     ></div>
                  </>
               )}
            </div>
            <div
               className="container-fluid bg-light bg-gradient py-3"
               style={{
                  background: '#eeeeee',
                  borderTop: '1px solid #e0e0e0',
               }}
            >
               <div className="container">
                  {arrDoctorId &&
                     arrDoctorId.length > 0 &&
                     arrDoctorId.map((item, index) => {
                        return (
                           <div
                              className="row my-3 py-3 bg-white shadow rounded"
                              key={index}
                           >
                              <div
                                 className="col"
                                 style={{
                                    borderRight: '1px solid #ddd',
                                 }}
                              >
                                 <ProfileDoctor
                                    doctorId={item}
                                    price={false}
                                    isShowLinkDetails={true}
                                 />
                              </div>
                              <div className="col">
                                 <DoctorSchedule doctorFromParent={item} />
                                 <div className="g-0">
                                    <DoctorExtraInfor doctorFromParent={item} />
                                 </div>
                              </div>
                           </div>
                        );
                     })}
               </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
