import * as fs from 'fs';
import * as path from 'path';

const notpermit: string[] = ["node_modules", ".git"]; // Lista de directorios y archivos no permitidos

interface FileStructure {
    name: string;
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
                children.push({ name: item.name });
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

