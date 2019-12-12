const conexion = require("../conection");

module.exports = {
	async insertar(idCliente, idcaracteristica, cantidad, tipo) {
		return await conexion.query('INSERT INTO public."Venta"( "idCliente", "idCaracteristica", cantidad, fecha, tipo) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)', [idCliente, idcaracteristica, cantidad, tipo]);
	},
	async obtener() {
		const resultados = await conexion.query('SELECT * FROM public."Venta" ORDER BY "idCliente"');
		return resultados.rows;
	},
	async obtenerHistorial(idCliente) {
		const resultados = await conexion.query('SELECT "idVenta",fecha,tipo,cantidad,"Producto".*,color,talla,precio  FROM public."Venta" INNER JOIN public."Caracteristica" ON public."Venta"."idCaracteristica"=public."Caracteristica"."idCaracteristica" INNER JOIN public."Producto" ON public."Caracteristica"."idProducto"=public."Producto"."idProducto" WHERE "idCliente"=$1 AND tipo>0 ORDER BY "tipo" ASC',[idCliente]);
		return resultados.rows;
	},
	async obtenerPorTipo(idCliente, tipo) {
		const resultados = await conexion.query('SELECT "idVenta","Caracteristica"."idCaracteristica",stock,fecha,tipo,cantidad,"Producto".*,color,talla,precio  FROM public."Venta" INNER JOIN public."Caracteristica" ON public."Venta"."idCaracteristica"=public."Caracteristica"."idCaracteristica" INNER JOIN public."Producto" ON public."Caracteristica"."idProducto"=public."Producto"."idProducto" WHERE "idCliente"=$1 AND tipo=$2 ORDER BY "idVenta"', [idCliente, tipo]);
		return resultados.rows;
	},
	async obtenerPorTipoCarac(idCliente, idCaracteristica, tipo) {
		const resultados = await conexion.query('SELECT "idVenta" FROM public."Venta" WHERE "idCliente"=$1 AND "idCaracteristica"=$2 AND tipo=$3', [idCliente, idCaracteristica, tipo]);
		return resultados.rows[0];
	},
	async obtenerPorTipoCount(idCliente, tipo) {
		const resultados = await conexion.query('SELECT COUNT("idVenta") FROM public."Venta" WHERE "idCliente"=$1 AND tipo=$2', [idCliente, tipo]);
		return resultados.rows[0];
	},
	async obtenerPorId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Venta" WHERE "idVenta"=$1', [id]);
		return resultados.rows[0];
	},
	async actualizar(id, idCliente, idcaracteristica, cantidad, fecha, tipo) {
		return conexion.query('UPDATE public."Venta" SET "idCliente"=$2, "idcaracteristica"=$3, cantidad=$4, fecha=$5, tipo=$6 WHERE "idVenta"=$1', [id, idCliente, idcaracteristica, cantidad, fecha, tipo]);
	},
	async actualizarCantidad(id, cantidad) {
		return conexion.query('UPDATE public."Venta" SET cantidad=$2 WHERE "idVenta"=$1', [id, cantidad]);
	},
	async obtenerIdVentas(idCliente,tipo) {
		const resultados = await conexion.query('SELECT "idVenta" FROM public."Venta" WHERE "idCliente"=$1 AND tipo=$2 ORDER BY "idVenta"',[idCliente,tipo]);
		return resultados.rows;
	},
	async obtenerMaxTipo(idCliente) {
		const resultados = await conexion.query('SELECT MAX(tipo) FROM public."Venta" WHERE "idCliente"=$1', [idCliente]);
		return resultados.rows[0];
	},
	async actualizarTipo(idCliente,tipoInit, tipoFin) {
		return conexion.query('UPDATE public."Venta" SET tipo=$3, fecha=CURRENT_TIMESTAMP WHERE "idCliente"=$1 AND tipo=$2', [idCliente,tipoInit, tipoFin]);
	},
	async eliminar(id) {
		return conexion.query('DELETE FROM public."Venta" WHERE "idVenta"=$1', [id]);
	}
};
