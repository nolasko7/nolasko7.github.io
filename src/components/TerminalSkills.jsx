import React, { useState, useEffect, useRef } from 'react';

const TerminalSkills = ({ skills, language }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const activeSkill = skills[activeTab];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to generate some mock code based on the skill category
  const getCodeSnippet = (subtitle, name) => {
    const techList = name.split(' / ').map(t => t.trim());
    
    switch (subtitle) {
      case 'Frontend':
        return `// import { useState } from 'react';
// Building user interfaces...

const FrontendStack = () => {
  const tools = [
    "${techList.join('",\n    "')}"
  ];

  return (
    <div className="flex flex-col gap-2">
      {tools.map(tool => (
        <span key={tool} className="text-green-500 font-mono">
          ✓ {tool} initialized successfully
        </span>
      ))}
    </div>
  );
};

export default FrontendStack;`;
      case 'Backend APIs':
        return `const express = require('express');
const app = express();

// Core backend technologies:
const techStack = [
  "${techList.join('",\n  "')}"
];

app.get('/api/status', (req, res) => {
  res.json({
    status: 'Operational',
    uptime: process.uptime(),
    stack: techStack
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('API routes loaded.');
});`;
      case 'Mobile Development':
        return `import 'package:flutter/material.dart';

void main() => runApp(const MobileApp());

class MobileApp extends StatelessWidget {
  const MobileApp({super.key});

  // Mobile Tech Stack:
  final List<String> stack = const [
    "${techList.join('",\n    "')}"
  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: const Text('Mobile Dev')),
        body: Center(
          child: Text('Stack: $stack'),
        ),
      ),
    );
  }
}`;
      case 'Database':
        return `-- Database Architecture
-- Technologies: ${techList.join(', ')}

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tech_stack TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (name, tech_stack)
VALUES ('Portfolio', ARRAY['${techList.join("', '")}']);

SELECT * FROM projects WHERE 'SQL' = ANY(tech_stack);
-- 1 row(s) returned successfully.`;
      case 'Deployment':
        return `name: Production CI/CD

on:
  push:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Infrastructure
        run: |
          echo "Deploying with:"
          echo "- ${techList.join('\n          - ')}"
          
      - name: Build & Push Docker Image
        run: docker-compose up -d --build
        
      - name: Cloudflare Cache Purge
        run: ./purge-cache.sh`;
      case 'Automation':
        return `import { Client, LocalAuth } from 'whatsapp-web.js';
import { generateAIResponse } from './llm-service';

// Automation Stack: ${techList.join(', ')}

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('message', async msg => {
    if (msg.body.startsWith('!book')) {
        const response = await generateAIResponse(msg.body);
        msg.reply(response);
    }
});

client.initialize();
console.log('Automation bot ready and listening.');`;
      default:
        return `// Technologies loaded:
const tools = [
  "${techList.join('",\n  "')}"
];

tools.forEach(tool => {
  console.log(\`[OK] \${tool} is active.\`);
});`;
    }
  };

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    
    const fullText = getCodeSnippet(activeSkill.subtitle, activeSkill.name);
    let i = 0;
    
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.substring(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 15);

    return () => clearInterval(typingInterval);
  }, [activeTab]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const selectSkill = (index) => {
    setActiveTab(index);
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-stone-200/50 dark:border-stone-800/50 bg-stone-50 dark:bg-[#0a0a08] flex flex-col md:flex-row reveal">
      
      {/* Mobile Header / Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-stone-200/50 dark:border-stone-800/50 bg-stone-100/80 dark:bg-[#141410]/80 sticky top-0 z-20 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        
        <div className="relative" ref={menuRef}>
          <button 
            onClick={toggleMenu}
            className="flex items-center gap-2 px-3 py-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg text-xs font-mono text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 transition-colors"
          >
            <span className="text-green-500">📁</span>
            {activeSkill.subtitle}
            <svg 
              className={`w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1a1a16] border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl py-2 z-30 animate-in fade-in zoom-in duration-200">
              <div className="px-3 py-1 mb-1 border-b border-stone-100 dark:border-stone-800/50">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                  {language === 'es' ? 'Explorador' : 'Explorer'}
                </span>
              </div>
              {skills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => selectSkill(index)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-mono flex items-center gap-3 transition-colors ${
                    activeTab === index 
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/50'
                  }`}
                >
                  <span className={activeTab === index ? 'text-green-500' : 'text-stone-400 opacity-50'}>
                    {activeTab === index ? '📂' : '📁'}
                  </span>
                  {skill.subtitle}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar (File Explorer) */}
      <div className="hidden md:flex w-1/3 border-r border-stone-200/50 dark:border-stone-800/50 bg-stone-100/50 dark:bg-[#141410]/50 flex-col">
        {/* Window Controls */}
        <div className="p-4 border-b border-stone-200/50 dark:border-stone-800/50 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          <span className="ml-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
            {language === 'es' ? 'Explorador' : 'Explorer'}
          </span>
        </div>
        
        {/* Folder List */}
        <div className="p-3 flex-1 overflow-y-auto">
          {skills.map((skill, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left px-3 py-3 rounded-lg text-sm font-mono transition-all duration-300 flex items-center gap-3 mb-1 ${
                  isActive 
                    ? 'bg-white dark:bg-stone-800/80 text-green-800 dark:text-green-500 shadow-sm border border-stone-200/50 dark:border-stone-700/50' 
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/30 hover:text-dark dark:hover:text-stone-300 border border-transparent'
                }`}
              >
                <svg className={`w-4 h-4 ${isActive ? 'text-green-500' : 'text-stone-400'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                </svg>
                {skill.subtitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content (Editor / Terminal) */}
      <div className="w-full md:w-2/3 flex flex-col bg-[#1e1e1e] text-[#d4d4d4] min-h-[350px] md:min-h-[450px]">
        {/* Editor Tabs (Desktop & Tablet) */}
        <div className="flex bg-[#2d2d2d] overflow-x-auto border-b border-[#1e1e1e] hide-scrollbar">
          <div className="px-4 py-2.5 bg-[#1e1e1e] border-t-[3px] border-t-green-500 text-[13px] font-mono text-[#ffffff] flex items-center gap-2 min-w-max">
            <svg className="w-4 h-4 text-[#519aba]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            {activeSkill.subtitle.toLowerCase().replace(' ', '_')}.{activeSkill.subtitle === 'Database' ? 'sql' : activeSkill.subtitle === 'Deployment' ? 'yml' : activeSkill.subtitle === 'Mobile Development' ? 'dart' : 'js'}
            <button className="ml-2 w-4 h-4 rounded hover:bg-[#333333] flex items-center justify-center text-stone-400 hover:text-[#ffffff] transition-colors">×</button>
          </div>
        </div>

        {/* Editor Body */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 font-mono text-[11px] md:text-[13px] leading-relaxed whitespace-pre font-light">
          {displayedText.split('\n').map((line, idx) => (
            <div key={idx} className="flex">
              <span className="text-[#858585] select-none text-right pr-4 min-w-[2rem] md:min-w-[2.5rem] border-r border-[#404040] mr-4">{idx + 1}</span>
              <span className="text-[#d4d4d4] break-all md:break-normal">
                {line}
                {isTyping && idx === displayedText.split('\n').length - 1 && (
                  <span className="inline-block w-2 h-4 bg-[#d4d4d4] animate-pulse align-middle ml-1"></span>
                )}
              </span>
            </div>
          ))}
        </div>
        
        {/* Status Bar */}
        <div className="bg-[#007acc] text-[#ffffff] text-[9px] md:text-[11px] px-3 py-1 flex justify-between items-center font-mono shrink-0">
          <div className="flex gap-2 md:gap-4 items-center">
            <span className="flex items-center gap-1 hover:bg-[#ffffff]/10 px-1 py-0.5 rounded cursor-pointer transition-colors">
              <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              main*
            </span>
            <span className="hidden xs:flex hover:bg-[#ffffff]/10 px-1 py-0.5 rounded cursor-pointer transition-colors">UTF-8</span>
          </div>
          <div className="flex gap-2 md:gap-4 items-center">
            <span className="flex items-center gap-1.5 hover:bg-[#ffffff]/10 px-1 py-0.5 rounded cursor-pointer transition-colors">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#27c93f] shadow-[0_0_5px_#27c93f]"></span> Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalSkills;
