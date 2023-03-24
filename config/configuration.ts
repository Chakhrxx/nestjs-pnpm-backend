export default () => ({
  // mongoDB config
  mongoURI: process.env.MONGOURI,
  mongoOption: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: process.env.MONGO_DB_NAME,
    autoIndex: false, // Don't build indexes
    // If not connected, return errors immediately rather than waiting for reconnect
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6,
  },
  // postgres config
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  postgresUserName: process.env.POSTGRES_USERNAME,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDBName: process.env.POSTGRES_DB_NAME,
});
