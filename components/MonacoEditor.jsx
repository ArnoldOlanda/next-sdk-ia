import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Monaco from "@monaco-editor/react"; // Importa monaco aquí
import * as monaco from "monaco-editor";
//import { NodeEditor } from "@/interfaces";
//import { fileTree } from "@/data";

const MyMonacoEditor = ({
  defaultValue,
  selectedWord,
  onWordClick,
  tree,
  setListaArchivos,
}) => {
  const editorRef = useRef(null);
  const [decorations, setDecorations] = useState([]);

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();

      // Limpia decoraciones anteriores
      const newDecorations = [];

      // Selección de solo palabras
      if (selectedWord) {
        const functionComponentPattern = new RegExp(
          //`\\bfunction\\s+(${selectedWord})\\b|\\b(${selectedWord})\\s*=\\s*\\(?[^)]*\\)?\\s*=>`,
          //`\\bfunction\\s+${selectedWord}\\b|\\b${selectedWord}\\s*=\\s*\\(?[^)]*\\)?\\s*=>`,
          `const\\s+(${selectedWord})\\s*=\\s*(\\(.*?\\)|[^\\s(]+)\\s*=>|function\\s+${selectedWord}\\s*\\(`,

          "g"
        );
        const classComponentPattern = new RegExp(
          //`\\bclass\\s+(${selectedWord})\\b(?=\\s+extends\\s+React\\.Component)`,
          `\\bclass\\s+${selectedWord}\\b(?=\\s+extends\\s+React\\.Component)`,
          "g"
        );

        const lines = model.getLinesContent();

        // Búsqueda de expresiones
        lines.forEach((line, lineIndex) => {
          let match;
          while ((match = functionComponentPattern.exec(line)) !== null) {
            newDecorations.push({
              range: new monaco.Range(
                lineIndex + 1,
                match.index + 1,
                lineIndex + 1,
                match.index + 1 + match[0].length
              ),
              options: {
                inlineClassName: "highlight",
              },
            });
          }
          while ((match = classComponentPattern.exec(line)) !== null) {
            newDecorations.push({
              range: new monaco.Range(
                lineIndex + 1,
                match.index + 1,
                lineIndex + 1,
                match.index + 1 + match[0].length
              ),
              options: {
                inlineClassName: "highlight",
              },
            });
          }
        });
      }

      // Resaltado
      const newDecorationIds = editorRef.current.deltaDecorations(
        decorations,
        newDecorations
      );
      if (
        newDecorationIds.length !== decorations.length ||
        !newDecorationIds.every((id, index) => id === decorations[index])
      ) {
        setDecorations(newDecorationIds);
      }
    }
  }, [selectedWord, decorations]);

  //-=================================
  // busca palabra en árbol
  const searchInFileTree = (tree, word) => {
    const results = [];

    const search = (nodes, currentPath) => {
      for (let node of nodes) {
        if (node.children) {
          for (let child of node.children) {
            if (child.content && child.content.includes(word)) {
              const lines = child.content.split("\n");
              const matchingLines = lines
                .map((line, index) => ({ line, lineNumber: index + 1 }))
                .filter(({ line }) => line.includes(word));

              results.push({
                path: `${currentPath}/${node.name}/${child.name}`,
                matches: matchingLines,
              });
            }
          }
        }

        if (node.folders) {
          for (let folder of node.folders) {
            search(folder, `${currentPath}/${node.name}`);
          }
        }
      }
    };

    search(tree, "");

    return results;
  };

  //
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    editor.onMouseDown((e) => {
      const position = e.target.position;
      const model = editor.getModel();
      const word = model.getWordAtPosition(position);

      if (word) {
        const clickedWord = word.word;

        const functionComponentPattern = new RegExp(
          `\\bfunction\\s+(${clickedWord})\\b|\\b(${clickedWord})\\s*=\\s*\\(?[^)]*\\)?\\s*=>`,
          "g"
        );
        const classComponentPattern = new RegExp(
          `\\bclass\\s+(${clickedWord})\\b(?=\\s+extends\\s+React\\.Component)`,
          "g"
        );

        const lines = model.getLinesContent();
        let isComponent = false;

        lines.forEach((line) => {
          if (
            functionComponentPattern.test(line) ||
            classComponentPattern.test(line)
          ) {
            isComponent = true;
          }
        });

        // Dehighlight
        if (isComponent) {
          const newSelectedWord = (prevWord) =>
            prevWord === clickedWord ? null : clickedWord;

          onWordClick(newSelectedWord);

          const foundResults = searchInFileTree(tree, clickedWord);
          // Imprimir la palabra seleccionada y su estado de resaltado
          foundResults.forEach((result) => {
            console.log(`Path: ${result.path}`);
            result.matches.forEach(({ line, lineNumber }) => {
              console.log(`Line ${lineNumber}: ${line.trim()}`);
            });
          });

          setListaArchivos(foundResults);
        }
      }
    });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Monaco
        defaultLanguage="javascript"
        defaultValue={defaultValue}
        theme="vs-dark"
        options={{
          readOnly: false,
          minimap: { enabled: false },
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

MyMonacoEditor.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  selectedWord: PropTypes.string,
  onWordClick: PropTypes.func.isRequired,
};

export default MyMonacoEditor;
