const dbUser = "admin";
const dbPassword = "Kostia1905";

const config = {
  port: 8080,
  dbUser,
  dbPassword,
  databaseUrl: `mongodb+srv://kostia:${dbPassword}@kdcluster-lsexx.mongodb.net/test?retryWrites=true`
};

module.exports = config;
