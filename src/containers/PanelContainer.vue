<template>
  <!-- GLOBAL-LOADER -->
  <div id="global-loader">
    <img src="/assets/images/loader.svg" class="loader-img" alt="Loader" />
  </div>
  <!-- /GLOBAL-LOADER -->

  <!-- PAGE -->
  <div class="page">
    <div class="page-main">
      <!-- app-Header -->
      <div class="app-header header sticky">
        <div class="container-fluid main-container">
          <div class="d-flex">
            <a
              aria-label="Hide Sidebar"
              class="app-sidebar__toggle"
              data-bs-toggle="sidebar"
              href="javascript:void(0)"
            ></a>
            <!-- sidebar-toggle-->
            <a class="logo-horizontal" to="/">
              <div class="text-center" id="id_contenedor_header">
                <img
                  v-if="mostrar_logo_logo"
                  src="/assets/images/logo.png"
                  class="header-brand-img"
                  alt="logo"
                  style="width: 70px"
                />
              </div>
            </a>
            <!-- LOGO -->

            <div class="d-flex order-lg-2 ms-auto header-right-icons">
              <div class="dropdown d-none">
                <a
                  href="javascript:void(0)"
                  class="nav-link icon"
                  data-bs-toggle="dropdown"
                >
                  <i class="fe fe-search"></i>
                </a>
                <div class="dropdown-menu header-search dropdown-menu-start">
                  <div class="input-group w-100 p-2">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search...."
                    />
                    <div class="input-group-text btn btn-primary">
                      <i class="fe fe-search" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
              <!-- SEARCH -->
              <button
                class="navbar-toggler navresponsive-toggler d-lg-none ms-auto"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent-4"
                aria-controls="navbarSupportedContent-4"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon fe fe-more-vertical"></span>
              </button>
              <div class="navbar navbar-collapse responsive-navbar p-0">
                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent-4"
                >
                  <div class="d-flex order-lg-2">
                    <!--
                                        <div class="dropdown d-flex">
                                            <a
                                                class="
                                                    nav-link
                                                    icon
                                                    theme-layout
                                                    nav-link-bg
                                                    layout-setting
                                                "
                                            >
                                                <span class="dark-layout"
                                                    ><i class="fe fe-moon"></i
                                                ></span>
                                                <span class="light-layout"
                                                    ><i class="fe fe-sun"></i
                                                ></span>
                                            </a>
                                        </div>
                                        -->
                    <!-- Theme-Layout -->
                    <div class="dropdown d-flex">
                      <a class="nav-link icon full-screen-link nav-link-bg">
                        <i class="fe fe-minimize fullscreen-button"></i>
                      </a>
                    </div>
                    <!-- FULL-SCREEN -->
                    <div class="dropdown d-flex profile-1">
                      <a
                        href="javascript:void(0)"
                        data-bs-toggle="dropdown"
                        class="nav-link leading-none d-flex"
                      >
                        <img
                          v-if="foto_dinamica"
                          :src="url_foto"
                          @error="foto_no_encontrada"
                          alt="profile-user"
                          class="avatar profile-user brround cover-image"
                        />
                        <img
                          v-else
                          src="/assets/images/usuario.jpg"
                          alt="profile-user"
                          class="avatar profile-user brround cover-image"
                        />
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-end dropdown-menu-arrow"
                      >
                        <div class="drop-heading">
                          <div class="text-center">
                            <h5 class="text-dark mb-0 fs-14 fw-semibold">
                              {{ usuario.apepat_usu }} {{ usuario.apemat_usu }}
                              {{ usuario.nombres_usu }}
                            </h5>
                            <small class="text-muted">
                              <!--{{
                                                                tipo_usuario_txt
                                                            }}-->
                            </small>
                          </div>
                        </div>
                        <div class="dropdown-divider m-0"></div>
                        <a
                          class="dropdown-item"
                          href="javascript:void(0)"
                          @click="cerrarSesion()"
                        >
                          <i class="dropdown-icon fe fe-alert-circle"></i>
                          Cerrar Sesión
                        </a>
                        <!-- <router-link class="dropdown-item" to="/logout">
                          <i class="dropdown-icon fe fe-alert-circle"></i>
                          Cerrar sesión
                        </router-link> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /app-Header -->

      <!--APP-SIDEBAR-->
      <div class="sticky">
        <div class="app-sidebar__overlay" data-bs-toggle="sidebar"></div>
        <div class="app-sidebar">
          <div class="side-header">
            <a class="header-brand1" to="/">
              <!-- <img src="https://app-cipcdll.com:82/img/logo1.png" class="header-brand-img desktop-logo"
                                alt="logo" style="width: 60px" />
                            <img src="https://app-cipcdll.com:82/img/logo1.png" class="header-brand-img toggle-logo"
                                alt="logo" style="width: 60px" />

                            <img src="https://app-cipcdll.com:82/img/logo1.png" class="header-brand-img light-logo"
                                alt="logo" />
                            <img src="https://app-cipcdll.com:82/img/logo1.png" class="header-brand-img light-logo1"
                                alt="logo" style="width: 60px" /> -->
              <img
                src="/assets/images/logo.png"
                class="header-brand-img desktop-logo"
                alt="logo"
                style="width: 300px"
              />
              <img
                src="/assets/images/logo.png"
                class="header-brand-img toggle-logo"
                alt="logo"
                style="width: 300px"
              />

              <img
                src="/assets/images/logo.png"
                class="header-brand-img light-logo"
                alt="logo"
              />
              <img
                src="/assets/images/logo.png"
                class="header-brand-img light-logo1"
                alt="logo"
                style="width: 300px"
              />
            </a>
            <!-- LOGO -->
          </div>
          <div class="main-sidemenu">
            <div class="slide-left disabled" id="slide-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
                />
              </svg>
            </div>
            <ul class="side-menu mt-5 pt-2">
              <!-- <li class="sub-category">
                                <h3>Mantenedores</h3>
                            </li>
                            <li class="slide">
                                <router-link class="side-menu__item" data-bs-toggle="slide"
                                    to="/mantenedores/documento">
                                    <i class="side-menu__icon fe fe-video"></i>
                                    <span class="side-menu__label">
                                        Documento
                                    </span>
                                </router-link>
                            </li> -->
              <li
                class="slide"
                v-show="
                  usuario.rol_usu == 'us_colegiatura' ||
                  usuario.rol_usu == 'us_secretaria' ||
                  usuario.rol_usu == 'us_admin' ||
                  usuario.rol_usu == 'us_sistemas' ||
                  usuario.rol_usu == 'us_admincqfll'
                "
              >
                <a
                  class="side-menu__item"
                  data-bs-toggle="slide"
                  href="javascript:void(0)"
                  ><i class="side-menu__icon fe fe-layers"></i
                  ><span class="side-menu__label">Colegiatura</span
                  ><i class="angle fe fe-chevron-right"></i
                ></a>
                <ul class="slide-menu" style="display: none">
                  <li class="slide-item">
                    <router-link to="/colegiatura/colegiado"
                      >M. Colegiado</router-link
                    >
                  </li>
                  <li
                    class="slide-item"
                    v-show="usuario.rol_usu != 'us_secretaria'"
                  >
                    <router-link to="/colegiatura/certificadohabilidad"
                      >M. Certificado Habilidad
                    </router-link>
                  </li>
                  <li
                    class="slide-item"
                    v-show="usuario.rol_usu != 'us_secretaria'"
                  >
                    <router-link to="/colegiatura/movimientocolegiado"
                      >M. Movimiento Colegiado
                    </router-link>
                  </li>
                  <li
                    class="slide-item"
                    v-show="usuario.rol_usu != 'us_secretaria'"
                  >
                    <router-link to="/colegiatura/controltraslado"
                      >M. Control de Traslado
                    </router-link>
                  </li>
                  <!-- <li class="slide-item">
                    <router-link to="/colegiatura/controltransferencia"
                      >M. Control Transferencias
                    </router-link>
                  </li> -->
                  <li
                    class="slide-item"
                    v-show="usuario.rol_usu != 'us_secretaria'"
                  >
                    <router-link to="/colegiatura/resoluciones"
                      >M. Resoluciones
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/colegiatura/controlbeneficiofomaf"
                      >M. Control de Beneficios FOMAF
                    </router-link>
                  </li>
                  <li
                    class="slide-item"
                    v-show="usuario.rol_usu != 'us_secretaria'"
                  >
                    <router-link to="/colegiatura/controlevento"
                      >M. Control de Eventos
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/colegiatura/controlfichacolegiado"
                      >M. Control Ficha Colegiado
                    </router-link>
                  </li>
                  <li
                    class="slide-item"
                    v-show="usuario.rol_usu != 'us_secretaria'"
                  >
                    <router-link to="/colegiatura/tramitedocumentario"
                      >M. Tramite Documentario
                    </router-link>
                  </li>
                  <li
                    class="slide-item"
                    v-show="usuario.rol_usu != 'us_secretaria'"
                  >
                    <router-link to="/colegiatura/asignarcobranza"
                      >Asignar Cobranza
                    </router-link>
                  </li>
                  <li
                    class="slide-item"
                    v-show="usuario.rol_usu != 'us_secretaria'"
                  >
                    <router-link to="/colegiatura/consultatramitedocumentario"
                      >Consultar Tramite Documentario
                    </router-link>
                  </li>
                </ul>
              </li>
              <li
                class="slide"
                v-show="
                  usuario.rol_usu == 'us_tesoreria' ||
                  usuario.rol_usu == 'us_admin' ||
                  usuario.rol_usu == 'us_sistemas' ||
                  usuario.rol_usu == 'us_admincqfll'
                "
              >
                <a
                  class="side-menu__item"
                  data-bs-toggle="slide"
                  href="javascript:void(0)"
                  ><i class="side-menu__icon fa fa-book"></i
                  ><span class="side-menu__label">Tesorería</span
                  ><i class="angle fe fe-chevron-right"></i
                ></a>
                <ul class="slide-menu" style="display: none">
                  <li class="slide-item">
                    <router-link to="/tesoreria/control-cuotas"
                      >Control de cuotas</router-link
                    >
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/certificado-habilidad"
                      >Certificado de habilidad
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/pagos-diversos"
                      >Facturación</router-link
                    >
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/concepto">Concepto</router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/auxiliar">Auxiliar</router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/plancontable"
                      >Plan Contable</router-link
                    >
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/meses">Meses</router-link>
                  </li>
                  <!-- <li class="slide-item">
                                        <router-link to="/tesoreria/mantenimientocuota">Mantenimiento Cuota
                                        </router-link>
                                    </li> -->
                  <li class="slide-item">
                    <router-link to="/tesoreria/asignardiversos"
                      >Asignar Diversos</router-link
                    >
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/notaingreso"
                      >Nota de Ingreso</router-link
                    >
                  </li>
                  <!-- <li class="slide-item">
                                        <router-link to="/tesoreria/registropagos">Registro de Pagos</router-link>
                                    </li> -->
                  <li class="slide-item">
                    <router-link to="/tesoreria/notacredito"
                      >Nota de Crédito</router-link
                    >
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/reembolsocaja"
                      >Reembolso de Caja</router-link
                    >
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/regularizarrendir"
                      >Regularizar a Rendir
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/transaccionbancaria"
                      >Transacción Bancaria
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/pagoconpos"
                      >Pago con POS</router-link
                    >
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/cuadrecaja"
                      >Cuadre de Caja</router-link
                    >
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/estadocuentaagremiado"
                      >Estado de Cuenta Agremiado
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/historialpagos"
                      >Historial de Pagos
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/comprobantepago"
                      >Comprobante de Pago
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/tesoreria/programacionpagos"
                      >Programación de Pagos
                    </router-link>
                  </li>
                </ul>
              </li>
              <li
                class="slide"
                v-show="
                  usuario.rol_usu == 'us_admin' ||
                  usuario.rol_usu == 'us_sistemas' ||
                  usuario.rol_usu == 'us_admincqfll'
                "
              >
                <a
                  class="side-menu__item"
                  data-bs-toggle="slide"
                  href="javascript:void(0)"
                  ><i class="side-menu__icon fe fe-bar-chart-2"></i
                  ><span class="side-menu__label">Reportes Generales</span
                  ><i class="angle fe fe-chevron-right"></i
                ></a>
                <ul class="slide-menu" style="display: none">
                  <li class="slide-item">
                    <router-link to="/reportesgenerales/reportesecretaria"
                      >Reporte Secreteria
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/reportesgenerales/relacioncolegiados"
                      >Relación de Colegiados
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/reportesgenerales/listaragremiados"
                      >Listar Agremiados
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/reportesgenerales/reporteegresos"
                      >Reporte de Egresos
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/reportesgenerales/egresosmensuales"
                      >Egresos Mensuales
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/reportesgenerales/ingresosmensuales"
                      >Ingresos Mensuales
                    </router-link>
                  </li>
                </ul>
              </li>
              <li
                class="slide"
                v-show="
                  usuario.rol_usu == 'us_administrador' ||
                  usuario.rol_usu == 'us_admin' ||
                  usuario.rol_usu == 'us_sistemas' ||
                  usuario.rol_usu == 'us_admincqfll'
                "
              >
                <a
                  class="side-menu__item"
                  data-bs-toggle="slide"
                  href="javascript:void(0)"
                  ><i class="side-menu__icon fe fe-book-open"></i
                  ><span class="side-menu__label">Auditoria</span
                  ><i class="angle fe fe-chevron-right"></i
                ></a>
                <ul class="slide-menu" style="display: none">
                  <li class="slide-item">
                    <router-link to="/auditoria/historialpagoconceptos"
                      >Historial de Pagos de Conceptos
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/auditoria/comprobantepagoplancuenta"
                      >Comprobante Pago Plan Cuenta
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/auditoria/listarcuadrecaja"
                      >Listar Cuadre de Caja
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/auditoria/agremiadosdeuda"
                      >Agremiados Deuda
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/auditoria/historicoresoluciones"
                      >Historico Resoluciones
                    </router-link>
                  </li>
                  <li class="slide-item">
                    <router-link to="/auditoria/historicocertificadohabilidad"
                      >Historico Certificado Habilidad
                    </router-link>
                  </li>
                </ul>
              </li>
              <li
                class="slide"
                v-show="
                  usuario.rol_usu == 'us_admin' ||
                  usuario.rol_usu == 'us_sistemas' ||
                  usuario.rol_usu == 'us_admincqfll'
                "
              >
                <a
                  class="side-menu__item"
                  data-bs-toggle="slide"
                  href="javascript:void(0)"
                  ><i class="side-menu__icon fe fe-cpu"></i
                  ><span class="side-menu__label">Mantenedores</span
                  ><i class="angle fe fe-chevron-right"></i
                ></a>
                <ul class="slide-menu" style="display: none">
                  <li class="slide-item">
                    <router-link to="/mantenedores/decano"
                      >Firma y Sello de Directivo</router-link
                    >
                  </li>
                  <li class="slide-item">
                    <router-link to="/mantenedores/correlativo"
                      >Correlativo</router-link
                    >
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="side-menu">
              <li class="sub-category">
                <h3>Sesión</h3>
              </li>
              <li class="slide">
                <router-link
                  class="side-menu__item"
                  data-bs-toggle="slide"
                  to="/cambiar-contrasena"
                >
                  <i class="side-menu__icon icon icon-lock-open"></i>
                  <span class="side-menu__label"> Cambiar Contraseña </span>
                </router-link>
              </li>
              <li class="slide">
                <router-link
                  class="side-menu__item"
                  data-bs-toggle="slide"
                  to="/"
                >
                  <i class="side-menu__icon icon icon-lock-open"></i>
                  <span class="side-menu__label"> Cerrar Sesión </span>
                </router-link>
              </li>
            </ul>
            <div class="slide-right" id="slide-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
                />
              </svg>
            </div>
          </div>
        </div>
        <!--/APP-SIDEBAR-->
      </div>

      <!--app-content open-->
      <div class="main-content app-content mt-0">
        <div class="side-app">
          <!-- CONTAINER -->
          <div class="main-container container-fluid">
            <!-- PAGE-HEADER -->
            <!--
						<div class="page-header">
							<h1 class="page-title" id="titulo_pagina"></h1>
							<div>
								<ol class="breadcrumb">
									<li class="breadcrumb-item">
										<a href="javascript:void(0)">Forms</a>
									</li>
									<li
										class="breadcrumb-item active"
										aria-current="page"
									>
										Form-Elements
									</li>
								</ol>
							</div>
						</div>
						-->
            <!-- PAGE-HEADER END -->

            <!-- Row -->
            <div class="row">
              <div class="col-xl-12 col-lg-12 mt-6">
                <div class="card">
                  <router-view></router-view>
                </div>
              </div>
            </div>
            <!-- End Row -->
          </div>
          <!-- CONTAINER CLOSED -->
        </div>
      </div>
      <!--app-content close-->
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <div class="row align-items-center flex-row-reverse">
          <div class="col-md-12 col-sm-12 text-center">
            Copyright © 2022 -
            <a href="https://cqfll.pe/">CQFLL</a>.
          </div>
        </div>
      </div>
    </footer>
    <!-- FOOTER END -->
  </div>

  <!-- BACK-TO-TOP -->
  <a href="#top" id="back-to-top"><i class="fa fa-angle-up"></i></a>

  <!--<BotonWhatsappContacto />-->
</template>

<script>
/*
import global from "../global";
import { mapGetters } from "vuex";
import BotonWhatsappContacto from "../components/BotonWhatsappContacto.vue";
*/
export default {
  name: "PanelContainer",
  //components: { BotonWhatsappContacto },
  data() {
    return {
      //USUARIO_ADMIN: global.USUARIO_ADMIN,
      usuario: {},
      mostrar_logo_logo: true,
      mostrar_logo_texto: true,
      url_foto: "",
      foto_dinamica: true,
    };
  },
  computed: {
    //...mapGetters("_login", [
    //    "usuario",
    //    "usuario_nombre",
    //    "tipo_usuario_txt",
    //    "tipo_usuario",
    //]),
  },
  methods: {
    cerrarSesion() {
      localStorage.clear();
      this.$router.push({
        path: "/",
      });
    },
    cambioTamanioPantalla: function () {
      var tamanioDiv = document.getElementById("id_contenedor_header");
      if (tamanioDiv.clientWidth < 470) {
        this.mostrar_logo_logo = true;
        this.mostrar_logo_texto = false;
      } else {
        this.mostrar_logo_logo = true;
        this.mostrar_logo_texto = true;
      }
    },
    foto_no_encontrada: function () {
      this.foto_dinamica = false;
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    load(); // custom.js
    loadScrollbar(); // pscroll.js
    //loadScrollbar1(); // pscroll1.js
    loadSidemenu2(); // sidemenu.js
    loadSidemenu(); // sidemenu.js
    checkHoriMenu(); // sidemenu.js
    loadSticky(); // sticky.
    window.addEventListener("resize", this.cambioTamanioPantalla);
    this.cambioTamanioPantalla();
  },
  created() {
    //this.foto_dinamica = true;
    //if (this.tipo_usuario == global.USUARIO_COLEGIADO) {
    //    var time = new Date().getTime();
    //    this.url_foto =
    //        global.ruta_colegiado_fotos +
    //        `/${this.usuario.numcip}.jpg?nocache=${time}`;
    //}
  },
};
</script>

<style>
.modal {
  /*z-index: 1060;*/
  z-index: 10000;
}

.swal2-container {
  z-index: 10001;
}
</style>
