import consumer from "channels/consumer"

consumer.subscriptions.create("FakerChannel", {
  connected() {
    console.log("Connected to FakerChannel")
  },

  disconnected() {
    console.log("Disconnected from FakerChannel")
  },

  received(data) {
    var json = JSON.parse(data)

    var dataDisplay = "<details class=\"govuk-details\" data-module=\"govuk-details\">"
    dataDisplay += "<summary class=\"govuk-details__summary\">"
    dataDisplay += "<span class=\"govuk-details__summary-text\">"
    if (json["ui"]) {
      dataDisplay += json["ui"]["type"] + " | " + json["ui"]["text"]
    } else {
      dataDisplay += json["event"] + " | " + json["page"]["title"]
    }
    dataDisplay += "</span>"
    dataDisplay += "</summary>"
    dataDisplay += "<div class=\"govuk-details__text\">"
    dataDisplay += "<pre><code>" + JSON.stringify(json, undefined, 4) + "</code></pre>"
    dataDisplay += "</div>"
    dataDisplay += "</details>"

    var output = document.getElementById('faker-output')
    output.innerHTML += dataDisplay
  }
});
