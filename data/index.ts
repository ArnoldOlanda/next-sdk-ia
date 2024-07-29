import { FileNode } from "@/interfaces";

export const fileTree: FileNode[] = [
    {
      "name": "RimanakuyInterface",
      "path": ".",
      "children": [
        { "name": "vite.config.js" },
        { "name": ".gitignore" },
        { "name": ".eslintrc" },
        { "name": "README.md" },
        { "name": "index.html" }
      ]
    },
    {
      "name": "public",
      "path": "public",
      "children": [
        { "name": "vite.svg" },
        { "name": "_redirects" },
        { "name": "prueba.xlsx" },
        { "name": "loaderio-ad27ec2fa47edb3a4f25434a1db097e7.txt" }
      ]
    },
    {
      "name": "src",
      "path": "src",
      "children": [
        { "name": "theme.js" },
        { "name": "App.css" },
        { "name": "App.jsx" },
        { "name": "index.css" },
        { "name": "main.jsx" }
      ]
    },
    {
      "name": "components",
      "path": "src/components",
      "children": [
        { "name": "TextBoxTranslate.jsx" },
        { "name": "BoxLanguages.jsx" },
        { "name": "Language.jsx" },
        { "name": "Spinner.jsx" }
      ]
    },
    {
      "name": "services",
      "path": "src/services",
      "children": [
        { "name": "config.js" },
        { "name": "model.service.js" }
      ]
    }
  ];