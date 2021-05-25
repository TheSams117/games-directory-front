import { provider } from "./init-pact";
import { Matchers } from "@pact-foundation/pact";
import { GamesController } from "../../../src/controllers";

describe("Game Directory Service", () => {
  describe("When a request to add a game is made", () => {
    const game = {
      name: "Halo",
      console: "PC",
      genre: "FPS",
      img: "https://www.enter.co/wp-content/uploads/2019/06/Halo-1024x768.jpg",
    };
    beforeAll(async () => {
      await provider.setup();
      await provider.addInteraction({
        state: "add a game",
        uponReceiving: "a request to add a game",
        withRequest: {
          method: "POST",
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
            name: Matchers.like("Halo"),
            console: Matchers.like("PC"),
            genre: Matchers.like("FPS"),
            img: Matchers.like("https://www.enter.co/wp-content/uploads/2019/06/Halo-1024x768.jpg"),
          }),
        },
      });
    });

    it("Then it should return the right data", async () => {
      const response = await GamesController.add(game);
      expect(response.data).toMatchSnapshot();
      await provider.verify();
    });

    afterAll(async () => {
      await provider.finalize();
    });
  });
});
