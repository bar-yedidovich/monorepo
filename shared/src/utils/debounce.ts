/**
 * Returns a function that delays invoking `fn` until after `delayMs` have elapsed
 * since the last call.
 */
export function debounce<T extends (...args: never[]) => void>(
	fn: T,
	delayMs: number
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return (...args: Parameters<T>) => {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			fn(...args);
		}, delayMs);
	};
}
