import * as vscode from 'vscode';

/**
 * Provides folding ranges for multi-line comments.
 */
export class SymCodeCommentFoldingRangeProvider implements vscode.FoldingRangeProvider {
    private MULTILINE_COMMENT_PATTERNS: Record<string, RegExp> = {
        php: /\/\*[\s\S]*?\*\//g,
        javascript: /\/\*[\s\S]*?\*\//g,
        javascriptreact: /\/\*[\s\S]*?\*\//g,
        css: /\/\*[\s\S]*?\*\//g,
        go: /\/\*[\s\S]*?\*\//g,
        java: /\/\*[\s\S]*?\*\//g,
        julia: /#=.*?=\n|#=.*/g, // Julia block comments
        jade: /\/\/-.*/g, // Jade block comments
        python: /('''|""")[\s\S]*?\1/g, // Supports '''...''' and """..."""
        scss: /\/\*[\s\S]*?\*\//g,
        typescript: /\/\*[\s\S]*?\*\//g,
        typescriptreact: /\/\*[\s\S]*?\*\//g,
        vb: /'[\s\S]*?\n/g, // VB multi-line comments
        vue: /<!--[\s\S]*?-->/g,
        asciidoc: /\/\/.*|\/\*[\s\S]*?\*\//g,
        apex: /\/\*[\s\S]*?\*\//g,
        csharp: /\/\*[\s\S]*?\*\//g,
        c: /\/\*[\s\S]*?\*\//g,
        cpp: /\/\*[\s\S]*?\*\//g,
        clojure: /;.*/g, // No block comments, but ; is used
        coffee: /###([\s\S]*?)###/g, // CoffeeScript block comments
        dart: /\/\*[\s\S]*?\*\//g,
        dockerfile: /#.*/g, // Dockerfile only has `#`
        elixir: /#.*$/g, // Elixir has only single-line comments
        elm: /{-[\s\S]*?-}/g, // Elm block comments
        erlang: /%\*[\s\S]*?\*%/g, // Erlang block comments
        fsharp: /\/\/.*|\/\*[\s\S]*?\*\//g,
        graphql: /#\*[\s\S]*?\*#/g,
        groovy: /\/\*[\s\S]*?\*\//g,
        haskell: /{-[\s\S]*?-}/g, // Haskell block comments
        handlebars: /{{!--[\s\S]*?--}}/g,
        hcl: /#.*$/g, // HCL has only single-line comments
        kotlin: /\/\*[\s\S]*?\*\//g,
        less: /\/\*[\s\S]*?\*\//g,
        lua: /--\[\[[\s\S]*?\]\]/g,
        makefile: /#.*/g, // Makefile has only `#` comments
        nim: /##\*[\s\S]*?\*##/g, // Nim block comments
        "objective-c": /\/\*[\s\S]*?\*\//g,
        perl: /=begin[\s\S]*?=cut/g, // Perl block comments
        perl6: /#\*[\s\S]*?\*#/g, // Perl6 block comments
        pgsql: /\/\*[\s\S]*?\*\//g,
        powershell: /<#([\s\S]*?)#>/g, // PowerShell block comments
        r: /#.*$/g, // R only has single-line comments
        ruby: /=begin[\s\S]*?=end/g, // Ruby block comments
        rust: /\/\*[\s\S]*?\*\//g,
        scala: /\/\*[\s\S]*?\*\//g,
        shellscript: /: '([\s\S]*?)'/g, // Shell multi-line comments
        solidity: /\/\*[\s\S]*?\*\//g,
        sql: /\/\*[\s\S]*?\*\//g,
        stylus: /\/\/.*|\/\*[\s\S]*?\*\//g,
        swift: /\/\*[\s\S]*?\*\//g,
        tcl: /#.*$/g, // TCL only has single-line comments
        twig: /{#.*?#}/g // Twig block comments
    };
    
    // Store the folding ranges globally
    private cachedFoldingRanges: vscode.FoldingRange[] = [];

    // Event emitter for folding range changes
    private onDidChangeFoldingRangesEvent = new vscode.EventEmitter<void>();

    // Event to listen for folding range changes
    public readonly onDidChangeFoldingRanges: vscode.Event<void>;

    // Constructor
    constructor() {
        this.onDidChangeFoldingRanges = this.onDidChangeFoldingRangesEvent.event;
    }

    /**
     * Scans the document for multi-line comments and returns folding ranges.
     */
    provideFoldingRanges(document: vscode.TextDocument, context: vscode.FoldingContext, token: vscode.CancellationToken): vscode.FoldingRange[] {
        const ranges: vscode.FoldingRange[] = [];
        const languageId = document.languageId;
        const pattern = this.MULTILINE_COMMENT_PATTERNS[languageId];
    
        if (!pattern) {
            return ranges; // No pattern for this language
        }
    
        const text = document.getText();
        let match;
    
        // Match all multi-line comments using the regex pattern
        while ((match = pattern.exec(text)) !== null) {
            const start = document.positionAt(match.index).line;
            const end = document.positionAt(match.index + match[0].length).line;
    
            if (start < end) {
                ranges.push(new vscode.FoldingRange(start, end, vscode.FoldingRangeKind.Comment));
            }
        }
    
        // ✅ Store the ranges globally
        this.cachedFoldingRanges = ranges;
        return ranges;
    }

    /**
     * Returns the currently stored folding ranges.
     */
    public getCachedFoldingRanges(): vscode.FoldingRange[] {
        return this.cachedFoldingRanges;
    }

    /**
     * Triggers a refresh of folding ranges.
     */
    public refresh(): void {
        this.onDidChangeFoldingRangesEvent.fire();
    }
}
