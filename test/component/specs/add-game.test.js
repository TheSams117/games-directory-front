import "@testing-library/jest-dom/extend-expect";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import React from "react";
import GameDirectory from "../../../src/game-directory";

test("The game directory component shows the dialog to add a game", () => {
    const { getByTestId } = render(<GameDirectory />);
    expect(screen.getByTestId("button-add")).toBeInTheDocument()
    fireEvent.click(getByTestId("button-add"));
    expect(screen.getByTestId("dialog-main")).toBeInTheDocument();
    expect(screen.getByTestId("title-add-game")).toHaveTextContent("Agregar juego");
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
    expect(screen.getByTestId("textfield-name")).toHaveTextContent("Nombre");
    expect(screen.getByTestId("select-console")).toBeInTheDocument();
    expect(screen.getByTestId("textfield-genre")).toHaveTextContent("Género");
    expect(screen.getByTestId("textfield-img")).toHaveTextContent("Ruta de la imagen");
    expect(screen.getByTestId("button-add-dialog")).toBeInTheDocument();
    expect(screen.getByTestId("button-cancel-dialog")).toBeInTheDocument();
  });