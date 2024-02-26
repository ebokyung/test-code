import { render, screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";
import { withAllContexts, withRouter } from "../../tests/utils";
import ChannelInfo from "../ChannelInfo";

describe("ChannelInfo", () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };

  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  it("renders correctly", async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => "url");
    render(withAllContexts(withRouter(<Route path="/" element={<ChannelInfo id="id" name="channel" />} />), fakeYoutube));
    await waitFor(() => expect(screen.getByText("channel")));
  });

  it("renders without URL", () => {
    fakeYoutube.channelImageURL.mockImplementation(() => {
      throw new Error("error");
    });
    renderChannelInfo();

    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders with URL", async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => "url");

    renderChannelInfo();

    /* waitFor와 getByRole을 조합하는 대신 findByRole 쿼리를 사용하는 것을 권장
     * - getBy는 promise 하지 않음 (await x, 요소를 찾으면 바로 리턴하고 못찾으면 에러 던짐)
     * - findByRole은 promise를 반환
     */

    // as-is
    // await waitFor(() => expect(screen.getByRole("img").toBeInTheDocument()))

    // to-be
    await screen.findByRole("img");
  });

  function renderChannelInfo() {
    return render(withAllContexts(withRouter(<Route path="/" element={<ChannelInfo id="id" name="channel" />} />), fakeYoutube));
  }
});
