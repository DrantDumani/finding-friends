import { Leaderboards } from "./Leaderboards";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

const mockData = [
  {
    name: "Shine",
    score: 138948,
    date: 100000000,
    _id: 1,
  },
  {
    name: "Bright",
    score: 7000,
    date: 200000000,
    _id: 2,
  },
  {
    name: "Kracko",
    score: 1000,
    date: 500000000,
    _id: 3,
  },
];

describe("Leaderboard", () => {
  it("renders a score for every leaderboard entry", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Leaderboards />,
        loader: async () => mockData,
      },
    ];

    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const scores = await screen.findAllByRole("listitem");
    expect(scores.length).toBe(3);
  });

  it("renders score in mm:ss:ms format", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Leaderboards />,
        loader: async () => mockData,
      },
    ];

    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const times = await screen.findAllByTestId("score-time");
    expect(times[0].textContent).toBe("02:18:95");
  });

  it("renders 'No one has found friends here yet' if there are no leaderboard entries", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Leaderboards />,
        loader: async () => [],
      },
    ];

    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const noScores = await screen.findByRole("heading", {
      name: /No one has found friends here yet/,
    });
    expect(noScores).toBeInTheDocument();
  });
});
