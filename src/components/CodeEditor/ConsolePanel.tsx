import React from 'react';
import type { RefObject } from 'react';

interface ConsolePanelProps {
  consoleOutputRef: RefObject<HTMLDivElement | null>;
  onClear: () => void;
}

const ConsolePanel: React.FC<ConsolePanelProps> = ({ consoleOutputRef, onClear }) => {
  return (
    <>
      <div className="flex flex-col bg-white rounded-lg shadow overflow-hidden h-48">
        <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 bg-gray-100">
          <h3 className="m-0 text-gray-800 text-xs font-semibold uppercase">控制台</h3>
          <button
            onClick={onClear}
            className="px-2 py-1 border border-gray-300 bg-white rounded text-xs cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-400"
            title="清空控制台"
          >
            清空
          </button>
        </div>
        <div
          ref={consoleOutputRef}
          className="flex-1 overflow-y-auto px-3 py-2 font-mono text-sm leading-relaxed bg-[#2c3e50]"
          style={{ letterSpacing: '0.3px' }}
        />
      </div>

      <style>{`
        .console-log {
          color: #f0f0f0 !important;
          margin: 2px 0 !important;
          padding: 0 !important;
          word-break: break-all;
          font-weight: 500 !important;
        }

        .console-log.console-error {
          color: #ff5555 !important;
          font-weight: 600 !important;
        }

        .console-log.console-warn {
          color: #ffb86c !important;
          font-weight: 600 !important;
        }

        .console-log.console-info {
          color: #5dade2 !important;
          font-weight: 500 !important;
        }
      `}</style>
    </>
  );
};

export default ConsolePanel;
