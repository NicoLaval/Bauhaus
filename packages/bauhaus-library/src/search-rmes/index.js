import React, { useState, useContext } from 'react';
import I18NContext from '../i18n-provider';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Pagination from '../pagination';
import { filterKeyDeburr, nbResults } from '../utils/array-utils';

function SearchRmes({
	items = [],
	advancedSearch = false,
	searchUrl,
	placeholder,
	childPath,
	col,
	colOff,
	context,
	label,
}) {
	const [search, handleSearch] = useState('');
	const D = useContext(I18NContext);

	const filter = filterKeyDeburr(
		Object.keys(items[0] || {}).filter(k => k !== 'id')
	);

	const hits = items.filter(filter(search));

	const hitEls = hits.map(({ id, [label]: labelValue }) => (
		<li key={id} className="list-group-item">
			<Link to={`/${childPath}/${id}`}>{labelValue}</Link>
		</li>
	));

	const colSize = col ? `col-md-${col}` : '';
	const colOffset = colOff ? `col-md-offset-${colOff}` : '';

	return (
		<div className={`${colSize} ${colOffset}`}>
			<div className="row form-group">
				<div className="col-md-12">
					<input
						value={search}
						onChange={e => handleSearch(e.target.value)}
						type="text"
						placeholder={D.searchLabelPlaceholder || placeholder}
						className="form-control"
						aria-label={D.search}
					/>
				</div>
			</div>
			{advancedSearch && (
				<div className="row">
					<div className="col-md-12">
						<Link to={searchUrl}>
							<h2 className="inline">
								<span
									className="glyphicon glyphicon-zoom-in"
									aria-hidden="true"
								/>
								{D.conceptAdvancedSearchTitle}
							</h2>
						</Link>
					</div>
				</div>
			)}
			<div className="row">
				<p aria-live="assertive">{nbResults(hits, D)}</p>
			</div>
			<Pagination itemEls={hitEls} itemsPerPage="10" context={context} />
		</div>
	);
}

SearchRmes.defaultProps = {
	label: 'label',
};

SearchRmes.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	childPath: PropTypes.string.isRequired,
	advancedSearch: PropTypes.bool,
	searchUrl: PropTypes.string,
	placeholder: PropTypes.string,
	col: PropTypes.number,
	colOff: PropTypes.number,
	context: PropTypes.oneOf([
		'',
		'concepts',
		'classifications',
		'operations',
		'dsds',
	]),
	label: PropTypes.string,
};

export default SearchRmes;
