import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ConceptsContainer from 'js/components/concepts/home-container';
import ConceptsSearchListContainer from 'js/components/concepts/advanced-search/home-container';
import ConceptCompareContainer from 'js/components/concepts/compare/home-container';
import ConceptSendContainer from 'js/components/concepts/send/home-container';
import ConceptCreationContainer from 'js/components/concepts/edition-creation/creation-container';
import ConceptEditionContainer from 'js/components/concepts/edition-creation/edition-container';
//import ConceptDeletionContainer from 'js/components/concepts/edition-creation/deletion-container';

import ConceptVisualizationContainer from 'js/components/concepts/visualization/home-container';
import ConceptsToValidateContainer from 'js/components/concepts/validation/home-container';
import ConceptsToExportContainer from 'js/components/concepts/export/home-container';
import CollectionsContainer from 'js/components/collections/home-container';
import CollectionVisualizationContainer from 'js/components/collections/visualization/home-container';
import CollectionSendContainer from 'js/components/collections/send/home-container';
import CollectionCreationContainer from 'js/components/collections/edition-creation/creation-container';
import CollectionEditionContainer from 'js/components/collections/edition-creation/edition-container';
import CollectionsToValidateContainer from 'js/components/collections/validation/home-container';
import CollectionsToExportContainer from 'js/components/collections/export/home-container';
import Help from 'js/components/help/home';
import Administration from 'js/components/administration/home-container';
import ConceptsDashboard from 'js/components/administration/dashboard/concepts/home-container';
import D from 'js/i18n';
import Menu from 'js/components/concepts/menu';

export default () => {
	document.title = 'Bauhaus - ' + D.conceptsTitle;
	return (
		<>
			<Menu />
			<Switch>
				<Route exact path="/concepts" component={ConceptsContainer} />
				<Route
					exact
					path="/concepts/search"
					component={ConceptsSearchListContainer}
				/>
				<Route
					exact
					path="/concept/create"
					component={ConceptCreationContainer}
				/>
				<Route
					exact
					path="/concept/:id"
					component={ConceptVisualizationContainer}
				/>
				<Route
					exact
					path="/concept/:id/compare"
					component={ConceptCompareContainer}
				/>
				<Route
					exact
					path="/concept/:id/send"
					component={ConceptSendContainer}
				/>
				<Route
					exact
					path="/concept/:id/modify"
					component={ConceptEditionContainer}
				/>
				<Route
					exact
					path="/concepts/validation"
					component={ConceptsToValidateContainer}
				/>
				<Route
					exact
					path="/concepts/export"
					component={ConceptsToExportContainer}
				/>
				<Route exact path="/collections" component={CollectionsContainer} />
				<Route
					exact
					path="/collection/create"
					component={CollectionCreationContainer}
				/>
				<Route
					exact
					path="/collection/:id"
					component={CollectionVisualizationContainer}
				/>
				<Route
					exact
					path="/collection/:id/send"
					component={CollectionSendContainer}
				/>
				<Route
					exact
					path="/collection/:id/modify"
					component={CollectionEditionContainer}
				/>
				<Route
					exact
					path="/collections/validation"
					component={CollectionsToValidateContainer}
				/>
				<Route
					exact
					path="/collections/export"
					component={CollectionsToExportContainer}
				/>
				<Route exact path="/concepts/help/:id" component={Help} />
				<Route
					exact
					path="/concepts/administration"
					component={Administration}
				/>

				<Route
					exact
					path="/concepts/administration/dashboard"
					component={ConceptsDashboard}
				/>
			</Switch>
		</>
	);
};
