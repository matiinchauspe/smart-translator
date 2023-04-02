import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import App from "./App";

test("My app works as expected", async () => {
  const user = userEvent.setup();
  const app = render(<App />);

  const textareaFrom = app.getByPlaceholderText("Type something...");

  await user.type(textareaFrom, "Hola mundo");
  const result = await app.findByDisplayValue(
    /Hello world/i,
    {},
    { timeout: 2000 }
  );

  expect(result).toBeTruthy();
});
