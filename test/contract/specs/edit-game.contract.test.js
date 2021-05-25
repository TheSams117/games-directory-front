import { provider } from "./init-pact";
import { Matchers } from "@pact-foundation/pact";
import { GamesController } from "../../../src/controllers";

describe("Game Directory Service", () => {
  describe("When a request to edit a game is made", () => {
    const game = {
      id: 1,
      name: "Halo",
      console: "PC",
      genre: "FPS",
      img: "https://www.enter.co/wp-content/uploads/2019/06/Halo-1024x768.jpg",
    };
    beforeAll(async () => {
      await provider.setup();
      await provider.addInteraction({
        state: "edit a game",
        uponReceiving: "a request to edit a game",
        withRequest: {
          method: "PUT",
          path: "/games",
          headers: {
            "Content-Type": "application/json",
          },
          body: game,
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: Matchers.somethingLike({
            id: Matchers.like(1),
            name: Matchers.like("Halo"),
            console: Matchers.like("PC"),
            genre: Matchers.like("FPS"),
            img: Matchers.like("https://www.enter.co/wp-content/uploads/2019/06/Halo-1024x768.jpg"),
          }),
        },
      });
    });

    it("Then it should return the right data", async () => {
      const response = await GamesController.update(game);
      expect(response.data).toMatchSnapshot();
      await provider.verify();
    });

    afterAll(async () => {
      await provider.finalize();
    });
  });
});
