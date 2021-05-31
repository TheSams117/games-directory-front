import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import GameDirectory from "../../../src/game-directory";
import { GamesController } from "../../../src/controllers";
import axios from "axios";

/**jest.mock('../../../src/controllers/GamesController', () => ({
  list: jest.fn(() => {return {
    data: [
      {
        id: 1
      }
    ]
  }})
}));

jest.mock('../../../src/controllers/GamesController', () => ({
  list: jest.fn()
}));*/

test("The game directory component shows the title and description of the app", () => {
  render(<GameDirectory />);
  expect(screen.getByTestId("appbar-title-directory")).toHaveTextContent("Directorio de juegos");
  expect(screen.getByTestId("container-title-directory")).toHaveTextContent("Directorio de juegos");
  expect(screen.getByTestId("container-paragraph-directory")).toHaveTextContent(
    "En esta página podras ver, agregar, editar y eliminar juegos que otros usuarios hayan agregado."
  );
  expect(screen.getByRole("button", { name: /Agregar/i })).toBeInTheDocument();
});

/**test('The application shows the game cards with their name, console, genre and an image.', () => {
    render(<GameDirectory />);
    expect(screen.getByTestId("card-main")).toBeInTheDocument();
    expect(screen.getByTestId("card-img")).toBeInTheDocument();
    expect(screen.getByTestId("game-name")).toBeInTheDocument();
    expect(screen.getByTestId("card-console")).toBeInTheDocument();
    expect(screen.getByTestId("card-genre")).toBeInTheDocument();
    expect(screen.getByTestId("card-actions")).toBeInTheDocument();
    expect(screen.getByTestId("card-button-edit", { name: /Editar/i })).toBeInTheDocument();
    expect(screen.getByTestId("card-button-delete", { name: /Eliminar/i })).toBeInTheDocument();
});*/
