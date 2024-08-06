import { FileNode, Message } from "@/interfaces";

export const fileTree: FileNode[] = [
      {
          "name": "RimanakuyInterface",
          "path": ".",
          "children": [
              {
                  "name": ".eslintrc",
                  content: "function"
              },
              {
                  "name": "index.html",
                  content: "function"
              },
              {
                  "name": "vite.config.js",
                  content: "function"
              },
              {
                  "name": "README.md",
                  content: "function"
              },
              {
                  "name": ".gitignore",
                  content: "function"
              }
          ],
          "folders": [
              "src",
              "public"
          ]
      },
      {
          "name": "src",
          "path": "src",
          "children": [
              {
                  "name": "main.jsx",
                  content: "function"
              },
              {
                  "name": "theme.js",
                  content: "function"
              },
              {
                  "name": "App.jsx",
                  content: "function"
              },
              {
                  "name": "index.css",
                  content: "function"
              },
              {
                  "name": "App.css",
                  content: "function"
              }
          ],
          "folders": [
              "pages",
              "assets",
              "services",
              "components"
          ]
      },
      {
          "name": "pages",
          "path": "src/pages",
          "children": [
              {
                  "name": "Home.jsx",
                  content: "function"
              }
          ],
          "folders": []
      },
      {
          "name": "assets",
          "path": "src/assets",
          "children": [
              {
                  "name": "Logo.jsx",
                  content: "function"
              },
              {
                  "name": "spain.png",
                  content: "function"
              },
              {
                  "name": "Languages.jsx",
                  content: "function"
              },
              {
                  "name": "image 2.png",
                  content: "function"
              },
              {
                  "name": "react.svg",
                  content: "function"
              }
          ],
          "folders": []
      },
      {
          "name": "services",
          "path": "src/services",
          "children": [
              {
                  "name": "config.js",
                  content: "function"
              },
              {
                  "name": "model.service.js",
                  content: "function"
              }
          ],
          "folders": []
      },
      {
          "name": "components",
          "path": "src/components",
          "children": [
              {
                  "name": "BoxLanguages.jsx",
                  content: "function"
              },
              {
                  "name": "TextBoxTranslate.jsx",
                  content: "function"
              },
              {
                  "name": "Spinner.jsx",
                  content: "function"
              },
              {
                  "name": "Language.jsx",
                  content: "function"
              }
          ],
          "folders": []
      },
      {
          "name": "public",
          "path": "public",
          "children": [
              {
                  "name": "_redirects",
                  content: "function"
              },
              {
                  "name": "vite.svg",
                  content: "function"
              },
              {
                  "name": "prueba.xlsx",
                  content: "function"
              },
              {
                  "name": "loaderio-ad27ec2fa47edb3a4f25434a1db097e7.txt",
                  content: "function"
              }
          ],
          "folders": []
      }
  ]
