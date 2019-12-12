const conexion = require("../conection");

module.exports = {
	async insertar(idCliente, direccion1, direccion2, pais, provincia, ciudad, postal, telefono) {
		return await conexion.query('INSERT INTO public."Direccion"( "idCliente", direccion1, direccion2, pais, provincia, ciudad, postal, telefono) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [idCliente, direccion1, direccion2, pais, provincia, ciudad, postal, telefono]);
	},
	async obtener() {
		const resultados = await conexion.query('SELECT * FROM public."Direccion" ORDER BY "idDireccion"');
		return resultados.rows;
	},
	async obtenerPorClienteLimit(idCliente,limit) {
		const resultados = await conexion.query('SELECT * FROM public."Direccion" WHERE "idCliente"=$1 ORDER BY "idDireccion" DESC LIMIT $2',[idCliente,limit]);
		return resultados.rows[0];
	},
	async obtenerPorId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Direccion" WHERE "idDireccion"=$1', [id]);
		return resultados.rows[0];
	},
	async actualizar(id, direccion1, direccion2, pais, provincia, ciudad, postal, telefono) {
		return conexion.query('UPDATE public."Direccion" SET "direccion1"=$2, direccion2=$3, pais=$4, provincia=$5, ciudad=$6 postal=$7 telefono=$8 WHERE "idDireccion"=$1', [id, direccion1, direccion2, pais, provincia, ciudad, postal, telefono]);
	},
	async eliminar(id) {
		return conexion.query('DELETE FROM public."Direccion" WHERE "idDireccion"=$1', [id]);
	}
};
