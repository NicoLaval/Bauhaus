import React from 'react';
import { Note } from 'js/components/shared/note/note';
import D from 'js/i18n';
import { Link } from 'react-router-dom';

function SeeAlso({ links, langs: { lg1, lg2 }, secondLang }) {
	function displaySeeAlsos(label) {
		function displaySeeAlso(seeAlso, title, path) {
			return (
				seeAlso && (
					<li>
						{title}
						<ul>
							{seeAlso.map(link => (
								<li key={link.id}>
									<Link to={`${path}/${link.id}`}>{link[label]}</Link>
								</li>
							))}
						</ul>
					</li>
				)
			);
		}
		return (
			<ul>
				{displaySeeAlso(
					links.indicator,
					D.indicatorsTitle,
					'/operations/indicator'
				)}
				{displaySeeAlso(
					links.operation,
					D.operationsTitle,
					'/operations/operation'
				)}
				{displaySeeAlso(links.series, D.seriesTitle, '/operations/series')}
				{displaySeeAlso(links.family, D.familiesTitle, '/operations/family')}
			</ul>
		);
	}
	return (
		<div className="row">
			<Note
				text={displaySeeAlsos('labelLg1')}
				title={D.seeAlso}
				lang={lg1}
				alone={!secondLang}
				allowEmpty={true}
			/>
			{secondLang && (
				<Note
					text={displaySeeAlsos('labelLg2')}
					title={D.seeAlso}
					lang={lg2}
					alone={false}
					allowEmpty={true}
				/>
			)}
		</div>
	);
}
export default SeeAlso;
