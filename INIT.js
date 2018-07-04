const fs = require("fs");
const path = require("path");
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const filesWithPlaceholders = [
	".circleci/config.yml",
	".gitignore",
	".npmignore",
	"LICENSE",
	"package.json",
	"package-lock.json",
	"README.md"
];

/**
 * @typedef {object} Question
 * @property {RegExp | string} placeholder
 * @property {string} question
 * @property {(str: string) => string} [transform]
 * @property {string} [answer]
 */

/** @type {Question[]} */
const questions = [
	{
		placeholder: /((%%)|(~~))PACKAGE_NAME((%%)|(~~))/ig,
		question: "Enter the npm package name",
		transform: (str) => str.toLowerCase()
	},
	{ placeholder: /%%GITHUB_USER%%/ig, question: "Enter your username (or org) on GitHub" },
	{ placeholder: /%%REPO_NAME%%/ig, question: "Enter the GitHub repo name" },
	{ placeholder: /%%AUTHOR%%/ig, question: "Enter the author's name" },
	{ placeholder: /%%EMAIL%%/ig, question: "Enter the author's email address" },
];

function replace() {
	for (const file of filesWithPlaceholders) {
		const filePath = path.join(__dirname, file);
		let content = fs.readFileSync(filePath, "utf8");
		for (const q of questions) {
			content = content.replace(q.placeholder, q.answer);
		}
		fs.writeFileSync(filePath, content, "utf8");
	}
	console.log("done initializing");
	fs.unlink(path.join(__dirname, "INIT.js"));
	rl.close();
	process.exit(0);
}

/** @param {number} index */
function ask(index) {
	const question = questions[index];
	rl.question(question.question + ": ", answer => {
		if (answer != null && answer.length > 0) {
			question.answer = answer;
			if (question.transform != null) question.answer = question.transform(question.answer);
			index++;
		}
		if (index < questions.length)
			setImmediate(ask, index);
		else
			setImmediate(replace);
	})
}
ask(0);
