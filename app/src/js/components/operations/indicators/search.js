import D from 'js/i18n';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Loading from 'js/components/shared/loading';
import { AbstractSearchComponent } from 'js/components/shared/advanced-search/home-container';
import api from 'js/remote-api/operations-api';
import SelectRmes from 'js/components/shared/select-rmes';
import { connect } from 'react-redux';
import { filterKeyDeburr } from 'js/utils/array-utils';
import SearchList from 'js/components/shared/advanced-search/home';
import { toSelectModel } from '../shared/utils/itemToSelectModel';

const filterLabel = filterKeyDeburr(['prefLabelLg1']);
const creatorLabel = filterKeyDeburr(['creator']);

const fields = ['prefLabelLg1', 'creator'];

class SearchFormList extends AbstractSearchComponent {
	static defaultState = {
		prefLabelLg1: '',
		creator: '',
	};

	constructor(props) {
		super(props, SearchFormList.defaultState);
	}

	handlers = this.handleChange(fields, newState => {
		const { prefLabelLg1, creator } = newState;
		return this.props.data
			.filter(creatorLabel(creator))
			.filter(filterLabel(prefLabelLg1));
	});

	render() {
		const { data, prefLabelLg1, creator } = this.state;
		const { organisations } = this.props;
		const creatorsOptions = toSelectModel(organisations);

		const dataLinks = data.map(({ id, prefLabelLg1 }) => (
			<li key={id} className="list-group-item">
				<Link to={`/operations/indicator/${id}`}>{prefLabelLg1}</Link>
			</li>
		));
		return (
			<SearchList
				title={D.indicatorsSearchTitle}
				data={dataLinks}
				backUrl="/operations/indicators"
				initializeState={this.initializeState}
			>
				<div className="row form-group">
					<div className="col-md-12">
						<input
							value={prefLabelLg1}
							onChange={e => this.handlers.prefLabelLg1(e.target.value)}
							type="text"
							placeholder={D.searchLabelPlaceholder}
							className="form-control"
						/>
					</div>
				</div>
				<div className="form-group row">
					<div className="col-md-12">
						<label htmlFor="typeOperation" className="full-label">
							{D.contributorTitle}

							<SelectRmes
								placeholder=""
								unclearable
								value={creator}
								options={creatorsOptions}
								onChange={value => {
									this.handlers.creator(value);
								}}
							/>
						</label>
					</div>
				</div>
			</SearchList>
		);
	}
}
class SearchListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		api.getIndicatorsSearchList().then(data => {
			this.setState({ data });
		});
	}

	render() {
		const { data } = this.state;
		const { organisations } = this.props;

		if (!data) return <Loading textType="loading" context="concepts" />;
		return <SearchFormList data={data} organisations={organisations} />;
	}
}

const mapStateToProps = state => {
	return {
		organisations: state.operationsOrganisations.results,
	};
};

export default connect(mapStateToProps)(SearchListContainer);
