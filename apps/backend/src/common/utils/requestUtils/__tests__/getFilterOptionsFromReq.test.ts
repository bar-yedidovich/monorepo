import { Request } from 'express';
import { describe, expect, test } from 'vitest';
import { getFilterOptionsFromReq } from '../getFilterOptionsFromReq';

describe('getFilterOptionsFromReq works for all the options', () => {
	test('returns id from params', () => {
		const testRequestObject = { params: { id: 'testId' } } as unknown as Request;
		const filterOptions = getFilterOptionsFromReq(testRequestObject);
		expect(filterOptions).toEqual({ _id: 'testId' });
	});

	test('returns id from query', () => {
		const testRequestObject = { query: { id: 'testId' } } as unknown as Request;
		const filterOptions = getFilterOptionsFromReq(testRequestObject);
		expect(filterOptions).toEqual({ _id: 'testId' });
	});

	test('returns ids array from params', () => {
		const testRequestObject = { query: { ids: ['testId1', 'testId2'] } } as unknown as Request;
		const filterOptions = getFilterOptionsFromReq(testRequestObject);
		expect(filterOptions).toEqual({ _id: ['testId1', 'testId2'] });
	});

	test('returns other query filter', () => {
		const testRequestObject = {
			query: { testKey: 'testId', secondCustomFilterOptionKey: 'test2' },
		} as unknown as Request;
		const filterOptions = getFilterOptionsFromReq(testRequestObject);
		expect(filterOptions).toEqual({ testKey: 'testId', secondCustomFilterOptionKey: 'test2' });
	});

	test('returns id from params with a different key for filter then default', () => {
		const testRequestObject = {
			params: { id: 'testId' },
			query: { idKey: 'testKey' },
		} as unknown as Request;
		const filterOptions = getFilterOptionsFromReq(testRequestObject);
		expect(filterOptions).toEqual({ testKey: 'testId' });
	});
});
