import { FileNode, Message } from "@/interfaces";

export const fileTree: FileNode[] = [
<<<<<<< HEAD
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

  export const messages: Message[] = [
    {
        id: 1,
        message: 'Hello',
        role: 'assistant'
    },
    {
        id: 2,
        message: 'How can I help you?',
        role: 'assistant'
    },
    {
        id: 3,
        message: 'I need help with my order',
        role: 'user'
    },
    {
        id: 4,
        message: 'Sure, I can help you with that',
        role: 'assistant'
    },
    {
        id: 5,
        message: 'Thank you',
        role: 'user'
    },
    {
        id: 6,
        message: 'You are welcome',
        role: 'assistant'
    },
    {
        id: 7,
        message: 'Another question',
        role: 'user'
    },
    {
        id: 8,
        message: 'Sure, ask me anything',
        role: 'assistant'
    },
    {
        id: 9,
        message: 'Thank you',
        role: 'user'
    },
    {
        id: 10,
        message: 'You are welcome',
        role: 'assistant'
    },
    {
        id: 11,
        message: 'Another question',
        role: 'user'
    },
    {
        id: 12,
        message: 'Sure, ask me anything',
        role: 'assistant'
    },
    {
        id: 13,
        message: 'Thank you',
        role: 'user'
    },
    {
        id: 14,
        message: 'You are welcome',
        role: 'assistant'
    },
    {
        id: 15,
        message: 'Another question',
        role: 'user'
    },
    {
        id: 16,
        message: 'Sure, ask me anything',
        role: 'assistant'
    },
    {
        id: 17,
        message: 'Thank you',
        role: 'user'
    },
    {
        id: 18,
        message: 'You are welcome',
        role: 'assistant'
    },
    {
        id: 19,
        message: 'Another question',
        role: 'user'
    },
    {
        id: 20,
        message: 'Sure, ask me anything',
        role: 'assistant'
    },
    {
        id: 21,
        message: 'Thank you',
        role: 'user'
    },
    {
        id: 22,
        message: 'You are welcome',
        role: 'assistant'
    },
    {
        id: 23,
        message: 'Another question',
        role: 'user'
    },
    {
        id: 24,
        message: 'Sure, ask me anything',
        role: 'assistant'
    },
    {
        id: 25,
        message: 'Thank you',
        role: 'user'
    },
    {
        id: 26,
        message: 'You are welcome',
        role: 'assistant'
    },
    {
        id: 27,
        message: 'Another question',
        role: 'user'
    },
    {
        id: 28,
        message: 'Sure, ask me anything',
        role: 'assistant'
    },
    {
        id: 29,
        message: 'Thank you',
        role: 'user'
    },
    {
        id: 30,
        message: 'You are welcome',
        role: 'assistant'
    },
    {
        id: 31,
        message: 'Another question',
        role: 'user'
    },
]
=======
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
>>>>>>> 31ab61f0a139e19351064f142389c20d4a361e85
