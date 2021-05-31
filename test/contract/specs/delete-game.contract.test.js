import { provider } from "./init-pact";
import { GamesController } from "../../../src/controllers";
import { Matchers } from "@pact-foundation/pact";

describe("Game Directory Service", () => {
  describe("When a request to delete a game is made", () => {
    const idGame = 1;
    beforeAll(async () => {
      await provider.setup();
      await provider.addInteraction({
        state: "delete a game",
        uponReceiving: "a request to delete a game",
        withRequest: {
          method: "DELETE",
          path: `/games/${idGame}`,
        },
        willRespondWith: {
          status: 200,
          body: Matchers.like("ok"),
        },
      });
    });

    test("should return the correct data", async () => {
      const response = await GamesController.delete(idGame);
      expect(response.data).toMatchSnapshot();
      await provider.verify();
    });

    afterAll(() => provider.finalize());
  });
});
