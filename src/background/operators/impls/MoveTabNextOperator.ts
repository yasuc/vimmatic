import { injectable } from "inversify";
import type { Operator } from "../types";

@injectable()
export class MoveTabNextOperator implements Operator {
  name() {
    return "tabs.move.next";
  }

  schema() {}

  async run(): Promise<void> {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    if (tabs.length < 2) {
      return;
    }
    const activeTabIdex = tabs.findIndex((tab) => tab.active);
    const nextTabIndex =
      (((activeTabIdex + 1) % tabs.length) + tabs.length) % tabs.length;

    const tab = tabs[activeTabIdex];
    if (typeof tab.id === "undefined") {
      throw new Error(`tab ${tab.index} has not id`);
    }
    await chrome.tabs.move(tab.id, { index: nextTabIndex });
  }
}
