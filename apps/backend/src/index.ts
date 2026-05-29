import { registerGlobalErrorHandlers } from './utils/error-handlers';
import { useEnv } from './libs/env/dotenv';

console.log('> Loading...');

// Register global handlers for uncaught exceptions and unhandled rejections
registerGlobalErrorHandlers();

// TODO: create environments folder with env files - this project use the env files in the config.ts file, adjust accordingly => `environments/.env.${NODE_ENV}
useEnv();

// need to be after env is loaded
import createApp from './app/app';
import config from './config/config';

const port = config.port;

createApp().then((app) => {
	app.listen(port, () => console.log(`> Ready on port ${port}`));
});
