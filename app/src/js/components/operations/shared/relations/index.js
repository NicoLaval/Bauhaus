import React from 'react';
import { Note } from 'js/components/shared/note/note';
import './relations.scss';
import { Link } from 'react-router-dom';

export function RelationsViewPerLgContent({
	children,
	childrenTitle,
	childrenPath,
	parent,
	parentTitle,
	parentPath,
	langSuffix,
}) {
	return (
		<>
			{parent && (
				<p>
					<span className="linksTitle">{parentTitle}:</span>
					<Link to={`/operations/${parentPath}/${parent.id}`}>
						{parent[`label${langSuffix}`]}
					</Link>
				</p>
			)}
			{children && (
				<>
					<p>
						<span className="linksTitle">{childrenTitle}:</span>
					</p>
					<ul>
						{children
							.sort(function(a, b) {
								return a[`label${langSuffix}`].localeCompare(
									b[`label${langSuffix}`]
								);
							})
							.map(item => (
								<li key={item.id}>
									<Link to={`/operations/${childrenPath}/${item.id}`}>
										{item[`label${langSuffix}`]}
									</Link>
								</li>
							))}
					</ul>
				</>
			)}
		</>
	);
}

export function RelationsViewPerLg(props) {
	return (
		<Note
			text={<RelationsViewPerLgContent {...props} />}
			title={props.title}
			lang={props.currentLang}
			alone={!props.secondLang}
			allowEmpty={true}
		/>
	);
}

function RelationsView(props) {
	return (
		<div className="row">
			<RelationsViewPerLg
				{...props}
				langSuffix="Lg1"
				currentLang={props.langs.lg1}
			/>
			{props.secondLang && (
				<RelationsViewPerLg
					{...props}
					langSuffix="Lg2"
					currentLang={props.langs.lg2}
				/>
			)}
		</div>
	);
}

export default RelationsView;
