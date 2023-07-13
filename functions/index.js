const axios = require('axios');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fs = require('fs')
const path = require('path')

const app = express();
const GITLAB_URL = 'https://io.gnt.place/api/v4/projects'

const corsHandler = cors({
    origin: 'http://localhost:3000',
});

app.use(cors(
    {
        origin: true
    }
));

// Define the server check function
const checkServer = async (url) => {
    try {
        await axios.head(url, { timeout: 1000 });
        return true;
    } catch (error) {
        if (error.code === "ECONNABORTED") {
            return false;
        }
        throw error; // If the error is not ECONNREFUSED, re-throw it
    }
};

app.get('/listRepos', async (req, res) => {
    // First, check if the server is available
    const serverIsAlive = await checkServer(GITLAB_URL);

    if (!serverIsAlive) {
        // If the server is not available, return the dummy data
        const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './dummyData.json')));
        res.send(data);
        return;
    }
    try {
        const response = await axios.get(GITLAB_URL);
        res.send(response.data);
    } catch (error) {
        console.error(error);

        // If the request was made and the server responded with a status code
        // that falls out of the range of 2xx, we can get the error status code
        if (error.response) {
            res.status(error.response.status).send({ status: error.response.status });
        } else {
            // Otherwise, we don't know what happened, return a generic error
            res.status(500).send({ status: 500, message: 'Unknown error' });
        }
    }
});

// プロジェクトIDを受け取り、そのレポジトリのファイル一覧を取得するエンドポイント
app.get('/getFiles/:id', async (req, res) => {
    // const gitlabToken = functions.config().gitlab.token; // Firebaseの環境変数からTokenを取得
    const projectId = req.params.id; // URLパラメータからプロジェクトIDを取得
    console.log(projectId)
    try {
        // GitLab APIを呼び出し、ファイル一覧を取得
        const fileListResponse = await axios({
            method: 'get',
            url: `${GITLAB_URL}/${projectId}/repository/tree`,
        });
        console.log(fileListResponse)

        // GitLab APIを呼び出し、"Publish.md"ファイルの内容を取得
        const fileContentResponse = await axios({
            method: 'get',
            url: `${GITLAB_URL}/${projectId}/repository/files/Publish.md`,
            params: { ref: 'main' },
        });
        // ファイル内容をBase64からデコード
        const publishContent = Buffer.from(fileContentResponse.data.content, 'base64').toString();
        // ファイル一覧と"Publish.md"の内容を返す
        res.json({
            files: fileListResponse.data,
            publishContent: publishContent
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

exports.getRepoContents = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        const repoId = req.query.repoId; // GitLab repository ID

        try {
            const fileContentsResponses = await axios.get(`${GITLAB_URL}/${repoId}/repository/files/stacks.json?ref=main`)

            const content = Buffer.from(fileContentsResponses.data.content, 'base64').toString();
            const fileContent = JSON.parse(content);
            res.send(fileContent);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).send('Error occurred while fetching GitLab repository content.');
        }
    });
})

exports.postRepoContents = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        const gitlabToken = functions.config().gitlab.token;
        const gitlabUrl = GITLAB_URL; // Get the GitLab URL from environment variables

        const repoId = req.body.repoId; // Get GitLab repository ID from request body
        const fileContent = req.body.fileContent; // Get file content from request body
        const fileName = req.body.fileName; // Get file name from request body

        // Input sanitization
        if (typeof repoId !== 'string' || typeof fileContent !== 'object' || typeof fileName !== 'string') {
            res.status(400).send('Invalid input.');
            return;
        }

        const options = {
            headers: {
                'Private-Token': gitlabToken,
            },
        };

        try {
            const fileContentBase64 = Buffer.from(JSON.stringify(fileContent, null, 2)).toString('base64');

            const postData = {
                branch: 'main', // the name of the branch
                content: fileContentBase64, // the content of the file
                author_email: 'email@example.com', // the email of the author
                author_name: 'Name', // the name of the author
                commit_message: 'update file', // the commit message
                encoding: 'base64', // the encoding type
            };

            // Create or update the file
            await axios.put(`${gitlabUrl}/${repoId}/repository/files/${encodeURIComponent(fileName)}`, postData, options);

            res.send('File updated successfully.');
        } catch (error) {
            console.error(error);
            res.status(500).send(`Error occurred while updating GitLab repository content.${error}`);
        }
    });
});

exports.app = functions.https.onRequest(app);