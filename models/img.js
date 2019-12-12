const conexion = require("../conection");

module.exports = {
	async insertar(idProducto, urlimg) {
		return await conexion.query('INSERT INTO public."Img"( "idProducto", urlimg ) VALUES ($1, $2)', [idProducto, urlimg]);
	},
	async obtener() {
		const resultados = await conexion.query('SELECT * FROM public."Img" ORDER BY "idImg"');
		return resultados.rows;
	},
	async obtenerPorId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Img" WHERE "idImg"=$1', [id]);
		return resultados.rows[0];
	},
	async actualizar(id, idProducto, urlimg) {
		return conexion.query('UPDATE public."Img" SET "idProducto"=$2, urlimg=$3 WHERE "idImg"=$1', [id, idProducto, urlimg]);
	},
	async eliminar(id) {
		return conexion.query('DELETE FROM public."Img" WHERE "idImg"=$1', [id]);
	}
};
