import reducerFamilyMembers, { getMembers } from './members';
import * as A from 'js/actions/constants';
import { LOADED } from 'js/constants';

describe('reducerFamilyMembers', () => {
	test('action LOAD_CLASSIFICATIONS_FAMILLY_MEMBERS_SUCCESS', () => {
		const action = {
			type: A.LOAD_CLASSIFICATIONS_FAMILLY_MEMBERS_SUCCESS,
			payload: { id: 'id1', results: 'members' },
		};
		const result = reducerFamilyMembers(
			{ id1: 'previous', id2: 'previous' },
			action
		);
		expect(result).toEqual({
			id1: {
				status: LOADED,
				results: 'members',
			},
			id2: 'previous',
		});
	});
});

describe('getMembers', () => {
	test('getMembers selector should extract nothing', () => {
		const result = getMembers({ id1: { results: 'members' } }, 'id2');
		expect(result).toEqual();
	});
	test('getMembers selector should extract results', () => {
		const result = getMembers({ id1: { results: 'members' } }, 'id1');
		expect(result).toEqual('members');
	});
});
