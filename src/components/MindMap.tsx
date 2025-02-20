import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node {
  text: string;
  start: number;
  end: number;
  label?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Edge {
  source: number | Node;
  target: number | Node;
}

interface MindMapData {
  nodes: Node[];
  edges: Edge[];
}

interface MindMapProps {
  data: MindMapData;
}

const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const width = 800;
    const height = 600;

    const svgElement = d3.select(svgRef.current);
    svgElement.selectAll("*").remove();

    // Tambahkan group untuk zoom & pan
    const svgGroup = svgElement.append("g");

    // Tambahkan behavior zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        svgGroup.attr("transform", event.transform);
      });
    svgElement.call(zoom);

    // Buat simulasi
    const simulation = d3.forceSimulation<Node>(data.nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30))
      .force("link", d3.forceLink<Node, Edge>(data.edges)
        .id((d, i) => String(i))
        .distance(150)
      )
      .on("tick", ticked);

    // Gambar edges
    const link = svgGroup.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.edges)
      .enter()
      .append("line")
      .attr("stroke-width", 2);

    // Gambar nodes
    const node = svgGroup.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("fill", d => d.label === "ORG" ? "#1f77b4" : "#2ca02c")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .call(
        d3.drag<SVGCircleElement, Node>()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded)
      );

    // Gambar teks
    const text = svgGroup.append("g")
      .selectAll("text")
      .data(data.nodes)
      .enter()
      .append("text")
      .text(d => d.text)
      .attr("font-size", 12)
      .attr("fill", "#fff")
      .attr("text-anchor", "middle")
      .attr("dy", 4);

    function ticked() {
      link
        .attr("x1", d => (d.source as Node).x!)
        .attr("y1", d => (d.source as Node).y!)
        .attr("x2", d => (d.target as Node).x!)
        .attr("y2", d => (d.target as Node).y!);

      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);

      text
        .attr("x", d => d.x!)
        .attr("y", d => d.y!);
    }

    function dragStarted(event: any, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event: any, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }, [data]);

  return <svg ref={svgRef} width="800" height="600" style={{ backgroundColor: "#333" }}></svg>;
};

export default MindMap;
