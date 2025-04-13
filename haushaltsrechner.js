document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('budgetForm');
    const resultDiv = document.getElementById('ergebnis');
  
    // Alle Inputfelder im Formular abrufen
    const inputs = form.querySelectorAll('input[type="number"]');
  
    // Funktion zur Berechnung und Analyse
    const calculateBudget = () => {
      // Eingabewerte auslesen (bei leeren Feldern wird 0 verwendet)
      const income = parseFloat(document.getElementById('einkommen').value) || 0;
      const kindergeld = parseFloat(document.getElementById('kindergeld').value) || 0;
      const neben = parseFloat(document.getElementById('neben').value) || 0;
      const sonstigeEinnahmen = parseFloat(document.getElementById('sonstigeEinnahmen').value) || 0;
  
      const miete = parseFloat(document.getElementById('miete').value) || 0;
      const nebenkosten = parseFloat(document.getElementById('nebenkosten').value) || 0;
      const versicherung = parseFloat(document.getElementById('versicherung').value) || 0;
      const internet = parseFloat(document.getElementById('internet').value) || 0;
  
      const lebensmittel = parseFloat(document.getElementById('lebensmittel').value) || 0;
      const kleidung = parseFloat(document.getElementById('kleidung').value) || 0;
      const freizeit = parseFloat(document.getElementById('freizeit').value) || 0;
      const mobilitaet = parseFloat(document.getElementById('mobilitaet').value) || 0;
      const gesundheit = parseFloat(document.getElementById('gesundheit').value) || 0;
      const sonstigeAusgaben = parseFloat(document.getElementById('sonstigeAusgaben').value) || 0;
  
      // Gesamtsummen berechnen
      const totalIncome = income + kindergeld + neben + sonstigeEinnahmen;
      const totalFixCosts = miete + nebenkosten + versicherung + internet;
      const totalVariableCosts = lebensmittel + kleidung + freizeit + mobilitaet + gesundheit + sonstigeAusgaben;
      const totalExpenses = totalFixCosts + totalVariableCosts;
      const remainder = totalIncome - totalExpenses;
  
      // Sparquote berechnen (nur wenn Einnahmen > 0)
      let sparquote = 0;
      let sparText = '';
      if(totalIncome > 0) {
        sparquote = (remainder / totalIncome) * 100;
        if(sparquote < 0) {
          sparText = `Ihre Sparquote ist negativ (${sparquote.toFixed(2)} %). Das bedeutet, dass Ihre Ausgaben Ihre Einnahmen übersteigen – hier sollten Sie dringend Einsparungen prüfen.`;
        } else if(sparquote >= 0 && sparquote <= 10) {
          sparText = `Ihre Sparquote liegt bei ${sparquote.toFixed(2)} %. Das ist im akzeptablen Bereich, jedoch könnte noch Verbesserungspotenzial bestehen.`;
        } else { // sparquote > 10
          sparText = `Ihre Sparquote ist mit ${sparquote.toFixed(2)} % sehr gut! Sie sparen einen gesunden Anteil Ihres Einkommens.`;
        }
      } else {
        sparText = 'Bitte geben Sie mindestens einen positiven Einnahmenwert ein, um Ihre Sparquote zu berechnen.';
      }
  
      // Ergebnisanzeige zusammenstellen
      resultDiv.innerHTML = `
        <h3>Ergebnis</h3>
        <p>Gesamteinnahmen: ${totalIncome.toFixed(2)} €</p>
        <p>Gesamtausgaben: ${totalExpenses.toFixed(2)} €</p>
        <p>Verfügbarer Betrag: ${remainder.toFixed(2)} €</p>
        <p>${sparText}</p>
      `;
    };
  
    // Bei jeder Eingabe im Formular die Berechnung auslösen
    inputs.forEach(input => {
      input.addEventListener('input', calculateBudget);
    });
  
    // Optional: Bei Seitenaufruf initial die Berechnung durchführen
    calculateBudget();
  });
  