// ETF-Rentenrechner – Berechnung & Ausgabe
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("etfForm");
    const etfErgebnis = document.getElementById("etfErgebnis");
  
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("input", berechneETF);
    });
  
    function berechneETF() {
      // Eingaben sammeln
      const einstieg = parseFloat(document.getElementById("einstieg").value) || 0;
      const sparrate = parseFloat(document.getElementById("sparrate").value) || 0;
      const renditeProzent = parseFloat(document.getElementById("rendite").value) || 0;
      const laufzeit = parseInt(document.getElementById("laufzeit").value) || 0;
      const entnahme = parseInt(document.getElementById("entnahme").value) || 0;
      const kapitalverzehr = document.getElementById("kapitalverzehr").checked;
      const teilfreistellung = document.getElementById("teilfreistellung").checked;
      const ausschüttungArt = document.getElementById("ausschüttung").value;
  
      const rendite = renditeProzent / 100;
  
      // Bei Ausschüttung → konservativ 0,5 % weniger Rendite
      const effektiveRendite = ausschüttungArt === "ausschüttend" ? rendite - 0.005 : rendite;
  
      // Endkapital berechnen (Zinseszinsformel inkl. Sparplan)
      const monate = laufzeit * 12;
      const ratenZins = Math.pow(1 + effektiveRendite / 12, monate);
      const endkapital = einstieg * ratenZins + sparrate * ((ratenZins - 1) / (effektiveRendite / 12));
  
      // Steuerliche Berücksichtigung (Teilfreistellung)
      const steuerBasis = teilfreistellung ? 0.7 : 1.0;
      const steuer = 0.26375; // 26,375 % inkl. Soli
      const nettoKapital = einstieg + (endkapital - einstieg) * (1 - steuer * steuerBasis);
  
      // Rente berechnen (Kapitalverzehr vs. keine Entnahme)
      let monatlicheRente = 0;
      if (kapitalverzehr) {
        const r = effektiveRendite / 12;
        const n = entnahme * 12;
        monatlicheRente = nettoKapital * (r / (1 - Math.pow(1 + r, -n)));
      } else {
        monatlicheRente = (nettoKapital * effektiveRendite) / 12;
      }
  
      // Ergebnis ausgeben
      etfErgebnis.innerHTML = `
        <h3>📊 Ergebnisse Ihrer ETF-Strategie</h3>
        <p><strong>Gesamtkapital bei Rentenbeginn:</strong> ${formatEuro(endkapital)}</p>
        <p><strong>Nach Steuern & Teilfreistellung:</strong> ${formatEuro(nettoKapital)}</p>
        <p><strong>Monatliche Rente (${kapitalverzehr ? "inkl. Kapitalverzehr" : "nur Zinsertrag"}):</strong> ${formatEuro(monatlicheRente)}</p>
      `;
    }
  
    function formatEuro(betrag) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
      }).format(betrag);
    }
  
    // Initiale Berechnung (optional)
    berechneETF();
  });
  