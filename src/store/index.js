import { createStore } from "vuex";
import _login from "./_login";
import _documento from "./_documento";
import _colegiado from "./colegiado/_colegiado";
import _movimiento from "./colegiado/_movimiento";
import _certificadoHabilidad from "./colegiado/_certificadoHabilidad";
import _trasferencia from "./colegiado/_trasferencia";
import _resoluciones from "./colegiado/_resoluciones";
import _fomaf from "./colegiado/_fomaf";
import _controlEvento from "./colegiado/_controlEvento";
import _persona from "./_persona";
import _tesoreria from "./_tesoreria";
import _establecimiento from "./mantenedores/_establecimiento";
import _cargo from "./mantenedores/_cargo";
import _tipoResolucion from "./mantenedores/_tipoResolucion";
import _tramite from "./mantenedores/_tramite";
import _tipoExpediente from "./mantenedores/_tipoExpediente";
import _multimedia from "./mantenedores/_multimedia";
import _sistram from "./colegiado/_sistram";
import _movimiento_expediente from "./colegiado/_movimiento_expediente";
import _decano from "./mantenedores/_decano";
import _correlativo from "./mantenedores/_correlativo";
import _auxiliar from "./tesoreria/_auxiliar";
import _concepto from "./tesoreria/_concepto";
import _plancuenta from "./tesoreria/_plancuenta";
import _cuotasmeses from "./tesoreria/_cuotasmeses";
import _notaingreso from "./tesoreria/_notaingreso";
import _asignardiversos from "./tesoreria/_asignardiversos";
import _comprobantepago from "./tesoreria/_comprobantepago";
import _reembolsocajadetalle from "./tesoreria/_reembolsocajadetalle";
import _transaccionbancaria from "./tesoreria/_transaccionbancaria";
import _transaccionpos from "./tesoreria/_transaccionpos";
import _historialpagos from "./tesoreria/_historialpagos";
import _caja from "./tesoreria/_caja";
import _parametro from "./_parametro";
import _notacredito from "./tesoreria/_notacredito";
import _usuarios from "./mantenedores/_usuarios";
import _asignarcobranza from "./colegiado/_asignarcobranza";
import _comprobante from "./tesoreria/_comprobante";
import _reporte_secretaria from "./reporte/_reporte_secretaria";
import _auditoria from "./auditoria/_auditoria";
import _reporte_colegiado from "./reporte/_reporte_colegiado";
import _reporte_gastos from "./reporte/_reporte_gastos";
import _traslado from "./colegiado/_traslado";
import _reporte_egresos_mensuales from "./reporte/_reporte_egresos_mensuales";
import _reporte_ingresos_mensuales from "./reporte/_reporte_ingresos_mensuales";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    _login,
    _documento,
    _colegiado,
    _movimiento,
    _certificadoHabilidad,
    _trasferencia,
    _persona,
    _tesoreria,
    _resoluciones,
    _fomaf,
    _controlEvento,
    _establecimiento,
    _cargo,
    _tipoResolucion,
    _tramite,
    _tipoExpediente,
    _multimedia,
    _sistram,
    _movimiento_expediente,
    _decano,
    _correlativo,
    _auxiliar,
    _concepto,
    _plancuenta,
    _cuotasmeses,
    _notaingreso,
    _asignardiversos,
    _comprobantepago,
    _reembolsocajadetalle,
    _transaccionbancaria,
    _transaccionpos,
    _historialpagos,
    _caja,
    _parametro,
    _notacredito,
    _usuarios,
    _asignarcobranza,
    _comprobante,
    _reporte_secretaria,
    _auditoria,
    _reporte_colegiado,
    _traslado,
    _reporte_gastos, 
    _reporte_egresos_mensuales,
    _reporte_ingresos_mensuales
  },
});
