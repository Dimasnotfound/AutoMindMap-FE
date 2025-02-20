// src/types.d.ts
export interface Node {
    text: string;
    start: number;
    end: number;
    label?: string;
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
  }
  
  export interface Edge {
    source: number | Node;
    target: number | Node;
  }
  
  export interface MindMapData {
    nodes: Node[];
    edges: Edge[];
  }
  