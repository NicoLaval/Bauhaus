import React from 'react';
import PropTypes from 'prop-types';
import D from 'js/i18n';
import { stringToDate } from 'js/utils/moment';
import { rangeType } from 'js/utils/msd/';

const { REPORTED_ATTRIBUTE, TEXT, DATE, CODE_LIST } = rangeType;
export default function Sims({
	metadataStructure,
	currentSection,
	codesLists,
	sims = {},
}) {
	function displayInformation(msd, currentSection = {}) {
		if (!msd.masLabelLg1) {
			return null;
		}
		return (
			<dl>
				<dt>{D.labelTitle}:</dt>
				<dd>{msd.masLabelLg2}</dd>
				<dt>{D.simsValue}:</dt>
				<dd>
					{currentSection.rangeType === TEXT && currentSection.value}
					{currentSection.rangeType === DATE &&
						stringToDate(currentSection.value)}
					{currentSection.rangeType === REPORTED_ATTRIBUTE && (
						<div
							dangerouslySetInnerHTML={{ __html: currentSection.labelLg1 }}
						/>
					)}
					{currentSection.rangeType === CODE_LIST &&
						codesLists[currentSection.codeList] && (
							<span>
								{currentSection.codeList}-
								{
									codesLists[currentSection.codeList].codes.find(
										code => code.code === currentSection.value
									).labelLg1
								}
							</span>
						)}
				</dd>
			</dl>
		);
	}

	function displayContent(children) {
		if (Object.keys(children).length <= 0) return null;
		return (
			<React.Fragment>
				{Object.keys(children).map(id => {
					return (
						<div key={id} className="contenu">
							<article id={id} className="panel panel-default">
								<div className="panel-heading">
									<h3>{`${id} - ${children[id].masLabelLg1}`}</h3>
								</div>
								<div className="panel-body">
									{displayInformation(children[id], sims[id])}
								</div>
							</article>
							{displayContent(children[id].children)}
						</div>
					);
				})}
			</React.Fragment>
		);
	}
	return Object.keys(metadataStructure).map(id => {
		if (currentSection && id !== currentSection) {
			return null;
		}
		return (
			<div key={id}>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h2 id={id} className="titre-principal">
							{id} - {metadataStructure[id].masLabelLg1}
						</h2>
					</div>
					<div className="panel-body">
						{displayInformation(metadataStructure[id], sims[id])}
					</div>
				</div>
				{displayContent(metadataStructure[id].children, sims[id])}
			</div>
		);
	});
}

Sims.propTypes = {
	metadataStructure: PropTypes.object.isRequired,
	currentSection: PropTypes.string,
	codesLists: PropTypes.object.isRequired,
	sims: PropTypes.object.isRequired,
};
