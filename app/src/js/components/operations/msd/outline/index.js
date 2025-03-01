import React, { Component } from 'react';
import { toggleOpen, isOpen } from 'js/components/operations/msd/utils';
import { HashLink as Link } from 'react-router-hash-link';
import OutlineBlock from 'js/components/operations/msd/outline/outline-block';
import PropTypes from 'prop-types';
import D from 'js/i18n';

import './style.scss';

class Outline extends Component {
	static propTypes = {
		storeCollapseState: PropTypes.bool,
		metadataStructure: PropTypes.object.isRequired,
		baseUrl: PropTypes.string,
	};

	constructor(props) {
		super(props);

		/**
		 * If the storeCollapseState is false, we won't store the state in the localStorage.
		 * It will be resetted after each F5
		 */
		this.state = {
			opened: props.storeCollapseState && isOpen(props.metadataStructure.idMas),
		};
	}

	expandOrCollapseItem = () => {
		this.setState(previousState => ({ opened: !previousState.opened }));
		this.props.storeCollapseState &&
			toggleOpen(this.props.metadataStructure.idMas);
	};

	render() {
		const {
			metadataStructure,
			storeCollapseState,
			baseUrl = '/operations/help/',
			disableSectionAnchor = false,
		} = this.props;

		return (
			<li>
				<div className="msd__outline-primary-item">
					<Link
						to={`${baseUrl}${
							disableSectionAnchor ? '' : metadataStructure.idMas
						}#${metadataStructure.idMas}`}
					>
						{metadataStructure.idMas} -{' '}
						{metadataStructure.masLabelBasedOnCurrentLang}
					</Link>

					{Object.keys(metadataStructure.children).length > 0 && (
						<button
							className="msd__outline-primary-updown"
							title={this.state.opened ? D.hide : D.display}
							onClick={this.expandOrCollapseItem}
						>
							<span
								className={` glyphicon glyphicon-chevron-${
									this.state.opened ? 'up' : 'down'
								}`}
							/>
						</button>
					)}
				</div>

				{this.state.opened && (
					<OutlineBlock
						children={metadataStructure.children}
						parent={metadataStructure.idMas}
						storeCollapseState={storeCollapseState}
						baseUrl={baseUrl}
						disableSectionAnchor={disableSectionAnchor}
					/>
				)}
			</li>
		);
	}
}

export default Outline;
