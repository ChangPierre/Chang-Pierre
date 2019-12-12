const conexion = require("../conection");

module.exports = {
	async insertar(nombre) {
		return await conexion.query('INSERT INTO public."Menu"( nombre ) VALUES ($1)', [nombre]);
	},
	async obtener() {
		const resultados = await conexion.query('SELECT * FROM public."Menu" ORDER BY "idMenu"');
		return resultados.rows;
	},
	async obtenerPorId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Menu" WHERE "idMenu"=$1', [id]);
		return resultados.rows[0];
	},
	async actualizar(id, nombre) {
		return conexion.query('UPDATE public."Menu" SET nombre=$2 WHERE "idMenu"=$1', [id, nombre]);
	},
	async eliminar(id) {
		return conexion.query('DELETE FROM public."Menu" WHERE "idMenu"=$1', [id]);
	}
};
