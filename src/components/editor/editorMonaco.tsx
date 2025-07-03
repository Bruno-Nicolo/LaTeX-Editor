import { useContext, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import {
  boldCommand,
  compileCommand,
  italicCommand,
  underlineCommand,
} from "./latex-language-Monaco/monaco-commands";
import { GlobalContext } from "@/context";
import { defineTokenization } from "./latex-language-Monaco/tokenizer";
import { themesArray } from "./latex-language-Monaco/theme";
import { defineAutocompletionProvider } from "./latex-language-Monaco/autocompletion";
import { defineLinter } from "./latex-language-Monaco/linting";

export function MonacoEditor(props: { className?: string; readonly: boolean }) {
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);
  const editorRef = useContext(GlobalContext)?.editorView;
  const editorDialogRef = useContext(GlobalContext)?.editorDialog;

  // Style Settings
  const editorStyleSettings = useContext(GlobalContext)?.editorSettings;
  const theme = editorStyleSettings?.theme.value;
  const fontSize = editorStyleSettings?.fontSize.value;
  const fontFamily = editorStyleSettings?.fontFamily.value;

  const defaultText =
    "\\documentclass[12pt, a4paper]{article}\n\n% Pacchetti necessari\n\\usepackage[utf8]{inputenc} % Per l'input UTF-8\n\\usepackage[T1]{fontenc}    % Per i font moderni\n\\usepackage[italian]{babel} % Per la sillabazione e le convenzioni italiane\n\\usepackage{amsmath}        % Per equazioni matematiche avanzate\n\\usepackage{amssymb}        % Per simboli matematici aggiuntivi\n\\usepackage{graphicx}       % Per includere immagini\n\\usepackage[backend=bibtex, style=numeric, sorting=none]{biblatex} % Per la bibliografia\n\\usepackage{amsthm}         % Per teoremi e definizioni\n\\usepackage{booktabs}       % Per tabelle di qualità\n\\usepackage{hyperref}       % Per riferimenti incrociati e link cliccabili\n\\usepackage{caption}        % Per personalizzare le didascalie di figure e tabelle\n\\usepackage{subcaption}     % Per sottofigure e sottotabelle\n\n% Definizione del file della bibliografia\n\\addbibresource{references.bib}\n\n% Dettagli del documento\n\\title{Titolo Completo del Paper Scientifico: Sottotitolo se Necessario}\n\\author{\n    Nome Autore 1\\textsuperscript{1,*}\n    \\and\n    Nome Autore 2\\textsuperscript{1}\n    \\and\n    Nome Autore 3\\textsuperscript{2}\n}\n\\date{\\today} % Data attuale\n\n% Affiliazioni\n\\newcommand{\\affiliations}{\n    \\textsuperscript{1}Dipartimento di Scienza, Universit\\`a di Esempio, Citt\\`a, Nazione\\\\\n    \\textsuperscript{2}Laboratorio di Ricerca, Istituto Tecnologico, Citt\\`a, Nazione\\\\\n    \\textsuperscript{*}Corrispondenza: email.autore1@example.com\n}\n\n% --- Inizio del Documento ---\n\\begin{document}\n\n\\maketitle % Genera il titolo, gli autori e le affiliazioni\n\n% Blocca l'affiliazione dopo il titolo\n\\begingroup\n\\renewcommand\\thefootnote{}\n\\footnote{\\affiliations}\n\\addtocounter{footnote}{-1}\n\\endgroup\n\n% Abstract\n\\begin{abstract}\nQuesto \\`e l'abstract del paper. L'abstract deve fornire un riassunto conciso dell'intera ricerca, includendo lo scopo, i metodi principali, i risultati chiave e le conclusioni pi\\`u importanti. Dovrebbe essere autosufficiente e non contenere riferimenti a figure, tabelle o bibliografia. Generalmente, non supera le 250-300 parole. Si focalizza sul \"cosa \\`e stato fatto\", \"come \\`e stato fatto\", \"cosa \\`e stato trovato\" e \"cosa significa\".\n\\end{abstract}\n\n% Parole chiave\n\\noindent\\textbf{Parole chiave:} Parola chiave 1; Parola chiave 2; Parola chiave 3; Parola chiave 4; Parola chiave 5.\n\n\\newpage % Inizia una nuova pagina dopo l'abstract e le parole chiave\n\n% Indice (opzionale, utile per documenti lunghi)\n\\tableofcontents\n\\newpage\n\n% --- Sezioni del Paper ---\n\n\\section{Introduzione}\nL'introduzione serve a fornire il contesto della ricerca. Deve iniziare con un background generale sull'argomento, per poi restringere il focus sul problema specifico che il paper intende affrontare. Include una revisione concisa della letteratura pertinente, evidenziando le lacune di conoscenza o le questioni irrisolte. Infine, l'introduzione deve dichiarare chiaramente lo scopo del lavoro, le domande di ricerca o le ipotesi, e il contributo previsto alla conoscenza esistente.\nAd esempio, studi precedenti \\cite{esempio2020un, rossi2021nuovo} hanno esplorato [argomento]. Tuttavia, le ricerche esistenti non hanno affrontato [problema o lacuna]. Il presente lavoro si propone di [scopo del paper].\n\n\\section{Materiali e Metodi}\nQuesta sezione descrive in dettaglio come \\`e stata condotta la ricerca, permettendo ad altri ricercatori di replicare lo studio. Deve includere informazioni su:\n\\begin{itemize}\n    \\item \\textbf{Partecipanti/Materiali}: Descrizione dei soggetti dello studio, campioni, reagenti, apparecchiature utilizzate, con dettagli sui fornitori e le specifiche.\n    \\item \\textbf{Design Sperimentale}: Il tipo di studio (es. sperimentale, osservazionale, survey), le variabili indipendenti e dipendenti, e il controllo delle variabili confondenti.\n    \\item \\textbf{Procedure}: Una descrizione passo-passo delle metodologie usate per raccogliere o generare i dati.\n    \\item \\textbf{Analisi Statistica}: I metodi statistici utilizzati per analizzare i dati, inclusi i software impiegati e il livello di significativit\\`a \\(p\\)-value.\n\n\\end{itemize}\nAd esempio, i dati sono stati raccolti utilizzando un'attrezzatura specifica (modello XYZ, produttore ABC). L'analisi statistica \\`e stata condotta utilizzando il software R (versione 4.2.0) e i risultati sono stati considerati significativi per \\(p < 0.05\\).\n\n\\section{Risultati}\nLa sezione dei risultati presenta i dati raccolti e analizzati in modo oggettivo, senza interpretazioni o discussioni. I risultati dovrebbero essere presentati in modo logico e chiaro, spesso supportati da figure e tabelle. Ogni figura e tabella deve essere numerata e avere una didascalia descrittiva.\n\\begin{itemize}\n    \\item I risultati preliminari hanno mostrato che [risultato 1].\n    \\item Come illustrato in Figura \\ref{fig:esempio_grafico}, si \\`e osservato un aumento significativo di [variabile].\n    \\item La Tabella \\ref{tab:esempio_tabella} riassume i principali risultati.\n\\end{itemize}\n\n\\begin{figure}[htbp]\n    \\centering\n    \\includegraphics[width=0.8\\textwidth]{placeholder.png} % Sostituire con il percorso dell'immagine\n    \\caption{Esempio di grafico: andamento di una variabile nel tempo. \\textit{Nota}: Questa figura \\`e un placeholder. Inserire il proprio grafico.}\n    \\label{fig:esempio_grafico}\n\\end{figure}\n\n\\begin{table}[htbp]\n    \\centering\n    \\caption{Esempio di tabella: Dati demografici dei partecipanti.}\n    \\label{tab:esempio_tabella}\n    \\begin{tabular}{lcc}\n        \\toprule\n        Caratteristica & Gruppo A (N=50) & Gruppo B (N=50) \\\\\n        \\midrule\n        Et\\`a media (anni) & \\(25.3 \\pm 2.1\\) & \\(26.1 \\pm 1.9\\) \\\\\n        Donne (\\%)       & 60              & 55              \\\\\n        Uomini (\\%)      & 40              & 45              \\\\\n        \\bottomrule\n    \\end{tabular}\n    \\caption*{Nota: I valori sono presentati come media \\(\\pm\\) deviazione standard o percentuale.}\n\\end{table}\n\n\\section{Discussione}\nLa discussione interpreta i risultati nel contesto della conoscenza esistente. Inizia riassumendo i risultati principali e poi li confronta con le scoperte di altri studi. Spiega il significato dei risultati, le implicazioni teoriche e pratiche. Questa sezione dovrebbe anche affrontare le limitazioni dello studio e suggerire direzioni per future ricerche.\n\\begin{itemize}\n    \\item I nostri risultati sono in linea con [studio 1] e supportano l'ipotesi che [ipotesi].\n    \\item Tuttavia, a differenza di quanto riportato da [studio 2], non abbiamo trovato prove di [fenomeno]. Ci\\`o potrebbe essere dovuto a [spiegazione].\n    \\item Una limitazione del presente studio \\`e [limitazione]. Future ricerche dovrebbero esplorare [direzione futura].\n\\end{itemize}\n\n\\section{Conclusioni}\nLe conclusioni riassumono i punti chiave del paper e ribadiscono il contributo principale della ricerca. Dovrebbero essere brevi e concise, fornendo una risposta diretta alle domande di ricerca poste nell'introduzione. Non dovrebbero introdurre nuove informazioni.\n\n\\section*{Conflitto di Interessi}\nGli autori dichiarano di non avere conflitti di interessi.\n\n\\section*{Finanziamento}\nQuesto lavoro \\`e stato supportato da [Nome Ente Finanziatore, Grant ID XXX].\n\n% --- Bibliografia ---\n\\newpage\n\\printbibliography[heading=bibintoc] % Stampa la bibliografia nel sommario\n\n% --- Appendici (opzionale) ---\n\\appendix\n\\section{Appendice A: Dati Supplementari}\nQuesta sezione pu\\`o contenere dati aggiuntivi, tabelle dettagliate, figure supplementari o codice che non sono essenziali per il corpo principale del paper ma che possono essere utili per la completezza e la replicabilit\\`a.\nAd esempio, si veda la Tabella \\ref{tab:dati_supplementari} per i dati grezzi.\n\n\\begin{table}[htbp]\n    \\centering\n    \\caption{Dati supplementari: Risultati dettagliati per ogni esperimento.}\n    \\label{tab:dati_supplementari}\n    \\begin{tabular}{cccc}\n        \\toprule\n        Esperimento & Condizione & Misura 1 & Misura 2 \\\\\n        \\midrule\n        1           & A          & 10.5     & 22.3     \\\\\n        2           & B          & 12.1     & 25.8     \\\\\n        3           & A          & 11.0     & 23.0     \\\\\n        \\bottomrule\n    \\end{tabular}\n\\end{table}\n\n\\end{document}";

  const handleBeforeMount = (monaco: typeof import("monaco-editor")) => {
    monacoRef.current = monaco;

    // Registra il linguaggio "latex"
    monaco.languages.register({ id: "latex" });

    // Definisci la tokenizzazione (basata su simple-tex.grammar)
    defineTokenization(monaco);

    // Definisci i temi
    themesArray.forEach((theme) => {
      monaco.editor.defineTheme(theme.name, theme.style);
    });

    // Autocompletion Provider
    defineAutocompletionProvider(monaco);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Custom commands
    editor.addAction({
      ...boldCommand,
      // Cmd+B su macOS, Ctrl+B su Windows/Linux
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB],
    });
    editor.addAction({
      ...italicCommand,
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI],
    });
    editor.addAction({
      ...underlineCommand,
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyU],
    });
    editor.addAction({
      ...compileCommand,
      keybindings: [
        // Compila o con Cmd+Enter o con Cmd+S
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      ],
    });

    const validateLaTeX = defineLinter(monaco);
    const currentModel = editor.getModel();
    if (currentModel) {
      validateLaTeX(currentModel); // Initial validation on load

      let debounceTimer: number;
      currentModel.onDidChangeContent(() => {
        clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(
          () => validateLaTeX(currentModel),
          500
        ); // Debounce validation
      });
    }

    if (props.readonly) {
      editorDialogRef!.current = editor;
    } else editorRef!.current = editor;
  };

  return (
    <Editor
      className={props.className}
      defaultLanguage="latex"
      defaultValue={defaultText}
      beforeMount={handleBeforeMount}
      onMount={handleEditorDidMount}
      theme={theme}
      options={{
        fontSize: fontSize,
        fontFamily: `var(--font-${fontFamily})`,
        minimap: { enabled: false },
        readOnly: props.readonly,
        wordWrap: "on",
      }}
    />
  );
}
