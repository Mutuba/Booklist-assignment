import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ReadingListProvider } from "../contexts/ReadingListContext";

interface CustomRenderOptions {
  providerProps?: any;
}

const customRender = (
  ui: ReactElement,
  { providerProps, ...renderOptions }: CustomRenderOptions & RenderOptions = {}
) => {
  return render(
    <ReadingListProvider {...providerProps}>{ui}</ReadingListProvider>,
    renderOptions
  );
};

export * from "@testing-library/react";

export { customRender as render };
