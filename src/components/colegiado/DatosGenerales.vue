  <template>
    <div class="row">
        <div class="col-md-8 row">
            <div class="col-md-6">
                <div class="form-group">
                    <div class="form-floating">
                        <input type="text" class="form-control" placeholder="DNI" v-model="colegiado.dni">
                        <label>DNI</label>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <div class="form-floating">
                        <input type="text" class="form-control" placeholder="RUC" v-model="colegiado.ruc">
                        <label>RUC</label>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <div class="form-floating">
                        <input type="text" class="form-control" placeholder="Apellido Paterno">
                        <label>Apellido Paterno</label>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <div class="form-floating">
                        <input type="text" class="form-control" placeholder="Apellido Materno">
                        <label>Apellido Materno</label>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <div class="form-floating">
                        <input type="text" class="form-control" placeholder="Nombres">
                        <label>Nombres</label>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <div class="form-floating">
                        <select class="form-control form-select" data-bs-placeholder="Estado Civil">
                            <option value="br">Brazil</option>
                            <option value="cz">Czech Republic</option>
                            <option value="de">Germany</option>
                            <option value="pl">Poland</option>
                        </select>
                        <label>Estado Civil</label>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <div class="form-floating">
                        <select class="form-control form-select" data-bs-placeholder="Sexo">
                            <option value="br">Brazil</option>
                            <option value="cz">Czech Republic</option>
                            <option value="de">Germany</option>
                            <option value="pl">Poland</option>
                        </select>
                        <label>Sexo</label>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <div class="form-floating">
                        <input type="date" class="form-control" placeholder="Fecha Nac.">
                        <label>Fecha Nac.</label>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <div class="form-floating">
                        <select class="form-control form-select" data-bs-placeholder="G. Sanguineo">
                            <option value="br">Brazil</option>
                            <option value="cz">Czech Republic</option>
                            <option value="de">Germany</option>
                            <option value="pl">Poland</option>
                        </select>
                        <label>G. Sanguineo</label>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <div class="form-floating">
                        <select class="form-control form-select" data-bs-placeholder="Discapacitado">
                            <option value="br">Brazil</option>
                            <option value="cz">Czech Republic</option>
                            <option value="de">Germany</option>
                            <option value="pl">Poland</option>
                        </select>
                        <label>Discapacitado</label>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <div class="form-floating">
                        <select class="form-control form-select" data-bs-placeholder="FOMAF">
                            <option value="br">Brazil</option>
                            <option value="cz">Czech Republic</option>
                            <option value="de">Germany</option>
                            <option value="pl">Poland</option>
                        </select>
                        <label>FOMAF</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4"> FOTO </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <select class="form-control form-select" data-bs-placeholder="Estado">
                        <option value="br">Brazil</option>
                        <option value="cz">Czech Republic</option>
                        <option value="de">Germany</option>
                        <option value="pl">Poland</option>
                    </select>
                    <label>Estado</label>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <select class="form-control form-select" data-bs-placeholder="Modalidad">
                        <option value="br">Brazil</option>
                        <option value="cz">Czech Republic</option>
                        <option value="de">Germany</option>
                        <option value="pl">Poland</option>
                    </select>
                    <label>Modalidad</label>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <input type="date" class="form-control" placeholder="Fecha Ingreso">
                    <label>Fecha Ingreso</label>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <input type="date" class="form-control" placeholder="Fecha Colegiatura">
                    <label>Fecha Colegiatura</label>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <input type="text" class="form-control" placeholder="Correo Corporativo">
                    <label>Correo Corporativo</label>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <input type="text" class="form-control" placeholder="Correo Alternativo">
                    <label>Correo Alternativo</label>
                </div>
            </div>
        </div>

    </div>
</template>
  <script>
  export default {
  
      props: {
          value: {
              default: null
          }
      },
      data() {
          return {
              colegiado: this.value
          }
      },
      watch: {
          colegiado(value) {
              this.$emit("input", value);
          },
  
          value(value) {
              this.colegiado = value;
          },
      },
  };
  </script>

                          