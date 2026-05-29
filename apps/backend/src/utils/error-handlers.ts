export interface ErrorHandlerOptions {
	/** Whether the process should exit after a fatal error (default: true) */
	exitOnFatal?: boolean;
}

export function registerGlobalErrorHandlers(options: ErrorHandlerOptions = {}) {
	const { exitOnFatal = true } = options;

	// Handle uncaught exceptions (synchronous errors)
	process.on('uncaughtException', (err: unknown) => {
		console.error('Uncaught Exception:', err instanceof Error && err.stack ? err.stack : err);
		if (exitOnFatal) {
			process.exit(1);
		}
	});

	// Handle unhandled promise rejections (asynchronous errors)
	process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
		console.error('Unhandled Rejection at:', promise, 'reason:', reason);
		if (reason instanceof Error && reason.stack) console.error(reason.stack);
		if (exitOnFatal) {
			process.exit(1);
		}
	});
}

export default registerGlobalErrorHandlers;
