'use client';
import React, { useRef, useEffect, useState, MouseEvent, WheelEvent } from 'react';
import { Editor } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { fileTree } from '@/data';
import { FileNode, NodeEditor } from '@/interfaces';

const colors = [
  "#DBD2EF",
  "#AF97E0",
  "#BEE48D",
  "#E0E0E0"
]

/**
 * Canvas component for displaying regions and editors.
 * 
 * @returns The Canvas component.
 */
export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const paddingX = 40;
  const paddingY = 30;

  const fixedLimits = {
    minX: -500,
    maxX: 0,
    minY: -500,
    maxY: 0
  };

  const minScale = 0.5;
  const maxScale = 3;
  const heightFile = 200;
  const widthFile = 360;

  const [editors, setEditors] = useState<NodeEditor[]>([]);

  useEffect(() => {
    const initialEditors = generateEditorPositions(fileTree);
    setEditors(initialEditors);
  }, []);

  const generateEditorPositions = (nodes: FileNode[]) => {
    const positions:{name: string,x:number,y:number,content:string}[] = [];
    let yOffset = 0;

    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        node.children.forEach((child, index) => {
          const x = paddingX + (index * (widthFile + 30));
          const y = yOffset + 90;
          positions.push({ name: child.name, x, y, content: "// " + child.name });
        });
        yOffset += 278;
      }
    });

    return positions;
  };

  const drawRegions = (ctx: CanvasRenderingContext2D, nodes: FileNode[], x: number, y: number) => {
    const canvas = canvasRef.current;

    nodes.forEach((node, indexRegion) => {
      if (node.children && node.children.length > 0) {
        if (canvas) {
          const regionWidth = canvas.width / scale;
          const regionHeight = 278;

          ctx.fillStyle = colors[indexRegion % colors.length];
          ctx.fillRect(x, y, regionWidth, regionHeight);

          ctx.fillStyle = "#000";
          ctx.font = "16px Arial";
          ctx.fillText(node.path, x + 10, y + 20);

          y += regionHeight;
        }
      }
    });
  };

  const handleWheel = (e: WheelEvent) => {
    // e.preventDefault();
    const scaleAmount = -e.deltaY * 0.001;
    setScale(prevScale => {
      const newScale = Math.min(Math.max(prevScale + scaleAmount, minScale), maxScale);
      return newScale;
    });
  };


  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };

  /**
   * This function is called when the mouse is moved.
   * @param e MouseEvent
   */
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      const boundedX = Math.min(newX, fixedLimits.maxX);
      const boundedY = Math.min(newY, fixedLimits.maxY);

      setTranslate({
        x: boundedX,
        y: boundedY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(translate.x, translate.y);
        ctx.scale(scale, scale);

        drawRegions(ctx, fileTree, 0, 0);

        ctx.restore();
      }
    }
  }, [scale, translate]);

  useEffect(() => {
    editors.forEach((editor) => {
      if (editor.editor) {
        const fontSize = 14 * scale;
        editor.editor.updateOptions({
          fontSize,
          minimap: { enabled: false }
        });
      }
    });
  }, [scale,editors]);

  const handleReset = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, index: number) => {
    const fontSize = 12 * scale;
    editor.updateOptions({
      fontSize,
      minimap: { enabled: false }
    });
    const updatedEditors = [...editors];
    updatedEditors[index].editor = editor;
    setEditors(updatedEditors);
  };

  return (
    <div className='w-full h-[calc(100vh-50px)]'>
      <canvas
        ref={canvasRef}
        //className='w-full h-[calc(100vh-50px)]'
        width={window.innerWidth} 
        height={window.innerHeight-50}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ border: "1px solid black", cursor: isDragging ? "grabbing" : "grab", position: "absolute" }}
      />
      <button
        onClick={handleReset}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Reset Position
      </button>
      {editors.map((editor, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: (editor.x * scale + translate.x),
            top: (editor.y * scale + translate.y),
            width: widthFile * scale,
            height: heightFile * scale,
            transformOrigin: 'top left',
            border: '1px solid black',
            overflow: 'hidden'
          }}
        >
          <Editor
            height="100%"
            width="100%"
            defaultLanguage="javascript"
            defaultValue={editor.content}
            theme="vs-dark"
            options={{
              readOnly: false,
              minimap: { enabled: false } // Desactiva el minimapa
            }}
            onMount={(editorInstance) => handleEditorDidMount(editorInstance, index)}
          />
        </div>
      ))}
    </div>
  );
};