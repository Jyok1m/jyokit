#!/usr/bin/env node

/**
 * JyoKit CLI v2.1.0
 * Your all-in-one tool for DevOps & Web App boilerplates
 */

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");

const program = new Command();

// Map logical template names to folders under ./templates/
const TEMPLATE_MAP = {
	express: "express-starter",
	next: "nextjs-starter",
	expo: "expojs-starter",
};

// Utilitaires
const listTemplates = () => Object.keys(TEMPLATE_MAP);

// Prompt helpers
async function promptForTemplate() {
	const { template } = await inquirer.prompt([
		{
			type: "list",
			name: "template",
			message: "Select a template to scaffold",
			choices: listTemplates(),
		},
	]);
	return template;
}

async function promptForName() {
	const { name } = await inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "What is your project name?",
			validate: (v) => v.trim() !== "" || "Name cannot be empty",
		},
	]);
	return name.trim();
}

async function promptForOutput() {
	const { output } = await inquirer.prompt([
		{
			type: "input",
			name: "output",
			message: "Destination directory",
			default: ".",
		},
	]);
	return output.trim();
}

async function confirmOverwrite(dest) {
	const { overwrite } = await inquirer.prompt([
		{
			type: "confirm",
			name: "overwrite",
			message: `Destination ${chalk.cyan(dest)} already exists. Overwrite?`,
			default: false,
		},
	]);
	return overwrite;
}

// Commande `list`
program
	.command("list")
	.description("List available templates")
	.action(() => {
		console.log(chalk.green("Available templates:"));
		listTemplates().forEach((t) => console.log("  -", chalk.cyan(t)));
	});

// Commande `init`
program
	.command("init [template]")
	.description("Scaffold app structure (interactive if args missing)")
	.option("-n, --name <name>", 'App name (e.g. "my-app-frontend")')
	.option("-o, --output <dir>", "Output directory", ".")
	.action(async (template, opts) => {
		// 1) Choix du template
		if (!template || !TEMPLATE_MAP[template]) {
			if (template && !TEMPLATE_MAP[template]) {
				console.log(chalk.red(`❌ Unknown template "${template}".`));
			}
			template = await promptForTemplate();
		}

		// 2) Nom de projet
		let name = opts.name;
		if (!name) {
			name = await promptForName();
		}

		// 3) Dossier de sortie
		let output = opts.output;
		if (!output || output === ".") {
			output = await promptForOutput();
		}

		const src = path.join(__dirname, "templates", TEMPLATE_MAP[template]);
		if (!fs.existsSync(src)) {
			console.error(chalk.red(`❌ Template folder not found at ${src}`));
			process.exit(1);
		}

		const dest = path.resolve(output, name);

		// 4) Gérer un dossier existant
		if (fs.existsSync(dest)) {
			const ok = await confirmOverwrite(dest);
			if (!ok) {
				console.log(chalk.yellow("Aborted."));
				process.exit(0);
			}
			await fs.remove(dest);
		}

		// 5) Copier avec spinner
		const spinner = ora(`Scaffolding ${template} → ${dest}`).start();
		try {
			await fs.copy(src, dest);
			spinner.succeed(chalk.green(`✔ ${template} scaffold created at ${dest}`));
		} catch (err) {
			spinner.fail(chalk.red("❌ Error creating scaffold"));
			console.error(err);
			process.exit(1);
		}
	});

program.parse(process.argv);

// Si aucun sous-commande, on affiche l’aide
if (!process.argv.slice(2).length) {
	program.outputHelp();
}
