import { LeaderboardSelector } from "./LeaderboardSelector";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

const mockData = [
  {
    _id: "1",
    name: "Poppy",
    thumbnail: "poppy.jpg",
  },
  {
    _id: "2",
    name: "Bros",
    thumbnail: "bros.png",
  },
  {
    _id: "3",
    name: "Jr",
    thumbnail: "jr.jpg",
  },
];

const mockChild = <div>Filler</div>;

const mockRoute = [
  {
    path: "/",
    element: <LeaderboardSelector />,
    loader: async () => mockData,
    children: [
      {
        path: ":gameId",
        element: mockChild,
      },
    ],
  },
];

describe("Leaderboard Selector", () => {
  it("Should render links and images, for all games", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const [boardLinks, gameImages] = await Promise.all([
      await screen.findAllByRole("link"),
      await screen.findAllByRole("img"),
    ]);
    expect(boardLinks.length).toBe(3);
    expect(gameImages.length).toBe(3);
  });

  it("renders 'Choose a leaderboard above' if none have been selected", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const header = await screen.findByRole("heading", {
      name: "Choose a leaderboard above",
    });
    expect(header).toBeInTheDocument();
  });

  it("renders the name of the selected leaderboard", async () => {
    const router = createMemoryRouter(mockRoute, { initialEntries: ["/1"] });
    render(<RouterProvider router={router} />);

    const header = await screen.findByRole("heading", { name: "Poppy" });
    expect(header).toBeInTheDocument();
  });
});
