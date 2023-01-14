import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);

            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };
    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;
            let date =
                language === LANGUAGES.VI
                    ? moment
                          .unix(+dataTime.date / 1000)
                          .format('dddd - DD/MM/YYYY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('ddd - MM/DD/YYYY');
            return (
                <>
                    <div>
                        {time} | {date}
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.free-booking" />
                    </div>
                </>
            );
        }
        return '';
    };

    render() {
        let { dataProfile } = this.state;

        let { language, dataTime, price, isShowLinkDetails, doctorId } =
            this.props;
        let nameVi = '',
            nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} | ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEn = `${dataProfile.positionData.valueEn} | ${dataProfile.lastName} ${dataProfile.firstName}`;
        }
        return (
            <div className="container-fluid">
                <div className="d-flex">
                    <div
                        className="col-4 justify-content-start"
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '30%',
                            backgroundImage: `url(${
                                dataProfile && dataProfile.image
                                    ? dataProfile.image
                                    : ''
                            })`,
                            backgroundSize: 'contain',
                        }}
                    ></div>
                    <div className="col-8 justify-content-start ms-3">
                        <h5 className="card-text">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </h5>
                        <small className="card-text text-muted">
                            {dataProfile &&
                                dataProfile.Markdown &&
                                dataProfile.Markdown.description && (
                                    <span>
                                        {dataProfile.Markdown.description}
                                    </span>
                                )}
                        </small>
                        <span className="text-muted text-dark text-capitalize">
                            {this.renderTimeBooking(dataTime)}
                        </span>
                    </div>
                </div>
                {isShowLinkDetails === true && (
                    <div>
                        <Link to={`/detail-doctor/${doctorId}`}>Xem Thêm</Link>
                    </div>
                )}
                <div className="mt-3 text-start">
                    {price === true && (
                        <>
                            <p> Giá Khám: </p>
                            {dataProfile &&
                                dataProfile.Doctor_Infor &&
                                language === LANGUAGES.VI && (
                                    <NumberFormat
                                        value={
                                            dataProfile.Doctor_Infor
                                                .priceTypeData.valueVi
                                        }
                                        className="text-primary"
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                )}
                            {dataProfile &&
                                dataProfile.Doctor_Infor &&
                                language === LANGUAGES.EN && (
                                    <NumberFormat
                                        value={
                                            dataProfile.Doctor_Infor
                                                .priceTypeData.valueEn
                                        }
                                        className="text-primary"
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />
                                )}
                        </>
                    )}
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
