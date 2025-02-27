import * as vscode from "vscode";
import { SYMBOLS } from "./symbols";


// **List of supported languages for auto-completion**
const supportedLanguages = [
	"php", "html", "javascript", "javascriptreact", "css", "git-commit",
	"go", "java", "julia", "markdown", "jade", "python", "scss", "typescript",
	"typescriptreact", "vb", "xml", "vue", "asciidoc", "apex", "csharp", "c",
	"cpp", "clojure", "coffee", "dart", "dockerfile", "elixir", "elm", "erlang",
	"fsharp", "graphql", "groovy", "haskell", "handlebars", "hcl", 
	"jsonc", "kotlin", "less", "lua", "makefile", "nim", "objective-c", "perl",
	"perl6", "pgsql", "powershell", "r", "ruby", "rust", "scala", "shellscript",
	"solidity", "sql", "stylus", "swift", "tcl", "twig", "yaml", "forcesourcemanifest"
];

// **Languages that are unrestricted (allow symbols anywhere, not just in comments/strings)**
const UNRESTRICTED_LANGUAGES: string[] = [
    "markdown", "git-commit", "yaml", "jsonc", "xml", "html", "forcesourcemanifest"
];

// **Define comment patterns for each language**
// Used to detect whether the cursor is inside a comment
const COMMENT_PATTERNS: Record<string, RegExp> = {
    php: /\/\/.*|\/\*[\s\S]*?\*\//,
    javascript: /\/\/.*|\/\*[\s\S]*?\*\//,
    javascriptreact: /\/\/.*|\/\*[\s\S]*?\*\//,
    css: /\/\*[\s\S]*?\*\//,
    go: /\/\/.*|\/\*[\s\S]*?\*\//,
    java: /\/\/.*|\/\*[\s\S]*?\*\//,
    julia: /#.*$/,
    jade: /\/\/-.*/,
    python: /#.*$/,
    scss: /\/\*[\s\S]*?\*\//,
    typescript: /\/\/.*|\/\*[\s\S]*?\*\//,
    typescriptreact: /\/\/.*|\/\*[\s\S]*?\*\//,
    vb: /'.*$/,
    vue: /<!--[\s\S]*?-->/,
    asciidoc: /\/\/.*|\/\*[\s\S]*?\*\//,
    apex: /\/\/.*|\/\*[\s\S]*?\*\//,
    csharp: /\/\/.*|\/\*[\s\S]*?\*\//,
    c: /\/\/.*|\/\*[\s\S]*?\*\//,
    cpp: /\/\/.*|\/\*[\s\S]*?\*\//,
    clojure: /;.*/,
    coffee: /#.*$/,
    dart: /\/\/.*|\/\*[\s\S]*?\*\//,
    dockerfile: /#.*/,
    elixir: /#.*$/,
    elm: /--.*$/,
    erlang: /%.*/,
    fsharp: /\/\/.*|\/\*[\s\S]*?\*\//,
    graphql: /#.*/,
    groovy: /\/\/.*|\/\*[\s\S]*?\*\//,
    haskell: /--.*$/,
    handlebars: /{{!--[\s\S]*?--}}/,
    hcl: /#.*/,
    kotlin: /\/\/.*|\/\*[\s\S]*?\*\//,
    less: /\/\*[\s\S]*?\*\//,
    lua: /--.*$/,
    makefile: /#.*/,
    nim: /#.*/,
    "objective-c": /\/\/.*|\/\*[\s\S]*?\*\//,
    perl: /#.*/,
    perl6: /#.*/,
    pgsql: /--.*$/,
    powershell: /#.*/,
    r: /#.*/,
    ruby: /#.*/,
    rust: /\/\/.*|\/\*[\s\S]*?\*\//,
    scala: /\/\/.*|\/\*[\s\S]*?\*\//,
    shellscript: /#.*/,
    solidity: /\/\/.*|\/\*[\s\S]*?\*\//,
    sql: /--.*$/,
    stylus: /\/\/.*|\/\*[\s\S]*?\*\//,
    swift: /\/\/.*|\/\*[\s\S]*?\*\//,
    tcl: /#.*/,
    twig: /{#.*?#}/
};

// **Define string patterns for each language**
// Used to detect whether the cursor is inside a string
const STRING_PATTERNS: Record<string, RegExp> = {
    php: /(['"`])(?:\\.|(?!\1).)*\1/g,
    javascript: /(['"`])(?:\\.|(?!\1).)*\1/g,
    javascriptreact: /(['"`])(?:\\.|(?!\1).)*\1/g,
    css: /"(.*?)"|'(.*?)'/g,
    go: /(['"`])(?:\\.|(?!\1).)*\1/g,
    java: /(['"`])(?:\\.|(?!\1).)*\1/g,
    julia: /(['"`])(?:\\.|(?!\1).)*\1/g,
    jade: /"(.*?)"|'(.*?)'/g,
    python: /(['"`])(?:\\.|(?!\1).)*\1/g,  // Includes triple quotes
    scss: /"(.*?)"|'(.*?)'/g,
    typescript: /(['"`])(?:\\.|(?!\1).)*\1/g,
    typescriptreact: /(['"`])(?:\\.|(?!\1).)*\1/g,
    vb: /"(.*?)"/g,
    vue: /"(.*?)"|'(.*?)'/g,
    asciidoc: /"(.*?)"|'(.*?)'/g,
    apex: /(['"`])(?:\\.|(?!\1).)*\1/g,
    csharp: /(['"`])(?:\\.|(?!\1).)*\1/g,
    c: /(['"`])(?:\\.|(?!\1).)*\1/g,
    cpp: /(['"`])(?:\\.|(?!\1).)*\1/g,
    clojure: /"(.*?)"/g,
    coffee: /(['"`])(?:\\.|(?!\1).)*\1/g,
    dart: /(['"`])(?:\\.|(?!\1).)*\1/g,
    dockerfile: /"(.*?)"|'(.*?)'/g,
    elixir: /(['"`])(?:\\.|(?!\1).)*\1/g,
    elm: /"(.*?)"|'(.*?)'/g,
    erlang: /"(.*?)"|'(.*?)'/g,
    fsharp: /(['"`])(?:\\.|(?!\1).)*\1/g,
    graphql: /"(.*?)"|'(.*?)'/g,
    groovy: /(['"`])(?:\\.|(?!\1).)*\1/g,
    haskell: /"(.*?)"|'(.*?)'/g,
    handlebars: /"(.*?)"|'(.*?)'/g,
    hcl: /"(.*?)"|'(.*?)'/g,
    kotlin: /(['"`])(?:\\.|(?!\1).)*\1/g,
    less: /"(.*?)"|'(.*?)'/g,
    lua: /(['"`])(?:\\.|(?!\1).)*\1/g,
    makefile: /"(.*?)"|'(.*?)'/g,
    nim: /(['"`])(?:\\.|(?!\1).)*\1/g,
    "objective-c": /(['"`])(?:\\.|(?!\1).)*\1/g,
    perl: /(['"`])(?:\\.|(?!\1).)*\1/g,
    perl6: /(['"`])(?:\\.|(?!\1).)*\1/g,
    pgsql: /(['"`])(?:\\.|(?!\1).)*\1/g,
    powershell: /(['"`])(?:\\.|(?!\1).)*\1/g,
    r: /(['"`])(?:\\.|(?!\1).)*\1/g,
    ruby: /(['"`])(?:\\.|(?!\1).)*\1/g,
    rust: /(['"`])(?:\\.|(?!\1).)*\1/g,
    scala: /(['"`])(?:\\.|(?!\1).)*\1/g,
    shellscript: /"(.*?)"|'(.*?)'/g,
    solidity: /(['"`])(?:\\.|(?!\1).)*\1/g,
    sql: /(['"`])(?:\\.|(?!\1).)*\1/g,
    stylus: /"(.*?)"|'(.*?)'/g,
    swift: /(['"`])(?:\\.|(?!\1).)*\1/g,
    tcl: /(['"`])(?:\\.|(?!\1).)*\1/g,
    twig: /"(.*?)"|'(.*?)'/g
};

/**
 * Determines if the given language should be restricted to comments and strings.
 * @param languageId The language identifier from the document.
 * @returns `true` if restricted (requires comment/string), `false` if unrestricted.
 */
function isRestrictedLanguage(languageId: string): boolean {
    return !UNRESTRICTED_LANGUAGES.includes(languageId);
}

// **Function to check if the cursor is inside a comment**
function isInsideComment(document: vscode.TextDocument, position: vscode.Position): boolean {
    const languageId = document.languageId;
    const lineText = document.lineAt(position.line).text.substring(0, position.character);
    return COMMENT_PATTERNS[languageId] ? COMMENT_PATTERNS[languageId].test(lineText) : false;
}

// **Function to check if the cursor is inside a string**
function isInsideString(document: vscode.TextDocument, position: vscode.Position): boolean {
    const languageId = document.languageId;
    const lineText = document.lineAt(position.line).text;
    
    // Find all matching string delimiters on the line
    const match = STRING_PATTERNS[languageId] ? lineText.match(STRING_PATTERNS[languageId]) : null;
    if (!match) { return false; }

    // Check if the cursor is inside the matched string
    return match.some((str) => {
        const start = lineText.indexOf(str);
        const end = start + str.length;
        return position.character > start && position.character < end;
    });
}

// **Function to activate the extension**
export function activate(context: vscode.ExtensionContext) {
    // Register the completion provider for symbol auto-completion
    const provider = vscode.languages.registerCompletionItemProvider(
        supportedLanguages,
        {
            provideCompletionItems(document, position, token, context) {
                // Ensure the cursor is inside a comment or string
                if (isRestrictedLanguage(document.languageId) && !isInsideComment(document, position) && !isInsideString(document, position)) {
                    return [];
                }

                // Generate completion items from SYMBOLS
                return Object.entries(SYMBOLS).map(([key, { symbol, description }]) => {
                    const completion = new vscode.CompletionItem(description, vscode.CompletionItemKind.Text);
                    
                    // **Insert only the emoji**
                    completion.insertText = symbol;
                    completion.documentation = new vscode.MarkdownString(description);

                    // **Only use TextEdit, remove insertText to prevent duplication**
                    completion.additionalTextEdits = [
                        vscode.TextEdit.replace(new vscode.Range(position.translate(0, symbol.length*-1), position), "")
                    ];
                    
                    // **Force VS Code to respect original order by assigning incremental sortText**
                    completion.sortText = description.replace(symbol, "").trim();

                    return completion;
                });
            },
        },
        ":" // This ensures : triggers auto-completion
    );

    // **Command to manually trigger symbol completion**
    const showSymbolCompletionCommand = vscode.commands.registerCommand("extension.showSymbolCompletion", async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("No active editor.");
            return;
        }

        // Insert a ":" and trigger autocomplete
        editor.edit((editBuilder) => {
            editBuilder.insert(editor.selection.active, ":");
        }).then(() => {
            // Now, trigger the auto-completion dropdown **AFTER** the : is inserted
            vscode.commands.executeCommand("editor.action.triggerSuggest");
        });
    });

    // Register both the completion provider and manual trigger command
    context.subscriptions.push(provider, showSymbolCompletionCommand);
}