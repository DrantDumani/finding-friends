import { GameInstance } from "./GameInstance";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

const mockData = {
  game: {
    _id: 1,
    image: "ripple_star.png",
  },
  iat: (Date.now() - 20000) / 1000,
  characters: [
    {
      _id: "1",
      name: "Miracle",
      image: "miracle_matter.png",
      found: false,
    },
    {
      _id: "2",
      name: "Dark",
      image: "dark_matter.png",
      found: true,
    },
  ],
};

const mockRoute = [
  {
    path: "/",
    element: <GameInstance />,
    loader: async () => mockData,
  },
];

describe("Game Instance", () => {
  it("screen displays characters and names", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const [thumbnails, name] = await Promise.all([
      await screen.findAllByRole("presentation"),
      await screen.findByText("Miracle"),
    ]);
    expect(thumbnails.length).toBe(2);
    expect(thumbnails[0]).toHaveAttribute("src", "miracle_matter.png");
    expect(name.textContent).toBe("Miracle");
  });

  it("displays timer based on when the game started", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const time = await screen.findByText("00:20");
    expect(time).toBeInTheDocument();
  });

  it("displays the image for the game", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const image = await screen.findByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockData.image);
  });

  it.only("pulls up a menu of buttons for the characters a user hasn't found yet on click", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const gameImg = await screen.findByRole("img");
    await user.click(gameImg);

    const btns = await screen.findAllByRole("button", {
      name: /[Miracle|Dark]/,
    });
    expect(btns.length).toBe(1);
    expect(btns[0].textContent).toBe("Miracle");
  });

  it("user is shown a form with their score once all characters have been found", async () => {
    const mockData = {
      game: {
        _id: "1",
        image: "ripple_star.png",
      },
      iat: (Date.now() - 20000) / 1000,
      updatedAt: Date.now(),
      characters: [
        {
          _id: "1",
          name: "Miracle",
          image: "miracle_matter.png",
          found: true,
        },
        {
          _id: "2",
          name: "Dark",
          image: "dark_matter.png",
          found: true,
        },
      ],
    };

    const mockRoute = [
      {
        path: "/",
        element: <GameInstance />,
        loader: async () => mockData,
      },
    ];

    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);
    const [inputLabel, scoreText] = await Promise.all([
      await screen.findByLabelText("Enter your name"),
      await screen.findByText("Friends found in 00:20"),
    ]);

    expect(inputLabel).toBeInTheDocument();
    expect(scoreText).toBeInTheDocument();
  });

  it("increments timer every second", async () => {
    const router = createMemoryRouter(mockRoute);
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.advanceTimersByTime(1200);
    render(<RouterProvider router={router} />);

    const updatedTime = await screen.findByText("00:21");
    vi.clearAllTimers();
    expect(updatedTime.textContent).toBe("00:21");
  });
});
