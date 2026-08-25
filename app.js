
const DATA_URL = "data/home.json";

async function init() {
  const data = await fetch(DATA_URL).then(r => r.json());

  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = data.featured.map(p => `
    <article class="product-card tone-${p.tone}">
      <div>
        <div class="product-art" aria-hidden="true"></div>
        <span class="product-line">${p.line}</span>
        <h3>${p.name}</h3>
        <p>${p.tag}</p>
        <span class="product-tag">Consultar con Erika</span>
      </div>
    </article>
  `).join("");

  const result = document.getElementById("result");
  const resultTitle = document.getElementById("result-title");
  const resultList = document.getElementById("result-list");
  const close = document.getElementById("result-close");

  document.querySelectorAll("[data-need]").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.need;
      const names = data.needs[key] || [];
      resultTitle.textContent = key;
      resultList.innerHTML = names.map(name => `
        <div class="result-item">
          <b>${name}</b>
          <small>Consulta disponibilidad y precio con Erika.</small>
        </div>
      `).join("");
      result.hidden = false;
      result.scrollIntoView({behavior:"smooth", block:"nearest"});
    });
  });

  close.addEventListener("click", () => result.hidden = true);
}

init();
