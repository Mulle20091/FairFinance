document.addEventListener("DOMContentLoaded", function () {
  let debounceTimer;
  let chart;
  
  const form = document.getElementById("renditeForm");
  const startInput = document.getElementById("startkapital");
  const zielInput = document.getElementById("zielbetrag");
  const laufzeitInput = document.getElementById("laufzeit");
  const monatlichInput = document.getElementById("monatlich");
  const renditeInput = document.getElementById("rendite");
  const ergebnisBox = document.getElementById("renditeErgebnis");
  const ctx = document.getElementById("renditeChart").getContext("2d");
  
  [startInput, zielInput, laufzeitInput, monatlichInput, renditeInput].forEach((input) => {
    input.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        berechneRendite();
      }, 500); // 500ms debounce
    });
  });
  
  function berechneRendite() {
    const startkapital = parseFloat(startInput.value) || 0;
    const zielbetrag = parseFloat(zielInput.value);
    const laufzeit = parseFloat(laufzeitInput.value);
    const monatlich = parseFloat(monatlichInput.value) || 0;
    let rendite = parseFloat(renditeInput.value);
  
    if (!startkapital || !laufzeit || (!zielbetrag && !rendite)) {
      ergebnisBox.textContent = "Bitte geben Sie Startkapital, Laufzeit und entweder Zielbetrag oder Rendite ein.";
      return;
    }
  
    // 📌 Automatisch Zielbetrag oder Rendite berechnen
    if (zielbetrag && !rendite) {
      // Rendite berechnen
      let sum = startkapital;
      for (let i = 0; i < laufzeit; i++) {
        sum = (sum + monatlich * 12) * 1.05; // Näherung mit 5% als Dummy
      }
      let guessedRendite = 0.01;
      while (guessedRendite < 0.25) {
        let tmp = startkapital;
        for (let i = 0; i < laufzeit; i++) {
          tmp = (tmp + monatlich * 12) * (1 + guessedRendite);
        }
        if (tmp >= zielbetrag) break;
        guessedRendite += 0.0005;
      }
      rendite = guessedRendite * 100;
      renditeInput.value = rendite.toFixed(2);
    } else if (rendite && !zielbetrag) {
      // Zielbetrag berechnen
      let kapital = startkapital;
      for (let i = 0; i < laufzeit; i++) {
        kapital = (kapital + monatlich * 12) * (1 + rendite / 100);
      }
      zielInput.value = kapital.toFixed(2);
    } else if (rendite && zielbetrag) {
      // Beide eingegeben → Rendite hat Vorrang
      let kapital = startkapital;
      for (let i = 0; i < laufzeit; i++) {
        kapital = (kapital + monatlich * 12) * (1 + rendite / 100);
      }
      zielInput.value = kapital.toFixed(2);
    }
  
    // 💡 Ergebnis anzeigen
    const totalInvestiert = startkapital + monatlich * 12 * laufzeit;
    const zielFormatted = parseFloat(zielInput.value).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const investiertFormatted = totalInvestiert.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const gewinn = zielInput.value - totalInvestiert;
const gewinnFormatted = gewinn.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ergebnisText = `
  📊 Zielbetrag: <strong>${zielFormatted} €</strong><br>
  🧾 Eingezahlt: ${investiertFormatted} €<br>
  📈 Gesamtrendite: ${gewinnFormatted} €
`;
ergebnisBox.innerHTML = ergebnisText;

  
    // 📊 Diagramm
    const jahre = Array.from({ length: laufzeit + 1 }, (_, i) => i);
    let werte = [startkapital];
    let kapital = startkapital;
  
    for (let i = 1; i <= laufzeit; i++) {
      kapital = (kapital + monatlich * 12) * (1 + rendite / 100);
      werte.push(kapital.toFixed(2));
    }
  
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: jahre,
        datasets: [
          {
            label: "Kapitalentwicklung in €",
            data: werte,
            fill: true,
            borderColor: "#0EA5E9",
            backgroundColor: "rgba(14, 165, 233, 0.2)",
            tension: 0.3,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return `${ctx.dataset.label}: ${parseFloat(ctx.parsed.y).toFixed(2)} €`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + " €";
              },
            },
          },
        },
      },
    });
  }

})