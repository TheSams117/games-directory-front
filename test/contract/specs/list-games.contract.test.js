import { provider } from "./init-pact";
import { Matchers } from "@pact-foundation/pact";
import { GamesController } from "../../../src/controllers";

describe("Game Directory Service", () => {
  describe("When a request to list all games is made", () => {
    beforeAll(async () => {
      await provider.setup();
      await provider.addInteraction({
        state: "list games",
        uponReceiving: "a request to list all games",
        withRequest: {
          method: "GET",
          path: "/games",
        },
        willRespondWith: {
          status: 200,
          body: {
            name: Matchers.string("Assassins Creed"),
            console: Matchers.string("PC"),
            genre: Matchers.string("Action"),
            img: Matchers.string(
              "https://images3.alphacoders.com/823/thumb-1920-82365.jpg"
            ),
          }
        },
      });
    });

    test("should return the correct data", async () => {
      const response = await GamesController.list();
      expect(response.data).toMatchSnapshot();
      await provider.verify();
    });

    afterAll(() => provider.finalize());
  });
});
