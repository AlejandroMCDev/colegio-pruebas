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
            LISTA DE PLAN CONTABLE
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModalPlanCuenta()"
          >
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3" style="text-align: center">
              <input
                type="text"
                class="form-control"
                placeholder="Nombre"
                v-model="plan_dsc"
              />
            </div>

            <div class="col-md-3 mb-3" style="text-align: left">
              <button
                type="button"
                class="btn btn-primary"
                style="margin: 2px"
                @click="cargarRegistros()"
              >
                <i class="fe fe-search me-2"></i>Buscar
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table
                  class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>plan_codigo</th>
                      <th>plan_dsc</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in listadoRegistro"
                      :key="'item-' + index"
                      v-if="listadoRegistro.length != 0"
                    >
                      <td scope="row">{{ indexMethod(index) }}</td>
                      <td>{{ item.plan_codigo }}</td>
                      <td>{{ item.plan_dsc }}</td>
                      <td class="text-center">
                        <i
                          class="fa fa-check mx-1 text-black"
                          role="button"
                          @click="selectPlanContable(item)"
                        ></i>
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="5" class="text-center">Detalle Vacío</td>
                    </tr>
                  </tbody>
                </table>
                <div class="row">
                  <div class="pagination justify-content-center mt-1">
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
                          : pagination.perPage * pagination.currentPage - 8
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
                  <div class="pagination justify-content-center mt-1">
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
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Paginate from "../../components/varios/Paginate.vue";
//Librayr
import dayjs from "dayjs";

export default {
  name: "BuscarPlanCuenta",
  components: { Paginate },
  props: {
    idEvento: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      listadoRegistro: [],
      plan_dsc: "",
      buscador: {
        page_index: 1,
        page_size: 8,
        plan_dsc: "",
      },
      initialPage: 1,
      totalPaginas: 0,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions({
      ListarRegistros: "_plancuenta/ListarRegistros",
    }),
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    selectPlanContable(item) {
      this.$emit("selectPlanContable", item);
      this.closeModalPlanCuenta();
    },
    closeModalPlanCuenta() {
      this.$emit("closeModalPlanCuenta");
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.plan_dsc = this.plan_dsc;

      var res = await this.ListarRegistros(this.buscador);

      this.listadoRegistro = res.datos;
      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.initialPage = res.paginaActual;
      this.totalPaginas = res.totalPaginas;     
    },
  },
  mounted() {
    this.cargarRegistros();
  },
};
</script>
