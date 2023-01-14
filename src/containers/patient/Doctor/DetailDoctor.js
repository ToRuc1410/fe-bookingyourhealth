import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }
    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let idDoctor = this.props.match.params.id;
            this.props.getDetailDoctor(idDoctor);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.idDetailDoctor !== this.props.idDetailDoctor) {
            //     let res = this.props.idDetailDoctor
            //     if (res) {
            //         this.setState({
            //             currentDoctorId: res.id
            //         })
            //     }
        }
    }

    render() {
        let detailDoctor = this.props.idDetailDoctor;
        let language = this.props.language;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi} | ${detailDoctor.firstName} ${detailDoctor.lastName}`
            nameEn = `${detailDoctor.positionData.valueEn} | ${detailDoctor.lastName} ${detailDoctor.firstName}`
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='container'>
                    {/* introduction of a doctor */}
                    <div className='row'>
                        <div className='col-3 bg-light m-3'
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '30%',
                                backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`,
                                backgroundSize: 'contain',
                            }}>

                        </div>
                        <div className='col-9 p-3 '>
                            <h4 className="fw-bold mb-2">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </h4>
                            <p className="lead ">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                                    && <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }</p>
                        </div>
                    </div>

                    {/* schedule of doctor */}
                    <div className='row'>

                        <div className='col-7' style={{ minHeight: "200px", borderRight: "1px solid #ddd" }}>

                            <DoctorSchedule
                                doctorFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                            />
                        </div>
                        <div className='col-5'>
                            <DoctorExtraInfor
                                doctorFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                            />
                        </div>
                    </div>
                </div>
                {/* detail information of doctor */}
                <div className='bg-light mb-5'><hr></hr>
                    <div className='container'>

                        <div className='row'>

                            <div className='col-11'>
                                {detailDoctor &&
                                    detailDoctor.Markdown &&
                                    detailDoctor.Markdown.contentHTML &&
                                    <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                                    </div>
                                }
                            </div>
                        </div>

                        {/* comment */}
                        <div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        idDetailDoctor: state.admin.doctorId,
        language: state.app.language,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getDetailDoctor: (inputId) => dispatch(actions.getDetailDoctor(inputId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
