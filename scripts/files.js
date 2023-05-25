const { resolve } = require('path');
const fs = require('fs').promises;


module.exports = async function()
{
    const directory = "./guides/";

    // Get file tree
    let fileTree = await getFiles(directory);

    // Create html file tree
    let html = createHtmlFileTree(fileTree);

    return html;
}


async function getFiles(directory)
{
    const dirents = await fs.readdir(directory, { withFileTypes: true });

    let fileTree = [];

    for (const fileOrDirectory of dirents)
    {
        if (fileOrDirectory.isDirectory())
        {
            const subDirectory = resolve(directory, fileOrDirectory.name);
            const subFileTree = await getFiles(subDirectory);
            if (subFileTree.length > 0)
                fileTree.push({ name: fileOrDirectory.name, children: subFileTree });
            else
                fileTree.push({ name: fileOrDirectory.name });
        }
        else if (fileOrDirectory.isFile())
        {
            fileTree.push({ name: fileOrDirectory.name });
        }
    }

    return fileTree;
}

function createHtmlFileTree(fileTree)
{
    let html = '';

    for (const fileOrDirectory of fileTree)
    {
        html += `<li>`;

        if (fileOrDirectory.children)
        {
            html += `<span class="caret">${fileOrDirectory.name}</span>`;
            html += `<ul class="nested">`;
            html += createHtmlFileTree(fileOrDirectory.children);
            html += `</ul>`;
        }
        else
        {
            html += fileOrDirectory.name;
        }

        html += `</li>`;
    }

    return html;
}
