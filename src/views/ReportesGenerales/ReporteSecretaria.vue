<template>
  <div class="card-header">
    <h3 class="card-title">REPORTES DE SECRETARIA</h3>
  </div>
  <div class="card-body pb-2">
    <!-- DATOS GENERALES -->
    <div class="form-label mt-0 p-0">
      <div class="row">
        <div class="col-md-9">
          <button
            class="btn btn-primary"
            type="button"
            @click="download_excel()"
          >
            <i class="fe fe-download me-2"></i>Exportar
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="text-center">
        <loading :mostrar="cargando" />
      </div>
      <div class="col-md-12 row">
        <div class="mb-5 p-4 br-5">
          <div class="border mb-5 p-4 br-5">
            <div class="form-label mt-0 p-0">Filtros</div>
            <div class="custom-controls-stacked">
              <label class="custom-control custom-radio">
                <input
                  type="radio"
                  class="custom-control-input"
                  name="example-radios"
                  @change="seleccionarFIltro('CQFP')"
                  checked
                />
                <span class="custom-control-label">Registro CQFP</span>
              </label>
              <label class="custom-control custom-radio">
                <input
                  type="radio"
                  class="custom-control-input"
                  name="example-radios"
                  @change="seleccionarFIltro('MADRES')"
                />
                <span class="custom-control-label">Agremiados Madres</span>
              </label>
              <label class="custom-control custom-radio">
                <input
                  type="radio"
                  class="custom-control-input"
                  name="example-radios"
                  @change="seleccionarFIltro('PADRES')"
                />
                <span class="custom-control-label">Agremiados Padres</span>
              </label>
              <div class="row">
                <div class="col-xl-4 col-md-6">
                  <label class="custom-control custom-radio">
                    <input
                      type="radio"
                      class="custom-control-input"
                      name="example-radios"
                      @change="seleccionarFIltro('CUMPLEAÑOS')"
                    />
                    <span class="custom-control-label"
                      >Relación de Cumpleaños</span
                    >
                  </label>
                </div>
                <div class="col-xl-4 col-md-6">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Mes"
                    min="20"
                    v-model="mes_cumpleanos"
                  />
                </div>
                <div class="col-xl-4 col-md-6">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Año"
                    min="20"
                    v-model="anio_cumpleanos"
                    disabled
                  />
                </div>
              </div>
              <label class="custom-control custom-radio">
                <input
                  type="radio"
                  class="custom-control-input"
                  name="example-radios"
                  @change="seleccionarFIltro('EMAIL')"
                />
                <span class="custom-control-label">Relación de Email</span>
              </label>
              <label class="custom-control custom-radio">
                <input
                  type="radio"
                  class="custom-control-input"
                  name="example-radios"
                  @change="seleccionarFIltro('INHABILITADOS')"
                />
                <span class="custom-control-label"
                  >AGREMIADOS INHABILITADOS</span
                >
              </label>
              <div class="row">
                <div class="col-xl-4 col-md-6">
                  <label class="custom-control custom-radio">
                    <input
                      type="radio"
                      class="custom-control-input"
                      name="example-radios"
                      @change="seleccionarFIltro('EDAD')"
                    />
                    <span class="custom-control-label"
                      >AGREMIADOS POR INTERVALO DE EDAD
                    </span>
                  </label>
                </div>
                <div class="col-xl-4 col-md-6">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="A"
                    min="20"
                    v-model="edad_ini"
                  />
                </div>
                <div class="col-xl-4 col-md-6">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="DE"
                    min="20"
                    v-model="edad_fin"
                  />
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-xl-4 col-md-6">
                  <label class="custom-control custom-radio">
                    <input
                      type="radio"
                      class="custom-control-input"
                      name="example-radios"
                      @change="seleccionarFIltro('COLEGIATURA')"
                    />
                    <span class="custom-control-label"
                      >AGREMIADOS POR AÑOS COLEGIATURA DE</span
                    >
                  </label>
                </div>
                <div class="col-xl-4 col-md-6">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Ini"
                    min="1"
                    v-model="colegiatura_ini"
                  />
                </div>
                <div class="col-xl-4 col-md-6">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Fin"
                    min="1"
                    v-model="colegiatura_fin"
                  />
                </div>
              </div>
              <label class="custom-control custom-radio">
                <input
                  type="radio"
                  class="custom-control-input"
                  name="example-radios"
                  @change="seleccionarFIltro('FALLECIMIENTO')"
                />
                <span class="custom-control-label">AGREMIADOS FALLECIDOS</span>
              </label>
            </div>

            <div class="form-group m-0">
              <div class="form-label">Opción</div>
              <div class="custom-controls-stacked">
                <label class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    name="example-checkbox1"
                    @change="seleccionarEstadoHabil()"
                  />
                  <span class="custom-control-label">HABILES</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Loading from "../../components/varios/Loading.vue";
import SearchMultiselect from "../../components/SearchMultiselect/SearchMultiselect.vue";
import global from "../../global";
//Library
import * as XLSX from "xlsx";
import dayjs from "dayjs";
export default {
  name: "ReportesGenerales",
  components: { SearchMultiselect, Loading },
  data() {
    return {
      cargando: false,
      date: new Date(),
      currentMonth: dayjs(this.date).format("MM"),
      currentYear: dayjs(this.date).format("YYYY"),
      filtro_tipo: "CQFP",
      estado_habiles: "",
      anio_cumpleanos: dayjs(this.date).format("YYYY"),
      mes_cumpleanos: dayjs(this.date).format("MM"),
      edad_ini: 20,
      edad_fin: 20,
      colegiatura_ini: 1,
      colegiatura_fin: 1,
    };
  },
  methods: {
    ...mapActions({
      ReporteFiltroColegiados: "_reporte_secretaria/ReporteFiltroColegiados",
    }),
    seleccionarFIltro(item) {
      this.filtro_tipo = item;
      console.log(this.filtro_tipo, this.estado_habiles);
      /*if (this.filtro_tipo == "CQFP") {
      } else if (this.filtro_tipo == "MADRES") {
      } else if (this.filtro_tipo == "PADRES") {
      } else if (this.filtro_tipo == "CUMPLEAÑOS") {
      } else if (this.filtro_tipo == "EMAIL") {
      } else if (this.filtro_tipo == "INHABILITADOS") {
      } else if (this.filtro_tipo == "EDAD") {
      } else if (this.filtro_tipo == "COLEGIATURA") {
      } else if (this.filtro_tipo == "FALLECIMIENTO") {
      }*/
    },
    getDescripcionModalidad(idModalidad) {
      let descripcionModalidad = null;
      switch (idModalidad) {
        case 1:
          descripcionModalidad = "Ingreso por primera vez";
          break;
        case 2:
          descripcionModalidad = "Traslado";
          break;
        case 3:
          descripcionModalidad = "Horario";
          break;
        case 4:
          descripcionModalidad = "Fallecio";
          break;
        case 5:
          descripcionModalidad = "Reingreso";
          break;
        case 6:
          descripcionModalidad = "Viaje al extranjero";
          break;
        case 7:
          descripcionModalidad = "Ingreso por traslado";
          break;
        case 8:
          descripcionModalidad = "Salud";
          break;
        case 9:
          descripcionModalidad = "Otra profesión";
          break;
        case 10:
          descripcionModalidad = "Reingreso anulado";
          break;
        case 11:
          descripcionModalidad = "Traslado anulado";
          break;
        case 12:
          descripcionModalidad = "Ninguna";
          break;
      }
      return descripcionModalidad;
    },
    download_excel: async function () {
      let filtros = {
        tipo: this.filtro_tipo,
        idEstadoColegiado: this.estado_habiles,
        mes_cumpleanos: this.mes_cumpleanos,
        anio_cumpleanos: this.anio_cumpleanos,
        edad_ini: this.edad_ini,
        edad_fin: this.edad_fin,
        colegiatura_ini: this.colegiatura_ini,
        colegiatura_fin: this.colegiatura_fin,
      };
      let export_excel = [];
      this.cargando = true;
      let listaColegiados = await this.ReporteFiltroColegiados(filtros);
      this.cargando = false;
      console.log(listaColegiados.length);
      if (listaColegiados.length > 0) {
        export_excel = listaColegiados.map((el, index) => ({
          item: index + 1,
          cqfll: el.cqfll,
          apellidos: el.apellidoPaterno + " " + el.apellidoMaterno,
          nombres: el.nombres,
          dni: el.dni,
          fechaNacimiento: el.fechaNacimiento,
          direccion: el.direccion,
          correo: el.correo,
          celular: el.celular,
          estadoColegiado: el.estadoColegiado,
          modalidad: this.getDescripcionModalidad(el.idModalidad),
        }));
        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "item",
            "cqfll",
            "apellidos",
            "nombres",
            "dni",
            "fechaNacimiento",
            "direccion",
            "correo",
            "celular",
            "estadoColegiado",
            "modalidad",
          ],
        });
        data["A1"].v = "Nº";
        data["B1"].v = "CQFP";
        data["C1"].v = "Apellidos";
        data["D1"].v = "Nombres";
        data["E1"].v = "DNI";
        data["F1"].v =
          this.filtro_tipo == "CUMPLEAÑOS" ? "Día" : "Fecha Nacimiento";
        data["G1"].v = "Dirección";
        data["H1"].v = "Correo";
        data["I1"].v = "Celular";
        data["J1"].v = "Estado";
        data["K1"].v = "Modalidad";

        const workbook = XLSX.utils.book_new();
        const filename = "reporte-colegiados";
        XLSX.utils.book_append_sheet(workbook, data, this.filtro_tipo);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Busqueda sin resultados, gracias.");
      }
    },
    seleccionarEstadoHabil() {
      if (this.estado_habiles == "") {
        this.estado_habiles = 1;
      } else {
        this.estado_habiles = "";
      }
    },
  },
  mounted() {},
};
</script>
