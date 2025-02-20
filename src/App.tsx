import React, { useState } from 'react';
import axios from 'axios';
import MindMap from './components/MindMap';
import { Helmet } from 'react-helmet';
import './App.css';

interface Node {
  text: string;
  start: number;
  end: number;
  label?: string;
}

interface Edge {
  source: number;
  target: number;
}

interface MindMapData {
  nodes: Node[];
  edges: Edge[];
}

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [mindMapData, setMindMapData] = useState<MindMapData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/process', { text });
      setMindMapData(response.data.mindmap);
    } catch (error) {
      console.error("Error fetching mind map:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Helmet>
        <title>AutoMindMap</title>
      </Helmet>
      <h1>AutoMindMap</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Masukkan teks di sini..."
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Proses Teks'}
        </button>
      </form>
      {mindMapData && (
        <div>
          <h2>Mind Map Interaktif</h2>
          <MindMap data={mindMapData} />
        </div>
      )}
    </div>
  );
};

export default App;