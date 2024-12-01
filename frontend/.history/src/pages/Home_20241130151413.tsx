import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
import axios from "axios";
import { BACKEND_URL } from '../config';

export function Home() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/builder', { state: { prompt } });
    }
  };

  return (
      <div className="w-full h-screen p-5 bg-gray-200">
    

        
          <div className='w-full h-[80%] rounded-2xl overflow-hidden' >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the website you want to build..."
              className="w-full h-full px-10 py-5 bg-black text-white"
            />
          </div>
            <div className='px-10 mt-10 py-2 rounded-full bg-black text-white w-fit mx-auto' onClick={handleSubmit}>
                Run
            </div>
      </div>
  );
}