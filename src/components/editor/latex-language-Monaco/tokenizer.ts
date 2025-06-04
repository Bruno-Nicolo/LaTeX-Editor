export function defineTokenization(monaco: typeof import("monaco-editor")) {
  monaco.languages.setMonarchTokensProvider("latex", {
    defaultToken: "", // Default to no specific token type if not matched
    tokenizer: {
      root: [
        // line_comment: "%" /[^\n]*/
        [/%.*$/, "comment"],

        // control_sequence: "\" /([a-zA-Z@]+|[^a-zA-Z@\s])/?
        [/\\[a-zA-Z@]+[*]?/, "keyword"], // Matches \command, \command*
        [/\\[^a-zA-Z@\s]/, "keyword"], // Matches single char special commands like \\, \[, \{, etc.

        // SimpleGroup: "{" statement* "}"
        [/{/, { token: "delimiter.bracket", next: "@bracketContents" }],
        // Closing '}' is handled by @bracketContents to pop the state

        // Numbers (from original, can be useful)
        [/\d+/, "number"],

        // text: /[^{}\\%]+/+
        // Matches sequences of characters that are not braces, percent signs, or backslashes.
        // This should come after more specific rules.
        [/[^{}\\%]+/, ""],

        // Whitespace (from original, though grammar implies skipping)
        [/\s+/, ""],
      ],
      bracketContents: [
        // Inside a group (bracket), we can have all the same tokens as root
        [/%.*$/, "comment"],
        [/\\[a-zA-Z@]+[*]?/, "keyword"],
        [/\\[^a-zA-Z@\s]/, "keyword"],
        [/{/, { token: "delimiter.bracket", next: "@bracketContents" }], // Nested groups
        [/}/, { token: "delimiter.bracket", next: "@pop" }], // Closing brace of the current group
        [/\d+/, "number"],
        [/[^{}\\%]+/, ""],
        [/\s+/, ""],
      ],
    },
  });
}
