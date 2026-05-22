import { describe, it, expect } from 'vitest';
import { MS, SECOND, MINUTE, HOUR } from './time';

describe('time constants', () => {
	it('MS should be 1', () => {
		expect(MS).toBe(1);
	});

	it('SECOND should be 1000 milliseconds', () => {
		expect(SECOND).toBe(1000);
		expect(SECOND).toBe(1000 * MS);
	});

	it('MINUTE should be 60 seconds', () => {
		expect(MINUTE).toBe(60000);
		expect(MINUTE).toBe(60 * SECOND);
	});

	it('HOUR should be 60 minutes', () => {
		expect(HOUR).toBe(3600000);
		expect(HOUR).toBe(60 * MINUTE);
	});

	it('constants should have correct relationships', () => {
		expect(SECOND / MS).toBe(1000);
		expect(MINUTE / SECOND).toBe(60);
		expect(HOUR / MINUTE).toBe(60);
		expect(HOUR / SECOND).toBe(3600);
	});
});
