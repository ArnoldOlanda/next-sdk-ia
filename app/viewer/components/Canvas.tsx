'use client';
import React, { useRef, useEffect, useState, MouseEvent, WheelEvent } from 'react';
import { Editor } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { tree } from '@/data';
import { FileNode, NodeEditor } from '@/interfaces';
import imageSrc from '../assets/your-image.png';
import { Modal } from './Modal';

const colors = [
  "#DBD2EF",
  "#AF97E0",
  "#BEE48D",
  "#E0E0E0"
];

/**
 * Canvas component for displaying regions and editors.
 * 
 * @returns The Canvas component.
 */
export const Canvas = ({tree, openModal}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePattern, setImagePattern] = useState<CanvasPattern | null>(null);

  let paddingX = 40;
  const paddingY = 30;

  const fixedLimits = {
    minX: -500,
    maxX: 0,
    minY: -500,
    maxY: 0
  };

  const minScale = 0.5;
  const maxScale = 2;

  const regionHeight = 278;

  const heightFile = 200;
  const widthFile = 360;

  const [editors, setEditors] = useState<NodeEditor[]>([]);
  const [regions, setRegions] = useState<{ name: string, x: number, y: number }[]>([]);

  useEffect(() => {
    const loadImage = () => {
      const img = new Image();
      img.src = '/background.png';
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const pattern = ctx.createPattern(img, 'repeat');
            setImagePattern(pattern);
          }
        }
      };
    };
    loadImage();
  }, []);

  const generateEditorPositions = (nodes: FileNode[]) => {
    const positions: { name: string, x: number, y: number, content: string, isFolder: boolean, folders?: string[] }[] = [];
    let yOffset = 0; // size of the header
    

    let factor = scale;
    let initial = ((regionHeight * factor) - (heightFile * factor)) / 2;

    nodes.forEach((node) => {
      let xInitial = 0

      if (node.folders.length >0 ) {
        positions.push({
          name: node.name,
          x: paddingX,
          y: yOffset + initial,
          content: "",
          isFolder: true,
          folders: node.folders
        });
        xInitial= widthFile + 30
        
      }

      if (node.children && node.children.length > 0) {
        node.children.forEach((child, index) => {
          const x = xInitial + paddingX + (index * (widthFile + 30));
          const y = yOffset + initial;
          positions.push({ name: child.name, x, y, content: `//${child.name}\n`+child.content, isFolder: false });
        });

        yOffset += regionHeight * factor;
      }
    });

    return positions;
  };

  const drawRegions = (ctx: CanvasRenderingContext2D, nodes: FileNode[], x: number, y: number) => {
    const positions: { name: string, x: number, y: number }[] = [];
    const canvas = canvasRef.current;

    nodes.forEach((node, indexRegion) => {
      if (node.children && node.children.length > 0) {
        if (canvas) {
          const regionWidth = 10000;
          const regionHeight = 278;

          /*if (imagePattern) {
            ctx.fillStyle = imagePattern;
          } else {
            ctx.fillStyle = colors[indexRegion % colors.length];
          }*/
          ctx.fillStyle = colors[indexRegion % colors.length];

          ctx.fillRect(x, y, regionWidth, regionHeight);

          ctx.save();
          ctx.translate(x + 20, y + 25 );
          //ctx.rotate(-Math.PI / 2);
          ctx.fillStyle = "#000";
          ctx.font = "bold 16px Consolas";
          ctx.fillText(node.path, 0, 0);
          ctx.restore();

          positions.push({ name: node.name, x, y})

          y += regionHeight;
        }
      }
    });

    setRegions(positions)
  };

  const handleWheel = (e: WheelEvent) => {
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

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      const boundedX = Math.max(Math.min(newX, fixedLimits.maxX), (-2900 * (Math.pow(scale, 2.13))));
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

  const handleReset = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, index: number) => {
    const fontSize = 12 * scale;
    editor.updateOptions({
      zIndex: 1,
      fontSize,
      minimap: { enabled: false }
    });
    const updatedEditors = [...editors];
    updatedEditors[index].editor = editor;
    setEditors(updatedEditors);
  };


  const handleFolderClick = (x: number, y: number, name: string) => {
    let region = regions.find(e=>e.name==name);
    setTranslate({ x: 0, y: -region.y*scale});
  };

  useEffect(() => {
    const initialEditors = generateEditorPositions(tree);
    editors.forEach((editor) => {
      if (editor.editor) {
        const fontSize = 14 * scale;
        editor.editor.updateOptions({
          ...initialEditors,
          fontSize,
          minimap: { enabled: false }
        });
      }
    });
  }, [scale, editors]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(translate.x, translate.y);
        ctx.scale(scale, scale);
        drawRegions(ctx, tree, 0, 0);
        ctx.restore();
      }
    }
  }, [scale, translate]);

  useEffect(() => {
    const initialEditors = generateEditorPositions(tree);
    setEditors(initialEditors);
  }, []);

  return (
    <div style={{
      flex:1,
      height: '100%',
      width: '100%',
      maxHeight: '100%',
      position: 'relative',
      zIndex: 10,
      overflow:'hidden'

    }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - 50}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ border: "1px solid black", cursor: isDragging ? "grabbing" : "grab", position: "absolute", zIndex: 2, }}
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
          cursor: 'pointer',
          zIndex: 3
        }}
      >
        Reset Position
      </button>

      {editors.map((editor, index) => (
        editor.isFolder ? (
          <div
            key={index}
            style={{
              zIndex: 2,
              position: 'absolute',
              left: (editor.x * scale + translate.x),
              top: (editor.y * scale + translate.y),
              width: widthFile * scale,
              height: heightFile * scale,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              //border: '1px solid white',
              overflow: 'hidden',
              //backgroundColor: '#f0f0f0',
              gap: 10,

            }}
          >
            {editor.folders?.map((folder, folderIndex) => (
              <button
                onClick={() => handleFolderClick(editor.x, editor.y, folder)}
                key={folderIndex}
                style={{
                  width: 96 * scale,
                  height: 96 * scale,
                  fontSize: 14* scale,
                  //margin: 5 * scale,
                  backgroundColor: '#BFF976',
                  color: '#000',
                  borderRadius: '5px',
                }}
              >
                {folder}
              </button>
            ))}
          </div>
        ) : (
          <div
            key={index}
            style={{
              zIndex: 2,
              position: 'absolute',
              left: (editor.x * scale + translate.x),
              top: (editor.y * scale + translate.y),
              width: widthFile * scale,
              height: heightFile * scale,
              transformOrigin: 'top left',
              //border: '1px solid black',
              overflow: 'hidden'
            }}
          >
            <button
              onClick={()=>{openModal(editor)}}
              style={{
                height:"100%",
                width:"100%",
                color:'black',
                backgroundColor: 'yellow',
                borderRadius: '5px',
                fontSize: 20* scale,
                fontWeight: 'bold',

              }}
              /*
              height="100%"
              width="100%"
              defaultLanguage="javascript"
              defaultValue={editor.content}
              theme="vs-dark"
              options={{
                readOnly: false,
                minimap: { enabled: false }
              }}
              onMount={(editorInstance) => handleEditorDidMount(editorInstance, index)}*/
            >{editor.name}</button>
          </div>
        )
      ))}
      
    </div>
  );
};
