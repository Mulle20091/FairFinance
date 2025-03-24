document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rentenForm');
    const wunschRente = document.getElementById('wunschRente');
    const gesetzlicheRente = document.getElementById('gesetzlicheRente');
    const hatVorsorge = document.getElementById('hatVorsorge');
    const vorsorgeRente = document.getElementById('vorsorgeRente');
    const vorsorgeFeld = document.getElementById('vorsorgeFeld');
    const inflation = document.getElementById('inflation');
    const rentendauer = document.getElementById('rentendauer');
    const ergebnisLuecke = document.getElementById('ergebnisLuecke');
    const ergebnisGesamt = document.getElementById('ergebnisGesamt');
    const chartCanvas = document.getElementById('rentenChart');
  
    let chartInstance = null;
  
    // Checkbox zeigt Feld an/aus
    hatVorsorge.addEventListener('change', () => {
      vorsorgeFeld.style.display = hatVorsorge.checked ? 'block' : 'none';
      berechneRentenluecke();
    });
  
    // Event Listener für alle Felder
    [wunschRente, gesetzlicheRente, vorsorgeRente, inflation, rentendauer].forEach(input => {
      input.addEventListener('input', debounce(berechneRentenluecke, 300));
    });
    [hatVorsorge, inflation].forEach(chk => chk.addEventListener('change', berechneRentenluecke));
  
    function berechneRentenluecke() {
      const ziel = parseFloat(wunschRente.value) || 0;
      const gesetzlich = parseFloat(gesetzlicheRente.value) || 0;
      const privat = hatVorsorge.checked ? parseFloat(vorsorgeRente.value) || 0 : 0;
      const dauer = parseFloat(rentendauer.value) || 0;
      const inflationsRate = inflation.checked ? 0.02 : 0;
  
      const monatlicheLuecke = Math.max(0, ziel - gesetzlich - privat);
      let gesamtLuecke = monatlicheLuecke * 12 * dauer;
  
      // Inflation einberechnen
      if (inflation.checked && monatlicheLuecke > 0 && dauer > 0) {
        gesamtLuecke = 0;
        for (let i = 0; i < dauer; i++) {
          const inflationsFaktor = Math.pow(1 + inflationsRate, i);
          gesamtLuecke += monatlicheLuecke * 12 * inflationsFaktor;
        }
      }
  
      // Ausgabe formatieren
      ergebnisLuecke.textContent = monatlicheLuecke.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR'
      });
      ergebnisGesamt.textContent = gesamtLuecke.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR'
      });
  
      // Chart aktualisieren
      aktualisiereChart(monatlicheLuecke, gesetzlich, privat);
    }
  
    function aktualisiereChart(luecke, gesetzlich, privat) {
      const daten = [gesetzlich, privat, luecke];
      const farben = ['#1F3B5C', '#0EA5E9', '#FFD700'];
  
      if (chartInstance) chartInstance.destroy();
  
      chartInstance = new Chart(chartCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Gesetzliche Rente', 'Private Vorsorge', 'Rentenlücke'],
          datasets: [{
            data: daten,
            backgroundColor: farben,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.raw;
                  return `${context.label}: ${value.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR'
                  })}`;
                }
              }
            }
          }
        }
      });
    }
  
    // Debounce-Funktion für Performance
    function debounce(func, wait) {
      let timeout;
      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), wait);
      };
    }
  
    // Initiale Berechnung (für vorausgefüllte Werte)
    berechneRentenluecke();
  });
  