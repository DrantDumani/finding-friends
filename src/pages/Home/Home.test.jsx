import { Home } from "./Home";
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
    element: <Home />,
    loader: async () => mockData,
  },
];

describe("Home page", () => {
  it("Should render text saying How To Play", async () => {
    const router = createMemoryRouter(mockRoutes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);
    const title = await screen.findByRole("heading", { name: /How To Play/ });
    expect(title).toBeInTheDocument();
  });

  it("should render links, images, and captions for all games", async () => {
    const router = createMemoryRouter(mockRoutes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);

    const gameLinks = await screen.findAllByRole("link");

    expect(gameLinks.length).toBe(3);
    expect(gameLinks[0].textContent).toBe("Poppy");
    expect(gameLinks[1].textContent).toBe("Bros");
    expect(gameLinks[2].textContent).toBe("Jr");
  });
});
