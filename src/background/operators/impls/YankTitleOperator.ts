import { injectable, inject } from "inversify";
import type { Operator, OperatorContext } from "../types";
import { ClipboardRepository } from "../../repositories/ClipboardRepository";
import { ConsoleClient } from "../../clients/ConsoleClient";

@injectable()
export class YankTitleOperator implements Operator {
  constructor(
    @inject(ClipboardRepository)
    private readonly clipboard: ClipboardRepository,
    @inject(ConsoleClient)
    private readonly consoleClient: ConsoleClient,
  ) {}

  name() {
    return "urls.yanktitle";
  }

  schema() {}

  async run({ sender }: OperatorContext): Promise<void> {
    if (typeof sender.tab.url === "undefined") {
      return;
    }
    await this.clipboard.write(sender.tab.url + " -- " + sender.tab.title);
    await this.consoleClient.showInfo(
      sender.tabId,
      "Yanked " + sender.tab.url + " -- " + sender.tab.title,
    );
  }
}
