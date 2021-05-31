import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Typography } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import axios from "./utils/axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 190,
  },
}));

const AddGameDialog = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const { open, setOpen, game } = props;
  const [gameName, setGameName] = useState("");
  const [console, setConsole] = useState("");
  const [gameGenre, setGameGenre] = useState("");
  const [gameImgUrl, setGameImgUrl] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setConsole(event.target.value);
  };

  const handleSubmit = () => {
    if (game == null) {
      createGame();
    } else {
      editGame();
    }
  };

  const createGame = () => {
    let data = {
      name: gameName,
      console: console,
      genre: gameGenre,
      img: gameImgUrl,
    };
    axios
      .post(`games`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Juego agregado con éxito game dialog");
          setOpen(false);
        } else console.log(res.status);
      })
      .catch((err) => {
        setOpen(false);
        // console.log(err)
      });
  };

  const editGame = () => {
    let data = {
      name: gameName === "" ? game.name : gameName,
      console: console === "" ? game.console : console,
      genre: gameGenre === "" ? game.genre : gameGenre,
      img: gameImgUrl === "" ? game.img : gameImgUrl,
    };
    axios
      .put(`games`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Juego agregado con éxito");
          setOpen(false);
          history.push("http://localhost:3000/");
        } else console.log(res.status);
      })
      .catch((err) => {
        setOpen(false);
        // console.log(err)
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" disableTypography={true}>
        <Typography variant="h4" color="primary">
          {game == null ? "Agregar juego" : "Editar juego"}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {/* <DialogContentText variant="h4" color="textSecondary">
          {message}
        </DialogContentText> */}
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={6}>
            <TextField
              id="game-name"
              label="Nombre"
              defaultValue={game == null ? "" : game.name}
              onChange={(e) => setGameName(e.target.value)}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-console">Consola</InputLabel>
              <Select
                labelId="select-console"
                id="demo-simple-select"
                value={console}
                onChange={handleChange}
              >
                <MenuItem value={"PC"}>PC</MenuItem>
                <MenuItem value={"Xbox"}>Xbox</MenuItem>
                <MenuItem value={"PlayStation"}>PlayStation</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="game-name"
              label="Género"
              defaultValue={game == null ? "" : game.genre}
              onChange={(e) => setGameGenre(e.target.value)}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="game-name"
              label="Ruta de la imagen"
              defaultValue={game == null ? "" : game.img}
              onChange={(e) => setGameImgUrl(e.target.value)}
              type="text"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          {game == null ? "Agregar" : "Editar"}
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddGameDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  game: PropTypes.any,
};
export default AddGameDialog;
