'use client';
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Finanzierungsrechner() {
  const [preis, setPreis] = useState(27160);
  const [laufzeit, setLaufzeit] = useState(36);
  const [zins, setZins] = useState(4.9);
  const [zinsUebernahme, setZinsUebernahme] = useState(100);
  const [modus, setModus] = useState("rate");
  const [rate, setRate] = useState(300);
  const [anzahlung, setAnzahlung] = useState(9000);
  const [ergebnis, setErgebnis] = useState(null);

  const berechne = () => {
    const r = zins / 100 / 12;

    let finanzierungsbetrag = 0;
    let monatlicheRate = 0;
    let anzahlungCalc = 0;

    if (modus === "anzahlung") {
      finanzierungsbetrag = preis - anzahlung;
      monatlicheRate = finanzierungsbetrag * r / (1 - Math.pow(1 + r, -laufzeit));
      anzahlungCalc = anzahlung;
    } else {
      finanzierungsbetrag = rate * ((1 + r) ** laufzeit - 1) / (r * (1 + r) ** laufzeit);
      anzahlungCalc = preis - finanzierungsbetrag;
      monatlicheRate = rate;
    }

    const gesamtRate = monatlicheRate * laufzeit;
    const zinskosten = gesamtRate - finanzierungsbetrag;
    const uebernahmeBetrag = zinskosten * (zinsUebernahme / 100);
    const effektivKundenzahlung = anzahlungCalc + gesamtRate - uebernahmeBetrag;

    setErgebnis({
      anzahlung: anzahlungCalc.toFixed(2),
      monatlicheRate: monatlicheRate.toFixed(2),
      gesamtRate: gesamtRate.toFixed(2),
      zinskosten: zinskosten.toFixed(2),
      uebernahmeBetrag: uebernahmeBetrag.toFixed(2),
      effektivKundenzahlung: effektivKundenzahlung.toFixed(2),
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-[#8b0000]">Finanzierungsrechner V5.3</h1>

      <label>Klavierpreis (€):</label>
      <Input type="number" value={preis} onChange={(e) => setPreis(parseFloat(e.target.value))} />

      <label>Laufzeit (Monate):</label>
      <Input type="number" value={laufzeit} onChange={(e) => setLaufzeit(parseInt(e.target.value))} />

      <label>Zinssatz (% p.a.):</label>
      <Input type="number" value={zins} onChange={(e) => setZins(parseFloat(e.target.value))} />

      <label>Wie viel % der Zinskosten übernehmen wir?</label>
      <Input type="number" value={zinsUebernahme} onChange={(e) => setZinsUebernahme(parseFloat(e.target.value))} />

      <label>Berechnungsmodus:</label>
      <select className="border border-[#8b0000] rounded p-2 w-full" value={modus} onChange={(e) => setModus(e.target.value)}>
        <option value="rate">Wunschrate vorgeben</option>
        <option value="anzahlung">Anzahlung vorgeben</option>
      </select>

      {modus === "rate" ? (
        <>
          <label>Wunschrate (€):</label>
          <Input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} />
        </>
      ) : (
        <>
          <label>Anzahlung (€):</label>
          <Input type="number" value={anzahlung} onChange={(e) => setAnzahlung(parseFloat(e.target.value))} />
        </>
      )}

      <Button onClick={berechne}>Jetzt berechnen</Button>

      {ergebnis && (
        <Card>
          <CardContent className="p-4 space-y-2 text-[#2e2e2e]">
            <p><strong>Anzahlung:</strong> € {ergebnis.anzahlung}</p>
            <p><strong>Monatliche Rate:</strong> € {ergebnis.monatlicheRate}</p>
            <p><strong>Gesamte Ratenzahlung:</strong> € {ergebnis.gesamtRate}</p>
            <p><strong>Gesamte Zinskosten:</strong> € {ergebnis.zinskosten}</p>
            <p><strong>Unser übernommener Zinsanteil:</strong> € {ergebnis.uebernahmeBetrag}</p>
            <p><strong>Effektive Kundenzahlung:</strong> € {ergebnis.effektivKundenzahlung}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
