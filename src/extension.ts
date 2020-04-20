// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import RunnerCodeLensProvider from './RunnerCodeLensProvider';
import * as Settings from './Settings';

let terminalName = 'php-runner-terminal';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "php-runner" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('php-runner.run', (namespace: string, className: string, methodName: string) => {
		let terminal = vscode.window.terminals.find(item => item.name === terminalName);
		if (terminal !== undefined) {
			terminal.dispose();
		}
		terminal = vscode.window.createTerminal(terminalName);

		terminal.sendText(`php artisan tinker`);
		terminal.sendText(`(new ${namespace}\\${className}())->${methodName}()`);
		terminal.show();
	});

	context.subscriptions.push(
		vscode.languages.registerCodeLensProvider({ scheme: "file", language: "php" }, new RunnerCodeLensProvider())
	);

	context.subscriptions.push(disposable);
	context.subscriptions.push(Settings.settingsDisposable);

	context.subscriptions.push({
		dispose() {
			let terminal = vscode.window.terminals.find(item => item.name === terminalName);
			if (terminal) {
				terminal.dispose();
			}
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() {

}
