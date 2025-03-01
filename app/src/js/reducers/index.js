import { getItems } from './utils/list-reducer';
import { combineReducers } from 'redux';
import app from './app';
import sharedReducers from './shared';
import conceptReducers from './concepts';
import * as conceptGeneral from './concepts/by-id/general';
import * as notes from './concepts/by-id/notes';
import * as links from './concepts/by-id/links';
import * as collectionGeneral from './collections/by-id/general';
import * as members from './collections/by-id/members';
import collectionReducers from './collections';
import roleReducers from './roles';
import dashboardReducers from './dashboard';
import classificationsReducers from './classifications';
import operationsReducers from './operations';
import codesListReducers from './operations/codesList';
import organisationsReducers from './operations/organisations';

import remoteCalls, * as remoteCallsSelectors from './remote-calls';

export default combineReducers({
	app,
	...sharedReducers,
	...conceptReducers,
	...collectionReducers,
	...roleReducers,
	...dashboardReducers,
	...classificationsReducers,
	...operationsReducers,
	...codesListReducers,
	...organisationsReducers,

	remoteCalls,
});

export const getConceptList = state => getItems(state.conceptList);
export const getConceptSearchList = state => getItems(state.conceptSearchList);
export const getConceptValidateList = state =>
	getItems(state.conceptToValidateList);

export const getConceptGeneral = (state, id) =>
	conceptGeneral.getGeneral(state.conceptGeneral, id);
export const getNotes = (state, id, version) =>
	notes.getNotes(state.conceptNotes, id, version);
export const getLinks = (state, id) => links.getLinks(state.conceptLinks, id);

export function getAllNotes(state, id, lastVersion) {
	return notes.getAllNotes(state.conceptNotes, id, lastVersion);
}

export function getConcept(state, id) {
	const general = getConceptGeneral(state, id);
	const links = getLinks(state, id);
	let notes;
	if (general) {
		notes = getNotes(state, id, general.conceptVersion);
	}

	if (!(general && notes && links)) return;

	return {
		general,
		notes,
		links,
	};
}

export const getCollectionList = state => getItems(state.collectionList);
export const getCollectionDashboardList = state =>
	getItems(state.collectionDashboardList);
export const getCollectionValidateList = state =>
	getItems(state.collectionToValidateList);

export const getCollectionGeneral = (state, id) =>
	collectionGeneral.getGeneral(state.collectionGeneral, id);
export const getMembers = (state, id) =>
	members.getMembers(state.collectionMembers, id);

export function getCollection(state, id) {
	const general = getCollectionGeneral(state, id);
	const members = getMembers(state, id);

	if (!(general && members)) return;
	return {
		general,
		members,
	};
}

export const getDisseminationStatusList = state =>
	getItems(state.disseminationStatusList);
export const getStampList = state => getItems(state.stampList);
export const getRoleList = state => getItems(state.roleList);
export const getAgentList = state => getItems(state.agentList);
export const getPermission = state => {
	const {
		type: authType,
		user: { roles, stamp },
	} = state.app.auth;
	return { authType, roles, stamp };
};
export const getLangs = state => {
	const { lg1, lg2 } = state.app.properties;
	return { lg1, lg2 };
};

export const getStatus = (state, op) =>
	remoteCallsSelectors.getStatus(state.remoteCalls, op);

export const getError = (state, op) =>
	remoteCallsSelectors.getError(state.remoteCalls, op);

export const getNewlyCreatedId = state =>
	remoteCallsSelectors.getNewlyCreatedId(state.remoteCalls);

export const getFamily = state => {
	return state.operationsFamiliesCurrent || {};
};

export const getSerie = state => {
	return state.operationsSeriesCurrent || {};
};
export const getSeries = state => {
	return state.operationsSeriesList || {};
};

export const getFamilies = state => {
	return state.operationsFamiliesList || {};
};

export const getIndicators = state => {
	return state.operationsIndicatorsList || {};
};

export const getOperations = state => {
	return state.operationsOperationsList || {};
};

export const getOperation = state => {
	return state.operationsOperationsCurrent || {};
};

export const getIndicator = state => {
	return state.operationsIndicatorsCurrent || {};
};

export const getOperationsSimsCurrent = state => {
	return state.operationsSimsCurrent || {};
};
