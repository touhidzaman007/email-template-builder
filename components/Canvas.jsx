/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Undo, Redo } from 'lucide-react';

const Canvas = ({
  renderComponent,
  components,
  setCurrentHistoryIndex,
  handleDrop,
  handleDragStart,
  handleDragOver,
  handleComponentSelect,
  handleDelete,
  history,
  draggedOverIndex,
  setDraggedOverIndex,
  handleUndo,
  handleRedo,
}) => {
  const isUndoDisabled = setCurrentHistoryIndex <= 0;
  const isRedoDisabled = setCurrentHistoryIndex >= history.length - 1;

  return (
    <div className="flex-1 p-4">
      <div className="mb-4 flex gap-2">
        <button
          onClick={handleUndo}
          disabled={isUndoDisabled}
          className="p-2 bg-white rounded shadow disabled:opacity-50"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={handleRedo}
          disabled={isRedoDisabled}
          className="p-2 bg-white rounded shadow disabled:opacity-50"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      <div
        className="min-h-[500px] bg-white rounded-lg p-4 shadow"
        onDragOver={event => {
          event.preventDefault();
          if (components.length === 0) {
            setDraggedOverIndex(0);
          }
        }}
        onDrop={event => handleDrop(event, 0)}
      >
        {components.map((component, index) => (
          <div key={component.pk}>
            <div
              className={`relative mb-4 ${
                draggedOverIndex === index ? 'border-t-2 border-blue-500' : ''
              }`}
              onDragOver={event => handleDragOver(event, index)}
              onDrop={event => handleDrop(event, index)}
            >
              <div
                draggable
                onDragStart={event => handleDragStart(event, component)}
                onClick={() => handleComponentSelect(component)}
                className="cursor-move hover:outline hover:outline-2 hover:outline-blue-200 p-2"
              >
                {renderComponent(component)}
                <button
                  onClick={() => handleDelete(component)}
                  className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
            {index === components.length - 1 && (
              <div
                className={`h-4 ${
                  draggedOverIndex === index + 1
                    ? 'border-t-2 border-blue-500'
                    : ''
                }`}
                onDragOver={event => handleDragOver(event, index + 1)}
                onDrop={event => handleDrop(event, index + 1)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
