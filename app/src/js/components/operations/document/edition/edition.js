import React, { Component } from 'react';
import D from 'js/i18n';
import { goBack, goBackOrReplace } from 'js/utils/redirection';
import NoteFlag from 'js/components/shared/note-flag/note-flag';
import PropTypes from 'prop-types';
import EditorMarkdown from 'js/components/shared/editor-html/editor-markdown';
import { validate } from 'js/components/operations/document/edition/validation';
import { LINK, DOCUMENT } from '../utils';
import Dropzone from 'react-dropzone';
import Loading from 'js/components/shared/loading';
import DatePickerRmes from 'js/components/shared/date-picker-rmes';
import SelectRmes from 'js/components/shared/select-rmes';
import PageTitleBlock from 'js/components/shared/page-title-block';
import ErrorBloc from 'js/components/shared/error-bloc';
import {
	CancelButton,
	SaveButton,
} from 'js/components/shared/button-with-icon';

const defaultDocument = {
	labelLg1: '',
	labelLg2: '',
	descriptionLg1: '',
	descriptionLg2: '',
	url: '',
	lang: '',
};
class OperationsDocumentationEdition extends Component {
	static propTypes = {
		document: PropTypes.object.isRequired,
		langs: PropTypes.object.isRequired,
		saveDocument: PropTypes.func.isRequired,
		type: PropTypes.oneOf([LINK, DOCUMENT]),
		operationsAsyncTask: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.state = this.setInitialState(props);
	}

	componentWillReceiveProps(ownProps) {
		if (this.props.document.url !== ownProps.document.url)
			this.setState(this.setInitialState(ownProps));
	}

	setInitialState = props => {
		return {
			serverSideError: '',
			document: {
				...defaultDocument,
				...props.document,
			},
			files: props.document.url ? [{ name: props.document.url }] : [],
		};
	};

	uploadFile = files => {
		this.setState({
			serverSideError: '',
			files,
		});
	};

	removeFile = () => {
		this.setState({
			serverSideError: '',
			files: [],
		});
	};

	onChange = e => {
		this.setState({
			serverSideError: '',
			document: {
				...this.state.document,
				[e.target.id]: e.target.value,
			},
		});
	};

	onSubmit = () => {
		const isCreation = !this.state.document.id;
		this.props.saveDocument(
			this.state.document,
			this.props.type,
			this.state.files,
			(err, id = this.state.document.id) => {
				if (!err) {
					goBackOrReplace(this.props, `/operations/document/${id}`, isCreation);
				} else {
					this.setState({
						serverSideError: err,
					});
				}
			}
		);
	};

	render() {
		const {
			langs: { lg1, lg2 },
			langOptions,
			type,
		} = this.props;

		if (this.props.operationsAsyncTask) return <Loading textType="saving" />;

		const { document, files, serverSideError } = this.state;
		const isEditing = !!document.id;
		const errors = validate(document, type, files);
		const globalError =
			errors.errorMessage ||
			Object.keys(D.documents.serverSideErrors).reduce((acc, key) => {
				return acc.replace(key, D.documents.serverSideErrors[key]);
			}, serverSideError);

		let updatedDate;
		if (document.updatedDate) {
			const [year, month, day] = document.updatedDate.split('-');
			updatedDate = `${year}-${month}-${day}T23:00:00.000Z`;
		}
		return (
			<div className="container editor-container">
				{isEditing && (
					<PageTitleBlock
						titleLg1={this.props.document.labelLg1}
						titleLg2={this.props.document.labelLg2}
						secondLang={true}
					/>
				)}

				<div className="row btn-line action-toolbar">
					<CancelButton action={goBack(this.props, '/operations/documents')} />

					<ErrorBloc error={globalError} />

					<SaveButton action={this.onSubmit} disabled={errors.errorMessage} />
				</div>
				<form>
					<div className="row">
						<div className="col-md-6 form-group">
							<label htmlFor="prefLabelLg1">
								<NoteFlag text={D.title} lang={lg1} />
								<span className="boldRed">*</span>
							</label>
							<input
								type="text"
								className="form-control"
								id="labelLg1"
								value={document.labelLg1}
								onChange={this.onChange}
								aria-invalid={errors.fields.labelLg1}
							/>
						</div>
						<div className="col-md-6 form-group">
							<label htmlFor="prefLabelLg2">
								<NoteFlag text={D.title} lang={lg2} />
								<span className="boldRed">*</span>
							</label>
							<input
								type="text"
								className="form-control"
								id="labelLg2"
								value={document.labelLg2}
								onChange={this.onChange}
								aria-invalid={errors.fields.labelLg2}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6 form-group">
							<label htmlFor="abstractLg1">
								<NoteFlag text={D.descriptionTitle} lang={lg1} />
							</label>
							<EditorMarkdown
								text={document.descriptionLg1}
								handleChange={value =>
									this.onChange({ target: { value, id: 'descriptionLg1' } })
								}
							/>
						</div>
						<div className="col-md-6 form-group">
							<label htmlFor="abstractLg2">
								<NoteFlag text={D.descriptionTitle} lang={lg2} />
							</label>
							<EditorMarkdown
								text={document.descriptionLg2}
								handleChange={value =>
									this.onChange({ target: { value, id: 'descriptionLg2' } })
								}
							/>
						</div>
					</div>
					{type === LINK && (
						<div className="row">
							<div className="col-md-12 form-group">
								<label htmlFor="url">
									<NoteFlag text={D.titleLink} lang={lg1} />
									<span className="boldRed">*</span>
								</label>
								<input
									type="text"
									className="form-control"
									id="url"
									value={document.url}
									onChange={this.onChange}
									aria-invalid={errors.fields.url}
								/>
							</div>
						</div>
					)}
					{type === DOCUMENT && (
						<div className="row">
							<div className="col-md-12 form-group">
								<label>
									<NoteFlag text={D.titleUpdatedDate} lang={lg1} />
									<span className="boldRed">*</span>
								</label>
								<DatePickerRmes
									value={updatedDate}
									onChange={date => {
										const value = date && date.split('T')[0];
										this.onChange({ target: { value, id: 'updatedDate' } });
									}}
									placement="top"
								/>
							</div>
						</div>
					)}
					{type === DOCUMENT && files.length === 0 && (
						<div className="row">
							<div className="col-md-12 form-group">
								<Dropzone onDrop={this.uploadFile} multiple={false}>
									{({ getRootProps, getInputProps }) => (
										<div
											{...getRootProps({
												className: 'dropzone',
											})}
										>
											<input
												{...getInputProps()}
												aria-invalid={errors.fields.file}
											/>
											<p>{D.drag}</p>
										</div>
									)}
								</Dropzone>
							</div>
						</div>
					)}

					{type === DOCUMENT && files.length > 0 && (
						<div className="panel panel-default">
							{files.map(file => (
								<div className="panel-body" key={file.name}>
									{file.name}
									<button
										onClick={this.removeFile}
										type="button"
										className="close"
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
							))}
						</div>
					)}
					<div className="row">
						<div className="col-md-12 form-group">
							<label htmlFor="lang">
								<NoteFlag text={D.langTitle} lang={lg1} />
								<span className="boldRed">*</span>
							</label>

							<SelectRmes
								placeholder=""
								unclearable
								value={document.lang}
								options={langOptions.codes.map(lang => {
									return { value: lang.code, label: lang.labelLg1 };
								})}
								onChange={value => {
									this.onChange({ target: { value, id: 'lang' } });
								}}
							/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default OperationsDocumentationEdition;
