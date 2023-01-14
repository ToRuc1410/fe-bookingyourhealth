import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService'
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // Update changed AllDoctors
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            // add isSelected insert array and default = false
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }

        // Update changed languages
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.lastName} ${item.firstName}`
                let labelVi = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.id = item.id;
                result.push(object)
            })
        }
        return result;
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    // call Api 
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid Selected Doctor ... ');
            return;
        }
        else if (!currentDate) {
            toast.error('Invalid date ... ');
            return;
        }
        // convert => 	datetime
        let formatedDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.id;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error('Invalid Selected Time ... ');
                return;
            }
        }
        // upload data to Api 
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.id,
            formatedDate: formatedDate
        })
        if (res.errCode === 0) {
            toast.success('Update Schedules is Successed ... ');
            let { rangeTime } = this.state;
            rangeTime = rangeTime.map(item => {
                item.isSelected = false;
                return item;
            })
            this.setState({
                currentDate: '',
                rangeTime: rangeTime
            })
        }
    }
    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <React.Fragment>
                <div className='bg-light'>
                    <div className='container-fluid' >
                        <h3 className="card-title text-uppercase fw-bolder p-3 text-center">
                            <FormattedMessage id="manage-schedule.title" />
                        </h3>
                        <div className='container pb-3'>
                            <div className='row'>
                                <div className='col-6 form-group '>
                                    <label ><FormattedMessage id="manage-schedule.select_doctor" /></label>
                                    <Select

                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.listDoctors}
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 0,
                                            colors: {
                                                ...theme.colors,
                                                primary25: 'hotpink',
                                                primary: 'grey',
                                            },
                                        })}
                                    />
                                </div>
                                <div className='col-6 form-group rounded-3 mb-3'>
                                    <label ><FormattedMessage id="manage-schedule.date" /></label>
                                    <DatePicker
                                        placeholder="Choose Date..."
                                        //selected={this.state.currentDate}
                                        onChange={this.handleOnchangeDatePicker}
                                        className="form-control"
                                        value={this.state.currentDate}
                                        minDate={yesterday}

                                    />
                                </div>

                                <div className='col-12 pt-3 d-flex justify-content-between'>
                                    {rangeTime && rangeTime.length > 0 &&
                                        rangeTime.map((item, index) => {
                                            return (
                                                <button className={item.isSelected === true ? 'btn btn-info py-2 mx-2' : 'btn btn-secondary py-2 mx-2'}
                                                    key={index}
                                                    onClick={() => this.handleClickBtnTime(item)}
                                                >

                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                                <div className='col-12 mt-5'>
                                    <button className='btn btn-primary'
                                        onClick={() => this.handleSaveSchedule()}
                                    ><FormattedMessage id="manage-schedule.save" /></button>
                                </div>
                            </div>

                        </div>
                    </div >
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
        // fetchAllScheduleTime: () => dis
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
