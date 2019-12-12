const conexion = require("../conection");

module.exports = {
	async countFilas() {
		const resultados = await conexion.query('SELECT COUNT("idProducto") FROM public."Producto"');
		return resultados.rows[0];
	},
	async insertar(idUsuario, nombre, marca, descuento, imgprincipal, precioBase, descripcion) {
		return await conexion.query('INSERT INTO public."Producto"( "idUsuario", nombre, marca, descuento, imagenprincipal, "precioBase", descripcion) VALUES ($1, $2, $3, $4, $5. $6)', [idUsuario, nombre, marca, descuento, imgprincipal, precioBase, descripcion]);
	},
	async obtener() {
		const resultados = await conexion.query('SELECT * FROM public."Producto" order by "idProducto"');
		return resultados.rows;
	},
	async obtenerMasVendidos(limit) {
		const resultados = await conexion.query('SELECT public."Producto".*, COUNT(public."Producto"."idProducto") AS conteo FROM public."Producto" INNER JOIN public."Caracteristica" ON public."Producto"."idProducto"=public."Caracteristica"."idProducto" INNER JOIN public."Venta" ON public."Caracteristica"."idCaracteristica"=public."Venta"."idCaracteristica" GROUP BY public."Producto"."idProducto" ORDER BY conteo DESC LIMIT $1', [limit]);
		return resultados.rows;
	},
	async obtenerMasVendidosCount() {
		const resultados = await conexion.query('SELECT count(*) FROM (SELECT public."Producto".*, COUNT(public."Producto"."idProducto") AS conteo FROM public."Producto" INNER JOIN public."Caracteristica" ON public."Producto"."idProducto"=public."Caracteristica"."idProducto" INNER JOIN public."Venta" ON public."Caracteristica"."idCaracteristica"=public."Venta"."idCaracteristica" GROUP BY public."Producto"."idProducto") as foo');
		return resultados.rows[0];
	},

	async obtenerAlgunos(limit, offset) {
		const resultados = await conexion.query('SELECT * FROM public."Producto" ORDER BY descuento ASC LIMIT $1 OFFSET $2', [limit, limit * offset]);
		return resultados.rows;
	},
	async obtenerPorId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Producto" WHERE "idProducto"=$1', [id]);
		return resultados.rows[0];
	},
	async countFilasPorBusqueda(text) {
		const resultados = await conexion.query('SELECT COUNT(*) FROM public."Producto" WHERE LOWER(nombre) LIKE LOWER(\'%' + text + '%\') OR LOWER(marca) LIKE lOWER(\'%' + text + '%\') OR LOWER(descripcion) LIKE lOWER(\'%' + text + '%\') OR LOWER(caracteristica) LIKE lOWER(\'%' + text + '%\')');
		return resultados.rows[0];
	},
	async obtenerPorBusqueda(text,limit, offset) {
		const resultados = await conexion.query('SELECT * FROM public."Producto" WHERE LOWER(nombre) LIKE lOWER(\'%' + text + '%\') OR LOWER(marca) LIKE lOWER(\'%' + text + '%\') OR LOWER(descripcion) LIKE lOWER(\'%' + text + '%\') OR LOWER(caracteristica) LIKE lOWER(\'%' + text + '%\') ORDER BY descuento ASC LIMIT $1 OFFSET $2', [limit, offset]);
		return resultados.rows;
	},
	async actualizar(id, idUsuario, nombre, marca, descuento, imgprincipal, precioBase, descripcion) {
		return conexion.query('UPDATE public."Producto" SET "idUsuario"=$2, nombre=$3, marca=$4, descuento=$5, imagenprincipal=$6, "precioBase"=$7, descripcion="$8" WHERE "idProducto"=$1', [id, idUsuario, nombre, marca, descuento, imgprincipal, precioBase, descripcion]);
	},
	async eliminar(id) {
		return conexion.query('DELETE FROM public."Producto" WHERE "idProducto"=$1', [id]);
	}
};
