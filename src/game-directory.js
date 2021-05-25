import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { GamesController } from "../src/controllers";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 190,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function GameDirectory() {
  const classes = useStyles();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [cards, setCards] = useState([]);
  const [gameName, setGameName] = useState("");
  const [consoleGame, setConsoleGame] = useState("");
  const [gameGenre, setGameGenre] = useState("");
  const [gameImgUrl, setGameImgUrl] = useState("");
  const [gameSelected, setGameSelected] = useState(null);

  useEffect(() => {
    if (cards.length === 0) {
      getGames();
    }
  }, []);

  const getGames = () => {
    console.log("cargando juegos");
    /**axios.get(`games`).then((res) => {
            console.log(res);
            if (res.status === 200) setCards(res.data);
            else console.log(res.status);
        }).catch((err) => console.log(err));*/
    GamesController.list().then((res) => {
        console.log(res);
        if (res.status === 200) setCards(res.data);
        else console.log(res.status);
    }).catch((err) => console.log(err));
  };

  const handleDelete = (idGame) => {
    /**axios
      .delete(`games/${idGame}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Juego eliminado con éxito");
          getGames();
        } else console.log(res.status);
      })
      .catch((err) => console.log(err));*/
      GamesController.delete(idGame).then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Juego eliminado con éxito");
          getGames();
        } else console.log(res.status);
      })
      .catch((err) => console.log(err));
  };

  const handleCreate = () => {
    setGameSelected(null);
    setOpenEditDialog(true);
  };

  const handleEdit = (game) => {
    setGameSelected(game);
    setOpenEditDialog(true);
  };

  const handleClose = () => {
    setOpenEditDialog(false);
  };

  const handleChange = (event) => {
    setConsoleGame(event.target.value);
  };

  const handleSubmit = () => {
    if (gameSelected == null) {
      console.log("crear");
      createGame();
    } else {
      console.log("editar");
      editGame();
    }
  };

  const createGame = () => {
    let data = {
      name: gameName,
      console: consoleGame,
      genre: gameGenre,
      img: gameImgUrl,
    };
    /**axios
      .post(`games`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Juego agregado con éxito");
          getGames();
          restartValues();
          setOpenEditDialog(false);
        } else console.log(res.status);
      })
      .catch((err) => {
        setOpenEditDialog(false);
        // console.log(err)
      });*/
      GamesController.add(data).then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Juego agregado con éxito game directory");
          getGames();
          restartValues();
          setOpenEditDialog(false);
        } else console.log(res.status);
      })
      .catch((err) => {
        setOpenEditDialog(false);
        // console.log(err)
      });
  };

  const editGame = () => {
    let data = {
      id: gameSelected.id,
      name: gameName === "" ? gameSelected.name : gameName,
      console: consoleGame === "" ? gameSelected.console : consoleGame,
      genre: gameGenre === "" ? gameSelected.genre : gameGenre,
      img: gameImgUrl === "" ? gameSelected.img : gameImgUrl,
    };
    /**axios
      .put(`games`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Juego agregado con éxito");
          getGames();
          restartValues();
          setOpenEditDialog(false);
        } else console.log(res.status);
      })
      .catch((err) => {
        setOpenEditDialog(false);
        // console.log(err)
      });*/
      GamesController.update(data).then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Juego editado con éxito");
          getGames();
          restartValues();
          setOpenEditDialog(false);
        } else console.log(res.status);
      })
      .catch((err) => {
        setOpenEditDialog(false);
        // console.log(err)
      });
  };

  const restartValues = () => {
    setGameSelected(null);
    setGameName("");
    setConsoleGame("");
    setGameGenre("");
    setGameImgUrl("");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <SportsEsportsIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Directorio de juegos
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Directorio de juegos
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              En esta página podras ver, agregar, editar y eliminar juegos que
              otros usuarios hayan agregado.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    id-button="btn-add"
                    variant="contained"
                    color="primary"
                    onClick={() => handleCreate()}
                  >
                    Agregar
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card} id={card.id}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.img}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>{card.console}</Typography>
                    <Typography>{card.genre}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      id="btn-edit"
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(card)}
                    >
                      Editar
                    </Button>
                    <Button
                      id="btn-delete"
                      size="small"
                      color="primary"
                      onClick={() => handleDelete(card.id)}
                    >
                      Eliminar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Dialog
              open={openEditDialog}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" disableTypography={true}>
                <Typography variant="h4" color="primary">
                  {gameSelected == null ? "Agregar juego" : "Editar juego"}
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
                      defaultValue={
                        gameSelected == null ? "" : gameSelected.name
                      }
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
                        value={consoleGame}
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
                      defaultValue={
                        gameSelected == null ? "" : gameSelected.genre
                      }
                      onChange={(e) => setGameGenre(e.target.value)}
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="game-name"
                      label="Ruta de la imagen"
                      defaultValue={
                        gameSelected == null ? "" : gameSelected.img
                      }
                      onChange={(e) => setGameImgUrl(e.target.value)}
                      type="text"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSubmit} color="primary">
                  {gameSelected == null ? "Agregar" : "Editar"}
                </Button>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Sergio Lozada - Felipe Castillo
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Derechos reservados
        </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}
