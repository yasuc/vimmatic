import { injectable } from "inversify";
import type { Operator } from "../types";

@injectable()
export class MoveTabPrevOperator implements Operator {
  name() {
    return "tabs.move.prev";
  }

  schema() {}

  async run(): Promise<void> {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    if (tabs.length < 2) {
      return;
    }
    const currentTab = tabs.find((t) => t.active);
    if (!currentTab) {
      return;
    }
    const tab = currentTab;
    if (typeof tab.id === "undefined") {
      throw new Error(`tab ${tab.index} has not id`);
    }
    await chrome.tabs.move(tab.id, { index: tab.index - 1 });
  }
}
