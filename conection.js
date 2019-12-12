const {Pool} = require("pg");

const pool = new Pool({
	host: 'ec2-174-129-255-99.compute-1.amazonaws.com',
	database: 'd23c6betn6i87q',
	user: 'gpmxpimbwisble',
	port: 5432,
	password: 'ee3d151b47a6af0246f0904acf74ef55b9b0feaac209c88ef09f5960754254d6',
	ssl: true
});
module.exports = pool;
