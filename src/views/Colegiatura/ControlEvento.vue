<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Control Evento</h3>
  </div>
  <div class="card-body pb-2">
    <div
      class="tab-menu-heading tab-menu-heading-boxed"
      style="border-bottom: 0 !important"
    >
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <li>
            <a
              href="#registrarTab"
              class="active"
              data-bs-toggle="tab"
              id="tabGeneralRegistrar"
              >REGISTRAR</a
            >
          </li>
          <li>
            <a href="#listadoTab" data-bs-toggle="tab" id="tabGeneralListado"
              >LISTADO</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- DATOS GENERALES -->
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active" id="registrarTab">
          <div class="form-label mt-0 p-0">
            <button
              type="button"
              class="btn btn-primary"
              @click="loadControlEvento()"
            >
              <i class="fe fe-file me-2"></i>Nuevo
            </button>
          </div>
          <div class="row">
            <div class="col-md-12 row">
              <div class="mb-5 p-4 br-5">
                <div class="form-label mt-0 p-0">DATOS GENERALES</div>
                <div class="row">
                  <div class="border mb-5 p-4 br-5">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Tipo Evento</label>
                          <select
                            class="form-control form-select"
                            data-bs-placeholder="Tipo Evento"
                            v-model="evento.idTipoEvento"
                            ref="idTipoEvento"
                            :style="
                              showAdvertise && evento.idTipoEvento == 0
                                ? 'border-color: #e23e3d;'
                                : ''
                            "
                          >
                            <option value="0">Tipo Evento</option>
                            <option
                              v-for="item in tipoEvento"
                              :key="item.id"
                              :label="item.nombre"
                              :value="item.id"
                            ></option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Evento</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Evento"
                            v-model="evento.nombre"
                            ref="nombre"
                            :style="
                              showAdvertise && evento.nombre == ''
                                ? 'border-color: #e23e3d;'
                                : ''
                            "
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Fecha Evento</label>
                          <input
                            type="datetime-local"
                            class="form-control"
                            placeholder="Fecha Evento"
                            v-model="evento.fechaEvento"
                            ref="fechaEvento"
                            :style="
                              showAdvertise && evento.fechaEvento == ''
                                ? 'border-color: #e23e3d;'
                                : ''
                            "
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Concepto</label>
                          <SearchMultiselect
                            :value="evento.idConcepto"
                            v-model="evento.idConcepto"
                            :options="conceptoDesplegable"
                            placeholder="Concepto"
                            ref="idConcepto"
                            :searchable="true"
                            :canClear="false"
                            :style="
                              showAdvertise && evento.idConcepto == 0
                                ? 'border-color: #e23e3d;'
                                : ''
                            "
                          />
                          <!-- <select class="form-control form-select"
                                                        data-bs-placeholder="Concepto" v-model="evento.idConcepto"
                                                        ref="idConcepto"
                                                        :style="showAdvertise && evento.idConcepto == 0 ? 'border-color: #e23e3d;' : ''">
                                                        <option value="0">Conceto
                                                        </option>
                                                        <option v-for="item in conceptoDesplegable" :key="item.id"
                                                            :label="item.desc_concepto" :value="item.cod_concepto">
                                                        </option>
                                                    </select> -->
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Valor Incumplimiento</label>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Valor Incumplimiento"
                            v-model="evento.valorIncumplimiento"
                            ref="valorIncumplimiento"
                            :style="
                              showAdvertise && evento.valorIncumplimiento == ''
                                ? 'border-color: #e23e3d;'
                                : ''
                            "
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Fecha Registro</label>

                      <input
                        type="text"
                        class="form-control"
                        placeholder="Fecha Registro"
                        v-model="fechaRegistro"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Usuario Registro</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Usuario Registro"
                        v-model="usuarioRegistro"
                        readonly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-center">
              <button class="btn btn-primary m-2" type="submit" @click="loadControlEvento()">
                Cancelar
              </button>
              <button
                class="btn btn-primary"
                type="button"
                @click="guardarCambios()"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="listadoTab">
          <div class="mb-5 p-4 br-5">
            <div class="form-label mt-0 p-0">DATOS GENERALES</div>
            <div class="row">
              <div class="col-md-6 mb-3" style="text-align: center">
                <select
                  class="form-control form-select"
                  data-bs-placeholder="Tipo Evento"
                  v-model="filtros.idTipoEvento"
                >
                  <option value="">Tipo Evento</option>
                  <option
                    v-for="item in tipoEvento"
                    :key="item.id"
                    :label="item.nombre"
                    :value="item.id"
                  ></option>
                </select>
              </div>
              <div class="col-md-6 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Evento"
                  v-model="filtros.nombre"
                />
              </div>
              <div class="col-md-6 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  placeholder="Fecha Inicio"
                  v-model="filtros.fechaInicio"
                />
              </div>
              <div class="col-md-6 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  placeholder="Fecha Fin"
                  v-model="filtros.fechaFin"
                />
              </div>

              <div class="col-md-12 mb-3" style="text-align: right">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="listarEventos()"
                  style="margin: 2px"
                >
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="nuevoEvento()"
                >
                  <i class="fe fe-file me-2"></i>Nuevo
                </button>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <table
                    class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tipo Evento</th>
                        <th>Nombre</th>
                        <th>Fecha Evento</th>
                        <th>concepto</th>
                        <th>valorIncumplimiento</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in listEventos"
                        :key="'item-' + index"
                        v-if="listEventos.length != 0"
                      >
                        <td scope="row">{{ indexMethod(index) }}</td>
                        <td>{{ item.tipoEvento }}</td>
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.fechaEvento }}</td>
                        <td>{{ item.concepto }}</td>
                        <td>{{ item.valorIncumplimiento }}</td>
                        <td colspan="3">
                          <i
                            class="fa fa-address-book-o mx-1 text-primary"
                            role="button"
                            data-bs-toggle="modal"
                            @click="cargarParticipantes(item, index)"
                            data-bs-target="#modalAddParticipantes"
                          ></i>
                          <i
                            class="fa fa-pencil mx-1 text-yellow"
                            role="button"
                            @click="cargarVer(item, index)"
                          ></i>
                          <i
                            class="fa fa-trash mx-1 text-danger"
                            role="button"
                            @click="cargarEliminar(item, index)"
                          ></i>
                        </td>
                      </tr>
                      <tr v-else>
                        <td colspan="7" class="text-center">
                          Ningun registro encontrado
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="row">
                    <div class="pagination justify-content-center mt-3">
                      <div
                        class="dataTables_info"
                        id="responsive-datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing
                        {{
                          pagination.currentPage == 1
                            ? pagination.currentPage
                            : pagination.perPage * pagination.currentPage - 9
                        }}
                        to
                        {{
                          pagination.perPage * pagination.currentPage >
                          pagination.total
                            ? pagination.total
                            : pagination.perPage * pagination.currentPage
                        }}
                        of {{ pagination.total }} entries
                      </div>
                    </div>
                    <div class="pagination justify-content-center mt-3">
                      <button
                        @click="cambiarPagina(1)"
                        class="page-link btn btn-outline-info"
                      >
                        Primero
                      </button>
                      <li
                        class="page-item"
                        v-for="(item, index) in totalPaginas"
                        style="list-style: none"
                        :key="index"
                      >
                        <button
                          href="#"
                          @click="cambiarPagina(index + 1)"
                          :class="
                            buscador.page_index == index + 1
                              ? 'page-link btn'
                              : 'page-link btn btn-outline-info'
                          "
                          :style="
                            buscador.page_index == index + 1
                              ? 'color: white; background-color: #36b9cc;'
                              : ''
                          "
                        >
                          {{ index + 1 }}
                        </button>
                      </li>
                      <button
                        @click="cambiarPagina(totalPaginas)"
                        class="page-link btn btn-outline-info"
                      >
                        Último
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <modal-add-participantes id="modalAddParticipantes" :idEvento="idEvento" />
</template>

<script>
import { mapActions } from "vuex";
import global from "../../global";
import modalAddParticipantes from "../../components/controlEvento/modalAddParticipantes.vue";
//Librayr
import SearchMultiselect from "../../components/SearchMultiselect/SearchMultiselect.vue";
import dayjs from "dayjs";
export default {
  name: "ControlEvento",
  components: { modalAddParticipantes, SearchMultiselect },
  data() {
    return {
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      conceptoDesplegable: [],
      idEvento: 0,
      tipoEvento: [],
      listEventos: [],
      indiceModificando: -1,
      showAdvertise: false,
      evento: {},
      eventoBase: {
        id: 0,
        idTipoEvento: 0,
        idConcepto: 0,
        nombre: "",
        fechaEvento: "",
        valorIncumplimiento: "0",
      },
      fechaRegistro: "",
      usuarioRegistro: "",
      filtros: {
        fechaInicio: "",
        fechaFin: "",
        idTipoEvento: "",
        nombre: "",
      },
      buscador: {
        page_index: 1,
        fechaInicio: "",
        fechaFin: "",
        idTipoEvento: "",
        nombre: "",
      },
      pagination: {
        perPage: 10,
        currentPage: 1,
        total: 0,
      },
      totalPaginas: 0,
    };
  },
  methods: {
    cargarParticipantes(item, index) {
      this.idEvento = item.id;
    },
    ...mapActions({
      TipoEventoDesplegable: "_controlEvento/TipoEventoDesplegable",
      ListadoEventos: "_controlEvento/Listado",
      AgregarEvento: "_controlEvento/Agregar",
      ModificarEvento: "_controlEvento/Modificar",
      ObtenerEvento: "_controlEvento/Obtener",
      EliminarEvento: "_controlEvento/Eliminar",
      ConceptoDesplegable: "_controlEvento/ConceptoDesplegable",
    }),
    comboConcepto: async function () {
      var res = await this.ConceptoDesplegable();
      //this.conceptoDesplegable = res;
      this.conceptoDesplegable = res.map((item) => {
        return { label: item.desc_concepto, value: item.cod_concepto };
      });
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    cargarVer: async function (item, index) {
      let evento = {
        id: item.id,
      };
      let res = await this.ObtenerEvento(evento);

      this.evento.id = res.id;
      this.evento.idTipoEvento = res.idTipoEvento;
      this.evento.idConcepto = res.idConcepto;
      this.evento.nombre = res.nombre;
      this.evento.fechaEvento = res.fechaEvento;
      this.evento.valorIncumplimiento = res.valorIncumplimiento;

      this.fechaRegistro = res.fechaRegistro;
      this.usuarioRegistro = res.usuarioRegistro;

      this.indiceModificando = index;
      this.cambiarTab();
    },
    cargarEliminar: async function (item, index) {
      this.evento = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarEvento(this.evento);
          if (res?.exito) {
            this.listarEventos();
            this.evento = { ...this.eventoBase };
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    nuevoEvento() {
      this.loadControlEvento();
      this.cambiarTab();
      this.fechaRegistro = this.currentDate;
    },
    cambiarPagina: function (paginaDestino) {
      this.listarEventos(paginaDestino);
    },
    listarEventos: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.fechaInicio = this.filtros.fechaInicio;
      this.buscador.fechaFin = this.filtros.fechaFin;
      this.buscador.idTipoEvento = this.filtros.idTipoEvento;
      this.buscador.nombre = this.filtros.nombre;

      var res = await this.ListadoEventos(this.buscador);
      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;

      this.listEventos = res.datos.map((el) => ({
        ...el,
        fechaEvento: dayjs(el.fechaEvento).format("DD-MM-YYYY, H:mm A"),
      }));

      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
    },
    comboTipoEvento: async function () {
      var res = await this.TipoEventoDesplegable();
      this.tipoEvento = res;
    },
    cambiarTab() {
      document.getElementById("tabGeneralRegistrar").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabGeneralListado").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    validarEvento() {
      let valida = false;

      if (this.evento.idTipoEvento == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idTipoEvento.focus();
        });
      } else if (this.evento.idConcepto == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idConcepto.focus();
        });
        idConcepto;
      } else if (this.evento.nombre == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nombre.focus();
        });
      } else if (this.evento.fechaEvento == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fechaEvento.focus();
        });
      } else if (this.evento.valorIncumplimiento == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.valorIncumplimiento.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarEvento();
      if (!valor) {
        if (this.indiceModificando == -1) {
          res = await this.AgregarEvento(this.evento);
        } else {
          res = await this.ModificarEvento(this.evento);
        }
      }
      if (res?.exito) {
        this.loadControlEvento();
        this.listarEventos();
        global._mensaje_exito("Los cambios se han guardado correctamente");

        document.getElementById("tabGeneralRegistrar").className = "";
        document.getElementById("registrarTab").className = "tab-pane";
        document.getElementById("tabGeneralListado").className = "active";
        document.getElementById("listadoTab").className = "tab-pane active";
      }
    },
    loadControlEvento: function () {
      this.evento = { ...this.eventoBase };
      this.indiceModificando = -1;
      this.fechaRegistro = this.currentDate;
    },
  },
  mounted() {
    this.fechaRegistro = this.currentDate;
    this.comboConcepto();
    this.listarEventos();
    this.loadControlEvento();
    this.comboTipoEvento();
  },
};
</script>
