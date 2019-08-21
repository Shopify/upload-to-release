"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const fs = __importStar(require("fs"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = core.getInput('repo-token', { required: true });
            const octokit = new github.GitHub(token);
            const name = core.getInput('name', { required: true });
            const path = core.getInput('path', { required: true });
            const contentType = core.getInput('content-type', { required: true });
            core.debug(`Uploading ${path} to ${name}. Content-Type: ${contentType}`);
            const url = `https://uploads.github.com/repos/Shopify/upload-to-release/releases/1.0.0/assets{?name}`;
            const headers = {
                'content-type': contentType,
                'content-length': fs.statSync(path).size,
            };
            const file = fs.createReadStream(path);
            const upload = yield octokit.repos.uploadReleaseAsset({ url, headers, name, file });
            console.log(upload);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
