import { workspace } from "vscode";

interface ISettings {
    methodNames: string | string[];
    beforeInvoke?: string;
}

const defaultSettings:ISettings = {
    methodNames: ['exec', 'run']
};

export const settings = getSettings();

function getSettings(): ISettings {
    return workspace.getConfiguration().get<ISettings>('php-runner')|| defaultSettings;
}

export const settingsDisposable = workspace.onDidChangeConfiguration(change => {
	Object.assign(settings, getSettings());
});
