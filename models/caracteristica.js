const conexion = require("../conection");

module.exports = {
	async insertar(idProducto, talla, color, precio, stock, imagen) {
		return await conexion.query('INSERT INTO public."Caracteristica"( "idProducto", talla, color, precio, stock, imagen) VALUES ($1, $2, $3, $4, $5, $6)', [idProducto, talla, color, precio, stock, imagen]);
	},
	async obtener() {
		const resultados = await conexion.query('SELECT * FROM public."Caracteristica" ORDER BY "idCaracteristica"');
		return resultados.rows;
	},
	async obtenerPorId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Caracteristica" WHERE "idCaracteristica"=$1', [id]);
		return resultados.rows[0];
	},
	async obtenerPorProductoId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Caracteristica" WHERE "idProducto"=$1 ORDER BY "idCaracteristica"', [id]);
		return resultados.rows;
	},
	async actualizar(id, idProducto, talla, color, precio, stock, imagen) {
		return conexion.query('UPDATE public."Caracteristica" SET "idProducto"=$2, talla=$3, color=$4, precio=$5, stock=$6 imagen=$7 WHERE "idCaracteristica"=$1', [id, idProducto, talla, color, precio, stock, imagen]);
	},
	async eliminar(id) {
		return conexion.query('DELETE FROM public."Caracteristica" WHERE "idCaracteristica"=$1', [id]);
	}
};
