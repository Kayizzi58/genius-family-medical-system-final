import { h } from "preact";
import { useState } from "preact/hooks";
import Worklist from "./worklist";
import Reports from "./reports";
import Radiologyanalytics from "./analytics";

export default function Radiologymodule() {
  const [tab, setTab] = useState("worklist");

  return (
    <div class="ui container">
      <h2 class="ui dividing header">
        <i class="x-ray icon"></i>
        Radiology Dashboard
      </h2>

      <div class="ui secondary pointing menu">
        <a
          class={`item ${tab === "worklist" ? "active" : ""}`}
          onClick={() => setTab("worklist")}
        >
          Worklist
        </a>

        <a
          class={`item ${tab === "reports" ? "active" : ""}`}
          onClick={() => setTab("reports")}
        >
          Reports
        </a>

        
        

       

        <a
          class={`item ${tab === "analytics" ? "active" : ""}`}
          onClick={() => setTab("analytics")}
        >
          Analytics
        </a>
      </div>

      {tab === "worklist" && <Worklist />}
      {tab === "reports" && <Reports />}
      {tab === "analytics" && <Radiologyanalytics />}
    </div>
  );
}