<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Control Beneficio Fomaf</h3>
  </div>
  <div class="card-body pb-2">
    <div class="tab-menu-heading" style="border-bottom: 0 !important">
      <div class="tabs-menu" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <li>
            <a
              href="#registrarTab"
              class="active"
              data-bs-toggle="tab"
              id="tabGeneralRegistrar"
              >GENERAR</a
            >
          </li>
          <!-- <li><a href="#listadoTab" data-bs-toggle="tab" id="tabGeneralListado">LISTADO</a></li> -->
        </ul>
      </div>
    </div>
    <!-- DATOS GENERALES -->
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active" id="registrarTab">
          <div class="row">
            <div class="col-md-12 row">
              <div class="mb-5 p-4 br-5">
                <div class="form-label mt-0 p-0">DATOS GENERALES</div>
                <div class="row">
                  <div class="border mb-5 p-4 br-5">
                    <div class="row">
                      <div class="col-md-6 mb-3" style="text-align: center">
                        <div class="form-group">
                          <div class="input-group">
                              <!-- @keypress.enter="verificarCQF" -->
                            <input
                              type="text"
                              class="form-control"
                              placeholder="CQFP"
                              aria-label="Example text with button addon"
                              aria-describedby="button-addon1"
                              v-model="cqfp"
                            />
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#modalAddColegiado"
                            >
                              <i class="fe fe-search me-2"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 mb-3" style="text-align: center">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Agremiado"
                            v-model="agremiado"
                            disabled
                          />
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="form-label mt-0 p-0">
                          Lista Beneficiarios
                        </div>
                        <div class="table-responsive">
                          <table
                            id="data_table"
                            class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                          >
                            <thead>
                              <tr>
                                <th>Doc.</th>
                                <th>Apellidos</th>
                                <th>Nombres</th>
                                <th>Estado</th>
                                <th>Fecha Nac.</th>
                                <th>Parentesco</th>
                                <th>Prioridad</th>
                                <th>Porcentaje</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(item, index) in listBeneficiarios"
                                :key="'item-' + index"
                                v-if="listBeneficiarios.length != 0"
                              >
                                <td>{{ item.documentoIdentidad }}</td>
                                <td>{{ item.apellido }}</td>
                                <td>{{ item.nombre }}</td>
                                <td>{{ item.estadoFamilia }}</td>
                                <td>
                                  {{ returnFormatoFecha(item.fechaNacimiento) }}
                                </td>
                                <td>{{ item.parentesco }}</td>
                                <td :id="'fomaf_prioridad' + index">
                                  {{ item.fomaf_prioridad }}
                                </td>
                                <td :id="'fomaf_porcentaje' + index">
                                  {{ item.fomaf_porcentaje }}
                                </td>
                                <td class="text-center">
                                  <i
                                    class="fa fa-pencil mx-1 text-yellow"
                                    :id="'edit_button' + index"
                                    role="button"
                                    @click="edit_row(index)"
                                    style="display: block"
                                  ></i>
                                  <i
                                    class="fa fa-save mx-1 text-primary"
                                    :id="'save_button' + index"
                                    role="button"
                                    @click="save_row(index)"
                                    style="display: none"
                                  ></i>
                                </td>
                              </tr>
                              <tr v-else>
                                <td colspan="8" class="text-center">
                                  Detalle Vacío
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
                        disabled
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
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-center">
              <button class="btn btn-primary" type="button">Cancelar</button>
              <button
                class="btn btn-primary m-5"
                type="button"
                @click="validarRegistroExistente('Cedula')"
              >
                Generar Cedula FOMAF
              </button>
              <button
                class="btn btn-primary"
                type="button"
                @click="validarRegistroExistente('Carta')"
              >
                Generar Carta Declaratoria
              </button>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-6">
              <div class="form-label mt-0 p-0">Archivos FOMAF Generados</div>
            </div>
            <div class="col-5">
              <input
                class="form-control form-control-sm"
                type="file"
                id="file_document"
                name="file_document[]"
                style="display: none"
              />
              <div class="input-group">
                <button
                  class="btn btn-success btn-sm"
                  type="button"
                  id="button-addon1"
                  @click="openDocumentFile()"
                >
                  Examinar
                </button>
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="nameNewFile"
                  readonly
                />
              </div>
            </div>
            <div class="col-1">
              <button
                type="button"
                class="btn btn-secondary btn-sm mb-3 btn-block"
                @click="addArchivo()"
              >
                Subir
              </button>
            </div>
            <div class="col-md-12">
              <div class="table-responsive">
                <table
                  class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                >
                  <thead>
                    <tr>
                      <th>Documento Generado</th>
                      <th>Tipo</th>
                      <th>Fecha</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in listDocumentos"
                      :key="'item-' + index"
                      v-if="listDocumentos.length != 0"
                    >
                      <td>{{ item.url }}</td>
                      <td>{{ item.tipoDocumento }}</td>
                      <td>{{ item.fechaRegistro }}</td>
                      <td class="text-center">
                        <i
                          class="fa fa-eye mx-1 text-primary"
                          role="button"
                          @click="openurlArchivo(item.url)"
                        ></i>
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="4" class="text-center">Detalle Vacío</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <modal-add-colegiado
    id="modalAddColegiado"
    @selectColegiado="selectColegiado"
    @closeModalColegiado="closeModalColegiado"
  />
</template>

<script>
import { mapActions } from "vuex";
import global from "../../global";
import modalAddColegiado from "../../components/colegiado/modalAddColegiado.vue";
//Librayr
import dayjs from "dayjs";
export default {
  name: "ControlBeneficioFomaf",
  components: { modalAddColegiado },
  data() {
    return {
      newFile: "",
      nameNewFile: "",
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      beneficiarioEdit: [],
      view_button_table: false,
      iprutaFiles: global.ruta_api,
      listBeneficiarios: [],
      listDocumentos: [],
      cqfp: "",
      dni: "",
      agremiado: "",
      idPersona: 0,
      fechaRegistro: "",
      usuarioRegistro: "",
      filtros: {
        emitidos: null,
        numCertificado: "",
        cqfp: "",
        fechaInicio: null,
        fechaFin: null,
      },
    };
  },
  methods: {
    ...mapActions({
      ListarDocumento: "_fomaf/ListarDocumento",
      EliminarDocumento: "_fomaf/EliminarDocumento",
      GenerarDocumento: "_fomaf/Generar",
      ModificarDocumento: "_fomaf/Modificar",
      Obtener: "_fomaf/Obtener",
      Subir_Archivo: "_fomaf/Subir_Archivo",
      ObtenerColegiado: "_colegiado/ObtenerColegiado",
    }),
    closeModalColegiado: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalAddColegiado")
      );
      modal.hide();
    },
    selectColegiado(item) {
      this.idPersona = item.id;
      this.cqfp = item.cqfll;
      this.agremiado =
        item.apellidoPaterno + " " + item.apellidoMaterno + " " + item.nombres;
      this.verificarFOMAF();
      this.closeModalColegiado();
    },
    returnFormatoFecha(date) {
      return dayjs(date).format("DD-MM-YYYY");
    },
    openDocumentFile() {
      if (this.idPersona != 0) {
        const inputFile = document.getElementById("file_document");
        inputFile.click();
      } else {
        global._mensaje_advertencia("Debe seleccionar un colegiado.");
      }
    },
    setupFileInput() {
      document
        .getElementById("file_document")
        .addEventListener("change", this.fileUpload, false);
    },
    fileUpload(evt) {
      this.newFile = evt.target.files[0];
      this.nameNewFile = evt.target.files[0].name;
    },
    addArchivo: async function () {
      const subirArchivo = {
        idPersona: this.idPersona,
        archivo: this.newFile,
      };
      if (this.newFile != "") {
        let res = await this.Subir_Archivo(subirArchivo);
        if (res?.exito) {
          this.listarDocumentos(this.idPersona);
          this.newFile = "";
          this.nameNewFile = "";
          global._mensaje_exito("Los cambios se han guardado correctamente");
        }
      } else {
        global._mensaje_advertencia("Debe seleccionar un archivo");
      }
    },
    edit_row: function (index) {
      document.getElementById("edit_button" + index).style.display = "none";
      document.getElementById("save_button" + index).style.display = "block";

      var fomaf_prioridad = document.getElementById("fomaf_prioridad" + index);
      var fomaf_porcentaje = document.getElementById(
        "fomaf_porcentaje" + index
      );

      var fomaf_prioridad_data = fomaf_prioridad.innerHTML;
      var fomaf_porcentaje_data = fomaf_porcentaje.innerHTML;

      fomaf_prioridad.innerHTML =
        "<input type='text' style='width:45px' id='fomaf_prioridad_text" +
        index +
        "' value='" +
        fomaf_prioridad_data +
        "'>";
      fomaf_porcentaje.innerHTML =
        "<input type='text'  style='width:45px' id='fomaf_porcentaje_text" +
        index +
        "' value='" +
        fomaf_porcentaje_data +
        "'>";
    },
    save_row: function (index) {
      var fomaf_prioridad_val = document.getElementById(
        "fomaf_prioridad_text" + index
      ).value;
      var fomaf_porcentaje_val = document.getElementById(
        "fomaf_porcentaje_text" + index
      ).value;

      document.getElementById("fomaf_prioridad" + index).innerHTML =
        fomaf_prioridad_val;
      document.getElementById("fomaf_porcentaje" + index).innerHTML =
        fomaf_porcentaje_val;

      if (fomaf_prioridad_val == "" || fomaf_porcentaje_val == "") {
        global._mensaje_advertencia("Debe completar los datos!, gracias.");
        document.getElementById("edit_button" + index).style.display = "block";
        document.getElementById("save_button" + index).style.display = "none";
      } else {
        this.listBeneficiarios[index].fomaf_prioridad = fomaf_prioridad_val;
        this.listBeneficiarios[index].fomaf_porcentaje = fomaf_porcentaje_val;

        document.getElementById("edit_button" + index).style.display = "block";
        document.getElementById("save_button" + index).style.display = "none";

        this.modificarDocumento(index);
      }
    },
    modificarDocumento: async function (indexRow) {
      let res = null;

      this.listBeneficiarios.forEach((beneficiario, index) => {
        let addBeneficiario = null;
        if (indexRow == index) {
          addBeneficiario = {
            id: beneficiario.id,
            idPersona: beneficiario.idPersona,
            fomaf_prioridad: beneficiario.fomaf_prioridad,
            fomaf_porcentaje: beneficiario.fomaf_porcentaje,
          };
          this.beneficiarioEdit.push(addBeneficiario);
        }
      });

      res = await this.ModificarDocumento(this.beneficiarioEdit);

      if (res?.exito) {
        this.beneficiarioEdit = [];
        this.verificarFOMAF();
        global._mensaje_exito("Los cambios se han guardado correctamente");
      } else {
        this.beneficiarioEdit = [];
      }
    },

    openurlArchivo(url) {
      window.open(this.iprutaFiles + "" + url, "_blank");
    },
    verificarFOMAF: async function () {
      let fomaf = {
        id: this.idPersona,
        dni: "",
        cqf: "",
      };
      let res = await this.Obtener(fomaf);
      if (res != null) {
        this.listBeneficiarios = [];

        this.idPersona = res.persona_id;
        this.agremiado = res.persona;
        res.beneficiario.forEach((beneficiario) => {
          this.listBeneficiarios.push(beneficiario);
        });

        this.listarDocumentos(this.idPersona);
      } else {
        this.beneficiarioEdit = [];
        this.listBeneficiarios = [];
        this.listDocumentos = [];

        this.agremiado = "";
        this.idPersona = 0;
        this.fechaRegistro = "";
        this.usuarioRegistro = "";

        global._mensaje_advertencia(
          "El colegiado no tiene familiar asociado para su seguro FOMAF."
        );
      }
    },
    verificarCQF: async function () {
      if (this.cqfp.length > 0) {
        let persona = {
          id: null,
          dni: null,
          cqf: this.cqfp,
        };
        let res_persona = await this.ObtenerColegiado(persona);

        if (res_persona != null) {
          let fomaf = {
            id: 0,
            dni: "",
            cqf: this.cqfp,
          };
          let res = await this.Obtener(fomaf);
          if (res != null) {
            this.listBeneficiarios = [];

            this.idPersona = res.persona_id;
            this.agremiado = res.persona;
            /*this.fechaRegistro = res.fechaRegistro;
            this.usuarioRegistro = res.usuarioRegistro;*/

            res.beneficiario.forEach((beneficiario) => {
              this.listBeneficiarios.push(beneficiario);
            });

            this.listarDocumentos(this.idPersona);
          } else {
            this.beneficiarioEdit = [];
            this.listBeneficiarios = [];
            this.listDocumentos = [];

            this.agremiado = "";
            this.idPersona = 0;
            this.fechaRegistro = "";
            this.usuarioRegistro = "";

            global._mensaje_advertencia(
              "El colegiado no tiene familiar asociado para su seguro FOMAF."
            );
          }
        } else {
          this.beneficiarioEdit = [];
          this.listBeneficiarios = [];
          this.listDocumentos = [];

          this.agremiado = "";
          this.idPersona = 0;
          this.fechaRegistro = "";
          this.usuarioRegistro = "";

          global._mensaje_advertencia(
            "No se encuentra registrado como colegiado."
          );
        }
      }
    },
    listarDocumentos: async function (idPersona) {
      let persona = {
        idPersona: idPersona,
      };
      let res = await this.ListarDocumento(persona);
      if (res != null) {
        this.listDocumentos = res;
      } else {
        this.listDocumentos = [];
      }
    },
    validarRegistroExistente: async function (tipoDocumento) {
      if (this.idPersona != 0) {
        let persona = {
          idPersona: this.idPersona,
        };
        let res = await this.ListarDocumento(persona);
        let registros = res;
        let estadoDocumento = registros.find(
          (documentos) => documentos.tipoDocumento === tipoDocumento
        );

        if (estadoDocumento !== undefined) {
          this.eliminarDocumento(estadoDocumento.id, tipoDocumento);
        } else {
          this.generarDocumento(tipoDocumento);
        }
      } else {
        global._mensaje_advertencia("Debe seleccionar un colegiado.");
      }
    },
    eliminarDocumento: async function (id, tipoDocumento) {
      let documento = {
        id: id,
      };
      var res = await this.EliminarDocumento(documento);
      if (res?.exito) {
        this.generarDocumento(tipoDocumento);
      }
    },
    generarDocumento: async function (tipoDocumento) {
      let idPersona = this.idPersona;
      let documento = {
        idPersona: idPersona,
        tipoDocumento: tipoDocumento,
      };
      let res = await this.GenerarDocumento(documento);
      if (res?.exito) {
        this.listarDocumentos(idPersona);
        global._mensaje_exito("El documento se genero correctamente");
      }
    },
    cambiarTab() {
      document.getElementById("tabGeneralRegistrar").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabGeneralListado").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
  },
  mounted() {
    this.setupFileInput();
    this.fechaRegistro = this.currentDate;
  },
};
</script>
