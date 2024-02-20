import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, useLocation } from "react-router-dom";
import { fakeVideo as video } from "../../tests/videoData";
import { withRouter } from "../../tests/utils";
import { formatAgo } from "../../util/date";
import VideoCard from "../VideoCard";

describe("VideoCard", () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  it("renders video item", () => {
    render(withRouter(<Route path="/" element={<VideoCard video={video} />} />));

    const image = screen.getByRole("img");
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  it("navigates to detailed video page with vidieo state when clicked", async () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      withRouter(
        <>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route path={`/videos/watch/${video.id}`} element={<LocationStateDisplay />} />
        </>
      )
    );

    const card = screen.getByRole("listitem");
    await userEvent.click(card);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
