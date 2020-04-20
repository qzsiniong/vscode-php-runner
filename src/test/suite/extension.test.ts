// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as assert from 'assert';
import * as vscode from 'vscode';
import { activate, getDocUri } from '../helper';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('codeLens test', async () => {
		const docUri = getDocUri('Test.php');
		await activate(docUri);

		const codeLensList = (await vscode.commands.executeCommand('vscode.executeCodeLensProvider', docUri) as vscode.CodeLens[]);

		assert.equal(codeLensList.length, 2);

		const expectedCodeLensList = [
			{
				command: {
					title: 'Run...',
					command: 'php-runner.run',
					arguments: ['App\\Test', 'Test', 'exec']
				}
			},
			{
				command: {
					title: 'Run...',
					command: 'php-runner.run',
					arguments: ['App\\Test', 'Test', 'run']
				}
			}
		];

		expectedCodeLensList.forEach((expectedItem, i) => {
			const actualItem = codeLensList[i];

			assert.ok(actualItem.command !== undefined);
			assert.equal(actualItem.command?.title, expectedItem.command?.title);
			assert.equal(actualItem.command?.command, expectedItem.command?.command);
			assert.deepEqual(actualItem.command?.arguments, expectedItem.command?.arguments);
		});
	});
});
