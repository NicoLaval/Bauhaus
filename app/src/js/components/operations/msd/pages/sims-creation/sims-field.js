import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import D from 'js/i18n';
import { rangeType } from 'js/utils/msd/';
import DatePickerRmes from 'js/components/shared/date-picker-rmes';
import InputRmes from 'js/components/shared/input-rmes';
import EditorMarkdown from 'js/components/shared/editor-html/editor-markdown';
import SelectRmes from 'js/components/shared/select-rmes';
import { Note } from 'js/components/shared/note/note';
import { isLink, isDocument } from 'js/components/operations/document/utils';
import './sims-field.scss';
import DocumentsBloc from '../../documents/documents-bloc';

const { RICH_TEXT, TEXT, DATE, CODE_LIST, ORGANIZATION } = rangeType;

class Field extends PureComponent {
	static propTypes = {
		msd: PropTypes.object.isRequired,
		currentSection: PropTypes.object,
		codesLists: PropTypes.object.isRequired,
		handleChange: PropTypes.func,
		secondLang: PropTypes.bool,
	};

	_handleChange(override) {
		this.props.handleChange({
			id: this.props.msd.idMas,
			override,
		});
	}

	handleTextInput = value => {
		this._handleChange({
			[this.props.secondLang ? 'labelLg2' : 'labelLg1']: value,
		});
	};

	handleCodeListInput = value => {
		this._handleChange({ codeList: this.props.msd.codeList, value });
	};

	/**
	 * @param {String} value The new value of the date input
	 */
	handleDateInput = value => {
		this._handleChange({ value });
	};

	_handleDeleteDocumentOrLinks = type => uri => {
		const objects = this.props.currentSection[type] || [];

		this._handleChange({
			[type]: objects.filter(doc => doc.uri !== uri),
		});
	};

	_handleAddDocumentOrLinks = type => newObject => {
		const objects = this.props.currentSection[type] || [];

		this._handleChange({
			[type]: [...objects, newObject],
		});
	};

	/**
	 * Handler when the user click on a button in order to delete a document
	 * @param {String} uri The uri of the document that we should remove
	 */
	handleDeleteDocument = uri =>
		this._handleDeleteDocumentOrLinks('documents')(uri);

	/**
	 * Handler when the user add a new document to a rubric
	 * @param {SimsDocuments} document
	 */
	handleAddDocument = document =>
		this._handleAddDocumentOrLinks('documents')(document);

	render() {
		const {
			msd,
			currentSection = {},
			secondLang,
			lang,
			alone,
			organisations = [],
		} = this.props;
		const codesList = this.props.codesLists[msd.codeList] || {};
		const codes = codesList.codes || [];
		const codesListOptions = codes.map(c => ({
			label: c.labelLg1,
			value: c.code,
		}));
		const organisationsOptions = organisations.map(c => ({
			label: c.label,
			value: c.id,
		}));

		return (
			<Note
				title={`${msd.idMas} - ${msd.masLabelBasedOnCurrentLang}`}
				alone={alone}
				lang={lang}
				alt={`${msd.idMas} - ${
					msd[secondLang ? 'masLabelLg2' : 'masLabelLg1']
				}`}
				text={
					!msd.isPresentational && (
						<span className="simsField">
							{msd.rangeType === TEXT && (
								<InputRmes
									id={msd.idMas}
									value={currentSection[secondLang ? 'labelLg2' : 'labelLg1']}
									handleChange={this.handleTextInput}
									arias={{
										'aria-label': D.simsValue,
									}}
								/>
							)}
							{msd.rangeType === ORGANIZATION && (
								<SelectRmes
									placeholder=""
									className="form-control"
									value={currentSection.value}
									options={organisationsOptions}
									onChange={this.handleCodeListInput}
								/>
							)}
							{msd.rangeType === DATE && (
								<DatePickerRmes
									aria-label={D.simsValue}
									id={msd.idMas}
									colMd={12}
									value={currentSection.value}
									onChange={this.handleCodeListInput}
								/>
							)}
							{msd.rangeType === RICH_TEXT && (
								<>
									<EditorMarkdown
										aria-label={D.simsValue}
										text={currentSection[secondLang ? 'labelLg2' : 'labelLg1']}
										handleChange={this.handleTextInput}
									/>
									<DocumentsBloc
										documents={(currentSection.documents || []).filter(
											isDocument
										)}
										localPrefix={secondLang ? 'Lg2' : 'Lg1'}
										editMode={true}
										deleteHandler={this.handleDeleteDocument}
										addHandler={this.handleAddDocument}
										objectType="documents"
									/>
									<DocumentsBloc
										documents={(currentSection.documents || []).filter(isLink)}
										localPrefix={secondLang ? 'Lg2' : 'Lg1'}
										editMode={true}
										deleteHandler={this.handleDeleteDocument}
										addHandler={this.handleAddDocument}
										objectType="links"
									/>
								</>
							)}

							{msd.rangeType === CODE_LIST && codesList && (
								<SelectRmes
									placeholder=""
									aria-label={codesList.codeListLabelLg1}
									className="form-control"
									value={currentSection.value}
									options={codesListOptions}
									onChange={this.handleCodeListInput}
								/>
							)}
						</span>
					)
				}
			/>
		);
	}
}

export default Field;
