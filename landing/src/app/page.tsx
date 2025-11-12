"use client";

import Image from "next/image";
import type { ChangeEvent, DragEvent } from "react";
import { useCallback, useRef, useState } from "react";

type Feature = {
  title: string;
  description: string;
  icon: string;
};

type Example = {
  title: string;
  prompt: string;
  before: string;
  after: string;
};

const features: Feature[] = [
  {
    title: "Automatische Retusche",
    description:
      "Optimiert Hauttöne, entfernt Unreinheiten und verleiht Bildern ein professionelles Finish – alles in Sekunden.",
    icon: "✨",
  },
  {
    title: "Kreative Transformationen",
    description:
      "Verwandle Szenen mit KI-generierten Effekten, Farbpaletten und Stimmungen, die deine Vision zum Leben erwecken.",
    icon: "🎨",
  },
  {
    title: "Hintergrundwechsel",
    description:
      "Ersetze Hintergründe mit einem Klick oder über individuelle Prompts, ohne Maskierung oder manuelles Freistellen.",
    icon: "🌅",
  },
];

const examples: Example[] = [
  {
    title: "Porträt-Perfektion",
    prompt: "Weiches Studiolicht, dezente Hautretusche",
    before: "/examples/portrait-before.svg",
    after: "/examples/portrait-after.svg",
  },
  {
    title: "Produkt im Fokus",
    prompt: "Reflektierender Glaseffekt, dunkler Hintergrund",
    before: "/examples/product-before.svg",
    after: "/examples/product-after.svg",
  },
  {
    title: "Reiseaufnahme",
    prompt: "Goldene Stunde, dramatischer Himmel",
    before: "/examples/travel-before.svg",
    after: "/examples/travel-after.svg",
  },
];

export default function Home() {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("Füge einen Sonnenuntergang hinzu");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file.name);
      }
    },
    []
  );

  const handleDrop = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setFileName(droppedFile.name);
    }
  }, []);

  const handleDrag = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    }

    if (event.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const triggerFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_55%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.08),_transparent_55%)]" />
      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-24 px-6 pb-16 pt-12 sm:px-10 lg:px-16">
        <header className="flex flex-col gap-16">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Lumina Edit Logo"
                width={44}
                height={44}
                priority
              />
              <div>
                <span className="text-sm uppercase tracking-[0.3em] text-sky-200/70">
                  Lumina Edit
                </span>
                <p className="text-lg font-semibold text-slate-50">
                  Visionäre KI-Bildbearbeitung
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-6 text-sm font-medium text-slate-200/80 md:flex">
              <a className="transition hover:text-white" href="#features">
                Funktionen
              </a>
              <a className="transition hover:text-white" href="#workflow">
                Workflow
              </a>
              <a className="transition hover:text-white" href="#examples">
                Beispiele
              </a>
              <button className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/10 backdrop-blur transition hover:bg-white/20">
                Jetzt starten
              </button>
            </div>
          </nav>

          <section className="grid gap-12 lg:grid-cols-[minmax(0,_1.1fr)_minmax(0,_0.9fr)] lg:items-center">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.4em] text-sky-200/80 backdrop-blur">
                KI Studio 2024
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Revolutionäre KI-Bildbearbeitung – blitzschnell, kreativ, intuitiv.
              </h1>
              <p className="max-w-xl text-lg text-slate-200/90">
                Lumina Edit analysiert jedes Bild pixelgenau, erkennt Objekte und Stimmungen und setzt deine Vorstellungen in beeindruckende Ergebnisse um – ohne komplexe Tools oder lange Wartezeiten.
              </p>
              <div className="flex flex-col gap-3 text-sm text-slate-200/70 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  Echtzeit-Rendering mit verantwortungsvoller KI
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-sky-400" />
                  DSGVO-konforme Cloud-Infrastruktur
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">
                  Jetzt starten
                </button>
                <button className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40">
                  Demo ansehen
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),_transparent_65%)]" />
              <div className="relative flex flex-col gap-6">
                <p className="text-sm uppercase text-slate-200/80">Workflow</p>
                <ol className="flex flex-col gap-5 text-sm text-slate-200/90">
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-base font-semibold text-white">
                      1
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">Bild hochladen</h3>
                      <p>Drag-&-Drop oder Klick – Lumina erkennt automatisch Bildtyp und Auflösung.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-base font-semibold text-white">
                      2
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">KI-Prompt platzieren</h3>
                      <p>Formuliere deine Wünsche in natürlicher Sprache – inklusive Stil, Farben und Stimmung.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-base font-semibold text-white">
                      3
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">Ergebnis verfeinern</h3>
                      <p>Wähle Favoriten, passe Details an und exportiere in Studioqualität – ganz ohne Aufwand.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </section>
        </header>

        <section id="features" className="grid gap-8 rounded-3xl border border-white/15 bg-white/5 p-10 backdrop-blur-lg lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-6 shadow-[0_10px_40px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.12]"
            >
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-200/80">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        <section
          id="workflow"
          className="grid gap-12 rounded-3xl border border-white/15 bg-slate-950/60 p-10 backdrop-blur-xl lg:grid-cols-[minmax(0,_0.9fr)_minmax(0,_1.1fr)]"
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Ein Upload – unendliche Möglichkeiten.
            </h2>
            <p className="text-base text-slate-200/90">
              Unsere Drag-&-Drop-Zone erkennt Dateiformate automatisch, sichert deine Bilder Ende-zu-Ende und bereitet sie für die KI-Optimierung vor. Ergänze deinen Prompt und erhalte maßgeschneiderte Vorschläge in Sekunden.
            </p>
            <div className="space-y-3 text-sm text-slate-200/70">
              <p>Unterstützt RAW, JPG, PNG, TIFF</p>
              <p>Automatische Versionierung & Originalschutz</p>
              <p>Intelligentes Prompt-Parsing in über 20 Sprachen</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-2xl border border-dashed border-slate-500/60 bg-slate-900/60 p-6 shadow-[0_25px_60px_rgba(2,6,23,0.55)]">
            <label
              htmlFor="image-upload"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-500/40 p-8 text-center transition ${dragActive ? "border-sky-400/80 bg-sky-500/10" : "bg-slate-900/40 hover:border-slate-400/60"}`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/15 text-3xl text-sky-300">
                ⬆️
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-white">
                  Ziehe dein Bild hierher
                </p>
                <p className="text-sm text-slate-300/80">
                  oder <span className="text-sky-300">Datei auswählen</span>
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Max. 250 MB • verschlüsselte Übertragung
              </p>
              <input
                ref={fileInputRef}
                id="image-upload"
                name="image-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
            <button
              type="button"
              onClick={triggerFileDialog}
              className="w-full rounded-full bg-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              Bild auswählen
            </button>
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium text-slate-200">
                Bearbeitungswunsch (Prompt)
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-600/60 bg-slate-950/60 p-4 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                placeholder="Beschreibe, wie die KI dein Bild verändern soll"
              />
              <p className="text-xs text-slate-400">
                Beispiele: „Entferne den Hintergrund“, „Passe die Lichtstimmung an“, „Verwandle in digitale Kunst“
              </p>
            </div>
            <div className="rounded-xl border border-slate-600/60 bg-slate-950/50 p-4 text-sm text-slate-200/80">
              <p className="font-medium text-white">Status</p>
              <p>{fileName ? `Ausgewählte Datei: ${fileName}` : "Noch keine Datei ausgewählt"}</p>
            </div>
          </div>
        </section>

        <section id="examples" className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Inspiration: Vorher & Nachher
            </h2>
            <p className="text-base text-slate-200/80">
              Entdecke, wie Lumina Edit Fotos in wenigen Sekunden transformiert. Jeder Prompt erzeugt individuelle Ergebnisse mit feinsten Details.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {examples.map((example) => (
              <article
                key={example.title}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_15px_50px_rgba(8,18,49,0.45)]"
              >
                <div
                  className="relative grid overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-inner"
                  style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
                >
                  <div className="relative h-44 border-r border-white/5 bg-slate-900/80">
                    <Image
                      src={example.before}
                      alt={`${example.title} vorher`}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-200/80">
                      Vorher
                    </span>
                  </div>
                  <div className="relative h-44 bg-slate-900">
                    <Image
                      src={example.after}
                      alt={`${example.title} nachher`}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute right-4 top-4 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-medium uppercase tracking-widest text-sky-100">
                      Nachher
                    </span>
                  </div>
                </div>
                <div className="space-y-2 px-2 pb-2">
                  <h3 className="text-lg font-semibold text-white">{example.title}</h3>
                  <p className="text-sm text-slate-200/80">Prompt: {example.prompt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-center gap-6 rounded-3xl border border-white/15 bg-gradient-to-r from-sky-600/40 via-sky-500/30 to-cyan-400/30 p-12 text-center shadow-[0_30px_70px_rgba(14,116,144,0.45)]">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">
            Bereit für echte Innovation?
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Starte jetzt mit Lumina Edit und forme deine Bildideen mit der Kraft verantwortungsvoller KI.
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
              Kostenlos testen
            </button>
            <button className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:border-white">
              Mehr über die KI erfahren
            </button>
          </div>
        </section>

        <footer className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-slate-950/70 p-10 text-sm text-slate-300/80">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Lumina Edit Logo" width={36} height={36} />
              <div>
                <p className="text-base font-semibold text-white">Lumina Edit</p>
                <p>Revolutionäre KI-Bildbearbeitung</p>
              </div>
            </div>
            <button className="w-full rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20 lg:w-auto">
              Jetzt starten
            </button>
          </div>
          <div className="flex flex-col gap-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-slate-200">Kontakt</p>
              <p>hello@lumina-edit.ai • +49 30 1234 5678</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a className="transition hover:text-white" href="#">
                Datenschutz
              </a>
              <span>•</span>
              <a className="transition hover:text-white" href="#">
                Impressum
              </a>
              <span>•</span>
              <a className="transition hover:text-white" href="#">
                Nutzungsbedingungen
              </a>
            </div>
            <p>© {new Date().getFullYear()} Lumina Labs GmbH. Alle Rechte vorbehalten.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
