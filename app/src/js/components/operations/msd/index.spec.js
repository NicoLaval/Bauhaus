import { mapStateToProps, HELP, VIEW, CREATE } from './index';
import { NOT_LOADED, LOADED } from 'js/constants';

describe('', () => {
	it('should return NOT_LOADED for the metadataStructureStatus', () => {
		const input = {};
		const expected = {
			metadataStructureStatus: NOT_LOADED,
			metadataStructure: [],
		};
		expect(mapStateToProps(input)).toEqual(expected);
	});

	it('should return a empty object as currenSims for the HELP MODE', () => {
		const input = {
			operationsMetadataStructureList: {
				results: 'operationsMetadataStructureList',
				status: LOADED,
			},
			app: {
				properties: {
					lg1: 'lg1',
					lg2: 'lg2',
				},
			},
		};

		const props = {
			mode: HELP,
			match: {
				params: {
					id: 1,
				},
			},
		};
		const output = mapStateToProps(input, props);
		expect(output.currentSims).toEqual({});
	});

	it('should return a currenSims with a default label for the CREATE MODE', () => {
		const input = {
			operationsMetadataStructureList: {
				results: 'operationsMetadataStructureList',
				status: LOADED,
			},
			app: {
				properties: {
					lg1: 'lg1',
					lg2: 'lg2',
				},
			},
			operationsSeriesCurrentStatus: LOADED,
			operationsSeriesCurrent: {
				id: 2,
				prefLabelLg1: 'prefLabelLg1',
				prefLabelLg2: 'prefLabelLg2',
			},
		};

		const props = {
			mode: CREATE,
			match: {
				params: {
					idParent: 2,
					0: 'series',
				},
			},
		};
		const output = mapStateToProps(input, props);
		expect(output.currentSims).toEqual({
			labelLg1: 'prefLabelLg1 SIMS',
			labelLg2: 'SIMS de la série prefLabelLg2',
		});
		expect(output.parentType).toEqual('series');
	});

	it('should return a complete currenSims for the VIEW MODE', () => {
		const input = {
			operationsMetadataStructureList: {
				results: 'operationsMetadataStructureList',
				status: LOADED,
			},
			app: {
				properties: {
					lg1: 'lg1',
					lg2: 'lg2',
				},
			},
			operationsSimsCurrent: {
				id: 1,
				idOperation: 2,
			},
		};

		const props = {
			mode: VIEW,
			match: {
				params: {
					id: 1,
				},
			},
		};
		const output = mapStateToProps(input, props);
		expect(output.currentSims).toEqual({
			id: 1,
			idOperation: 2,
		});
		expect(output.parentType).toEqual('operation');
	});

	it('should return the langes', () => {
		const input = {
			operationsMetadataStructureList: {
				results: 'operationsMetadataStructureList',
				status: LOADED,
			},
			app: {
				properties: {
					lg1: 'lg1',
					lg2: 'lg2',
				},
			},
		};

		const props = {
			mode: HELP,
			match: {
				params: {
					id: 1,
				},
			},
		};
		expect(mapStateToProps(input, props).langs).toEqual({
			lg1: 'lg1',
			lg2: 'lg2',
		});
	});
});
