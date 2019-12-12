const conexion = require("../conection");

module.exports = {
	async insertar(img,url) {
		return await conexion.query('INSERT INTO public."Banner"( img, url ) VALUES ($1, $2)', [img,url]);
	},
	async obtener() {
		const resultados = await conexion.query('SELECT * FROM public."Banner" ORDER BY "idBanner"');
		return resultados.rows;
	},
	async obtenerPorId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Banner" WHERE "idBanner"=$1', [id]);
		return resultados.rows[0];
	},
	async obtenerCount() {
		const resultados = await conexion.query('SELECT COUNT("idBanner") FROM public."Banner"');
		return resultados.rows[0];
	},
	async actualizar(id, img,url) {
		return conexion.query('UPDATE public."Banner" SET img=$2, img=$3 WHERE "idBanner"=$1', [id, img, url]);
	},
	async eliminar(id) {
		return conexion.query('DELETE FROM public."Banner" WHERE "idBanner"=$1', [id]);
	}
};
