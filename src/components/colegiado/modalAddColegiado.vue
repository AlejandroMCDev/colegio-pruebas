<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            LISTA DE COLEGIADOS
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal()"
          >
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-5 p-4 br-5">
            <div class="form-label mt-0 p-0">LISTA</div>
            <div class="row">
              <div class="col-md-3 mb-3" style="text-align: center">
                <select
                  class="form-control form-select select2"
                  data-bs-placeholder="Filtros"
                  v-model="filtrosColegiado"
                >
                  <option value="">Filtros</option>
                  <option value="dni">DNI</option>
                  <option value="cqf">CQFP</option>
                  <option value="nombreApellido">Apellidos y Nombres</option>
                </select>
              </div>
              <div class="col-md-4 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with dropdown button"
                  v-model="searchFiltro"
                  placeholder="Search"
                />
              </div>
              <div class="col-md-5 mb-3" style="text-align: left">
                <button
                  type="button"
                  class="btn btn-primary"
                  style="margin: 2px"
                  @click="listarColegiados()"
                >
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <div class="text-center">
                    <loading :mostrar="cargando" />
                  </div>
                  <table
                    v-if="listaColegiados.length != 0"
                    class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>CQFP</th>
                        <th>APELLIDOS</th>
                        <th>NOMBRES</th>
                        <th>DNI</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in listaColegiados"
                        :key="'item-' + index"
                      >
                        <th scope="row">{{ indexMethod(index) }}</th>
                        <td>{{ item.cqfll }}</td>
                        <td>
                          {{ item.apellidoPaterno }} {{ item.apellidoMaterno }}
                        </td>
                        <td>{{ item.nombres }}</td>
                        <td>{{ item.dni }}</td>
                        <td class="text-center">
                          <i
                            class="fa fa-check mx-1 text-primary"
                            role="button"
                            @click="selectColegiado(item, index)"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center" v-else>
                    <span class="fw-bold fs-18">Detalle Vacio</span>
                  </div>
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
                            : pagination.perPage * pagination.currentPage - 6
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
                      <paginate
                        :page-count="totalPaginas"
                        :click-handler="cambiarPagina"
                        v-model="initialPage"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Loading from "../../components/varios/Loading.vue";
import Paginate from "../../components/varios/Paginate.vue";

//Librayr
import dayjs from "dayjs";

export default {
  name: "modalAddColegiado",
  components: { Loading, Paginate },
  props: {
    idEvento: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      cargando: false,
      filtrosColegiado: "",
      searchFiltro: "",
      listaColegiados: [],
      pagination: {
        perPage: 10,
        currentPage: 1,
        total: 0,
      },
      buscador: {
        page_index: 1,
        page_size: 7,
        dni: "",
        cqf: "",
        nombreApellido: "",
      },
      totalPaginas: 0,
      initialPage: 1,
    };
  },
  watch: {},
  computed: {},
  methods: {
    selectColegiado(item) {
      this.$emit("selectColegiado",item);
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    cambiarPagina: function (paginaDestino) {
      this.listarColegiados(paginaDestino);
    },
    ...mapActions({
      ListarColegiados: "_colegiado/ListarColegiados",
    }),

    listarColegiados: async function (pagina = 1) {
      this.buscador.page_index = pagina;

      if (this.filtrosColegiado == "dni") {
        this.buscador.dni = this.searchFiltro;
        this.buscador.cqf = "";
        this.buscador.nombreApellido = "";
      } else if (this.filtrosColegiado == "cqf") {
        this.buscador.cqf = this.searchFiltro;
      } else if (this.filtrosColegiado == "nombreApellido") {
        this.buscador.nombreApellido = this.searchFiltro;
      } else {
        this.buscador.dni = "";
        this.buscador.cqf = "";
        this.buscador.nombreApellido = "";
      }
      this.cargando = true;
      var res = await this.ListarColegiados(this.buscador);
      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;

      this.listaColegiados = res.datos.map((el, index) => ({
        ...el,
        index: index + 1,
        fechaNacimiento:
          el.fechaNacimiento != null
            ? dayjs(el.fechaNacimiento).format("DD-MM-YYYY")
            : "",
      }));

      this.buscador.dni = "";
      this.buscador.cqf = "";
      this.buscador.nombreApellido = "";

      this.initialPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
    closeModal() {
      this.$emit("closeModalColegiado");
    },
  },
  mounted() {
    this.listarColegiados();
  },
};
</script>
