import React, { Component } from 'react';
import { connect } from 'react-redux';
import localization from 'moment/locale/vi';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { getScheduleByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        };
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        if (this.props.doctorFromParent) {
            let res = await getScheduleByDate(
                this.props.doctorFromParent,
                allDays[0].value
            );
            this.setState({
                allAvalableTime: res.data ? res.data : [],
            });
        }
        this.setState({
            allDays: allDays,
        });
    }
    getArrDays = (language) => {
        let allDays = [];
        // Default only get 7 days
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                // case 1:
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let toDay = `Hôm Nay - ${ddMM}`;
                    object.label = toDay;
                } else {
                    object.label = moment(new Date())
                        .add(i, 'days')
                        .format('dddd - DD/MM');
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let toDay = `Today - ${ddMM}`;
                    object.label = toDay;
                } else {
                    object.label = moment(new Date())
                        .add(i, 'days')
                        .locale('en')
                        .format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date())
                .add(i, 'days')
                .startOf('day')
                .valueOf();
            allDays.push(object);
        }
        return allDays;
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays,
            });
        }
        if (prevProps.doctorFromParent !== this.props.doctorFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleByDate(
                this.props.doctorFromParent,
                allDays[0].value
            );
            this.setState({
                allAvalableTime: res.data ? res.data : [],
            });
        }
    }
    handleOnChangeSelect = async (event) => {
        // get id of doctor from DetailDoctor
        if (this.props.doctorFromParent && this.props.doctorFromParent !== -1) {
            let doctorId = this.props.doctorFromParent;
            let date = event.target.value;
            let res = await getScheduleByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : [],
                });
            }
        }
    };
    handleClickOpenScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        });
    };
    handleClickCloseScheduleTime = () => {
        this.setState({
            isOpenModalBooking: false,
        });
    };
    render() {
        let {
            allDays,
            allAvalableTime,
            dataScheduleTimeModal,
            isOpenModalBooking,
        } = this.state;
        let { language } = this.props;

        return (
            <React.Fragment>
                <div className="col-4">
                    <select
                        className="text-capitalize p-1 text-primary"
                        style={{
                            border: 'none',
                            borderBottom: '1px solid grey',
                            outline: 'none',
                        }}
                        onChange={(event) => this.handleOnChangeSelect(event)}
                    >
                        {allDays &&
                            allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div>
                    <div className="py-3 text-uppercase fs-6">
                        <i className="fas fa-calendar-alt">
                            <span>
                                {' '}
                                <FormattedMessage
                                    id={'patient.detail-doctor.schedule'}
                                />{' '}
                            </span>
                        </i>
                    </div>
                    <div className="justify-content-center">
                        {allAvalableTime && allAvalableTime.length > 0 ? (
                            <>
                                {allAvalableTime.map((item, index) => {
                                    let timeDisplay =
                                        language === LANGUAGES.VI
                                            ? item.timeTypeData.valueVi
                                            : item.timeTypeData.valueEn;
                                    return (
                                        <button
                                            key={index}
                                            className="btn btn-outline-warning me-3 mb-2 p-3"
                                            style={{
                                                width: '140px',
                                                color: 'blue',
                                            }}
                                            onClick={() =>
                                                this.handleClickOpenScheduleTime(
                                                    item
                                                )
                                            }
                                        >
                                            {timeDisplay}
                                        </button>
                                    );
                                })}

                                <p>
                                    <FormattedMessage
                                        id={'patient.detail-doctor.choose'}
                                    />{' '}
                                    <i className="fas fa-hand-point-up"></i>{' '}
                                    <FormattedMessage
                                        id={'patient.detail-doctor.book-free'}
                                    />{' '}
                                </p>
                            </>
                        ) : (
                            <p>
                                <FormattedMessage
                                    id={'patient.detail-doctor.non-schedule'}
                                />{' '}
                            </p>
                        )}
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeModal={this.handleClickCloseScheduleTime}
                    dataTime={dataScheduleTimeModal}
                />
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
