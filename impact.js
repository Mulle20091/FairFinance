document.addEventListener("DOMContentLoaded", () => {
    const investmentInput = document.getElementById("investment");
    const investmentOutput = document.getElementById("investmentValue");
    const etfTypeSelect = document.getElementById("etfType");
    const impactList = document.getElementById("impactList");
  
    // 🌍 Beispielhafte Einsparungen je ETF-Typ pro investiertem Euro (jährlich)
    const impactData = {
      classic: { co2: 0, water: 0, energy: 0 },
      esg: { co2: 0.05, water: 0.1, energy: 0.2 },   // 50 kg CO₂, 100 l Wasser, 200 Wh je 1.000 €
      sri: { co2: 0.08, water: 0.15, energy: 0.3 },
      impact: { co2: 0.12, water: 0.22, energy: 0.45 }
    };
  
    // 🔢 Formatierungsfunktion für Zahlen
    function formatNumber(value, decimals = 0) {
      return parseFloat(value).toLocaleString("de-DE", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
  
    // 🔁 Wert des Sliders + Ergebnisanzeige aktualisieren
    function updateValue(value) {
      const formatted = parseInt(value).toLocaleString("de-DE") + " €";
      investmentOutput.textContent = formatted;
      calculateImpact();
    }
  
    // 📊 Wirkung berechnen & anzeigen
    function calculateImpact() {
      const amount = parseFloat(investmentInput.value);
      const etfType = etfTypeSelect.value;
      const data = impactData[etfType];
  
      const co2 = data.co2 * amount;     // kg CO₂
      const water = data.water * amount; // Liter
      const energy = data.energy * amount; // kWh
  
      const results = [
        `♻️ CO₂-Einsparung: <strong>${formatNumber(co2 / 1000, 2)} Tonnen/Jahr</strong>`,
        `💧 Wassereinsparung: <strong>${formatNumber(water, 0)} Liter/Jahr</strong>`,
        `⚡ Energieeinsparung: <strong>${formatNumber(energy, 0)} kWh/Jahr</strong>`
      ];
  
      const comparison = [
        `🚘 Entspricht ca. <strong>${formatNumber((co2 / 1000) / 0.2, 0)} km</strong> mit einem Benziner`,
        `🚿 Reicht für <strong>${formatNumber(water / 40, 0)} Duschvorgänge</strong>`,
        `💡 Versorgt eine LED-Lampe für <strong>${formatNumber(energy / 3, 0)} Stunden</strong>`
      ];
  
      impactList.innerHTML = results
        .concat("<hr>")
        .concat(comparison)
        .map(item => `<li>${item}</li>`)
        .join("");
    }
  
    // 📌 Event-Listener
    investmentInput.addEventListener("input", () => updateValue(investmentInput.value));
    etfTypeSelect.addEventListener("change", calculateImpact);
  
    // 🚀 Initialisierung beim Laden
    updateValue(investmentInput.value);
  });
  