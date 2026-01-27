import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

console.log("DEBUG: Node is working");
try {
    const sharp = require('sharp');
    console.log("DEBUG: Sharp is available");
} catch (e) {
    console.error("DEBUG: Sharp is MISSING", e.message);
}
