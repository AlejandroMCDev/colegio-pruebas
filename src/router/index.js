import { createRouter, createWebHistory } from "vue-router";
//import _login from '../store/_login';

const AutenticacionContainer = () =>
  import("../containers/AutenticacionContainer.vue");
const PanelContainer = () => import("../containers/PanelContainer.vue");

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/",
    component: PanelContainer,
    children: [
      {
        path: "/",
        name: "panelInicio",
        //meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Inicio.vue"),
      },
      {
        path: "/colegiatura/colegiado",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Colegiatura/Colegiado.vue"),
      },
      {
        path: "/tesoreria/control-cuotas",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/ControlCuotas.vue"),
      },
      {
        path: "/tesoreria/certificado-habilidad",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Tesoreria/CertificadoHabilidad.vue"),
      },
      {
        path: "/tesoreria/pagos-diversos",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/PagosDiversos.vue"),
      },
      {
        path: "/tesoreria/concepto",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/Concepto.vue"),
      },
      {
        path: "/tesoreria/auxiliar",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/Auxiliar.vue"),
      },
      {
        path: "/tesoreria/plancontable",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/PlanContable.vue"),
      },
      {
        path: "/tesoreria/meses",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/Meses.vue"),
      },
      {
        path: "/tesoreria/asignardiversos",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/AsignarDiversos.vue"),
      },
      {
        path: "/tesoreria/notaingreso",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/NotaIngreso.vue"),
      },
      {
        path: "/tesoreria/registropagos",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/RegistroPagos.vue"),
      },
      {
        path: "/tesoreria/notacredito",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/NotaCredito.vue"),
      },
      {
        path: "/tesoreria/reembolsocaja",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/ReembolsoCaja.vue"),
      },
      {
        path: "/tesoreria/regularizarrendir",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Tesoreria/RegularizarRendir.vue"),
      },
      {
        path: "/tesoreria/transaccionbancaria",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Tesoreria/TransaccionBancaria.vue"),
      },
      {
        path: "/tesoreria/pagoconpos",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/PagoConPos.vue"),
      },
      {
        path: "/tesoreria/cuadrecaja",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/CuadreCaja.vue"),
      },
      {
        path: "/tesoreria/estadocuentaagremiado",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Tesoreria/EstadoCuentaAgremiado.vue"),
      },
      {
        path: "/tesoreria/historialpagos",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/HistorialPagos.vue"),
      },
      {
        path: "/tesoreria/comprobantepago",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Tesoreria/ComprobantePago.vue"),
      },
      {
        path: "/tesoreria/programacionpagos",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Tesoreria/ProgramacionPagos.vue"),
      },
      {
        path: "/tesoreria/mantenimientocuota",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Tesoreria/MantenimientoCuota.vue"),
      },
      {
        path: "/mantenedores/documento",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Mantenedores/Documento.vue"),
      },
      {
        path: "/cambiar-contrasena",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Autenticacion/CambiarContrasena.vue"),
      },
      {
        path: "/colegiatura/certificadohabilidad",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Colegiatura/CertificadoHabilidad.vue"),
      },
      {
        path: "/colegiatura/movimientocolegiado",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Colegiatura/MovimientoColegiado.vue"),
      },
      {
        path: "/colegiatura/controltransferencia",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Colegiatura/ControlTransferencia.vue"),
      },
      {
        path: "/colegiatura/resoluciones",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Colegiatura/Resoluciones.vue"),
      },
      {
        path: "/colegiatura/controlbeneficiofomaf",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Colegiatura/ControlBeneficioFomaf.vue"),
      },
      {
        path: "/colegiatura/controlevento",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Colegiatura/ControlEvento.vue"),
      },
      {
        path: "/colegiatura/controlfichacolegiado",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Colegiatura/ControlFichaColegiado.vue"),
      },
      {
        path: "/colegiatura/tramitedocumentario",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Colegiatura/TramiteDocumentario.vue"),
      },
      {
        path: "/colegiatura/consultatramitedocumentario",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Colegiatura/ConsultaTramiteDocumentario.vue"),
      },
      {
        path: "/colegiatura/controltraslado",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Colegiatura/ControlTraslado.vue"),
      },
      {
        path: "/colegiatura/asignarcobranza",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Colegiatura/AsignarCobranza.vue"),
      },

      {
        path: "/mantenedores/correlativo",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Mantenedores/Correlativo.vue"),
      },
      {
        path: "/mantenedores/decano",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Mantenedores/Decano.vue"),
      },
      {
        path: "/reportesgenerales/reportesgenerales",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/ReportesGenerales/ReportesGenerales.vue"),
      },
      {
        path: "/reportesgenerales/reporteegresos",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/ReportesGenerales/ReporteEgresos.vue"),
      },
      {
        path: "/reportesgenerales/reportesecretaria",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/ReportesGenerales/ReporteSecretaria.vue"),
      },
      {
        path: "/reportesgenerales/relacioncolegiados",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/ReportesGenerales/RelacionColegiados.vue"),
      },
      {
        path: "/reportesgenerales/listaragremiados",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/ReportesGenerales/ListarAgremiados.vue"),
      },
      {
        path: "/auditoria/listarcuadrecaja",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Auditoria/ListarCuadreCaja.vue"),
      },
      {
        path: "/auditoria/historialpagoconceptos",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Auditoria/HistorialPagoConceptos.vue"),
      },
      {
        path: "/auditoria/comprobantepagoplancuenta",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Auditoria/ComprobantePagoPlanCuenta.vue"),
      },
      {
        path: "/auditoria/agremiadosdeuda",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Auditoria/AgremiadosDeuda.vue"),
      },
      {
        path: "/auditoria/historicoresoluciones",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Auditoria/HistoricoResoluciones.vue"),
      }, 
      {
        path: "/auditoria/historicocertificadohabilidad",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Auditoria/HistoricoCertificadoHabilidad.vue"),
      },
      {
        path: "/reportesgenerales/egresosmensuales",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/ReportesGenerales/EgresosMensuales.vue"),
      },
      {
        path: "/reportesgenerales/ingresosmensuales",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/ReportesGenerales/IngresosMensuales.vue"),
      },
    ],
  },
  {
    path: "/Colegiatura/beneficiocolegiado",
    meta: { necesita_autenticacion: false },
    component: () => import("../views/Colegiatura/BeneficioColegiado.vue"),
  },
  {
    path: "/",
    component: AutenticacionContainer,
    children: [
      {
        path: "/login",
        //meta: { necesita_autenticacion: false, redirigir_cuando_este_logueado: true },
        component: () => import("../views/Autenticacion/Login.vue"),
      },
      {
        path: "/recuperar-contrasena",
        //meta: { necesita_autenticacion: false },
        component: () =>
          import("../views/Autenticacion/RecuperarContrasena.vue"),
      },
      {
        path: "/logout",
        //meta: { necesita_autenticacion: true },
        component: () => import("../views/Autenticacion/Logout.vue"),
      },
    ],
  },
];
/*
export default function (history) {
  return createRouter({
    history,
    routes
  })
}*/
const router = createRouter({
  history: createWebHistory("/web/"),
  routes: routes,
});

//router.beforeEach((to, from, next) => {
//	const necesita_autenticacion = to.meta.necesita_autenticacion;
//	const redirigir_cuando_este_logueado = to.meta.redirigir_cuando_este_logueado;
//	const esta_logueado = _login.getters.esta_logueado(_login.state);
//	if (redirigir_cuando_este_logueado && esta_logueado) {
//		next('/');
//	}
//	if (necesita_autenticacion == true && !esta_logueado) {
//		next('/login');
//	}
//	else {
//		next();
//	}
//})

export default router;
