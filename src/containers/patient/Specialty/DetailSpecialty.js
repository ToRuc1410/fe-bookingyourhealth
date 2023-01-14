import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {
    getAllCodeService,
    getDetailSpecialtyById,
} from '../../../services/userService';
import _ from 'lodash';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
        };
    }
    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL',
            });
            let resProvince = await getAllCodeService('PROVINCE');
            if (
                res &&
                res.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn Quốc',
                    });
                }
                this.setState({
                    arrDoctorId: arrDoctorId,
                    dataDetailSpecialty: res.data,
                    listProvince: dataProvince ? dataProvince : [],
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {}
    handleOnChangeSelect = async (event) => {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getDetailSpecialtyById({
                id: id,
                location: location,
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                this.setState({
                    arrDoctorId: arrDoctorId,
                    dataDetailSpecialty: res.data,
                });
            }
        }
    };
    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        console.log('check data', this.state);
        return (
            <>
                <HomeHeader />
                <div
                    className="container"
                    style={{
                        minHeight: '150px',
                    }}
                >
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: dataDetailSpecialty.descriptionHTML,
                            }}
                        ></div>
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
                        <select
                            style={{
                                width: '30%',
                                border: 'none',
                                borderBottom: '2px solid #dddd',
                            }}
                            className="form-select"
                            onChange={(event) =>
                                this.handleOnChangeSelect(event)
                            }
                        >
                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </option>
                                    );
                                })}
                        </select>
                        {/* <label htmlFor="floatingSelect">Works with selects</label> */}
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
                                            <DoctorSchedule
                                                doctorFromParent={item}
                                            />
                                            <div className="g-0">
                                                <DoctorExtraInfor
                                                    doctorFromParent={item}
                                                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
