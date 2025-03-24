// ✅ Verbesserte Logik für Riester-Vorteilsrechner

const form = document.getElementById("riesterForm");
const einkommenInput = document.getElementById("bruttoeinkommen");
const kinderInput = document.getElementById("anzahlKinder");
const kinderNach2008Input = document.getElementById("kinderNach2008");
const beitragInput = document.getElementById("beitrag");
const ergebnisBox = document.getElementById("riesterErgebnis");

[kinderInput, kinderNach2008Input].forEach((input) => {
  input.addEventListener("input", () => {
    const total = parseInt(kinderInput.value) || 0;
    const nach2008 = parseInt(kinderNach2008Input.value) || 0;
    if (nach2008 > total) kinderNach2008Input.value = total;
  });
});

form.addEventListener("input", berechneRiester);

function berechneRiester() {
  const brutto = parseFloat(einkommenInput.value);
  const kinderGesamt = parseInt(kinderInput.value) || 0;
  const kinderNach2008 = parseInt(kinderNach2008Input.value) || 0;
  const beitrag = parseFloat(beitragInput.value);

  if (!brutto || brutto <= 0 || kinderGesamt < 0 || beitrag <= 0) {
    ergebnisBox.innerHTML = "<span style='color: #E53935;'>Bitte alle Felder korrekt ausfüllen.</span>";
    return;
  }

  const kinderVor2008 = kinderGesamt - kinderNach2008;

  const grundzulage = 175;
  const kinderzulageVor2008 = 185;
  const kinderzulageNach2008 = 300;

  const zulagen = grundzulage + (kinderVor2008 * kinderzulageVor2008) + (kinderNach2008 * kinderzulageNach2008);

  const mindestbeitrag = Math.max(0.04 * brutto - zulagen, 60);

  const differenz = beitrag - mindestbeitrag;

  let hinweis = "✅ Sie haben den erforderlichen Mindestbeitrag zur vollen Zulage erfüllt.";
  if (differenz < -5) {
    hinweis = `<span style='color: #E53935;'>⚠️ Um die volle Förderung zu erhalten, müssten Sie mindestens ${mindestbeitrag.toFixed(2)} € einzahlen.</span>`;
  }

  const gesamtvorteil = zulagen.toFixed(2);

  ergebnisBox.innerHTML = `
    🧮 Ihre Zulagen betragen insgesamt: <strong>${gesamtvorteil} €</strong><br>
    ${hinweis}
  `;
}
