const conexion = require("../conection");

module.exports = {
	async insertar(email, pass, nombre) {
		try {
			const resultados = await conexion.query('INSERT INTO public."Cliente"( email, pass, nombre) VALUES ($1, $2, $3) RETURNING "idCliente" ', [email, pass, nombre]);
			return resultados.rows[0];
		}catch (e) {
			return null;
		}
	},
	async obtener() {
		const resultados = await conexion.query('SELECT * FROM public."Cliente" ORDER BY "idCliente"');
		return resultados.rows;
	},
	async obtenerId(email, pass) {
		const resultados = await conexion.query('SELECT * FROM public."Cliente" WHERE email=$1 and pass=$2', [email, pass]);
		return resultados.rows[0];
	},
	async obtenerPorId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Cliente" WHERE "Cliente"."idCliente"=$1', [id]);
		return resultados.rows[0];
	},
	async actualizar(id, email, pass, nombre, apellidos) {
		return conexion.query('UPDATE public."Cliente" SET email=$2, pass=$3, nombre=$4, apellidos=$5 WHERE "idCliente"=$1',[id, email, pass, nombre, apellidos]);
	},
	async actualizarDatos(id, nombre, apellido) {
		return conexion.query('UPDATE public."Cliente" SET nombre=$2, apellido=$3 WHERE "idCliente"=$1',[id, nombre, apellido]);
	},
	async actualizarEmail(id, email) {
		try {
			return conexion.query('UPDATE public."Cliente" SET email=$2 WHERE "idCliente"=$1',[id, email]);
		}catch (e) {
			return null;
		}
	},
	async actualizarPass(id, pass) {
		return conexion.query('UPDATE public."Cliente" SET pass=$2 WHERE "idCliente"=$1',[id, pass]);
	},
	async eliminar(id) {
		return conexion.query('DELETE FROM public."Cliente" WHERE "idCliente"=$1', [id]);
	}
};
