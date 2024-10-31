import { Game } from "./Game";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockData = {
  game: {
    _id: 333,
  },
  characters: [
    {
      _id: 1,
      name: "Poppy",
      image: "poppy.jpg",
    },
    {
      _id: 2,
      name: "Bros",
      image: "bros.png",
    },
    {
      _id: 3,
      name: "Jr",
      image: "jr.jpg",
    },
  ],
};

vi.mock("jwt-decode", () => ({
  jwtDecode: () => mockData,
}));

const mockRoute = [
  {
    path: "/",
    element: <Game />,
    loader: async () => "token",
  },
];

describe("Game page", () => {
  it("renders images and names for characters", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const [images, names] = await Promise.all([
      await screen.findAllByRole("presentation"),
      await screen.findAllByTestId("char-name"),
    ]);
    expect(images.length).toBe(3);
    expect(names.length).toBe(3);
    expect(names[0].textContent).toBe("Poppy");
    expect(images[0]).toHaveAttribute("src", mockData.characters[0].image);
  });

  it("renders a start button for the game", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const startBtn = await screen.findByRole("button", { name: "Start" });
    expect(startBtn).toBeInTheDocument();
  });
});
