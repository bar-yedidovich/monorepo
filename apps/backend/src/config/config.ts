// load here all compiled env keys
const config = {
	connectionString: process.env.CONNECTION_STRING,
	port: process.env.PORT,
	refreshJwtKey: process.env.REFRESH_JWT,
	accessJwtKey: process.env.ACCESS_JWT,
	pepper: process.env.PEPPER,
};

export default config;
