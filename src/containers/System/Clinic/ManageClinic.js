import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import { createNewClinic } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);
/*
 * Life cycle
 * Run component:
 * 1. Run constructor -> init States
 * 2. Run DidMount -> set States
 * 3. Run Render
 */
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            address: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            isOpen: false,
            previewImageURL: '',
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {}
    handleChangeInput = (even, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = even.target.value;
        this.setState({
            ...stateCopy,
        });
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };
    handleOnChangeImage = async (event) => {
        let dataFile = event.target.files;
        let file = dataFile[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // api của html hỗ trợ xuất file ảnh xem trước
            let imageURL = URL.createObjectURL(file);
            this.setState({
                previewImageURL: imageURL,
                imageBase64: base64,
            });
        }
    };
    openPreviewImage = () => {
        this.setState({
            isOpen: true,
        });
    };

    handleSaveNewClinic = async () => {
        let {
            name,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
            address,
        } = this.state;
        let res = await createNewClinic({
            name: name,
            address: address,
            image: imageBase64,
            descriptionHTML: descriptionHTML,
            descriptionMarkdown: descriptionMarkdown,
        });
        if (res && res.errCode === 0) {
            toast.success('Add new Clinic is Success...');
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                isOpen: false,
                previewImageURL: '',
            });
        } else {
            toast.error('Add New Clinic is Error... ');
        }
    };
    render() {
        return (
            <div className="container">
                <div className="card-body text-center">
                    <h2 className="card-title">Quản Lý Phòng Khám</h2>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <h5 className="card-title">Tên Phòng Khám</h5>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.name}
                                onChange={(event) =>
                                    this.handleChangeInput(event, 'name')
                                }
                            ></input>
                        </div>
                        <div className="form-group py-3">
                            <h5 className="card-title">Địa chỉ Phòng Khám</h5>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.address}
                                onChange={(event) =>
                                    this.handleChangeInput(event, 'address')
                                }
                            ></input>
                        </div>
                    </div>
                    <div className="col">
                        <h5 className="card-title">Ảnh Phòng Khám</h5>
                        <input
                            type="file"
                            className="form-control"
                            id="previewImg"
                            onChange={(event) =>
                                this.handleOnChangeImage(event)
                            }
                        />
                        <div
                            style={{
                                border: '1px solid grey',
                                height: '100px',
                                backgroundImage: `url(${this.state.previewImageURL})`,
                                background: 'center center no-repeat',
                                backgroundSize: 'contain',
                            }}
                            onClick={() => this.openPreviewImage()}
                        ></div>
                    </div>
                    {/* thư viên hỗ trợ xem trước ảnh */}
                    {this.state.isOpen === true && (
                        <Lightbox
                            mainSrc={this.state.previewImageURL}
                            onCloseRequest={() =>
                                this.setState({ isOpen: false })
                            }
                        />
                    )}

                    <div className="col-12 form-group">
                        <h5 className="card-title">Thông tin</h5>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn btn-primary"
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            Save
                        </button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
