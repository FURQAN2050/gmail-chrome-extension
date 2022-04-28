import { Component, Inject } from "@angular/core";
import { bindCallback } from "rxjs";
import { map } from "rxjs/operators";
import { TAB_ID } from "../../../../providers/tab-id.provider";
import * as InboxSDK from "inboxsdk";

@Component({
  selector: "app-popup",
  templateUrl: "popup.component.html",
  styleUrls: ["popup.component.scss"],
})
export class PopupComponent {
  message: string;

  constructor(@Inject(TAB_ID) readonly tabId: number) {}

  async onClick(): Promise<void> {
    let sdk = await InboxSDK.load(2, "Hello World!");
    this.message = await bindCallback<string>(
      chrome.tabs.sendMessage.bind(this, this.tabId, "request")
    )()
      .pipe(
        map((msg) =>
          chrome.runtime.lastError
            ? "The current page is protected by the browser, goto: https://www.google.nl and try again."
            : msg
        )
      )
      .toPromise();
  }
}
