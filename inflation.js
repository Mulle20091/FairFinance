document.addEventListener("DOMContentLoaded", () => {
    const startSlider = document.getElementById("startYear");
    const endSlider = document.getElementById("endYear");
    const startOutput = document.getElementById("startOutput");
    const endOutput = document.getElementById("endOutput");
    const futureSlider = document.getElementById("futureInflation");
    const futureOutput = document.getElementById("futureValue");
    const resultBox = document.getElementById("inflationErgebnis");
  
    // 📊 Reale Inflationsdaten 1950–2024 (in Prozent)
    const inflationData = {
      1950: 1.0, 1951: 1.7, 1952: 0.3, 1953: -1.7, 1954: -0.9,
      1955: 0.3, 1956: 2.0, 1957: 2.7, 1958: 1.6, 1959: 1.4,
      1960: 1.4, 1961: 2.8, 1962: 3.4, 1963: 3.1, 1964: 2.6,
      1965: 3.4, 1966: 3.6, 1967: 1.9, 1968: 1.9, 1969: 1.8,
      1970: 3.4, 1971: 5.5, 1972: 5.4, 1973: 7.0, 1974: 6.9,
      1975: 5.9, 1976: 4.3, 1977: 3.7, 1978: 2.7, 1979: 4.0,
      1980: 5.4, 1981: 6.3, 1982: 5.3, 1983: 3.3, 1984: 2.4,
      1985: 2.0, 1986: -0.1, 1987: 0.2, 1988: 1.2, 1989: 2.8,
      1990: 2.6, 1991: 3.5, 1992: 5.1, 1993: 4.5, 1994: 2.7,
      1995: 1.8, 1996: 1.5, 1997: 1.8, 1998: 0.9, 1999: 0.6,
      2000: 1.4, 2001: 1.9, 2002: 1.4, 2003: 1.0, 2004: 1.6,
      2005: 1.5, 2006: 1.6, 2007: 2.3, 2008: 2.6, 2009: 0.3,
      2010: 1.1, 2011: 2.1, 2012: 2.0, 2013: 1.5, 2014: 0.9,
      2015: 0.3, 2016: 0.5, 2017: 1.5, 2018: 1.8, 2019: 1.4,
      2020: 0.5, 2021: 3.1, 2022: 6.9, 2023: 5.9, 2024: 2.5
    };
  
    // 🔁 Aktionsfunktion zur Berechnung
    function calculateInflation() {
      const from = parseInt(startSlider.value);
      const to = parseInt(endSlider.value);
      const futureInflation = parseFloat(futureSlider.value);
  
      // 📅 Logik: sicherstellen, dass Start < Ende
      if (from >= to) {
        resultBox.innerHTML = `<p>⚠️ Das Startjahr muss kleiner als das Endjahr sein.</p>`;
        return;
      }
  
      // 🔢 Beispielhafte Investitionssumme (kann später erweiterbar sein)
      const startValue = 1000;
      let resultValue = startValue;
  
      for (let year = from; year <= to; year++) {
        const rate = (year <= 2024)
          ? inflationData[year] ?? 2.0
          : futureInflation;
        resultValue *= 1 / (1 + rate / 100);
      }
  
      const valueLost = startValue - resultValue;
      const percentLost = (valueLost / startValue) * 100;
  
      resultBox.innerHTML = `
        <p>💶 Aus 1.000 € im Jahr <strong>${from}</strong> bleiben bis <strong>${to}</strong> inflationsbereinigt nur noch:</p>
        <h3>${resultValue.toFixed(2).toLocaleString("de-DE")} €</h3>
        <p>📉 Das entspricht einem Kaufkraftverlust von <strong>${percentLost.toFixed(1)} %</strong>.</p>
      `;
    }
  
    // 🔁 Anzeige aktualisieren
    function updateUI() {
      startOutput.textContent = startSlider.value;
      endOutput.textContent = endSlider.value;
      futureOutput.textContent = futureSlider.value.replace(".", ",") + " %";
      calculateInflation();
    }
  
    // 🔁 Event Listener
    startSlider.addEventListener("input", updateUI);
    endSlider.addEventListener("input", updateUI);
    futureSlider.addEventListener("input", updateUI);
  
    // 🔁 Initialer Aufruf
    updateUI();
  });
  