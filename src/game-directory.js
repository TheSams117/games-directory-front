import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useState, useEffect } from "react";
import AddGameDialog from "./add-game-dialog";
import axios from "./utils/axios";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
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
    const [gameSelected, setGameSelected] = useState(null);
    useEffect(() => {
        if (cards.length === 0) {
            getGames();
        }
    }, []);
    const getGames = () => {
        console.log("cargando juegos");
        axios
                .get(
                    `games`
                )
                .then((res) => {
                    console.log(res);
                    if (res.status === 200)
                        setCards(res.data);
                    else console.log(res.status);
                })
                .catch((err) => console.log(err));
    }
    const handleDelete = (idGame) => {

        axios
            .delete(
                `games/${idGame}`,
            )
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log("Juego eliminado con éxito");
                    getGames();
                }

                else console.log(res.status);
            })
            .catch((err) => console.log(err));
    };
    const handleEdit = (game) => {
        setGameSelected(game);


        setOpenEditDialog(true)
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
                        <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
                            Directorio de juegos
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            En esta página podras ver, agregar, editar y eliminar juegos que otros usuarios hayan agregado.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button
                                        id-button="btn-add"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setOpenEditDialog(true)}
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
                                        <Typography>
                                            {card.console}
                                        </Typography>
                                        <Typography>
                                            {card.genre}
                                        </Typography>
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
                        <AddGameDialog
                            title="Agregar juego"
                            message="Ventana para agregar juegos"
                            open={openEditDialog}
                            setOpen={setOpenEditDialog}
                            game={gameSelected}
                        />
                    </Grid>
                </Container>
            </main>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Sergio Lozada - Felipe Castillo
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Derechos reservados
                </Typography>
                <Copyright />
            </footer>
        </React.Fragment>
    );
}