import { FileNode, Message } from '@/interfaces';

export const fileTree: FileNode[] = [
      {
          "name": "RimanakuyInterface",
          "path": ".",
          "children": [
              {
                  "name": ".eslintrc"
              },
              {
                  "name": "index.html"
              },
              {
                  "name": "vite.config.js"
              },
              {
                  "name": "README.md"
              },
              {
                  "name": ".gitignore"
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
                  "name": "main.jsx"
              },
              {
                  "name": "theme.js"
              },
              {
                  "name": "App.jsx"
              },
              {
                  "name": "index.css"
              },
              {
                  "name": "App.css"
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
                  "name": "Home.jsx"
              }
          ],
          "folders": []
      },
      {
          "name": "assets",
          "path": "src/assets",
          "children": [
              {
                  "name": "Logo.jsx"
              },
              {
                  "name": "spain.png"
              },
              {
                  "name": "Languages.jsx"
              },
              {
                  "name": "image 2.png"
              },
              {
                  "name": "react.svg"
              }
          ],
          "folders": []
      },
      {
          "name": "services",
          "path": "src/services",
          "children": [
              {
                  "name": "config.js"
              },
              {
                  "name": "model.service.js"
              }
          ],
          "folders": []
      },
      {
          "name": "components",
          "path": "src/components",
          "children": [
              {
                  "name": "BoxLanguages.jsx"
              },
              {
                  "name": "TextBoxTranslate.jsx"
              },
              {
                  "name": "Spinner.jsx"
              },
              {
                  "name": "Language.jsx"
              }
          ],
          "folders": []
      },
      {
          "name": "public",
          "path": "public",
          "children": [
              {
                  "name": "_redirects"
              },
              {
                  "name": "vite.svg"
              },
              {
                  "name": "prueba.xlsx"
              },
              {
                  "name": "loaderio-ad27ec2fa47edb3a4f25434a1db097e7.txt"
              }
          ],
          "folders": []
      }
  ]
