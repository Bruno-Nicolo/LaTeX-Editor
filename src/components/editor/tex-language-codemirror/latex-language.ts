import { parser } from "./parser"; // Assumes parser.js is generated in the same directory
import {
  LRLanguage,
  LanguageSupport,
  foldNodeProp,
  foldInside,
  indentNodeProp,
} from "@codemirror/language";
import { styleTags, tags as t, Tag } from "@lezer/highlight";
import type { Extension } from "@codemirror/state"; // Import as type
import { completeFromList } from "@codemirror/autocomplete";
import { linter } from "@codemirror/lint";
import type { Diagnostic } from "@codemirror/lint"; // Import as type

// Define Lezer tags for highlighting
// Mapping grammar node names to highlight tags
const latexHighlighting: { [selector: string]: Tag | readonly Tag[] } = {
  // Comments
  comment: t.lineComment,
  directive_comment: t.blockComment, // Or a different comment tag if more appropriate

  // Control Sequences and Primitives
  control_sequence: t.keyword, // Or t.controlKeyword, t.macroName
  primitive: t.keyword, // Or t.builtin

  // Macro Parameters
  macro_parameter: t.variableName,
  mac_param: t.modifier, // For the # part
  dec_digit: t.number, // For the digit part of macro_parameter

  // Braces and Grouping
  "left_brace right_brace": t.brace,
  "begingroup endgroup": t.keyword, // For \begingroup and \endgroup

  // Math Mode
  "left_math_shift right_math_shift": t.special(t.brace), // or t.meta
  "left_double_math_shift right_double_math_shift": t.special(t.brace), // or t.meta
  "MathShiftGroup/...": t.emphasis, // Example: highlight content within math mode

  // Category Code Tokens (examples)
  tab_mark: t.escape,
  car_ret: t.escape,
  sup_mark: t.operator, // Superscript
  sub_mark: t.operator, // Subscript
  active_char: t.strong,

  // Literals and Characters
  letter: t.literal,
  other_char: t.content,
  // "spacer": t.space, // t.space does not exist, commented out

  // Invalid
  invalid_char: t.invalid,

  // Punctuation for structure
  "SimpleGroup/left_brace SimpleGroup/right_brace": t.paren,
  "SemiSimpleGroup/begingroup SemiSimpleGroup/endgroup": t.keyword,
  "MathShiftGroup/ordinary_math_mode/left_math_shift MathShiftGroup/ordinary_math_mode/right_math_shift":
    t.meta,
  "MathShiftGroup/display_math_mode/left_double_math_shift MathShiftGroup/display_math_mode/right_double_math_shift":
    t.meta,

  // Fallback for other parsed elements if needed
  // "Token": t.atom // A generic fallback, adjust as necessary
};

// Create the LRLanguage instance
export const latexLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags(latexHighlighting),
      indentNodeProp.add({
        SimpleGroup: (cx) => cx.column(cx.node.from) + cx.unit, // Basic indentation for groups
        // Add more indentation rules as needed for environments, etc.
      }),
      foldNodeProp.add({
        SimpleGroup: foldInside, // Fold content within {}
        SemiSimpleGroup: foldInside, // Fold content within \begingroup ... \endgroup
        // Add folding for environments once they are better defined in the grammar
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: "%" }, // For single-line comments
    indentOnInput: /^\s*(?:}|\\endgroup|\\end[}\s])/, // Basic indent on input
    // closeBrackets: {brackets: ["(", "[", "{", "'", "\\\""]}, // TODO: Needs careful consideration for LaTeX
  },
});

// Basic Autocompletion
// TODO: Expand with more LaTeX commands and environments
// This would ideally be populated from the {{{signatures}}} and {{{tokens}}}
// or a predefined list.
const latexCompletions = [
  // Common Commands
  { label: "\\\\documentclass", type: "keyword" },
  { label: "\\\\usepackage", type: "keyword" },
  { label: "\\\\begin", type: "keyword", apply: "\\\\begin{}{}" },
  { label: "\\\\end", type: "keyword", apply: "\\\\end{}{}" },
  { label: "\\\\section", type: "keyword" },
  { label: "\\\\subsection", type: "keyword" },
  { label: "\\\\textit", type: "function" },
  { label: "\\\\textbf", type: "function" },
  { label: "\\\\texttt", type: "function" },
  { label: "\\\\\\", type: "function" }, // Newline, ensure this doesn't cause issues if it's just one backslash needed

  // Environments (examples)
  { label: "document", type: "class", boost: 2 }, // For \begin{document}
  { label: "itemize", type: "class" },
  { label: "enumerate", type: "class" },
  { label: "equation", type: "class" },
  { label: "figure", type: "class" },

  // Greek letters (examples)
  { label: "\\\\alpha", type: "constant" },
  { label: "\\\\beta", type: "constant" },
  { label: "\\\\gamma", type: "constant" },

  // Math symbols (examples)
  { label: "\\\\leq", type: "operator" },
  { label: "\\\\geq", type: "operator" },
  { label: "\\\\neq", type: "operator" },
  { label: "\\\\sum", type: "operator" },
  { label: "\\\\int", type: "operator" },
];

export const latexAutocomplete = latexLanguage.data.of({
  autocomplete: completeFromList(latexCompletions),
});

// Basic Linter
// TODO: This is a very basic example. Real LaTeX linting is complex.
export const latexLinter = linter((_view) => {
  const diagnostics: Diagnostic[] = [];
  // A simple check for unmatched braces - the parser tree can help here.
  // This requires iterating through the syntax tree.
  // For now, let's placeholder this functionality.
  // Example:
  // tree(view.state).iterate({
  //   enter: (type, from, to) => {
  //     if (type.name == "UnmatchedBrace") { // Assuming your grammar could identify this
  //       diagnostics.push({
  //         from, to,
  //         severity: "error",
  //         message: "Unmatched brace"
  //       });
  //     }
  //   }
  // });
  return diagnostics;
});

// Main function to get all LaTeX related extensions
export function latex(): LanguageSupport {
  return new LanguageSupport(latexLanguage, [
    latexAutocomplete,
    // latexLinter // Enable once more robust
  ]);
}

// Potentially, you might want to export a full extension array:
export function latexExtensions(): Extension[] {
  return [
    latex(),
    // other latex-specific extensions can be added here
    // e.g., specific keymaps, theme extensions for latex
  ];
}
