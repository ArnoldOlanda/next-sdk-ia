import fs from 'fs';
import path from 'path';

const notpermit: string[] = [
    ".git",
    "node_modules",
    "package-lock.json",
    "package.json",
    "yarn.lock",
];

const excludedExtensions: string[] = [
    ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".ico", ".svg",
    ".doc", ".docx", ".pdf", ".xls", ".xlsx", ".ppt", ".pptx", 
    ".mp3", ".wav", ".mp4", ".avi", ".mov", ".mkv", ".flv", ".wmv", 
];

interface FileStructure {
    name: string;
    content: string;
}

interface FolderStructure {
    name: string;
    path: string;
    children: FileStructure[];
    folders: string[];
}

interface DirectoryStructure {
    folders: FolderStructure[];
}

export function getDirectoryStructure(rootDir: string): DirectoryStructure {
    const directoryStructure: DirectoryStructure = { folders: [] };

    function walkDir(currentPath: string): FolderStructure | null {
        const currentFolderName = path.basename(currentPath);
        if (notpermit.includes(currentFolderName)) {
            return null;
        }

        const relativePath = path.relative(rootDir, currentPath);
        const children: FileStructure[] = [];
        const folders: string[] = [];

        const dirContents = fs.readdirSync(currentPath, { withFileTypes: true });

        dirContents.forEach((item) => {
            if (notpermit.includes(item.name)) {
                return;
            }

            const itemPath = path.join(currentPath, item.name);
            if (item.isDirectory()) {
                folders.push(item.name);
                const subFolder = walkDir(itemPath);
                if (subFolder) {
                    directoryStructure.folders.push(subFolder);
                }
            } else {
                const extension = path.extname(item.name).toLowerCase();
                if (excludedExtensions.includes(extension))
                    return;
                const content = fs.readFileSync(itemPath, 'utf-8');
                if (content.length>5000)
                    return
                children.push({ name: item.name, content });
            }
        });

        return {
            name: currentFolderName,
            path: relativePath === '.' ? '' : relativePath,
            children: children,
            folders: folders
        };
    }

    walkDir(rootDir);

    return directoryStructure;
}
