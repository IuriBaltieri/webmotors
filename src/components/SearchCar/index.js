import React, { Component } from "react";
import axios from "axios";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckIcon from "@material-ui/icons/CheckBoxOutlined";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

class SearchCar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkNovos: false,
      checkUsados: false,
      selectMarcas: [],
      selectModels: [],
      selectVersions: []
    };

    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
    this.handleChangeMarca = this.handleChangeMarca.bind(this);
    this.handleChangeModelo = this.handleChangeModelo.bind(this);
  }

  componentDidMount() {
    this.populateMakes();
  }

  populateMakes() {
    axios
      .get("http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make")
      .then(resp => {
        this.setState({
          ...this.state,
          selectMarcas: resp.data
        });
      });
  }

  handleChangeCheckBox(e) {
    const target = e.target;
    const name = target.name;

    this.setState(prevState => ({
      [name]: !prevState[name]
    }));
  }

  handleChangeMarca(e) {
    const value = e.target.value;

    axios
      .get(
        `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=${value}`
      )
      .then(resp => {
        this.setState({
          ...this.state,
          selectModels: resp.data
        });
      });
  }

  handleChangeModelo(e) {
    const value = e.target.value;

    axios
      .get(
        `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=${value}`
      )
      .then(resp => {
        this.setState({
          ...this.state,
          selectVersions: resp.data
        });
      });
  }

  render() {
    return (
      <div className="search-car-container">
        <form>
          <Grid container style={{ marginBottom: "7px" }}>
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkNovos"
                    checked={this.state.checkNovos}
                    onChange={this.handleChangeCheckBox}
                    value={this.state.checkNovos}
                    checkedIcon={
                      <CheckIcon
                        color="secondary"
                        style={{ color: "#CA252F" }}
                      />
                    }
                  />
                }
                label="Novos"
              />
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkUsados"
                    checked={this.state.checkUsados}
                    onChange={this.handleChangeCheckBox}
                    value={this.state.checkUsados}
                    checkedIcon={
                      <CheckIcon
                        color="secondary"
                        style={{ color: "#CA252F" }}
                      />
                    }
                  />
                }
                label="Usados"
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginBottom: "17px" }}>
            <Grid item xs={4}>
              <TextField
                defaultValue={`Onde: São Paulo - SP`}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RoomOutlinedIcon htmlColor="#CA252F" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton position="end">
                      <CancelIcon htmlColor="#D3D3D3" />
                    </IconButton>
                  )
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <Select native>
                  <option value={100}>Raio: 100km</option>
                  <option value={200}>Raio: 200km</option>
                  <option value={300}>Raio: 300km</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl
                variant="outlined"
                style={{
                  width: "90%",
                  paddingLeft: "20px"
                }}
              >
                <Select native onChange={this.handleChangeMarca}>
                  <option value={0}>Marca: Todas</option>
                  {this.state.selectMarcas.length > 0 &&
                    this.state.selectMarcas.map((marca, index) => {
                      return (
                        <option key={index} value={marca.ID}>
                          Marca: {marca.Name}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl
                variant="outlined"
                style={{
                  width: "90%",
                  paddingLeft: "20px",
                  marginRight: "20px"
                }}
              >
                <Select native onChange={this.handleChangeModelo}>
                  <option value={0}>Modelo: Todos</option>
                  {this.state.selectModels.length > 0 &&
                    this.state.selectModels.map((model, index) => {
                      return (
                        <option key={index} value={model.ID}>
                          Modelo: {model.Name}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container style={{ marginBottom: "30px" }}>
            <Grid item xs={3}>
              <FormControl
                variant="outlined"
                style={{
                  width: "90%",
                  marginRight: "20px"
                }}
              >
                <Select native>
                  <option value={0}>Ano Desejado</option>
                  <option value={2017}>Ano Desejado: 2017</option>
                  <option value={2018}>Ano Desejado: 2018</option>
                  <option value={2019}>Ano Desejado: 2019</option>
                  <option value={2020}>Ano Desejado: 2020</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl
                variant="outlined"
                style={{
                  width: "100%",
                  marginRight: "20px"
                }}
              >
                <Select native>
                  <option value={0}>Faixa de Preço</option>
                  <option value={16}>Faixa de Preço: R$16Mil</option>
                  <option value={20}>Faixa de Preço: R$20Mil</option>
                  <option value={30}>Faixa de Preço: R$30Mil</option>
                  <option value={50}>Faixa de Preço: R$50Mil</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                style={{
                  width: "95%",
                  paddingLeft: "20px"
                }}
              >
                <Select native>
                  <option value={0}>Versão: Todas</option>
                  {this.state.selectVersions.length > 0 &&
                    this.state.selectVersions.map((versao, index) => {
                      return (
                        <option key={index} value={versao.ID}>
                          Versão: {versao.Name}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Button
                style={{
                  color: "#CA252F",
                  textTransform: "inherit",
                  backgroundColor: "#ffffff"
                }}
              >
                <KeyboardArrowRightIcon style={{ fontSize: "12px" }} />
                Busca Avançada
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                style={{
                  color: "#808080",
                  textTransform: "inherit",
                  backgroundColor: "#ffffff",
                  fontSize: "12px",
                  marginLeft: "10px"
                }}
              >
                Limpar Filtros
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#CA252F",
                  fontSize: "18px",
                  width: "100%",
                  padding: "10px"
                }}
              >
                Ver ofertas
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default SearchCar;
