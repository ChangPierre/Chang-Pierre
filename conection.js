const {Pool} = require("pg");

const pool = new Pool({
	host: 'ec2-174-129-238-192.compute-1.amazonaws.com',
	database: 'da87k703ao25h2',
	user: 'fboprjnznuvwwr',
	port: 5432,
	password: '08946a6bb897fb2443d88c8bcdd34c6fa95574a8dd31e1869fb233c10f8a6010',
	ssl: true
});
module.exports = pool;
