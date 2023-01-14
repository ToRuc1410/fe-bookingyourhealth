import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from '../../../utils';
class RemedyModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // fullName: '',
         email: '',
         imgBase64: '',
      };
   }
   componentDidMount() {
      if (this.props.dataModal) {
         this.setState({
            email: this.props.dataModal.email,
         });
      }
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.dataModal !== prevProps.dataModal) {
         this.setState({
            email: this.props.dataModal.email,
         });
      }
   }

   handleOnchangeEmail = (event) => {
      this.setState({
         email: event.target.value,
      });
   };
   handleOnchangeImage = async (event) => {
      let data = event.target.files;
      let file = data[0];
      if (file) {
         let base64 = await CommonUtils.getBase64(file);
         this.setState({
            imgBase64: base64,
         });
      }
   };
   handleSendRemedy = () => {
      this.props.sendRemedy(this.state);
   };
   render() {
      // toggle = { toggle }
      let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;
      //  let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
      return (
         <>
            <Modal isOpen={isOpenModal} size="md" centered>
               <ModalHeader>Gửi Hóa Đơn Khám Bệnh</ModalHeader>
               <ModalBody>
                  <div className="row">
                     <div className="col form-group">
                        <label>Email Bệnh Nhân</label>
                        <input
                           type="email"
                           value={this.state.email}
                           onChange={(event) => this.handleOnchangeEmail(event)}
                        />
                     </div>
                     <div className="col">
                        <label>Chọn File Đơn Thuốc</label>
                        <input
                           className="form-control-file"
                           type="file"
                           onChange={(event) => this.handleOnchangeImage(event)}
                        />
                     </div>
                  </div>
               </ModalBody>
               <ModalFooter>
                  <Button className="btn btn-danger" onClick={closeRemedyModal}>
                     Close
                  </Button>
                  <Button
                     className="btn btn-primary"
                     onClick={() => this.handleSendRemedy()}
                  >
                     Send
                  </Button>
               </ModalFooter>
            </Modal>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      genders: state.admin.genders,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
