import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import GameDirectory from "../../../src/game-directory";

test("The game directory component shows the title and description of the app", () => {
  render(<GameDirectory />);
  expect(screen.getByTestId("appbar-title-directory")).toHaveTextContent("Directorio de juegos");
  expect(screen.getByTestId("container-title-directory")).toHaveTextContent("Directorio de juegos");
  expect(screen.getByTestId("container-paragraph-directory")).toHaveTextContent(
    "En esta página podras ver, agregar, editar y eliminar juegos que otros usuarios hayan agregado."
  );
});

test("The application shows the add button to register a new game", () => {
  render(<GameDirectory />);
  expect(screen.getByRole("button", { name: /Agregar/i })).toBeInTheDocument();
});
