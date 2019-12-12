const conexion = require("../conection");

module.exports = {
	async insertar(nombre, email, pass) {
		return await conexion.query('INSERT INTO public."Usuario"( nombre, email, pass) VALUES ($1, $2, $3)', [nombre, email, pass]);
	},
	async obtener() {
		const resultados = await conexion.query('SELECT * FROM public."Usuario" ORDER BY "idUsuario"');
		return resultados.rows;
	},
	async obtenerId(email, pass) {
		const resultados = await conexion.query('SELECT * FROM public."Usuario" WHERE email=$1 and pass=$2', [email, pass]);
		return resultados.rows[0];
	},
	async obtenerPorId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Usuario" WHERE "idUsuario"=$1', [id]);
		return resultados.rows[0];
	},
	async actualizar(id, nombre, email, pass) {
		return conexion.query('UPDATE public."Usuario" SET nombre=$2, email=$3, pass=$4, a WHERE "idUsuario"=$1;'[id, nombre, email, pass]);
	},
	async eliminar(id) {
		return conexion.query('DELETE FROM public."Usuario" WHERE "idUsuario"=$1', [id]);
	}
};
