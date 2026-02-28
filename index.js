const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2601-ftb-ct-web-pt";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;
let parties = [];
let selectedParty = null;

async function fetchParties() {
    try {
        const response = await fetch(API);
        const result = await response.json();
        parties = result.data;
        render();
    } catch (error) {
        console.error("Error fetching parties:", error);
    }
}

async function getParty(id) {
    try {
        const response = await fetch(`${API}/${id}`);
        const result = await response.json();
        selectedParty = result.data;
        render();
    } catch (err) {
        console.error(err);
    }
}

fetchParties();
function render() {
    const app = document.querySelector("#app");

    app.innerHTML = `
    <h1 class="title">Party Planner</h1>

    <main class="layout">
      <section class="panel">
        <h2>Upcoming Parties</h2>
        ${PartyList()}
      </section>

      <section class="panel">
        <h2>Party Details</h2>
        ${PartyDetails()}
      </section>
    </main>
  `;
}
function PartyList() {
    return `
    <div class="list">
      ${parties
            .map(
                (party) => `
            <button class="list-item ${selectedParty?.id === party.id ? "active" : ""}"
              onclick="getParty(${party.id})"
              type="button"
            >
              ${party.name}
            </button>
          `
            )
            .join("")}
    </div>
  `;
}
function PartyDetails() {
    if (!selectedParty) {
        return `<p class="details-desc">Please select a party to see details.</p>`;
    }

    const date = new Date(selectedParty.date).toISOString().slice(0, 10);

    return `
    <h3 class="details-title">${selectedParty.name} #${selectedParty.id}</h3>

    <p class="details-meta">
      ${date}<br />
      <em>${selectedParty.location}</em>
    </p>

    <p class="details-desc">${selectedParty.description}</p>
  `;
}
fetchParties();