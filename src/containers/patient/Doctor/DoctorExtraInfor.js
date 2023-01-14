import React, { Component } from 'react';
import { connect } from 'react-redux';
import localization from 'moment/locale/vi';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { getExtraInforDrById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        };
    }
    async componentDidMount() {
        if (this.props.doctorFromParent) {
            let res = await getExtraInforDrById(this.props.doctorFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorFromParent !== prevProps.doctorFromParent) {
            let res = await getExtraInforDrById(this.props.doctorFromParent);

            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                });
            }
        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        });
    };
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="container-fluid">
                    <div className="title">
                        <p>
                            <FormattedMessage id="patient.extraInfor-doctor.address" />
                        </p>
                    </div>
                    <div>
                        <b>
                            {extraInfor && extraInfor.nameClinic
                                ? extraInfor.nameClinic
                                : ''}
                        </b>
                        <p>
                            {extraInfor && extraInfor.addressClinic
                                ? extraInfor.addressClinic
                                : ''}
                        </p>
                    </div>
                    <hr></hr>
                    <div>
                        {isShowDetailInfor === false && (
                            <div className="d-flex justify-content-between">
                                <span className="text-uppercase">
                                    <FormattedMessage id="patient.extraInfor-doctor.price" />

                                    {extraInfor &&
                                        extraInfor.priceTypeData &&
                                        language === LANGUAGES.VI && (
                                            <NumberFormat
                                                value={
                                                    extraInfor.priceTypeData
                                                        .valueVi
                                                }
                                                // className="foo"
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        )}
                                    {extraInfor &&
                                        extraInfor.priceTypeData &&
                                        language === LANGUAGES.EN && (
                                            <NumberFormat
                                                value={
                                                    extraInfor.priceTypeData
                                                        .valueEn
                                                }
                                                // className="foo"
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        )}
                                </span>
                                <span
                                    className="text-primary"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        this.showHideDetailInfor(true)
                                    }
                                >
                                    {' '}
                                    <FormattedMessage id="patient.extraInfor-doctor.seemore" />
                                </span>
                            </div>
                        )}
                        <div>
                            {isShowDetailInfor === true && (
                                <>
                                    <div className="rounded-3 bg-light border p-2">
                                        <div className="d-flex justify-content-between fs-5">
                                            <span>
                                                <FormattedMessage id="patient.extraInfor-doctor.price" />
                                            </span>
                                            <span>
                                                {extraInfor &&
                                                    extraInfor.priceTypeData &&
                                                    language ===
                                                        LANGUAGES.VI && (
                                                        <NumberFormat
                                                            value={
                                                                extraInfor
                                                                    .priceTypeData
                                                                    .valueVi
                                                            }
                                                            // className="foo"
                                                            displayType={'text'}
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            suffix={'VND'}
                                                        />
                                                    )}
                                                {extraInfor &&
                                                    extraInfor.priceTypeData &&
                                                    language ===
                                                        LANGUAGES.EN && (
                                                        <NumberFormat
                                                            value={
                                                                extraInfor
                                                                    .priceTypeData
                                                                    .valueEn
                                                            }
                                                            // className="foo"
                                                            displayType={'text'}
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            suffix={'$'}
                                                        />
                                                    )}
                                            </span>
                                        </div>
                                        <p>
                                            {extraInfor && extraInfor.note
                                                ? extraInfor.note
                                                : ''}
                                        </p>
                                    </div>
                                    <div
                                        className="border p-2 rounded-3 mb-2"
                                        style={{ backgroundColor: '#e7e9eb' }}
                                    >
                                        <span>
                                            <FormattedMessage id="patient.extraInfor-doctor.payment" />
                                            {extraInfor &&
                                            extraInfor.paymentTypeData &&
                                            language === LANGUAGES.VI
                                                ? extraInfor.paymentTypeData
                                                      .valueVi
                                                : ''}
                                            {extraInfor &&
                                            extraInfor.paymentTypeData &&
                                            language === LANGUAGES.EN
                                                ? extraInfor.paymentTypeData
                                                      .valueEn
                                                : ''}
                                        </span>
                                    </div>
                                    <span
                                        className="text-primary"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            this.showHideDetailInfor(false)
                                        }
                                    >
                                        <FormattedMessage id="patient.extraInfor-doctor.hide" />
                                    </span>
                                </>
                            )}
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
