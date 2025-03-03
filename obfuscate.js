const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");

const obfuscateFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const obfuscationResult = JavaScriptObfuscator.obfuscate(fileContent, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    disableConsoleOutput: true,
    renameGlobals: false,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ["rc4"],
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false,
  });
  fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode(), "utf8");
};

const walkDir = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath);
    } else if (path.extname(file) === ".js") {
      obfuscateFile(filePath);
    }
  });
};

const distDir = path.join(__dirname, "dist/event-registration/browser");
walkDir(distDir);
