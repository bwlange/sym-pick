import * as vscode from "vscode";

// List of support symbols
export const SYMBOLS: Record<string, { prefix: string; symbol: string; description: string }> = {
    alert: {
        prefix: ":alert",
        symbol: "❗",
        description: "❗ Alert"
    },
    api: {
        prefix: ":api",
        symbol: "🌐",
        description: "🌐 API"
    },
    api_gateway: {
        prefix: ":api_gateway",
        symbol: "🌐",
        description: "🌐 API gateway"
    },
    async: {
        prefix: ":async",
        symbol: "⏳",
        description: "⏳ Async"
    },
    build: {
        prefix: ":build",
        symbol: "🔧",
        description: "🔧 Build(s)"
    },
    callout: {
        prefix: ":callout",
        symbol: "📢",
        description: "📢 Callout"
    },
    complete: {
        prefix: ":complete",
        symbol: "✅",
        description: "✅ Complete"
    },
    configuration: {
        prefix: ":configuration",
        symbol: "🔧",
        description: "🔧 Configuration"
    },
    connection: {
        prefix: ":connection",
        symbol: "🔗",
        description: "🔗 Connection"
    },
    contract: {
        prefix: ":contract",
        symbol: "📜",
        description: "📜 Contract(s)"
    },
    directory: {
        prefix: ":directory",
        symbol: "📂",
        description: "📂 Directory"
    },
    documentation: {
        prefix: ":documentation",
        symbol: "📝",
        description: "📝 Documentation"
    },
    endpoint: {
        prefix: ":endpoint",
        symbol: "🌐",
        description: "🌐 Endpoint"
    },
    error: {
        prefix: ":error",
        symbol: "🔥",
        description: "🔥 Error"
    },
    exception: {
        prefix: ":exception",
        symbol: "🔥",
        description: "🔥 Exception"
    },
    export: {
        prefix: ":export",
        symbol: "🚀",
        description: "🚀 Export"
    },
    fast_response: {
        prefix: ":fast_response",
        symbol: "⚡",
        description: "⚡ Fast response"
    },
    fee: {
        prefix: ":fee",
        symbol: "💲",
        description: "💲 Fee"
    },
    failure: {
        prefix: ":failure",
        symbol: "🔥",
        description: "🔥 Failure"
    },
    filter: {
        prefix: ":filter",
        symbol: "🔍",
        description: "🔍 Filter"
    },
    find: {
        prefix: ":find",
        symbol: "🔍",
        description: "🔍 Find"
    },
    fire: {
        prefix: ":fire",
        symbol: "🔥",
        description: "🔥 Fire (hot features)"
    },
    folder: {
        prefix: ":folder",
        symbol: "📂",
        description: "📂 Folder"
    },
    fourleaf_clover: {
        prefix: ":four-leaf_clover",
        symbol: "🍀",
        description: "🍀 Four-leaf Clover"
    },
    goal: {
        prefix: ":goal",
        symbol: "🎯",
        description: "🎯 Goal"
    },
    heart: {
        prefix: ":heart",
        symbol: "💖",
        description: "💖 Heart"
    },
    http_get: {
        prefix: ":http_get",
        symbol: "📡",
        description: "📡 HTTP GET"
    },
    http_post: {
        prefix: ":http_post",
        symbol: "📡",
        description: "📡 HTTP POST"
    },
    http_request: {
        prefix: ":http_request",
        symbol: "📡",
        description: "📡 HTTP Request"
    },
    important_alert: {
        prefix: ":important_alert",
        symbol: "❗",
        description: "❗ Important alert"
    },
    incoming_request: {
        prefix: ":incoming_request",
        symbol: "📥",
        description: "📥 Incoming request"
    },
    integration: {
        prefix: ":integration",
        symbol: "🚀",
        description: "🚀 Integration"
    },
    iterate: {
        prefix: ":iterate",
        symbol: "🔄",
        description: "🔄 Iterate"
    },
    lightbulb: {
        prefix: ":lightbulb",
        symbol: "💡",
        description: "💡 Lightbulb (for ideas)"
    },
    link: {
        prefix: ":link",
        symbol: "🔗",
        description: "🔗 Link"
    },
    list: {
        prefix: ":list",
        symbol: "📋",
        description: "📋 List"
    },
    loop: {
        prefix: ":loop",
        symbol: "🔄",
        description: "🔄 Loop"
    },
    loudspeaker: {
        prefix: ":loudspeaker",
        symbol: "📢",
        description: "📢 Loudspeaker (announcement)"
    },
    microservice: {
        prefix: ":microservice",
        symbol: "⚡",
        description: "⚡ microservice"
    },
    mulesoft: {
        prefix: ":mulesoft",
        symbol: "🐴",
        description: "🐴 MuleSoft"
    },
    notepad: {
        prefix: ":notepad",
        symbol: "📝",
        description: "📝 Notepad (notes)"
    },
    notes: {
        prefix: ":notes",
        symbol: "📌",
        description: "📌 Notes"
    },
    outgoing_response: {
        prefix: ":outgoing_response",
        symbol: "📤",
        description: "📤 Outgoing response"
    },
    package: {
        prefix: ":package",
        symbol: "📦",
        description: "📦 Package"
    },
    party_popper: {
        prefix: ":party_popper",
        symbol: "🎉",
        description: "🎉 Party Popper"
    },
    payload: {
        prefix: ":payload",
        symbol: "📦",
        description: "📦 Payload"
    },
    performance_boost: {
        prefix: ":performance_boost",
        symbol: "🚀",
        description: "🚀 Performance boost"
    },
    pushpin: {
        prefix: ":pushpin",
        symbol: "📌",
        description: "📌 Pushpin (important notes)"
    },
    rainbow: {
        prefix: ":rainbow",
        symbol: "🌈",
        description: "🌈 Rainbow"
    },
    refresh: {
        prefix: ":refresh",
        symbol: "🔄",
        description: "🔄 Refresh"
    },
    retry: {
        prefix: ":retry",
        symbol: "🔄",
        description: "🔄 Retry"
    },
    rocket: {
        prefix: ":rocket",
        symbol: "🚀",
        description: "🚀 Rocket (fast performance)"
    },
    search: {
        prefix: ":search",
        symbol: "🔍",
        description: "🔍 Search"
    },
    setup: {
        prefix: ":setup",
        symbol: "🛠",
        description: "🛠 Setup"
    },
    sparkles: {
        prefix: ":sparkles",
        symbol: "✨",
        description: "✨ Sparkles"
    },
    star: {
        prefix: ":star",
        symbol: "🌟",
        description: "🌟 Star"
    },
    stop: {
        prefix: ":stop",
        symbol: "🛑",
        description: "🛑 Stop"
    },
    stop_sign: {
        prefix: ":stop_sign",
        symbol: "🛑",
        description: "🛑 Stop sign (critical issue)"
    },
    success: {
        prefix: ":success",
        symbol: "✅",
        description: "✅ Success"
    },
    sync: {
        prefix: ":sync",
        symbol: "⏳",
        description: "⏳ Sync"
    },
    system: {
        prefix: ":system",
        symbol: "🖥",
        description: "🖥 System"
    },
    target: {
        prefix: ":target",
        symbol: "🎯",
        description: "🎯 Target"
    },
    time: {
        prefix: ":time",
        symbol: "⏳",
        description: "⏳ Time"
    },
    tools: {
        prefix: ":tools",
        symbol: "🛠",
        description: "🛠 Tools"
    },
    url: {
        prefix: ":url",
        symbol: "🔗",
        description: "🔗 URL"
    },
    warning: {
        prefix: ":warning",
        symbol: "⚠️",
        description: "⚠️ Warning"
    },
    work_in_progress: {
        prefix: ":work_in_progress",
        symbol: "🚧",
        description: "🚧 Work in progress"
    },
    wrench: {
        prefix: ":wrench",
        symbol: "🛠",
        description: "🛠 Wrench fixes"
    }
};

// List of supported languages
const supportedLanguages = [
	"php", "html", "javascript", "javascriptreact", "css", "git-commit",
	"go", "java", "julia", "markdown", "jade", "python", "scss", "typescript",
	"typescriptreact", "vb", "xml", "vue", "asciidoc", "apex", "csharp"
];

// **Define comment patterns for each language**
const COMMENT_PATTERNS: Record<string, RegExp> = {
    php: /\/\/.*|\/\*[\s\S]*?\*\//,
    html: /<!--[\s\S]*?-->/,
    javascript: /\/\/.*|\/\*[\s\S]*?\*\//,
    javascriptreact: /\/\/.*|\/\*[\s\S]*?\*\//,
    css: /\/\*[\s\S]*?\*\//,
    "git-commit": /#.*/,
    go: /\/\/.*|\/\*[\s\S]*?\*\//,
    java: /\/\/.*|\/\*[\s\S]*?\*\//,
    julia: /#.*$/,
    markdown: /<!--[\s\S]*?-->/,
    jade: /\/\/-.*/,
    python: /#.*$/,
    scss: /\/\*[\s\S]*?\*\//,
    typescript: /\/\/.*|\/\*[\s\S]*?\*\//,
    typescriptreact: /\/\/.*|\/\*[\s\S]*?\*\//,
    vb: /'.*$/,
    xml: /<!--[\s\S]*?-->/,
    vue: /<!--[\s\S]*?-->/,
    asciidoc: /\/\/.*|\/\*[\s\S]*?\*\//,
    apex: /\/\/.*|\/\*[\s\S]*?\*\//,
    csharp: /\/\/.*|\/\*[\s\S]*?\*\//
};

// **Define string patterns for each language**
const STRING_PATTERNS: Record<string, RegExp> = {
    php: /(['"`])(?:\\.|(?!\1).)*\1/g,
    html: /"(.*?)"|'(.*?)'/g,
    javascript: /(['"`])(?:\\.|(?!\1).)*\1/g,
    javascriptreact: /(['"`])(?:\\.|(?!\1).)*\1/g,
    css: /"(.*?)"|'(.*?)'/g,
    go: /(['"`])(?:\\.|(?!\1).)*\1/g,
    java: /(['"`])(?:\\.|(?!\1).)*\1/g,
    julia: /(['"`])(?:\\.|(?!\1).)*\1/g,
    markdown: /"(.*?)"|'(.*?)'/g,
    jade: /"(.*?)"|'(.*?)'/g,
    python: /(['"`])(?:\\.|(?!\1).)*\1/g,  // Includes triple quotes
    scss: /"(.*?)"|'(.*?)'/g,
    typescript: /(['"`])(?:\\.|(?!\1).)*\1/g,
    typescriptreact: /(['"`])(?:\\.|(?!\1).)*\1/g,
    vb: /"(.*?)"/g,
    xml: /"(.*?)"|'(.*?)'/g,
    vue: /"(.*?)"|'(.*?)'/g,
    asciidoc: /"(.*?)"|'(.*?)'/g,
    apex: /(['"`])(?:\\.|(?!\1).)*\1/g,
    csharp: /(['"`])(?:\\.|(?!\1).)*\1/g
};

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

// Activate the extension on startup and register the completion provider.
export function activate(context: vscode.ExtensionContext) {
	// Register the completion provider
	const provider = vscode.languages.registerCompletionItemProvider(
		supportedLanguages,
		{
			provideCompletionItems(document, position, token, context) {
				// Only trigger inside comments or strings
				if (!isInsideComment(document, position) && !isInsideString(document, position)) {
					return [];
				}

				// Get the text before the cursor
				const linePrefix = document.lineAt(position).text.substring(0, position.character);
				const prefixMatch = linePrefix.match(/:(\w*)$/); // Detect :word
				
				if (!prefixMatch) {
					return [];
				}

				const prefixLength = prefixMatch[0].length;
				const replaceRange = new vscode.Range(position.translate(0, -prefixLength), position);

				// Generate completion items from SYMBOLS
				return Object.entries(SYMBOLS).map(([key, { symbol, description }]) => {
					const completion = new vscode.CompletionItem(description, vscode.CompletionItemKind.Text);
					
					// **Insert only the emoji**
					completion.insertText = symbol;
					completion.documentation = new vscode.MarkdownString(description);

					// **Only use TextEdit, remove insertText to prevent duplication**
					completion.additionalTextEdits = [
						vscode.TextEdit.replace(replaceRange, "")
					];
					
					// **Force VS Code to respect original order by assigning incremental sortText**
					completion.sortText = description.replace(symbol, "").trim();

					return completion;
				});
			},
		},
		":" // This ensures : triggers auto-completion
	);

	// **Ensure Manual Trigger Works**
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