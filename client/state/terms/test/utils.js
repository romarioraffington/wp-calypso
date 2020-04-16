/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	getNormalizedTermsQuery,
	getSerializedTermsQuery,
	getSerializedTermsQueryWithoutPage,
} from '../utils';

describe('utils', () => {
	describe('getNormalizedTermsQuery()', () => {
		test('should exclude default values', () => {
			const query = getNormalizedTermsQuery({
				page: 2,
				number: 100,
			});

			expect(query).to.eql({
				page: 2,
			});
		});
	});

	describe('getSerializedTermsQuery()', () => {
		test('should return a JSON string of a normalized query', () => {
			const serializedQuery = getSerializedTermsQuery({
				search: 'ribs',
				page: 1,
			});

			expect(serializedQuery).to.equal('{"search":"ribs"}');
		});

		test('should lowercase the result', () => {
			const serializedQuery = getSerializedTermsQuery({
				search: 'Chicken',
				page: '2',
			});

			expect(serializedQuery).to.equal('{"search":"chicken","page":"2"}');
		});
	});

	describe('getSerializedTermsQueryWithoutPage()', () => {
		test('should return a JSON string of a normalized query without page', () => {
			const serializedQuery = getSerializedTermsQueryWithoutPage({
				search: 'Chicken',
				page: '2',
			});

			expect(serializedQuery).to.equal('{"search":"chicken"}');
		});
	});
});
