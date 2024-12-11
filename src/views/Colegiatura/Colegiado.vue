<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Colegiado</h3>
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
              href="#listadoTab"
              class="active"
              data-bs-toggle="tab"
              id="tabGeneralListado"
              >LISTADO</a
            >
          </li>
          <li>
            <a
              href="#registrarTab"
              data-bs-toggle="tab"
              id="tabGeneralRegistrar"
              >REGISTRAR</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- DATOS GENERALES -->
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane" id="registrarTab">
          <div class="form-label mt-0 p-0">
            <button
              type="button"
              class="btn btn-primary"
              @click="nuevoColegiado()"
            >
              <i class="fe fe-file me-2"></i>Nuevo
            </button>
            <button
              class="btn btn-primary m-2"
              type="button"
              @click="imprimirFicha()"
            >
              <i class="fe fe-printer me-2"></i>Imprimir Ficha
            </button>
          </div>
          <div class="row">
            <div class="col-md-8 row">
              <div class="col-md-4">
                <div class="form-group">
                  <label>DNI</label>
                  <div class="input-group">
                    <input
                      type="text"
                      v-model="persona.dni"
                      @keypress="onlyNumber"
                      ref="dni"
                      class="form-control"
                      placeholder="DNI"
                      :style="
                        showAdvertise && persona.dni == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                      maxlength="8"
                      @input="verificarColegiadoDNI()"
                    />

                    <button type="button" class="btn btn-primary">
                      <i
                        class="fe fe-search me-2"
                        @click="verificarColegiadoDNI()"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>RUC</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="RUC"
                    maxlength="11"
                    v-model="persona.ruc"
                    @keypress="onlyNumber"
                  />
                  <!-- ref="ruc"
                    :style="
                      showAdvertise && persona.ruc == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                    " -->
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <label>CQFP</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="CQFP"
                    v-model="persona.cqfll"
                    ref="cqfll"
                    :style="
                      showAdvertise && persona.cqfll == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>REGISTRO CQFLL</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="REGISTRO CQFLL"
                    v-model="cqfll_temp"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Apellido Paterno</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Apellido Paterno"
                    ref="apellidoPaterno"
                    :style="
                      showAdvertise && persona.apellidoPaterno == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                    v-model.trim="persona.apellidoPaterno"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Apellido Materno</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Apellido Materno"
                    ref="apellidoMaterno"
                    :style="
                      showAdvertise && persona.apellidoMaterno == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                    v-model.trim="persona.apellidoMaterno"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Nombres</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nombres"
                    ref="nombres"
                    :style="
                      showAdvertise && persona.nombres == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                    v-model="persona.nombres"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Estado Civil</label>
                  <select
                    class="form-control form-select"
                    data-bs-placeholder="Estado Civil"
                    ref="estadoCivil"
                    :style="
                      showAdvertise && persona.estadoCivil == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                    v-model="persona.estadoCivil"
                  >
                    <option value="">Estado Civil</option>
                    <option value="Soltero">Soltero</option>
                    <option value="Casado">Casado</option>
                    <option value="Viudo">Viudo</option>
                    <option value="Divorciado">Divorciado</option>
                    <option value="Conviviente">Conviviente</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Sexo</label>
                  <select
                    class="form-control form-select"
                    data-bs-placeholder="Sexo"
                    ref="sexo"
                    :style="
                      showAdvertise && persona.sexo == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                    v-model="persona.sexo"
                  >
                    <option value="">Sexo</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Fecha Nac.</label>
                  <input
                    type="date"
                    class="form-control"
                    placeholder="Fecha Nac."
                    ref="fechaNacimiento"
                    :style="
                      showAdvertise && persona.fechaNacimiento == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                    v-model="persona.fechaNacimiento"
                  />
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <label>Edad</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Edad"
                    v-model="edad_colegiado"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>G. Sanguineo</label>
                  <select
                    class="form-control form-select"
                    data-bs-placeholder="G. Sanguineo"
                    v-model="persona.grupoSanguineo"
                    ref="grupoSanguineo"
                    :style="
                      showAdvertise && persona.grupoSanguineo == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                  >
                    <option value="">G. Sanguineo</option>
                    <option value="Ninguno">Ninguno</option>
                    <option value="RH A-">RH A-</option>
                    <option value="RH A+">RH A+</option>
                    <option value="RH AB-">RH AB-</option>
                    <option value="RH AB+">RH AB+</option>
                    <option value="RH B-">RH B-</option>
                    <option value="RH B+">RH B+</option>
                    <option value="RH 0-">RH 0-</option>
                    <option value="RH 0+">RH 0+</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Discapacitado</label>
                  <select
                    class="form-control form-select"
                    data-bs-placeholder="Discapacitado"
                    v-model="persona.discapacitado"
                    ref="discapacitado"
                    :style="
                      showAdvertise && persona.discapacitado == null
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                  >
                    <option value="null">Discapacitado</option>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>FOMAF</label>
                  <select
                    class="form-control form-select"
                    data-bs-placeholder="FOMAF"
                    v-model="persona.fomafAfiliado"
                    ref="fomafAfiliado"
                    :style="
                      showAdvertise && persona.fomafAfiliado == null
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                  >
                    <option value="null">FOMAF</option>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Estado</label>
                  <select
                    class="form-control form-select"
                    data-bs-placeholder="Estado"
                    v-model="persona.idTipoPersona"
                    ref="idTipoPersona"
                    :style="
                      showAdvertise && persona.idTipoPersona == 0
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                  >
                    <option value="0">Estado</option>
                    <option
                      v-for="item in tipocolegiadoDesplegable"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id"
                    ></option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <input
                type="file"
                class="form-control"
                id="file_image"
                name="image_files[]"
                style="display: none"
              />
              <div
                class="foto"
                id="foto"
                style="cursor: pointer"
                @click="addNewFileImage"
              >
                <div id="viewImage" v-if="image_files != ''"></div>
                <img
                  v-else-if="persona.urlFoto != ''"
                  :src="rutaFiles + '' + persona.urlFoto"
                  style="width: 160px; height: 200px; margin: 0 auto"
                />
              </div>
              <div
                class="text-center"
                style="font-size: 12px; font-weight: bold"
              >
                Foto
              </div>
              <br />
              <div class="alert alert-info" role="alert">
                <div class="text-left" style="font-size: 12px">
                  Condicion: {{ condicion_persona }}
                </div>
              </div>
              <div class="alert alert-warning" role="alert">
                <div class="text-left" style="font-size: 12px">
                  Movimiento: {{ movimiento_persona }}
                </div>
              </div>
              <div class="alert alert-danger" role="alert">
                <div class="text-left" style="font-size: 12px">
                  Estado: {{ estado_persona }}
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Modalidad</label>
                <select
                  class="form-control form-select"
                  data-bs-placeholder="Modalidad"
                  v-model="persona.idModalidad"
                  ref="idModalidad"
                  @change="modalidad()"
                  :style="
                    showAdvertise && persona.idModalidad == 0
                      ? 'border-color: #e23e3d;'
                      : ''
                  "
                >
                  <option value="0">Modalidad</option>
                  <option
                    v-for="item in modalidadDesplegable"
                    :key="item.id"
                    :label="item.nombre"
                    :value="item.id"
                  ></option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>ColegioCQF</label>
                <select
                  class="form-control form-select"
                  data-bs-placeholder="ColegioCQF"
                  v-model="persona.idColegioCQF"
                  :disabled="disabledColegioCQF"
                >
                  <option value="0">ColegioCQF</option>
                  <option
                    v-for="item in colegioCQFDesplegable"
                    :key="item.id"
                    :label="item.nombre"
                    :value="item.id"
                  ></option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Fecha Colegiatura</label>
                <input
                  type="date"
                  class="form-control"
                  placeholder="Fecha Colegiatura"
                  v-model="persona.fechaColegiatura"
                  ref="fechaColegiatura"
                  :style="
                    showAdvertise && persona.fechaColegiatura == ''
                      ? 'border-color: #e23e3d;'
                      : ''
                  "
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <!-- <label>Correo Corporativo</label> -->
                <label>Correo Personal</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Correo Personal"
                  v-model="persona.correo"
                  ref="correo"
                  @blur="validarEmail(persona.correo)"
                  :style="
                    showAdvertise && persona.correo == ''
                      ? 'border-color: #e23e3d;'
                      : ''
                  "
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Correo Alternativo</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Correo Alternativo"
                  v-model="persona.correoAlternativo"
                  @blur="validarEmail(persona.correoAlternativo)"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    name="example-checkbox1"
                    v-model="estadoEnvioInfo"
                    @change="cambiarValorCheckbox"
                  />
                  <span class="custom-control-label"
                    >Acepta el envio de informacion a su correo</span
                  >
                </label>
              </div>
            </div>
          </div>

          <!-- DATOS DETALLES COLEGIADO -->
          <div class="panel-body tabs-menu-body">
            <div class="tab-content">
              <div class="tab-menu-heading">
                <div class="tabs-menu">
                  <!-- Tabs -->
                  <ul class="nav panel-tabs panel-info" id="tabs">
                    <li>
                      <a
                        href="#basicoTab"
                        class="active"
                        data-bs-toggle="tab"
                        @click="clickTab('Basico')"
                        >Básico</a
                      >
                    </li>
                    <li>
                      <a
                        href="#profesionalTab"
                        data-bs-toggle="tab"
                        @click="clickTab('Profesional')"
                        >Profesional</a
                      >
                    </li>
                    <li>
                      <a
                        href="#academicoTab"
                        data-bs-toggle="tab"
                        @click="clickTab('Académico')"
                        >Académico</a
                      >
                    </li>
                    <li>
                      <a
                        href="#laboralTab"
                        data-bs-toggle="tab"
                        @click="clickTab('Laboral')"
                        >Laboral</a
                      >
                    </li>
                    <li>
                      <a
                        href="#familiarTab"
                        data-bs-toggle="tab"
                        @click="clickTab('Familiar')"
                        >Familiar</a
                      >
                    </li>
                    <li>
                      <a
                        href="#actividadesTab"
                        data-bs-toggle="tab"
                        @click="clickTab('Deportes')"
                        >Deportes y Act. Esparcim.</a
                      >
                    </li>
                    <li>
                      <a
                        href="#documentacionTab"
                        data-bs-toggle="tab"
                        @click="clickTab('Documentación')"
                        >Documentación</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="panel-body tabs-menu-body">
                <div class="tab-content">
                  <!-- BASICO TAB -->
                  <div class="tab-pane active" id="basicoTab">
                    <!-- DATOS PERSONALES-->
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">DATOS PERSONALES</div>
                      <div class="row">
                        <!-- <div class="col-md-6">
                                                    <div class="form-group">
                                                        <div class="form-floating">
                                                            <select class="form-control form-select"
                                                                data-bs-placeholder="Nacionalidad">
                                                                <option v-for="item in paisDesplegable" :key="item.id"
                                                                    :label="item.nacionalidad" :value="item.id">
                                                                </option>
                                                            </select>
                                                            <label>Nacionalidad</label>
                                                        </div>
                                                    </div>
                                                </div> -->
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Pais</label>
                            <SearchMultiselect
                              :value="persona.idPais"
                              v-model="persona.idPais"
                              :options="paisDesplegable"
                              placeholder="Pais"
                              ref="idPais"
                              :searchable="true"
                              :style="
                                showAdvertise && persona.idPais == 0
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            />
                            <!-- <div class="form-floating">                                                           
                                                            <select class="form-control form-select"
                                                                data-bs-placeholder="Pais" v-model="persona.idPais"
                                                                ref="idPais"
                                                                :style="showAdvertise && persona.idPais == 0 ? 'border-color: #e23e3d;' : ''">
                                                                <option v-for="item in paisDesplegable" :key="item.id"
                                                                    :label="item.label" :value="item.value">
                                                                </option>
                                                            </select>
                                                            <label>Pais</label>
                                                        </div> -->
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Telefono</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Telefono"
                              v-model="persona.telefono"
                              @keypress="onlyNumber"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Celular</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Celular"
                              v-model="persona.celular"
                              ref="celular"
                              :style="
                                showAdvertise && persona.celular == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              @keypress="onlyNumber"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Celular Corporativo</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Celular Corporativo"
                              v-model="persona.celularCorporativo"
                              @keypress="onlyNumber"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- DATOS NACIMIENTOS-->
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">DATOS NACIMIENTOS</div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Departamento</label>
                            <SearchMultiselect
                              :value="idDepartamentoNacimiento"
                              v-model="idDepartamentoNacimiento"
                              :options="departamentoDesplegable"
                              placeholder="Departamento"
                              :searchable="true"
                              @select="cargarProvincia"
                              :canClear="false"
                            />
                            <!-- <select class="form-control form-select"
                                                            data-placeholder="Departamento" @change="cargarProvincia"
                                                            v-model="idDepartamentoNacimiento">
                                                            <option v-for="item in departamentoDesplegable"
                                                                :key="item.id" :label="item.nombre" :value="item.id">
                                                            </option>
                                                        </select> -->
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Provincia</label>
                            <SearchMultiselect
                              :value="idProvinciaNacimiento"
                              v-model="idProvinciaNacimiento"
                              :options="provinciaDesplegable"
                              placeholder="Provincia"
                              :searchable="true"
                              @select="cargarDistrito"
                              :canClear="false"
                              :disabled="disabledIdProvinciaNacimiento"
                            />
                            <!-- <select class="form-control form-select"
                                                            data-bs-placeholder="Provincia"
                                                            v-model="idProvinciaNacimiento" @change="cargarDistrito"
                                                            :disabled="disabledIdProvinciaNacimiento">
                                                            <option v-for="item in provinciaDesplegable" :key="item.id"
                                                                :label="item.nombre" :value="item.id">
                                                            </option>
                                                        </select> -->
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Distrito</label>
                            <SearchMultiselect
                              :value="persona.idDistrito"
                              v-model="persona.idDistrito"
                              :options="distritoDesplegable"
                              placeholder="Distrito"
                              :searchable="true"
                              :canClear="false"
                              :disabled="disabledIdDistritoNacimiento"
                              ref="idDistrito"
                              :style="
                                showAdvertise && persona.idDistrito == 0
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            />
                            <!-- <select class="form-control form-select"
                                                            data-bs-placeholder="Distrito" v-model="persona.idDistrito"
                                                            ref="idDistrito" :disabled="disabledIdDistritoNacimiento"
                                                            :style="showAdvertise && persona.idDistrito == 0 ? 'border-color: #e23e3d;' : ''">
                                                            <option v-for="item in distritoDesplegable" :key="item.id"
                                                                :label="item.nombre" :value="item.id">
                                                            </option>
                                                        </select> -->
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- DATOS DOMICILIO-->
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">DATOS DOMICILIO</div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Departamento</label>
                            <SearchMultiselect
                              :value="idDepartamentoDomicilio"
                              v-model="idDepartamentoDomicilio"
                              :options="departamentoDesplegable"
                              placeholder="Departamento"
                              :searchable="true"
                              @select="cargarProvinciaDomicilio"
                              :canClear="false"
                            />
                            <!-- <select class="form-control form-select"
                                                            data-bs-placeholder="Departamento"
                                                            v-model="idDepartamentoDomicilio"
                                                            @change="cargarProvinciaDomicilio">
                                                            <option v-for="item in departamentoDesplegable"
                                                                :key="item.id" :label="item.nombre" :value="item.id">
                                                            </option>
                                                        </select> -->
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Provincia</label>
                            <SearchMultiselect
                              :value="idProvinciaDomicilio"
                              v-model="idProvinciaDomicilio"
                              :options="provinciaDesplegableDomicilio"
                              placeholder="Provincia"
                              :searchable="true"
                              @select="cargarDistritoDomicilio"
                              :canClear="false"
                              :disabled="disabledIdProvinciaDomicilio"
                            />
                            <!-- <select class="form-control form-select"
                                                            data-bs-placeholder="Provincia"
                                                            v-model="idProvinciaDomicilio"
                                                            @change="cargarDistritoDomicilio"
                                                            :disabled="disabledIdProvinciaDomicilio">
                                                            <option v-for="item in provinciaDesplegableDomicilio"
                                                                :key="item.id" :label="item.nombre" :value="item.id">
                                                            </option>
                                                        </select> -->
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Distrito</label>
                            <SearchMultiselect
                              :value="idDistritoDomicilio"
                              v-model="idDistritoDomicilio"
                              :options="distritoDesplegableDomicilio"
                              placeholder="Departamento"
                              :searchable="true"
                              @select="cargarZonaDomicilio"
                              :canClear="false"
                              :disabled="disabledIdDistritoDomicilio"
                            />
                            <!-- <select class="form-control form-select"
                                                            data-bs-placeholder="Distrito" v-model="idDistritoDomicilio"
                                                            @change="cargarZonaDomicilio"
                                                            :disabled="disabledIdDistritoDomicilio">
                                                            <option v-for="item in distritoDesplegableDomicilio"
                                                                :key="item.id" :label="item.nombre" :value="item.id">
                                                            </option>
                                                        </select> -->
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Zona</label>
                            <SearchMultiselect
                              :value="persona.idZona"
                              v-model="persona.idZona"
                              :options="zonaDesplegable"
                              placeholder="Zona"
                              :searchable="true"
                              :canClear="false"
                              :disabled="disabledIdZonaDomicilio"
                              ref="idZona"
                              :style="
                                showAdvertise && persona.idZona == 0
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            />
                            <!-- <select class="form-control form-select"
                                                            data-bs-placeholder="Zona" v-model="persona.idZona"
                                                            ref="idZona" :disabled="disabledIdZonaDomicilio"
                                                            :style="showAdvertise && persona.idZona == 0 ? 'border-color: #e23e3d;' : ''">
                                                            <option v-for="item in zonaDesplegable" :key="item.id"
                                                                :label="item.nombre" :value="item.id">
                                                            </option>
                                                        </select> -->
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Dirección</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Dirección"
                              v-model="persona.direccion"
                              ref="direccion"
                              :style="
                                showAdvertise && persona.direccion == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Referencia</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Referencia"
                              v-model="persona.referencia"
                              ref="referencia"
                              :style="
                                showAdvertise && persona.referencia == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">Observacíon</div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Observacíon"
                              v-model="persona.observacion"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- PROFESIONAL TAB-->
                  <div class="tab-pane" id="profesionalTab">
                    <!-- DATOS ESTUDIOS-->
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">ESTUDIOS</div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Especialidad</label>
                            <span
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Si no encuentras tu especialidad, presiona enter y agrégalo"
                            >
                              <SearchMultiselect
                                :value="profesional.idEspecialidad"
                                v-model="profesional.idEspecialidad"
                                :options="especialidadDesplegable"
                                placeholder="Especialidad"
                                :searchable="true"
                                ref="idEspecialidad"
                                :createTag="true"
                                :appendNewOption="false"
                                @option="addOptionEspecialidad"
                                :style="
                                  showAdvertise &&
                                  profesional.idEspecialidad == 0
                                    ? 'border-color: #e23e3d;'
                                    : ''
                                "
                                :canClear="false"
                              />
                            </span>
                            <!-- <select class="form-control form-select"
                                                            data-bs-placeholder="Especialidad"
                                                            v-model="profesional.idEspecialidad" ref="idEspecialidad"
                                                            :style="showAdvertise && profesional.idEspecialidad == 0 ? 'border-color: #e23e3d;' : ''">
                                                            <option v-for="item in especialidadDesplegable"
                                                                :key="item.id" :label="item.nombre" :value="item.id">
                                                            </option>
                                                        </select> -->
                          </div>
                        </div>
                        <!-- <div class="col-md-12">
                                                    <div class="form-group">
                                                        <div class="form-floating">
                                                            <select class="form-control form-select"
                                                                data-bs-placeholder="Titulo">
                                                                <option value="br">Brazil</option>
                                                                <option value="cz">Czech Republic</option>
                                                                <option value="de">Germany</option>
                                                                <option value="pl">Poland</option>
                                                            </select>
                                                            <label>Titulo</label>
                                                        </div>
                                                    </div>
                                                </div> -->
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Universidad</label>
                            <span
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Si no encuentras tu institución, presiona enter y agrégalo"
                            >
                              <SearchMultiselect
                                :value="profesional.idInstituto"
                                v-model="profesional.idInstituto"
                                :options="institucionDesplegable"
                                placeholder="Universidad"
                                :searchable="true"
                                ref="idInstituto"
                                :createTag="true"
                                :appendNewOption="false"
                                @option="addOptionInstitucion"
                                :style="
                                  showAdvertise && profesional.idInstituto == 0
                                    ? 'border-color: #e23e3d;'
                                    : ''
                                "
                                :canClear="false"
                              />
                            </span>
                            <!-- <select class="form-control form-select"
                                                            data-bs-placeholder="Universidad"
                                                            v-model="profesional.idInstituto" ref="idInstituto"
                                                            :style="showAdvertise && profesional.idInstituto == 0 ? 'border-color: #e23e3d;' : ''">
                                                            <option v-for="item in institucionDesplegable"
                                                                :key="item.id" :label="item.nombre" :value="item.id">
                                                            </option>
                                                        </select> -->
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <!-- <label>Fecha Egreso</label>
                            <input
                              type="date"
                              class="form-control"
                              placeholder="Fecha Egreso"
                              v-model="fechaEgreso"
                              ref="fechaEgreso"
                              disabled
                            /> -->
                            <label>Sunedu</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Sunedu"
                              v-model="profesional.sunedu"
                              ref="sunedu"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Fecha Titulación</label>
                            <input
                              type="date"
                              class="form-control"
                              placeholder="Fecha Titulación"
                              v-model="profesional.fechaTitulacion"
                              ref="fechaTitulacion"
                              :style="
                                showAdvertise &&
                                profesional.fechaTitulacion == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>N° Titulo</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="N° Titulo"
                              v-model="profesional.nTitulo"
                              ref="nTitulo"
                              :style="
                                showAdvertise && profesional.nTitulo == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Folio</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Folio"
                              v-model="profesional.folio"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Hoja</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Hoja"
                              v-model="profesional.hoja"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Resolución Rectoral</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Resolución Rectoral"
                              v-model="profesional.resolucionRectoral"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- DATOS MINSA-->
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">MINSA</div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Minsa</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Minsa"
                              v-model="profesional.minsa_codigo"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>N° Registro</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="N° Registro"
                              v-model="profesional.minsa_nRegistro"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Fecha Minsa</label>
                            <input
                              type="date"
                              class="form-control"
                              placeholder="Fecha Minsa"
                              v-model="profesional.minsa_fecha"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- ACEDEMICO TAB-->
                  <div class="tab-pane" id="academicoTab">
                    <!-- TABLA ESTUDIOS-->
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">ESTUDIOS</div>
                      <div class="row">
                        <div class="col-md-12 mb-3" style="text-align: right">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddStudies"
                          >
                            <i class="fe fe-plus"></i>
                          </button>
                        </div>
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <table
                              class="
                                table
                                border
                                text-nowrap text-md-nowrap
                                table-striped table-sm
                                mb-0
                              "
                            >
                              <thead>
                                <tr>
                                  <th>Grado</th>
                                  <th>Especialidad</th>
                                  <th>Universidad</th>
                                  <th>Fecha</th>
                                  <th>Registro</th>
                                  <th>Opciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(studie, index) in studies"
                                  :key="'studie-' + index"
                                  v-if="studies.length != 0"
                                >
                                  <td>
                                    {{ studie.grado }}
                                  </td>
                                  <td>
                                    {{ studie.especialidad }}
                                  </td>
                                  <td>
                                    {{ studie.institucion }}
                                  </td>
                                  <td>
                                    {{ studie.fechaFinalizacionLista }}
                                  </td>
                                  <td>
                                    {{ studie.nRegistro }}
                                  </td>

                                  <td>
                                    <div class="btn-list">
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-primary"
                                        @click="editStudies(studie, index)"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalAddStudies"
                                      >
                                        <span class="fe fe-edit"> </span>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-danger"
                                        @click="deleteStudies(studie, index)"
                                      >
                                        <span class="fe fe-trash-2"> </span>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                <tr v-else>
                                  <td colspan="6" class="text-center">
                                    Detalle Vacío
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- TABLA CERTIFICACION-->
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">CERTIFICACIÓN</div>
                      <div class="row">
                        <div class="col-md-12 mb-3" style="text-align: right">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddCertificates"
                          >
                            <i class="fe fe-plus"></i>
                          </button>
                        </div>
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <table
                              class="
                                table
                                border
                                text-nowrap text-md-nowrap
                                table-striped table-sm
                                mb-0
                              "
                            >
                              <thead>
                                <tr>
                                  <th>Fecha</th>
                                  <th>Vigencia</th>
                                  <th>Hrs</th>
                                  <th>Cred.</th>
                                  <th>Reg.</th>
                                  <th>Modalidad</th>
                                  <th>Expedido</th>
                                  <th>Mención</th>
                                  <th>Opciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(certificate, index) in certificates"
                                  :key="'certificate-' + index"
                                  v-if="certificates.length != 0"
                                >
                                  <td>{{ certificate.fechaLista }}</td>
                                  <td>{{ certificate.vigenciaLista }}</td>
                                  <td>{{ certificate.horas }}</td>
                                  <td>{{ certificate.creditos }}</td>
                                  <td>{{ certificate.registros }}</td>
                                  <td>{{ certificate.modalidad }}</td>
                                  <td>{{ certificate.institucion }}</td>
                                  <td>{{ certificate.mencion }}</td>
                                  <td>
                                    <div class="btn-list">
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-primary"
                                      >
                                        <span
                                          class="fe fe-edit"
                                          @click="
                                            editCertificates(certificate, index)
                                          "
                                          data-bs-toggle="modal"
                                          data-bs-target="#modalAddCertificates"
                                        >
                                        </span>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-danger"
                                        @click="
                                          deleteCertificates(certificate, index)
                                        "
                                      >
                                        <span class="fe fe-trash-2"> </span>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                <tr v-else>
                                  <td colspan="9" class="text-center">
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

                  <!-- LABORAL TAB-->
                  <div class="tab-pane" id="laboralTab">
                    <!-- TABLA CENTRO LABORAL-->
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">CENTRO LABORAL</div>
                      <div class="row">
                        <div class="col-md-12 mb-3" style="text-align: right">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddLaborCenter"
                          >
                            <i class="fe fe-plus"></i>
                          </button>
                        </div>
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <table
                              class="
                                table
                                border
                                text-nowrap text-md-nowrap
                                table-striped table-sm
                                mb-0
                              "
                            >
                              <thead>
                                <tr>
                                  <th>Centro Laboral</th>
                                  <th>Sector</th>
                                  <th>Cargo</th>
                                  <th>Fecha Ingreso</th>
                                  <th>Fecha Culminación</th>
                                  <th>Opciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(laborCenter, index) in laborCenters"
                                  :key="'laborCenter-' + index"
                                  v-if="laborCenters.length != 0"
                                >
                                  <td>{{ laborCenter.centroLaboral }}</td>
                                  <td>{{ laborCenter.sectorLaboral }}</td>
                                  <td>{{ laborCenter.cargo }}</td>
                                  <td>{{ laborCenter.fechaIngresoLista }}</td>
                                  <td>
                                    {{ laborCenter.fechaCulminacionLista }}
                                  </td>
                                  <td>
                                    <div class="btn-list">
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-primary"
                                        @click="
                                          editLaborCenters(laborCenter, index)
                                        "
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalAddLaborCenter"
                                      >
                                        <span class="fe fe-edit"> </span>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-danger"
                                        @click="
                                          deleteLaboralCenters(
                                            laborCenter,
                                            index
                                          )
                                        "
                                      >
                                        <span class="fe fe-trash-2"> </span>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                <tr v-else>
                                  <td colspan="6" class="text-center">
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

                  <!-- FAMILIAR TAB-->
                  <div class="tab-pane" id="familiarTab">
                    <!-- TABLA FAMILIAR-->
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">FAMILIA</div>
                      <div class="row">
                        <div class="col-md-12 mb-3" style="text-align: right">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddFamily"
                          >
                            <i class="fe fe-plus"></i>
                          </button>
                        </div>
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <table
                              class="
                                table
                                border
                                text-nowrap text-md-nowrap
                                table-striped table-sm
                                mb-0
                              "
                            >
                              <thead>
                                <tr>
                                  <th>Documento</th>
                                  <th>Apellidos y Nombres</th>
                                  <!-- <th>Nombres</th> -->
                                  <th>Estado</th>
                                  <th>Fecha Nac.</th>
                                  <th>Parentesco</th>
                                  <th>Beneficiario</th>
                                  <th>Opciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(addfamily, index) in family"
                                  :key="'family-' + index"
                                  v-if="family.length != 0"
                                >
                                  <td style="display: none">
                                    {{ addfamily.tipoDoc }}
                                  </td>
                                  <td>{{ addfamily.documentoIdentidad }}</td>
                                  <td>{{ addfamily.apellido_nombre }}</td>
                                  <!-- <td>{{ addfamily.apellido }}</td> -->
                                  <td>{{ addfamily.estadoFamilia }}</td>
                                  <td>{{ addfamily.fechaNacimientoLista }}</td>
                                  <td>{{ addfamily.parentesco }}</td>
                                  <td>{{ addfamily.beneficioFomafDesc }}</td>
                                  <td>
                                    <div class="btn-list">
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalAddFamily"
                                        @click="editFamily(addfamily, index)"
                                      >
                                        <span class="fe fe-edit"> </span>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-danger"
                                        @click="deleteFamily(addfamily, index)"
                                      >
                                        <span class="fe fe-trash-2"> </span>
                                      </button>
                                    </div>
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

                  <!-- DEPORTES / ACTIVIDADES TAB-->
                  <div class="tab-pane" id="actividadesTab">
                    <!-- TABLA DEPORTES / ACTIVIDADES-->
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">
                        DEPORTES / ACTIVIDADES
                      </div>
                      <div class="row">
                        <div class="col-md-4 mb-5" style="text-align: center">
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Si no encuentras tu deporte, presiona enter y agrégalo"
                          >
                            <SearchMultiselect
                              v-model="sportSelect.idDeporte"
                              :options="deporteActividadDesplegable"
                              :searchable="true"
                              noResultsText="Presione enter para agregar"
                              noOptionsText="No hay items para mostrar"
                              placeholder="Deporte"
                              :createTag="true"
                              :appendNewOption="false"
                              @option="addOptionDeporte"
                              trackBy="label"
                            />
                          </span>
                          <!-- <select class="form-control form-select"
                                                        data-bs-placeholder="Deporte / Actividad Esparcimiento"
                                                        v-model="sportSelect.idDeporte">
                                                        <option value="null">Deporte / Actividad Esparcimiento
                                                        </option>
                                                        <option v-for="item in deporteActividadDesplegable"
                                                            :key="item.id" :label="item.nombre" :value="item.id">
                                                        </option>
                                                    </select> -->
                        </div>
                        <div class="col-md-4 mb-5" style="text-align: center">
                          <SearchMultiselect
                            v-model="sportSelect.nivel"
                            :options="[
                              { value: 'Profesional', label: 'Profesional' },
                              { value: 'Intermedio', label: 'Intermedio' },
                              { value: 'Amateur', label: 'Amateur' },
                            ]"
                            noOptionsText="No hay items para mostrar"
                            placeholder="Nivel"
                          />
                          <!-- <select class="form-control form-select" data-bs-placeholder="Nivel"
                                                        v-model="sportSelect.nivel">
                                                        <option value="null">Nivel
                                                        </option>
                                                        <option value="Profesional">Profesional
                                                        </option>
                                                        <option value="Intermedio">Intermedio
                                                        </option>
                                                        <option value="Amateur">Amateur
                                                        </option>
                                                    </select> -->
                        </div>
                        <div class="col-md-4 mb-2" style="text-align: right">
                          <button
                            type="button"
                            class="btn btn-primary"
                            @click="addSports()"
                          >
                            Agregar
                          </button>
                        </div>
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <table
                              class="
                                table
                                border
                                text-nowrap text-md-nowrap
                                table-striped table-sm
                                mb-0
                              "
                            >
                              <thead>
                                <tr>
                                  <th>DEPORTES / ACTIVIDADES</th>
                                  <th>NIVEL</th>
                                  <th>Categoria</th>
                                  <th>Opciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(sports, index) in listSports"
                                  :key="'sports-' + index"
                                  v-if="listSports.length != 0"
                                >
                                  <td>{{ sports.deporte }}</td>
                                  <td>{{ sports.nivel }}</td>
                                  <td>{{ sports.categoria }}</td>
                                  <td>
                                    <div class="btn-list">
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-primary"
                                        @click="editSports(sports, index)"
                                      >
                                        <span class="fe fe-edit"> </span>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-danger"
                                        @click="deleteSports(sports, index)"
                                      >
                                        <span class="fe fe-trash-2"> </span>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                <tr v-else>
                                  <td colspan="4" class="text-center">
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

                  <!-- DOCUMENTACION TAB-->
                  <div class="tab-pane" id="documentacionTab">
                    <!-- TABLA DOCUMENTACIÓN-->
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">DOCUMENTACIÓN</div>
                      <div class="row">
                        <div class="col-md-4 mb-3" style="text-align: center">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Nombre"
                            v-model="documentation.nombre"
                          />
                        </div>
                        <div class="col-md-4 mb-3" style="text-align: center">
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Documento"
                              v-model="documentation.nombrearchivo"
                              readonly
                            />
                            <input
                              type="file"
                              class="form-control"
                              placeholder="Documento"
                              id="files"
                              name="document_files[]"
                              style="display: none"
                            />
                            <button
                              type="button"
                              class="btn btn-dark"
                              @click="openDocumentFile"
                            >
                              <i class="fe fe-upload me-2"></i>
                            </button>
                          </div>
                        </div>
                        <div class="col-md-4 mb-3" style="text-align: right">
                          <button
                            type="button"
                            class="btn btn-primary"
                            @click="addDocumentFile()"
                            style="margin: 2px"
                          >
                            Guardar
                          </button>
                          <button
                            type="button"
                            class="btn btn-secondary"
                            @click="generarDiplomaDuplicada()"
                            style="margin: 2px"
                          >
                            Generar Diploma
                          </button>
                        </div>
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <table
                              class="
                                table
                                border
                                text-nowrap text-md-nowrap
                                table-striped table-sm
                                mb-0
                              "
                            >
                              <thead>
                                <tr>
                                  <th>Nombre</th>
                                  <th>Documento</th>
                                  <th>Opciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(
                                    document_file, index
                                  ) in document_files"
                                  :key="'document_file-' + index"
                                  v-if="document_files.length != 0"
                                >
                                  <td>{{ document_file.nombre }}</td>
                                  <td>{{ document_file.urlArchivo }}</td>
                                  <td>
                                    <div class="btn-list">
                                      <button
                                        type="button"
                                        @click="openurlArchivo(document_file)"
                                        class="btn btn-sm btn-primary"
                                      >
                                        <span class="fe fe-eye"> </span>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-danger"
                                        @click="
                                          deleteDocumentFile(
                                            document_file,
                                            index
                                          )
                                        "
                                      >
                                        <span class="fe fe-trash-2"> </span>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                <tr v-else>
                                  <td colspan="3" class="text-center">
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
                </div>
                <div class="row" :style="styleButtonGen">
                  <div class="col-md-12 text-center">
                    <button
                      class="btn btn-primary m-2"
                      type="submit"
                      @click="cargarCancelar()"
                    >
                      Cancelar
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      :disabled="btnGuardar"
                      @click="guardarColegiado"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane active" id="listadoTab">
          <div class="mb-5 p-4 br-5">
            <div class="form-label mt-0 p-0">LISTA</div>
            <div class="row">
              <div class="col-md-2 mb-3" style="text-align: center">
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
              <div class="col-md-3 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with dropdown button"
                  v-model="searchFiltro"
                  placeholder="Search"
                />
              </div>
              <div class="col-md-2 mb-3">
                <label
                  class="custom-control custom-checkbox"
                  style="margin-top: 5px"
                >
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    name="example-checkbox1"
                    value="option1"
                    @click="chkIncluyePostulante()"
                  />
                  <span class="custom-control-label">Postulantes</span>
                </label>
              </div>
              <div class="col-md-5 mb-3" style="text-align: left">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="listarColegiados()"
                >
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  style="margin: 2px"
                  @click="nuevoColegiado()"
                >
                  <i class="fe fe-file me-2"></i>Nuevo
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="download_excel()"
                >
                  <i class="fe fe-download me-2"></i>Descargar
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
                    class="
                      table
                      border
                      text-nowrap text-md-nowrap
                      table-striped table-sm
                      mb-0
                    "
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>CQFP</th>
                        <th>APELLIDOS</th>
                        <th>NOMBRES</th>
                        <th>DNI</th>
                        <th>FECHA NAC.</th>
                        <!-- <th>DIRECCIÓN</th> -->
                        <th>EMAIL</th>
                        <th>CONDICIÓN</th>
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
                        <td>{{ item.fechaNacimiento }}</td>
                        <!-- <td>{{ item.direccion }}</td> -->
                        <td>{{ item.correo }}</td>
                        <td>{{ item.estadoColegiado }}</td>
                        <td class="text-center">
                          <i
                            class="fa fa-eye mx-1 text-primary"
                            role="button"
                            title="Ver Colegiado"
                            @click="cargarVer(item, index)"
                          ></i>
                          <i
                            class="fe fe-printer mx-1 text-danger"
                            role="button"
                            title="Imprimir Ficha"
                            @click="imprimirFicha2(item)"
                          ></i>
                          <!-- <i class="fa fa-trash mx-1 text-danger" role="button"
                                                        @click="cargarEliminar(item, index)"></i> -->
                        </td>
                      </tr>

                      <!-- <tr v-else>
                        <td colspan="7" class="text-center">
                          Ningun registro encontrado
                        </td>
                      </tr> -->
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
                      <paginate
                        :page-count="totalPaginas"
                        :click-handler="cambiarPagina"
                        v-model="initialPage"
                      />
                      <!-- <button
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
                      </button> -->
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
  <modal-add-studies
    id="modalAddStudies"
    @addStudies="addStudies"
    :studiesSelect="studiesSelect"
    @close="CloseStudies"
  />

  <modal-add-certificates
    id="modalAddCertificates"
    @addCertificate="addCertificate"
    :certificatesSelect="certificatesSelect"
    @close="CloseCertificates"
  />

  <modal-add-labor-center
    id="modalAddLaborCenter"
    @addLaborCenter="addLaborCenter"
    :laborCentersSelect="laborCentersSelect"
    @close="CloseLaborCenter"
  />

  <modal-add-family
    id="modalAddFamily"
    @addFamily="addFamily"
    :familySelect="familySelect"
    @close="CloseFamily"
  />
</template>

<script>
import { mapActions } from "vuex";
import global from "../../global";
import modalAddStudies from "../../components/colegiado/NewStudies/modalAddStudies.vue";
import modalAddCertificates from "../../components/colegiado/NewCertificates/modalAddCertificates.vue";
import modalAddLaborCenter from "../../components/colegiado/NewLaborCenter/modalAddLaborCenter.vue";
import modalAddFamily from "../../components/colegiado/NewFamily/modalAddFamily.vue";
import SearchMultiselect from "../../components/SearchMultiselect/SearchMultiselect.vue";
import Loading from "../../components/varios/Loading.vue";
import Paginate from "../../components/varios/Paginate.vue";
//Librayr
import * as XLSX from "xlsx";
import dayjs from "dayjs";
export default {
  name: "Colegiado",
  components: {
    modalAddStudies,
    modalAddCertificates,
    modalAddLaborCenter,
    modalAddFamily,
    SearchMultiselect,
    Loading,
    Paginate,
  },
  data() {
    return {
      date: new Date(),
      currentDate: dayjs(this.date).format("DD-MM-YYYY"),
      fechaEgreso: "",
      cargando: false,
      disabledColegioCQF: true,
      newOptionDeporte: false,
      newOptionEspecialidad: false,
      newOptionInstitucion: false,
      cqfll_temp: null,
      disabledIdProvinciaNacimiento: true,
      disabledIdDistritoNacimiento: true,
      disabledIdProvinciaDomicilio: true,
      disabledIdDistritoDomicilio: true,
      disabledIdZonaDomicilio: true,
      idDepartamentoNacimiento: 0,
      idProvinciaNacimiento: 0,
      idDepartamentoDomicilio: 0,
      idProvinciaDomicilio: 0,
      idDistritoDomicilio: 0,
      estadoEnvioInfo: "",
      btnGuardar: false,
      iprutaFiles: global.ruta_api,
      rutaFiles: "",
      filtroTabs: {
        idPersona: 0,
      },
      filtrosColegiado: "",
      searchFiltro: "",
      tabName: "Basico",
      showAdvertise: false,
      styleButtonGen: "",
      Search: "",
      modalAddStudies: false,
      modalAddCertificates: false,
      modalAddLaborCenter: false,
      modalAddFamily: false,
      indiceModificando: -1,
      documento: {},
      documentoBase: {
        cod_int: 0,
        nro_registro: 0,
        fecha: "",
        motivo: "",
        postd: "",
        tipo_resolution: "",
        persona: "",
        documento: "",
        tramite: "",
        archivo: "",
        tipo: "",
      },
      persona: {},
      personaBase: {
        id: 0,
        idColegioCQF: null,
        idTipoPersona: 0,
        idModalidad: 0,
        idPais: 0,
        idDistrito: 0,
        idZona: 0,
        dni: "",
        ruc: "",
        cqfll: null,
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombres: "",
        estadoCivil: "",
        sexo: "",
        fechaNacimiento: "",
        grupoSanguineo: "",
        discapacitado: null,
        fomafAfiliado: null,
        //fechaIngreso: "2022-08-06",
        fechaColegiatura: "",
        correo: "",
        correoAlternativo: "",
        estadoEnvioInfo: 0,
        urlFoto: "",
        telefono: "",
        celular: "",
        celularCorporativo: "",
        direccion: "",
        referencia: "",
        observacion: "",
        idUsuario: 1,
        // idDepartamento: 0,
        // idProvincia: 0,
        // idDistrito2: 0,
        // idDepartamento2: 0,
        // idProvincia2: 0,
      },
      profesional: {},
      profesionalBase: {
        id: 0,
        idPersona: 0,
        idEspecialidad: 0,
        especialidad: null,
        idInstituto: 0,
        instituto: null,
        fechaEgreso: null,
        fechaTitulacion: "",
        nTitulo: "",
        folio: "",
        hoja: "",
        resolucionRectoral: "",
        minsa_codigo: "",
        minsa_nRegistro: "",
        minsa_fecha: null,
        sunedu: "",
        idUsuario: 1,
      },
      estudio: {},
      estudioBase: {
        id: 0,
        idPersona: 0,
        idGrado: 0,
        idInstituto: 0,
        instituto: null,
        idEspecialidad: 0,
        especialidad: null,
        fechaFinalizacion: "",
        nRegistro: null,
        idUsuario: 1,
      },
      certificado: {},
      certificadoBase: {
        id: 0,
        idPersona: 0,
        idInstitucion: 0,
        institucion: null,
        fecha: "",
        vigencia: "",
        horas: "",
        creditos: "",
        registros: null,
        modalidad: "",
        mencion: null,
        idUsuario: 1,
      },
      laboral: {},
      laboralBase: {
        id: 0,
        idPersona: 0,
        idCentroLaboral: 1,
        centroLaboral: null,
        idSectorLaboral: 1,
        sectorLaboral: null,
        idCargo: 0,
        cargo: "",
        fechaIngreso: "",
        fechaCulminacion: null,
        idUsuario: 1,
      },
      familia: {},
      familiaBase: {
        id: 0,
        idPersona: 0,
        idTipoDocumento: null,
        documentoIdentidad: "",
        nombre: "",
        apellido: "",
        estadoFamilia: "",
        fechaNacimiento: "",
        parentesco: "",
        beneficioFomaf: 0,
        idUsuario: 1,
      },
      deporte: {},
      deporteBase: {
        id: 0,
        idPersona: 0,
        idDeporte: 0,
        deporte: null,
        nivel: "",
        idUsuario: 1,
      },
      documentation: {},
      documentationBase: {
        id: 0,
        nombre: "",
        idPersona: 0,
        archivo: "",
        nombrearchivo: "",
      },

      listaColegiados: [],

      buscador: {
        page_index: 1,
        dni: "",
        cqf: "",
        nombreApellido: "",
        postulante: 0,
      },
      totalPaginas: 0,
      initialPage: 1,
      studies: [],
      certificates: [],
      laborCenters: [],
      family: [],
      familySelect: null,
      studiesSelect: null,
      certificatesSelect: null,
      laborCentersSelect: null,
      indiceEdit: -1,

      sportSelect: {
        idDeporte: null,
        nivel: null,
      },

      listSports: [],

      document_files: [],
      image_files: "",

      paisDesplegable: [],
      especialidadDesplegable: [],
      //cargoDesplegable: [],
      departamentoDesplegable: [],
      provinciaDesplegable: [],
      colegioCQFDesplegable: [],
      provinciaDesplegableDomicilio: [],
      distritoDesplegable: [],
      distritoDesplegableDomicilio: [],
      zonaDesplegable: [],
      institucionDesplegable: [],
      deporteActividadDesplegable: [],
      modalidadDesplegable: [],
      tipocolegiadoDesplegable: [],
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
      condicion_persona: "-",
      movimiento_persona: "-",
      estado_persona: "-",
      incluyepostulantes: 0,
      edad_colegiado: 0,
    };
  },
  watch: {},
  methods: {
    ...mapActions({
      PaisDesplegable: "_colegiado/PaisDesplegable",
      EspecialidadDesplegable: "_colegiado/EspecialidadDesplegable",
      //CargoDesplegable: "_cargo/CargoDesplegable",
      DepartamentoDesplegable: "_colegiado/DepartamentoDesplegable",
      ProvinciaDesplegable: "_colegiado/ProvinciaDesplegable",
      DistritoDesplegable: "_colegiado/DistritoDesplegable",
      ZonaDesplegable: "_colegiado/ZonaDesplegable",
      InstitucionDesplegable: "_colegiado/InstitucionDesplegable",
      DeporteActividadDesplegable: "_colegiado/DeporteActividadDesplegable",
      TipoColegiadoDesplegable: "_colegiado/TipoColegiadoDesplegable",
      ModalidadDesplegable: "_colegiado/ModalidadDesplegable",
      AgregarColegiado: "_colegiado/AgregarColegiado",
      AgregarProfesional: "_colegiado/AgregarProfesional",
      AgregarAcademicoEstudio: "_colegiado/AgregarAcademicoEstudio",
      ListarColegiadosNew: "_colegiado/ListarColegiadosNew",
      ListarAcademicoEstudio: "_colegiado/ListarAcademicoEstudio",
      ListarAcademicoCertificado: "_colegiado/ListarAcademicoCertificado",
      ListarLaboral: "_colegiado/ListarLaboral",
      ListarFamiliar: "_colegiado/ListarFamiliar",
      ListarDeporteActividad: "_colegiado/ListarDeporteActividad",
      ListarDocumento: "_colegiado/ListarDocumento",
      AgregarAcademicoCertificado: "_colegiado/AgregarAcademicoCertificado",
      AgregarLaboral: "_colegiado/AgregarLaboral",
      AgregarFamiliar: "_colegiado/AgregarFamiliar",
      AgregarDeporte: "_colegiado/AgregarDeporte",
      ModificarEstudio: "_colegiado/ModificarEstudio",
      EliminarEstudio: "_colegiado/EliminarEstudio",
      ModificarCertificado: "_colegiado/ModificarCertificado",
      EliminarCertificado: "_colegiado/EliminarCertificado",
      ModificarLaboral: "_colegiado/ModificarLaboral",
      EliminarLaboral: "_colegiado/EliminarLaboral",
      ModificarFamiliar: "_colegiado/ModificarFamiliar",
      EliminarFamiliar: "_colegiado/EliminarFamiliar",
      ModificarDeporte: "_colegiado/ModificarDeporte",
      EliminarDeporte: "_colegiado/EliminarDeporte",
      ListarProfesional: "_colegiado/ListarProfesional",
      ModificarColegiado: "_colegiado/ModificarColegiado",
      ModificarProfesional: "_colegiado/ModificarProfesional",
      ObtenerColegiado: "_colegiado/ObtenerColegiado",
      ObtenerColegiadoAll: "_colegiado/ObtenerColegiadoAll",
      AgregarDocumento: "_colegiado/AgregarDocumento",
      AgregarFoto: "_colegiado/AgregarFoto",
      EliminarDocumento: "_colegiado/EliminarDocumento",
      ColegioCQFDesplegable: "_colegiado/ColegioCQFDesplegable",
      GenerarDiplomaColegiado: "_colegiado/GenerarDiplomaColegiado",
      CorrelativoCqfTempGet: "_colegiado/CorrelativoCqfTempGet",
    }),
    addOptionDeporte(newTag) {
      this.newOptionDeporte = true;
      this.deporte.deporte = newTag;
    },
    addOptionEspecialidad(newTag) {
      this.newOptionEspecialidad = true;
      this.profesional.especialidad = newTag;
    },
    addOptionInstitucion(newTag) {
      this.newOptionInstitucion = true;
      this.profesional.instituto = newTag;
    },
    listarColegiadosExcel: async function () {
      let buscador = {
        page_index: 1,
        page_size: this.pagination.total,
        dni: "",
        cqf: "",
        nombreApellido: "",
        postulante: "",
      };

      buscador.postulante = this.incluyepostulantes;

      if (this.filtrosColegiado == "dni") {
        buscador.dni = this.searchFiltro;
        buscador.cqf = "";
        buscador.nombreApellido = "";
      } else if (this.filtrosColegiado == "cqf") {
        buscador.cqf = this.searchFiltro;
      } else if (this.filtrosColegiado == "nombreApellido") {
        buscador.nombreApellido = this.searchFiltro;
      } else {
        buscador.dni = "";
        buscador.cqf = "";
        buscador.nombreApellido = "";
      }
      this.cargando = true;
      var res = await this.ListarColegiadosNew(buscador);

      let listaColegiados = res.datos;

      this.cargando = false;
      return listaColegiados;
    },
    download_excel: async function () {
      let export_excel = [];
      let listaColegiados = await this.listarColegiadosExcel();
      export_excel = listaColegiados.map((el, index) => ({
        item: index + 1,
        cqfll: el.cqfll,
        apellidos: el.apellidoPaterno + " " + el.apellidoMaterno,
        nombres: el.nombres,
        dni: el.dni,
        fechaNacimiento: dayjs(el.fechaNacimiento).format("DD-MM-YYYY"),
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
      data["F1"].v = "Fecha Nacimiento";
      data["G1"].v = "Dirección";
      data["H1"].v = "Correo";
      data["I1"].v = "Celular";
      data["J1"].v = "Estado";
      data["K1"].v = "Modalidad";

      const workbook = XLSX.utils.book_new();
      const filename = "reporte-colegiados";
      XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
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
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    chkIncluyePostulante() {
      if (this.incluyepostulantes == 1) {
        this.incluyepostulantes = 0;
      } else {
        this.incluyepostulantes = 1;
      }
    },
    cargarCancelar() {
      this.showAdvertise = false;
      this.loadColegiado(true);
      this.cambiarTabListar();
    },
    modalidad() {
      if (this.persona.idModalidad == 2 || this.persona.idModalidad == 7) {
        this.comboColegio();
        this.disabledColegioCQF = false;
      } else {
        this.colegioCQFDesplegable = [];
        this.disabledColegioCQF = true;
      }
    },

    limpiarCombosDocimicilioNacimiento() {
      this.disabledIdProvinciaNacimiento = true;
      this.disabledIdDistritoNacimiento = true;
      this.disabledIdProvinciaDomicilio = true;
      this.disabledIdDistritoDomicilio = true;
      this.disabledIdZonaDomicilio = true;
      this.idDepartamentoNacimiento = 0;
      this.idProvinciaNacimiento = 0;
      this.idDepartamentoDomicilio = 0;
      this.idProvinciaDomicilio = 0;
      this.idDistritoDomicilio = 0;
    },
    cargarProvincia() {
      this.idProvinciaNacimiento = 0;
      this.disabledIdProvinciaNacimiento = false;
      this.persona.idDistrito = 0;
      this.disabledIdDistritoNacimiento = true;
      this.comboProvincia(this.idDepartamentoNacimiento);
    },
    cargarProvinciaDomicilio() {
      this.idProvinciaDomicilio = 0;
      this.disabledIdProvinciaDomicilio = false;
      this.disabledIdDistritoDomicilio = true;
      this.disabledIdZonaDomicilio = true;
      this.idDistritoDomicilio = 0;
      this.persona.idZona = 0;
      this.comboProvinciaDomicilio(this.idDepartamentoDomicilio);
    },
    cargarDistrito() {
      this.persona.idDistrito = 0;
      this.disabledIdDistritoNacimiento = false;
      this.comboDistrito(this.idProvinciaNacimiento);
    },
    cargarDistritoDomicilio() {
      if (this.disabledIdProvinciaDomicilio == false) {
        this.disabledIdDistritoDomicilio = false;
      }
      this.disabledIdZonaDomicilio = true;
      this.idDistritoDomicilio = 0;
      this.comboDistritoDomicilio(this.idProvinciaDomicilio);
    },
    cargarZonaDomicilio() {
      this.persona.idZona = 0;
      this.disabledIdZonaDomicilio = false;
      this.comboZona(this.idDistritoDomicilio);
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    validarEmail: function (valor) {
      if (
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          valor
        )
      ) {
        //this.emailCorrecto = true;
      } else {
        global._mensaje_advertencia("El correo es incorrecto.");
      }
    },
    imprimirFicha() {
      if (this.persona.id > 0) {
        let url = `${this.iprutaFiles}ficha/colegiado/generar_pdf?idPersona=${this.persona.id}`;
        window.open(url, "_blank");
      } else {
        global._mensaje_advertencia(
          "Ingrese correctamente los datos, gracias."
        );
      }
    },
    imprimirFicha2(item) {
      if (item.id > 0) {
        let url = `${this.iprutaFiles}ficha/colegiado/generar_pdf?idPersona=${item.id}`;
        window.open(url, "_blank");
      } else {
        global._mensaje_advertencia(
          "Ingrese correctamente los datos, gracias."
        );
      }
    },
    openurlArchivo(item) {
      window.open(this.iprutaFiles + "" + item.urlArchivo, "_blank");
    },
    cambiarTab() {
      document.getElementById("tabGeneralRegistrar").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabGeneralListado").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    cambiarTabListar() {
      document.getElementById("tabGeneralRegistrar").className = "active";
      document.getElementById("registrarTab").className = "tab-pane";
      document.getElementById("tabGeneralListado").className = "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    cambiarValorCheckbox() {
      if (this.estadoEnvioInfo) {
        this.persona.estadoEnvioInfo = 1;
      } else {
        this.persona.estadoEnvioInfo = 0;
      }
    },
    registrarColegiado() {
      let valida = false;
      if (this.persona.dni == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.dni.focus();
        });
      } else if (this.persona.cqfll == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.cqfll.focus();
        });
      }
      // else if (this.persona.ruc == "") {
      //   this.showAdvertise = true;
      //   valida = true;
      //   setTimeout(() => {
      //     this.$refs.ruc.focus();
      //   });
      // }
      else if (this.persona.idTipoPersona == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idTipoPersona.focus();
        });
      } else if (this.persona.idModalidad == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idModalidad.focus();
        });
      } else if (this.persona.idPais == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idPais.$el.focus();
        });
      } else if (this.persona.idDistrito == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idDistrito.$el.focus();
        });
      } else if (this.persona.idZona == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idZona.$el.focus();
        });
      } else if (this.persona.apellidoPaterno == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.apellidoPaterno.focus();
        });
      } else if (this.persona.apellidoMaterno == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.apellidoMaterno.focus();
        });
      } else if (this.persona.nombres == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nombres.focus();
        });
      } else if (this.persona.estadoCivil == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.estadoCivil.focus();
        });
      } else if (this.persona.sexo == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.sexo.focus();
        });
      } else if (this.persona.fechaNacimiento == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fechaNacimiento.focus();
        });
      } else if (this.persona.grupoSanguineo == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.grupoSanguineo.focus();
        });
      } else if (this.persona.discapacitado == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.discapacitado.focus();
        });
      } else if (this.persona.fomafAfiliado == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fomafAfiliado.focus();
        });
      }
      // else if (this.persona.fechaIngreso == "") {
      //     this.showAdvertise = true;
      //     valida = true;
      //     setTimeout(() => {
      //         this.$refs.fechaIngreso.focus();
      //     });
      // }
      else if (this.persona.correo == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.correo.focus();
        });
      } else if (this.persona.celular == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.celular.focus();
        });
      } else if (this.persona.direccion == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.direccion.focus();
        });
      } else if (this.persona.referencia == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.referencia.focus();
        });
      } else if (this.persona.fechaColegiatura == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fechaColegiatura.focus();
        });
      }

      return valida;
    },
    registrarProfesional() {
      let valida = false;

      if (this.profesional.idEspecialidad == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idEspecialidad.$el.focus();
        });
      } else if (this.profesional.idInstituto == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idInstituto.focus();
        });
      }
      // else if (this.profesional.fechaEgreso == "") {
      //   this.showAdvertise = true;
      //   valida = true;
      //   setTimeout(() => {
      //     this.$refs.fechaEgreso.focus();
      //   });
      // }
      else if (this.profesional.fechaTitulacion == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fechaTitulacion.focus();
        });
      } else if (this.profesional.nTitulo == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nTitulo.focus();
        });
      }
      // else if (this.profesional.minsa_fecha == '') {
      //     this.showAdvertise = true;
      //     valida = true;
      //     setTimeout(() => {
      //         this.$refs.minsa_fecha.focus();
      //     });
      // }

      return valida;
    },
    clickTab(tabName) {
      this.tabName = tabName;

      if (tabName == "Basico" || tabName == "Profesional") {
        this.styleButtonGen = "";
      } else {
        this.styleButtonGen = "display:none";
      }
    },
    openDocumentFile() {
      if (this.documentation.nombre != "") {
        const inputFile = document.getElementById("files");
        inputFile.click();
      } else {
        global._mensaje_advertencia("Debe llenar el nombre del documento.");
      }
    },
    addNewFileImage() {
      const inputFile = document.getElementById("file_image");
      inputFile.click();
    },
    previsalizarImage: function (evt) {
      var files = evt.target.files; // FileList object
      //Obtenemos la imagen del campo "file".
      for (var i = 0, f; (f = files[i]); i++) {
        //Solo admitimos imágenes.
        if (!f.type.match("image.*")) {
          continue;
        }
        var reader = new FileReader();
        reader.onload = (function (theFile) {
          return function (e) {
            // Creamos la imagen.
            document.getElementById("viewImage").innerHTML = [
              '<img class="thumb" src="',
              e.target.result,
              '" title="',
              escape(theFile.name),
              '"  width="250" height="200" />',
            ].join("");
          };
        })(f);
        reader.readAsDataURL(f);
      }
    },
    setupFileInputImage() {
      document
        .getElementById("file_image")
        .addEventListener("change", this.fileImageUpload, false);
    },
    fileImageUpload(evt) {
      this.image_files = evt.target.files[0];
      this.previsalizarImage(evt);
      ///this.colegiado.urlFoto = evt.target.files[0];
    },
    setupFileInput() {
      document
        .getElementById("files")
        .addEventListener("change", this.fileUpload, false);
    },
    fileUpload(evt) {
      this.documentation.nombrearchivo = evt.target.files[0].name;
      this.documentation.archivo = evt.target.files[0];
    },
    addDocumentFile: async function () {
      if (this.persona.id != 0) {
        this.documentation.idPersona = this.persona.id;
        let res = await this.AgregarDocumento(this.documentation);
        if (res?.exito) {
          this.listarDocumento(this.persona.id);
          global._mensaje_exito("Los cambios se han guardado correctamente");
        }
        this.documentation = {};
      } else {
        global._mensaje_advertencia(
          "Los datos básicos se encuentran vacíos, por favor verificar, gracias."
        );
      }
    },
    generarDiplomaDuplicada: async function () {
      global._swal_pregunta(
        "¿Está seguro que desea generar Duplicado de la Diploma?",

        async () => {
          if (this.persona.id != 0) {
            let idPersona = this.persona.id;
            let res = await this.GenerarDiplomaColegiado(idPersona);
            if (res?.exito) {
              this.listarDocumento(this.persona.id);
              global._mensaje_exito(
                "Los cambios se han guardado correctamente"
              );
            }
          } else {
            global._mensaje_advertencia(
              "Los datos básicos se encuentran vacíos, por favor verificar, gracias."
            );
          }
        },
        "Advertencia"
      );
    },
    addFotoColegiado: async function () {
      const fotoColegiado = {
        idPersona: this.persona.id,
        archivo: this.image_files,
      };
      let res = await this.AgregarFoto(fotoColegiado);
      if (res?.exito) {
        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    editStudies(studies, index) {
      ///console.log(studies.datos);
      /* id: 0,
                idPersona: 0,
                idGrado: 0,
                idInstituto: 0,
                idEspecialidad: 0,
                idUsuario: 1*/
      // this.studiesSelect.id = studies.id;
      // this.studiesSelect.idPersona = studies.idPersona;
      // this.studiesSelect.idGrado = studies.idGrado;
      // this.studiesSelect.idInstituto = studies.idInstituto;
      this.studiesSelect = studies;

      this.indiceEdit = index;
    },
    editCertificates(certificates, index) {
      this.certificatesSelect = certificates;
      this.indiceEdit = index;
    },
    editLaborCenters(laborCenters, index) {
      this.laborCentersSelect = laborCenters;
      this.indiceEdit = index;
    },
    editFamily(family, index) {
      this.familySelect = family;
      this.indiceEdit = index;
    },
    CloseStudies() {
      this.studiesSelect = null;
      this.indiceEdit = -1;
    },
    CloseCertificates() {
      this.certificatesSelect = null;
      this.indiceEdit = -1;
    },
    CloseLaborCenter() {
      this.laborCentersSelect = null;
      this.indiceEdit = -1;
    },
    CloseFamily() {
      this.familySelect = null;
      this.indiceEdit = -1;
    },
    addStudies: async function (studies) {
      let res = null;
      if (this.persona.id != 0) {
        if (this.indiceEdit == -1) {
          this.estudio.id = 0;
          this.estudio.idPersona = this.persona.id;
          this.estudio.idGrado = studies.idGrado;
          this.estudio.idEspecialidad = studies.idEspecialidad;
          this.estudio.idInstituto = studies.idInstituto;
          this.estudio.instituto = studies.instituto;
          this.estudio.fechaFinalizacion = studies.fechaFinalizacion;
          this.estudio.nRegistro = studies.nRegistro;
          this.estudio.especialidad = studies.especialidad;
          res = await this.AgregarAcademicoEstudio(this.estudio);
          //this.studies.push(studies);
        } else {
          //this.studies[this.indiceEdit] = studies;
          this.estudio.id = studies.id;
          this.estudio.idPersona = this.persona.id;
          this.estudio.idGrado = studies.idGrado;
          this.estudio.idEspecialidad = studies.idEspecialidad;
          this.estudio.especialidad = studies.especialidad;
          this.estudio.idInstituto = studies.idInstituto;
          this.estudio.instituto = studies.instituto;
          this.estudio.fechaFinalizacion = studies.fechaFinalizacion;
          this.estudio.nRegistro = studies.nRegistro;

          ///console.log(studies.especialidad);
          res = await this.ModificarEstudio(this.estudio);
          this.indiceEdit = -1;
        }
        if (res?.exito) {
          this.listarAcademicoEstudio(this.persona.id);
          global._mensaje_exito("Los cambios se han guardado correctamente");
        }
        this.studiesSelect = null;
        var modal = bootstrap.Modal.getInstance(
          document.getElementById("modalAddStudies")
        );
        modal.hide();
      } else {
        global._mensaje_advertencia(
          "Los datos básicos se encuentran vacíos, por favor verificar, gracias."
        );
      }
    },
    deleteStudies: async function (item, index) {
      this.estudio = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarEstudio(this.estudio);
          if (res?.exito) {
            this.listarAcademicoEstudio(this.persona.id);
            this.estudio = { ...this.estudioBase };
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    deleteDocumentFile: async function (item, index) {
      this.documentation = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarDocumento(this.documentation);
          if (res?.exito) {
            this.listarDocumento(this.persona.id);
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    addLaborCenter: async function (laborCenters) {
      let res = null;
      if (this.persona.id != 0) {
        if (this.indiceEdit == -1) {
          this.laboral.id = 0;
          this.laboral.idPersona = this.persona.id;
          this.laboral.idCentroLaboral = laborCenters.idCentroLaboral;
          this.laboral.centroLaboral = laborCenters.centroLaboral;
          this.laboral.idSectorLaboral = laborCenters.idSectorLaboral;
          this.laboral.sectorLaboral = laborCenters.sectorLaboral;
          this.laboral.idCargo = laborCenters.idCargo;
          this.laboral.cargo = laborCenters.cargo;
          this.laboral.fechaIngreso = laborCenters.fechaIngreso;
          this.laboral.fechaCulminacion = laborCenters.fechaCulminacion;
          res = await this.AgregarLaboral(this.laboral);
          //this.laborCenters.push(laborCenters);
        } else {
          //this.laborCenters[this.indiceEdit] = laborCenters;
          this.laboral.id = laborCenters.id;
          this.laboral.idPersona = this.persona.id;
          this.laboral.idCentroLaboral = laborCenters.idCentroLaboral;
          this.laboral.centroLaboral = laborCenters.centroLaboral;
          this.laboral.idSectorLaboral = laborCenters.idSectorLaboral;
          this.laboral.sectorLaboral = laborCenters.sectorLaboral;
          this.laboral.idCargo = laborCenters.idCargo;
          this.laboral.cargo = laborCenters.cargo;
          this.laboral.fechaIngreso = laborCenters.fechaIngreso;
          this.laboral.fechaCulminacion =
            laborCenters.fechaCulminacion == ""
              ? null
              : laborCenters.fechaCulminacion;
          res = await this.ModificarLaboral(this.laboral);
          this.indiceEdit = -1;
        }
        if (res?.exito) {
          ///this.listarLaboral(this.colegiado.id);
          this.listarLaboral(this.persona.id);
          global._mensaje_exito("Los cambios se han guardado correctamente");
        }
        this.laborCentersSelect = null;
        var modal = bootstrap.Modal.getInstance(
          document.getElementById("modalAddLaborCenter")
        );
        modal.hide();
      } else {
        global._mensaje_advertencia(
          "Los datos básicos se encuentran vacíos, por favor verificar, gracias."
        );
      }
    },
    deleteLaboralCenters: async function (item, index) {
      this.laboral = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarLaboral(this.laboral);
          if (res?.exito) {
            this.listarLaboral(this.persona.id);
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    addCertificate: async function (certificates) {
      let res = null;
      if (this.persona.id != 0) {
        if (this.indiceEdit == -1) {
          this.certificado.id = 0;
          this.certificado.idPersona = this.persona.id;
          this.certificado.idInstitucion = certificates.idInstitucion;
          this.certificado.institucion = certificates.institucion;
          this.certificado.fecha = certificates.fecha;
          this.certificado.vigencia = certificates.vigencia;
          this.certificado.horas = certificates.horas;
          this.certificado.creditos = certificates.creditos;
          this.certificado.registros = certificates.registros;
          this.certificado.modalidad = certificates.modalidad;
          this.certificado.mencion = certificates.mencion;
          res = await this.AgregarAcademicoCertificado(this.certificado);
          //this.certificates.push(certificates);
        } else {
          ///this.certificates[this.indiceEdit] = certificates;
          this.certificado.id = certificates.id;
          this.certificado.idPersona = this.persona.id;
          this.certificado.idInstitucion = certificates.idInstitucion;
          this.certificado.institucion = certificates.institucion;
          this.certificado.fecha = certificates.fecha;
          this.certificado.vigencia = certificates.vigencia;
          this.certificado.horas = certificates.horas;
          this.certificado.creditos = certificates.creditos;
          this.certificado.registros = certificates.registros;
          this.certificado.modalidad = certificates.modalidad;
          this.certificado.mencion = certificates.mencion;
          res = await this.ModificarCertificado(this.certificado);
          this.indiceEdit = -1;
        }
        if (res?.exito) {
          //this.listarAcademicoCertificado(this.estudio.idPersona);
          this.listarAcademicoCertificado(this.persona.id);
          global._mensaje_exito("Los cambios se han guardado correctamente");
        }
        this.certificatesSelect = null;
        var modal = bootstrap.Modal.getInstance(
          document.getElementById("modalAddCertificates")
        );
        modal.hide();
      } else {
        global._mensaje_advertencia(
          "Los datos básicos se encuentran vacíos, por favor verificar, gracias."
        );
      }
    },
    deleteCertificates: async function (item, index) {
      this.certificado = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarCertificado(this.certificado);
          if (res?.exito) {
            this.certificado = { ...this.certificadoBase };
            this.listarAcademicoCertificado(this.persona.id);
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    addFamily: async function (family) {
      let res = null;
      if (this.persona.id != 0) {
        if (this.indiceEdit == -1) {
          this.familia.id = 0;
          this.familia.idPersona = this.persona.id;
          this.familia.idTipoDocumento = family.idTipoDocumento;
          this.familia.documentoIdentidad = family.documentoIdentidad;
          this.familia.nombre = family.nombre;
          this.familia.apellido = family.apellido;
          this.familia.estadoFamilia = family.estadoFamilia;
          this.familia.fechaNacimiento = family.fechaNacimiento;
          this.familia.parentesco = family.parentesco;
          this.familia.beneficioFomaf = family.beneficioFomaf;
          res = await this.AgregarFamiliar(this.familia);
          //this.family.push(family);
        } else {
          //this.family[this.indiceEdit] = family;
          this.familia.id = family.id;
          this.familia.idPersona = this.persona.id;
          this.familia.idTipoDocumento = family.idTipoDocumento;
          this.familia.documentoIdentidad = family.documentoIdentidad;
          this.familia.nombre = family.nombre;
          this.familia.apellido = family.apellido;
          this.familia.estadoFamilia = family.estadoFamilia;
          this.familia.fechaNacimiento = family.fechaNacimiento;
          this.familia.parentesco = family.parentesco;
          this.familia.beneficioFomaf = family.beneficioFomaf;
          res = await this.ModificarFamiliar(this.familia);
          this.indiceEdit = -1;
        }
        if (res?.exito) {
          this.listarFamiliar(this.persona.id);
          global._mensaje_exito("Los cambios se han guardado correctamente");
        }
        this.familySelect = null;
        var modal = bootstrap.Modal.getInstance(
          document.getElementById("modalAddFamily")
        );
        modal.hide();
      } else {
        global._mensaje_advertencia(
          "Los datos básicos se encuentran vacíos, por favor verificar, gracias."
        );
      }
    },
    deleteFamily: async function (item, index) {
      this.familia = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarFamiliar(this.familia);
          if (res?.exito) {
            this.listarFamiliar(this.persona.id);
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    addSports: async function () {
      let res = null;
      if (this.persona.id != 0) {
        if (
          this.sportSelect.idDeporte != null &&
          this.sportSelect.nivel != null
        ) {
          if (this.indiceEdit == -1) {
            this.deporte.id = 0;
            this.deporte.idPersona = this.persona.id;
            if (this.newOptionDeporte == true) {
              this.deporte.idDeporte = null;
            } else {
              this.deporte.idDeporte = this.sportSelect.idDeporte;
              this.deporte.deporte = null;
            }
            this.deporte.nivel = this.sportSelect.nivel;
            res = await this.AgregarDeporte(this.deporte);
            ///this.listSports.push(this.sportSelect);
          } else {
            //this.listSports[this.indiceEdit] = this.sportSelect;
            this.deporte.id = this.sportSelect.id;
            this.deporte.idPersona = this.persona.id;
            if (this.newOptionDeporte == true) {
              this.deporte.idDeporte = null;
            } else {
              this.deporte.idDeporte = this.sportSelect.idDeporte;
              this.deporte.deporte = null;
            }
            this.deporte.nivel = this.sportSelect.nivel;
            res = await this.ModificarDeporte(this.deporte);
            this.indiceEdit = -1;
          }
          if (res?.exito) {
            this.listarDeporte(this.persona.id);
            this.comboDeporteActividad();
            global._mensaje_exito("Los cambios se han guardado correctamente");
          }
          this.sportSelect.idDeporte = null;
          this.sportSelect.nivel = null;
          this.newOptionDeporte = false;
        } else {
          global._mensaje_advertencia("Debe seleccionar el deporte y nivel.");
        }
      } else {
        global._mensaje_advertencia(
          "Los datos básicos se encuentran vacíos, por favor verificar, gracias."
        );
      }
    },
    deleteSports: async function (item, index) {
      this.deporte = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarDeporte(this.deporte);
          if (res?.exito) {
            this.deporte = { ...this.deporteBase };
            this.listarDeporte(this.persona.id);
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    editSports(sports, index) {
      this.indiceEdit = index;
      this.sportSelect = sports;
    },

    loadColegiado: function (nuevo) {
      this.persona = { ...this.personaBase };
      this.persona.fechaColegiatura = dayjs(this.date).format("YYYY-MM-DD");
      this.edad_colegiado = 0;
      this.obtenerCqfTempGet();
      this.profesional = { ...this.profesionalBase };
      this.estudio = { ...this.estudioBase };
      this.certificado = { ...this.certificadoBase };
      this.laboral = { ...this.laboralBase };
      this.familia = { ...this.familiaBase };
      this.deporte = { ...this.deporteBase };
      this.documentation = { ...this.documentationBase };

      if (nuevo) {
        this.studies = [];
        this.certificates = [];
        this.laborCenters = [];
        this.family = [];
        this.listSports = [];
        this.document_files = [];

        this.familySelect = null;
        this.studiesSelect = null;
        this.certificatesSelect = null;
        this.laborCentersSelect = null;

        this.sportSelect.idDeporte = null;
        this.sportSelect.nivel = null;
        this.estadoEnvioInfo = "";
        this.fechaEgreso = "";

        this.indiceEdit = -1;

        this.limpiarCombosDocimicilioNacimiento();
      }

      this.condicion_persona = "-";
      this.movimiento_persona = "-";
      this.estado_persona = "-";

      this.indiceModificando = -1;
    },
    nuevoColegiado: function () {
      this.loadColegiado(true);
      this.cambiarTab();
    },
    cargarVer: function (item, index) {
      this.cargando = true;
      this.image_files = "";
      this.cqfll = null;
      this.cambiarTab();
      this.obtenerColegiado(item.id);
      this.listarProfesional(item.id);
      this.listarAcademicoEstudio(item.id);
      this.listarAcademicoCertificado(item.id);
      this.listarLaboral(item.id);
      this.listarFamiliar(item.id);
      this.listarDeporte(item.id);
      this.listarDocumento(item.id);
      this.indiceModificando = index;
      this.cargando = false;
    },
    cargarVerPersonaExterna: function (item, index) {
      this.cargando = true;
      this.image_files = "";
      //this.cqfll = null;
      this.cambiarTab();
      this.obtenerColegiado(item.id);
      this.listarProfesional(item.id);
      this.listarAcademicoEstudio(item.id);
      this.listarAcademicoCertificado(item.id);
      this.listarLaboral(item.id);
      this.listarFamiliar(item.id);
      this.listarDeporte(item.id);
      this.listarDocumento(item.id);
      this.indiceModificando = index;
      this.cargando = false;
    },
    cargarEliminar: async function (item, index) {
      this.documento = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarDocumento(this.documento);
          if (res?.exito) {
            this.cargarDocumentos();
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    guardarColegiado() {
      if (this.tabName == "Basico") {
        let valor = this.registrarColegiado();
        if (!valor) {
          this.guardarColegiadoBasico();
        }
      } else if (this.tabName == "Profesional") {
        let valor = this.registrarProfesional();
        if (!valor) {
          this.guardarColegiadoProfesional();
        }
      }
    },
    guardarColegiadoBasico: async function () {
      var res = null;
      if (this.indiceModificando == -1 && this.persona.id == 0) {
        res = await this.AgregarColegiado(this.persona);
        this.persona.id = res.datos.id;
      } else {
        res = await this.ModificarColegiado(this.persona);
      }
      if (res?.exito) {
        this.listarColegiados();
        this.listarDocumento(this.persona.id);
        if (this.image_files != "") {
          this.addFotoColegiado();
        }
        this.showAdvertise = false;
        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    validaOptionProfesional() {
      if (this.newOptionEspecialidad == true) {
        this.profesional.idEspecialidad = null;
      } else {
        this.profesional.especialidad = null;
      }

      if (this.newOptionInstitucion == true) {
        this.profesional.idInstituto = null;
      } else {
        this.profesional.instituto = null;
      }
    },
    guardarColegiadoProfesional: async function () {
      let res = null;
      if (this.persona.id != 0) {
        if (this.profesional.id == 0) {
          this.profesional.idPersona = this.persona.id;
          this.validaOptionProfesional();
          res = await this.AgregarProfesional(this.profesional);
        } else {
          this.validaOptionProfesional();
          res = await this.ModificarProfesional(this.profesional);
        }

        if (res?.exito) {
          this.profesional.id = res.datos.id;
          this.newOptionEspecialidad = false;
          this.newOptionInstitucion = false;
          this.comboEspecialidad();
          this.comboUniversidad();
          this.listarProfesional(this.persona.id);
          global._mensaje_exito("Los cambios se han guardado correctamente");
        }
      } else {
        global._mensaje_advertencia(
          "Los datos básicos se encuentran vacíos, por favor verificar, gracias."
        );
      }
    },
    listarColegiados: async function (pagina = 1) {
      this.buscador.page_index = pagina;

      this.buscador.postulante = this.incluyepostulantes;

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
      var res = await this.ListarColegiadosNew(this.buscador);
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
    listarAcademicoEstudio: async function (idPersona) {
      this.filtroTabs.idPersona = idPersona;
      var res = await this.ListarAcademicoEstudio(this.filtroTabs);
      this.studies = res.map((el) => ({
        ...el,
        fechaFinalizacionLista: dayjs(el.fechaFinalizacion).format(
          "DD-MM-YYYY"
        ),
      }));
    },
    listarAcademicoCertificado: async function (idPersona) {
      this.filtroTabs.idPersona = idPersona;
      var res = await this.ListarAcademicoCertificado(this.filtroTabs);
      this.certificates = res.map((el) => ({
        ...el,
        fechaLista: dayjs(el.fecha).format("DD-MM-YYYY"),
        vigenciaLista: dayjs(el.vigencia).format("DD-MM-YYYY"),
      }));
    },
    listarLaboral: async function (idPersona) {
      this.filtroTabs.idPersona = idPersona;
      var res = await this.ListarLaboral(this.filtroTabs);
      this.laborCenters = res.map((el) => ({
        ...el,
        fechaIngresoLista: dayjs(el.fechaIngreso).format("DD-MM-YYYY"),
        fechaCulminacionLista:
          el.fechaCulminacion != null
            ? dayjs(el.fechaCulminacion).format("DD-MM-YYYY")
            : "",
      }));
    },
    listarFamiliar: async function (idPersona) {
      this.filtroTabs.idPersona = idPersona;
      var res = await this.ListarFamiliar(this.filtroTabs);
      this.family = res.map((el) => ({
        ...el,
        fechaNacimientoLista: dayjs(el.fechaNacimiento).format("DD-MM-YYYY"),
        beneficioFomafDesc: el.beneficioFomaf == 0 ? "NO" : "SI",
      }));
    },
    listarDeporte: async function (idPersona) {
      this.filtroTabs.idPersona = idPersona;
      var res = await this.ListarDeporteActividad(this.filtroTabs);
      this.listSports = res;
    },
    listarDocumento: async function (idPersona) {
      this.filtroTabs.idPersona = idPersona;
      var res = await this.ListarDocumento(this.filtroTabs);
      this.document_files = res;
    },
    listarProfesional: async function (idPersona) {
      this.filtroTabs.idPersona = idPersona;
      let res = await this.ListarProfesional(this.filtroTabs);
      if (res.length > 0) {
        res.forEach((datos) => {
          this.profesional.id = datos.id;
          this.profesional.idPersona = datos.idPersona;
          this.profesional.idEspecialidad = datos.idEspecialidad;
          this.profesional.idInstituto = datos.idInstituto;
          this.fechaEgreso = datos.fechaEgreso;
          this.profesional.fechaTitulacion = datos.fechaTitulacion;
          this.profesional.nTitulo = datos.nTitulo;
          this.profesional.folio = datos.folio;
          this.profesional.hoja = datos.hoja;
          this.profesional.resolucionRectoral = datos.resolucionRectoral;
          this.profesional.minsa_codigo = datos.minsa_codigo;
          this.profesional.minsa_nRegistro = datos.minsa_nRegistro;
          this.profesional.minsa_fecha = datos.minsa_fecha;
          this.profesional.sunedu = datos.sunedu;
        });
      } else {
        this.profesional.id = 0;
        this.profesional.idPersona = 0;
        this.profesional.idEspecialidad = 0;
        this.profesional.idInstituto = 0;
        this.fechaEgreso = "";
        this.profesional.fechaTitulacion = "";
        this.profesional.nTitulo = "";
        this.profesional.folio = "";
        this.profesional.hoja = "";
        this.profesional.resolucionRectoral = "";
        this.profesional.minsa_codigo = "";
        this.profesional.minsa_nRegistro = "";
        this.profesional.minsa_fecha = null;
        this.profesional.sunedu = "";
      }
    },
    obtenerCqfTempGet: async function () {
      let res = await this.CorrelativoCqfTempGet();
      if (res != null) {
        this.cqfll_temp = res.var_cqf_temp;
      }
    },
    verificarColegiadoDNI: async function () {
      if (this.persona.dni.length == 8) {
        let persona = {
          dni: this.persona.dni,
        };
        let res = await this.ObtenerColegiadoAll(persona);
        let colegiado = false;
        if (res.length > 0) {
          res.forEach((datos) => {
            if (datos.cqfll_temp != null || datos.cqfll != null) {
              colegiado = true;
              this.btnGuardar = true;
              global._mensaje_advertencia(
                "Colegiado se encuentra registrado, por favor realice la seleccion en el listado, gracias."
              );
              document.getElementById("tabGeneralRegistrar").className = "";
              document.getElementById("registrarTab").className = "tab-pane";
              document.getElementById("tabGeneralListado").className = "active";
              document.getElementById("listadoTab").className =
                "tab-pane active";
              return;
            } else if (colegiado == false) {
              this.btnGuardar = false;
              this.cargarVerPersonaExterna(datos, 1);
              global._mensaje_advertencia(
                "Se encuentra registrado como persona externa, completar su registro para colegiado."
              );
            }
          });
        } else {
          global._mensaje_advertencia(
            "Registro Nuevo, completar su registro para colegiado."
          );
          let dniPersona = this.persona.dni;
          this.nuevoColegiado();
          this.persona.dni = dniPersona;
          this.btnGuardar = false;
        }
      }
    },
    obtenerColegiado: async function (idPersona) {
      let persona = {
        id: idPersona,
        dni: null,
        cqf: "",
      };
      let res = await this.ObtenerColegiado(persona);
      this.persona.id = res.id;
      this.persona.idTipoPersona = res.idTipoPersona;
      this.persona.idModalidad = res.idModalidad;

      if (this.persona.idModalidad == 2) {
        this.disabledColegioCQF = false;
        this.comboColegio();
      } else {
        this.colegioCQFDesplegable = [];
        this.disabledColegioCQF = true;
      }

      this.persona.idColegioCQF = res.idColegioCQF;

      this.persona.idPais = res.idPais;
      this.persona.dni = res.dni;
      this.persona.ruc = res.ruc;
      this.persona.cqfll = res.cqfll;
      this.persona.apellidoPaterno = res.apellidoPaterno;
      this.persona.apellidoMaterno = res.apellidoMaterno;
      this.persona.nombres = res.nombres;
      this.persona.estadoCivil = res.estadoCivil;
      this.persona.sexo = res.sexo;
      this.persona.fechaNacimiento = res.fechaNacimiento;
      this.persona.grupoSanguineo = res.grupoSanguineo;
      this.persona.discapacitado = res.discapacitado;
      this.persona.fomafAfiliado = res.fomafAfiliado;
      //this.persona.fechaIngreso = res.fechaIngreso;
      this.persona.fechaColegiatura =
        res.fechaColegiatura == null || res.fechaColegiatura == ""
          ? dayjs(this.date).format("YYYY-MM-DD")
          : res.fechaColegiatura;
      this.persona.correo = res.correo;
      this.persona.correoAlternativo = res.correoAlternativo;
      this.persona.estadoEnvioInfo = res.estadoEnvioInfo;

      if (res.estadoEnvioInfo == 0) {
        this.estadoEnvioInfo = false;
      } else if (res.estadoEnvioInfo == 1) {
        this.estadoEnvioInfo = true;
      }
      this.rutaFiles = this.iprutaFiles;
      this.persona.urlFoto = res.urlFoto;
      this.persona.telefono = res.telefono;
      this.persona.celular = res.celular;
      this.persona.celularCorporativo = res.celularCorporativo;
      this.persona.direccion = res.direccion;
      this.persona.referencia = res.referencia;
      this.persona.observacion = res.observacion;

      this.idDepartamentoNacimiento = res.nacimiento_idDepartamento;
      this.cargarProvincia(res.nacimiento_idDepartamento);
      this.idProvinciaNacimiento = res.nacimiento_idProvincia;
      this.cargarDistrito(res.nacimiento_idProvincia);
      this.persona.idDistrito = res.idDistrito;

      this.idDepartamentoDomicilio = res.domicilio_idDepartamento;
      this.cargarProvinciaDomicilio(res.domicilio_idDepartamento);
      this.idProvinciaDomicilio = res.domicilio_idProvincia;
      this.cargarDistritoDomicilio(res.domicilio_idProvincia);
      this.idDistritoDomicilio = res.domicilio_idDistrito;
      this.cargarZonaDomicilio(res.domicilio_idDistrito);
      this.persona.idZona = res.idZona;

      this.cqfll_temp =
        res.cqfll_temp == null || res.cqfll_temp == ""
          ? this.cqfll_temp
          : res.cqfll_temp;

      this.condicion_persona = res.estadoColegiado;
      this.movimiento_persona = res.transferencia;

      if (res.fallecimiento == null) {
        this.estado_persona = "Vivo";
      } else {
        this.estado_persona = "Fallecido";
      }
      this.btnGuardar = false;

      this.edad_colegiado = res.edad;
    },
    comboPais: async function () {
      var res = await this.PaisDesplegable();
      //this.paisDesplegable = res;
      this.paisDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
    },
    comboEspecialidad: async function () {
      var res = await this.EspecialidadDesplegable();
      this.especialidadDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
      //this.especialidadDesplegable = res;
    },
    // comboCargo: async function () {
    //   var res = await this.CargoDesplegable();
    //   this.cargoDesplegable = res;
    // },
    comboDepartamento: async function () {
      var res = await this.DepartamentoDesplegable();
      this.departamentoDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
      //this.departamentoDesplegable = res;
    },
    comboProvincia: async function (idDepartamento) {
      let buscador = {
        idDepartamento: idDepartamento,
      };
      var res = await this.ProvinciaDesplegable(buscador);
      this.provinciaDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
      //this.provinciaDesplegable = res;
    },
    comboColegio: async function () {
      var res = await this.ColegioCQFDesplegable();
      this.colegioCQFDesplegable = res;
    },
    comboProvinciaDomicilio: async function (idDepartamento) {
      let buscador = {
        idDepartamento: idDepartamento,
      };
      var res = await this.ProvinciaDesplegable(buscador);
      //this.provinciaDesplegableDomicilio = res;
      this.provinciaDesplegableDomicilio = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
    },
    comboDistrito: async function (idProvincia) {
      let buscador = {
        idProvincia: idProvincia,
      };
      var res = await this.DistritoDesplegable(buscador);
      //this.distritoDesplegable = res;
      this.distritoDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
    },
    comboDistritoDomicilio: async function (idProvincia) {
      let buscador = {
        idProvincia: idProvincia,
      };
      var res = await this.DistritoDesplegable(buscador);
      ///this.distritoDesplegableDomicilio = res;
      this.distritoDesplegableDomicilio = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
    },
    comboZona: async function (idDistrito) {
      let buscador = {
        idDistrito: idDistrito,
      };
      var res = await this.ZonaDesplegable(buscador);
      //this.zonaDesplegable = res;
      this.zonaDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
    },
    comboUniversidad: async function () {
      var res = await this.InstitucionDesplegable();
      this.institucionDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
      //this.institucionDesplegable = res;
    },
    comboDeporteActividad: async function () {
      var res = await this.DeporteActividadDesplegable();
      this.deporteActividadDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
      //this.deporteActividadDesplegable = res;
    },
    comboTipoColegiado: async function () {
      var res = await this.TipoColegiadoDesplegable();
      this.tipocolegiadoDesplegable = res;
    },
    comboModalidad: async function () {
      var res = await this.ModalidadDesplegable();
      this.modalidadDesplegable = res;
    },
    cambiarPagina: function (paginaDestino) {
      this.listarColegiados(paginaDestino);
    },
  },
  mounted() {
    this.loadColegiado(false);
    this.listarColegiados();
    this.comboPais();
    this.comboEspecialidad();
    //this.comboCargo();
    this.comboDepartamento();
    // this.comboProvincia(0);
    // this.comboProvinciaDomicilio(0);
    // this.comboDistrito(0);
    // this.cargarDistritoDomicilio(0);
    // this.comboZona(0);
    this.comboUniversidad();
    this.comboDeporteActividad();
    this.comboTipoColegiado();
    this.comboModalidad();

    // this.listarAcademicoEstudio(this.persona.id);
    // this.listarAcademicoCertificado(this.persona.id);
    // this.listarLaboral(this.persona.id);
    // this.listarFamiliar(this.persona.id);
    // this.listarDeporte(this.persona.id);

    this.setupFileInput();
    this.setupFileInputImage();

    global._cargar_tooltip("tooltip");
  },
};
</script>
<style lang="css" scoped>
.foto {
  /* border: solid 1px;
    border-radius: 0px 0px 0px 0px; */
  background-color: #dcdcdc;
  width: 160px;
  height: 200px;
  margin: 0 auto;
}
</style>
