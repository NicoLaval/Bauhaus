import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Loadable from 'react-loading-overlay';
import ModalRmes from 'js/components/shared/modal-rmes';
import ConceptsPicker from './picker';
import { VALIDATE_CONCEPT_LIST } from 'js/actions/constants';
import { dictionary } from 'js/utils/dictionary';
import * as select from 'js/reducers';
import validateConceptList from 'js/actions/concepts/validate';
import loadConceptValidateList from 'js/actions/concepts/validate-list';
import { getModalMessage } from 'js/utils/concepts/build-validation-message';
import { OK } from 'js/constants';

class ConceptsToValidate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			validationRequested: false,
			modalValid: false,
			idWithValid: [],
		};

		this.handleValidateConceptList = ids => {
			this.props.validateConceptList(ids);
			this.setState({
				validationRequested: true,
			});
		};
		this.handleClickValidation = ids => {
			this.setState({ ids });
			const idWithValid = ids.reduce((_, id) => {
				const { label: prefLabelLg1, valid } = this.props.concepts.find(
					c => c.id === id
				);
				if (valid) _.push({ prefLabelLg1, valid });
				return _;
			}, []);
			idWithValid.length === 0
				? this.handleValidateConceptList(ids)
				: this.setState({ idWithValid, modalValid: true });
		};
		this.handleCancelValidation = () => this.setState({ modalValid: false });
		this.handleConfirmValidation = () => {
			this.handleCancelValidation();
			this.handleValidateConceptList(this.state.ids);
		};
	}
	componentWillMount() {
		if (!this.props.concepts) this.props.loadConceptValidateList();
	}
	render() {
		const { validationRequested, modalValid, idWithValid } = this.state;
		const { validationStatus } = this.props;

		const modalButtons = [
			{
				label: dictionary.buttons.cancel,
				action: this.handleCancelValidation,
				style: 'primary',
			},
			{
				label: dictionary.buttons.validate,
				action: this.handleConfirmValidation,
				style: 'primary',
			},
		];
		//
		// let modalMessage = `<p>Ce concept ayant une date de fin de validité au <b>${dateTimeToDateString(
		// 	valid
		// )}</b>, vous ne pourrez plus le modifier`;
		// modalMessage += isOutOfDate(valid) ? `.</p>` : ` après cette date.</p>`;

		if (validationRequested) {
			if (validationStatus === OK) {
				return <Redirect to="/concepts" />;
			} else {
				return (
					<Loadable
						active={true}
						spinner
						text={dictionary.loadable.loading}
						color="#457DBB"
						background="grey"
						spinnerSize="400px"
					/>
				);
			}
		}
		const { concepts } = this.props;
		if (!concepts)
			return (
				<Loadable
					active={true}
					spinner
					text={dictionary.loadable.loading}
					color="#457DBB"
					background="grey"
					spinnerSize="400px"
				/>
			);
		return (
			<div>
				<ConceptsPicker
					concepts={concepts}
					title={dictionary.concepts.validation.title}
					panelTitle={dictionary.concepts.validation.panel}
					labelLoadable={dictionary.loadable.validation}
					labelWarning={dictionary.warning.validation.concepts}
					labelValidateButton={dictionary.buttons.validate}
					handleAction={this.handleClickValidation}
				/>
				<ModalRmes
					id="validation-concept-modal"
					isOpen={modalValid}
					title="Confirmation de la validation"
					body={getModalMessage(idWithValid)}
					modalButtons={modalButtons}
					closeCancel={this.handleCancelValidation}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	concepts: select.getConceptValidateList(state),
	validationStatus: select.getStatus(state, VALIDATE_CONCEPT_LIST),
});

const mapDispatchToProps = {
	loadConceptValidateList,
	validateConceptList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConceptsToValidate);
