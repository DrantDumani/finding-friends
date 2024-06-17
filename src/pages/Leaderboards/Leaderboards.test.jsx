import { Leaderboards } from "./Leaderboards";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

const mockData = [
  {
    _id: 1,
    name: "Poppy",
    thumbnail: "poppy.jpg",
  },
  {
    _id: 2,
    name: "Bros",
    thumbnail: "bros.png",
  },
  {
    _id: 3,
    name: "Jr",
    thumbnail: "jr.jpg",
  },
];

const mockRoutes = [
  {
    path: "/",
    element: <Leaderboards />,
    loader: async () => mockData,
  },
];

describe("Leaderboards page", () => {
  it("Should render buttons for all games", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Leaderboards />,
        loader: async () => ({ icons: mockData }),
      },
    ];
    const router = createMemoryRouter(mockRoutes);
    render(<RouterProvider router={router} />);

    const btns = await screen.findAllByRole("button");
    expect(btns.length).toBe(3);
    expect(btns[0].textContent).toBe("Poppy");
    expect(btns[1].textContent).toBe("Bros");
    expect(btns[2].textContent).toBe("Jr");
  });

  it("should render text ");
});
