import { CodeLens, CodeLensProvider, Range, TextDocument } from "vscode";
import { settings } from "./Settings";


export default class RunnerCodeLensProvider implements CodeLensProvider {

    public provideCodeLenses(
        document: TextDocument
    ): CodeLens[] | Thenable<CodeLens[]> {
        const codeLens: CodeLens[] = [];

        const fileInfo = this.parsePhpFile(document);
        if (fileInfo === undefined) {
            return codeLens;
        }
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            let match: RegExpExecArray | null;

            const regex = this.getMethodReg();
            // regex.lastIndex = 0;
            const text = line.text.substr(0, 1000);
            if ((match = regex.exec(text))) {
                const range = new Range(i, match.index, i, match.index + match[0].length);
                codeLens.push(new CodeLens(range, {
                    title: 'Run...',
                    command: 'php-runner.run',
                    arguments: [fileInfo.namespace, fileInfo.className, match[1]]
                }));
            }
        }
        return codeLens;
    }

    private getMethodReg() {
        const methodNames = Array.isArray(settings.methodNames) ? settings.methodNames : [settings.methodNames];
        const methodNamesPatter = methodNames.join('|');

        return new RegExp(`public\\s+function\\s+(${methodNamesPatter})\\(\\s*\\)`);
    }

    private parsePhpFile(document: TextDocument) {
        let namespace = '';
        let className = '';
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);

            let match = /^namespace\s+([\w\\]+)\s*;/.exec(line.text);
            if (match) {
                namespace = match[1];
            }

            match = /\s*class\s+([A-Z][a-zA-Z0-9_]+)/.exec(line.text);
            if (match) {
                className = match[1];
            }
            if (namespace !== '' && className !== '') {
                return {
                    namespace,
                    className
                };
            }
        }
    }

    // public resolveCodeLens?(): CodeLens | Thenable<CodeLens> {
    //   return;
    // }
}