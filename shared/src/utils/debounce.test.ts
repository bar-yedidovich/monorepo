import { describe, it, expect, vi, beforeEach } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	it('should delay function execution', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn();
		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledOnce();
	});

	it('should reset timer on multiple calls', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn();
		vi.advanceTimersByTime(50);
		debouncedFn();
		vi.advanceTimersByTime(50);
		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledOnce();
	});

	it('should pass arguments to the function', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn('test', 42);
		vi.advanceTimersByTime(100);

		expect(fn).toHaveBeenCalledWith('test', 42);
	});

	it('should only call function once after delay', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn();
		debouncedFn();
		debouncedFn();
		vi.advanceTimersByTime(100);

		expect(fn).toHaveBeenCalledOnce();
	});
});
