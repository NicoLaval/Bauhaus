import api from 'js/remote-api/operations-api';
import * as A from 'js/actions/constants';
import { LOADING } from 'js/constants';
import { getLabelsFromParent } from 'js/utils/msd';

/**
 * Method used to merge a SIMS with the label of its corresponding
 * parent.
 *
 * @param {*} sims
 * @param {*} promise
 */
function getFetchLabelsPromise(sims, promise) {
	function mergeLabels(parent, parentType) {
		return {
			...sims,
			...getLabelsFromParent(parent, parentType),
		};
	}
	if (sims.idOperation) {
		return api
			.getOperation(sims.idOperation)
			.then(parent => mergeLabels(parent, 'operation'));
	}
	if (sims.idSeries) {
		return api
			.getSerie(sims.idSeries)
			.then(parent => mergeLabels(parent, 'series'));
	}
	if (sims.idIndicator) {
		return api
			.getIndicator(sims.idIndicator)
			.then(parent => mergeLabels(parent, 'indicator'));
	}
	return promise;
}
/**
 * This method is called when we need to save a SIMS.
 * If the sims passed as a parameter already have an id,
 * we will send a PUR request. If this property is not
 * present, a POST request will be send.
 *
 * @param {Sims} sims
 * @param {(string) => void} callback
 */
export const saveSims = (sims, callback) => dispatch => {
	let promise = Promise.resolve(sims);

	if (!sims.labelLg1) {
		promise = getFetchLabelsPromise(sims, promise);
	}

	const method = sims.id ? 'putSims' : 'postSims';
	dispatch({
		type: A.SAVE_OPERATIONS_SIMS,
		payload: sims,
	});
	return promise.then(sims => {
		return api[method](sims).then(
			results => {
				dispatch({
					type: A.SAVE_OPERATIONS_SIMS_SUCCESS,
					payload: sims,
				});
				callback(results || sims.id);
			},
			err => {
				dispatch({
					type: A.SAVE_OPERATIONS_SIMS_FAILURE,
					payload: { err },
				});
			}
		);
	});
};

function getParentsWithoutSims(idOperation) {
	if (idOperation) {
		return api
			.getOperation(idOperation)
			.then(operation => api.getOperationsWithoutReport(operation.series.id));
	}
	return Promise.resolve([]);
}

export default id => (dispatch, getState) => {
	if (!id || getState().operationsSimsCurrentStatus === LOADING) {
		return;
	}
	dispatch({
		type: A.LOAD_OPERATIONS_SIMS,
		payload: {
			id,
		},
	});

	return api.getSims(id).then(
		results => {
			return getParentsWithoutSims(results.idOperation).then(
				(parentsWithoutSims = []) => {
					dispatch({
						type: A.LOAD_OPERATIONS_SIMS_SUCCESS,
						payload: {
							...results,
							parentsWithoutSims,
							rubrics: results.rubrics.reduce((acc, rubric) => {
								return {
									...acc,
									[rubric.idAttribute]: {
										...rubric,
										idMas: rubric.idAttribute,
									},
								};
							}, {}),
						},
					});
				}
			);
		},

		err => {
			dispatch({
				type: A.LOAD_OPERATIONS_SIMS_LIST_FAILURE,
				payload: { err },
			});
		}
	);
};
