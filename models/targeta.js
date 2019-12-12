const conexion = require("../conection");

module.exports = {
	async insertar(idCliente, numero, mes, anio, codigo) {
		try{
			return await conexion.query('INSERT INTO public."Targeta"("idCliente", numero, mes, anio, codigo) VALUES ($1, $2, $3, $4, $5)', [idCliente, numero, mes, anio, codigo]);
		} catch (e) {
			return null;
		}
	},
	async obtener() {
		const resultados = await conexion.query('SELECT * FROM public."Targeta" ORDER BY "idTargeta"');
		return resultados.rows;
	},
	async obtenerPorClienteLimit(idCliente,limit) {
		const resultados = await conexion.query('SELECT * FROM public."Targeta" WHERE "idCliente"=$1 ORDER BY "idTargeta" DESC LIMIT $2',[idCliente,limit]);
		return resultados.rows[0];
	},
	async obtenerPorId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Targeta" WHERE "idTargeta"=$1', [id]);
		return resultados.rows[0];
	},
	async actualizar(id, idCliente, numero, mes, anio, codigo) {
		return conexion.query('UPDATE public."Targeta" SET "idCliente"=$2, numero=$3, mes=$4, anio=$5, codigo=$6 WHERE "idTargeta"=$1', [id, idCliente, numero, mes, anio, codigo]);
	},
	async eliminar(id) {
		return conexion.query('DELETE FROM public."Targeta" WHERE "idTargeta"=$1', [id]);
	}
};
