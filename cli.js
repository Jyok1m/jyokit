#!/usr/bin/env node

/**
 * JyoKit CLI
 * Your all-in-one tool for DevOps & Web App boilerplates
 */

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");

const program = new Command();

// Map logical template names to folders under ./templates/
const TEMPLATE_MAP = {
	express: "express-starter",
	next: "nextjs-starter",
	expo: "expojs-starter",
};

program.name("jyokit").description("JyoKit — CLI for DevOps & Full-Stack JS app boilerplates").version("2.0.0");

/* ------------------------- init ------------------------ */

program
	.command("init <template>")
	.description("Scaffold app structure")
	.requiredOption("-n, --name <name>", 'App name (e.g. "my-app-frontend", "my-app-backend")')
	.option("-o, --output <dir>", "Output directory", ".")
	.action(async (template, { name, output }) => {
		if (!TEMPLATE_MAP[template]) {
			console.error(`❌ Unknown template "${template}". Available: ${Object.keys(TEMPLATE_MAP).join(", ")}`);
			process.exit(1);
		}
		const src = path.join(__dirname, "templates", TEMPLATE_MAP[template]);
		if (!fs.existsSync(src)) {
			console.error(`❌ Template folder for "${template}" not found at ${src}`);
			process.exit(1);
		}

		// Destination: ./${name}
		const dest = path.resolve(output, `${name}`);
		try {
			await fs.copy(src, dest);
			console.log(`✅ ${template.charAt(0).toUpperCase() + template.slice(1)} app structure created at ${dest}`);
		} catch (err) {
			console.error("❌ Error creating app structure:", err);
			process.exit(1);
		}
	});

program.parse(process.argv);
