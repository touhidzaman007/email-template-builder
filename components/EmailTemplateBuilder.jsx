import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Customizer from './Customizer';

import componentData from '../json/componentData.json';
import subComponentsData from '../json/subComponentsData.json';
import Image from 'next/image';

const EmailTemplateBuilder = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  useEffect(() => {
    const savedState = localStorage.getItem('emailTemplateState');
    if (savedState) {
      try {
        setComponents(JSON.parse(savedState));
      } catch {
        console.error('Failed to parse saved state');
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('emailTemplateState', JSON.stringify(components));
    } catch {
      console.error('Failed to save state');
    }
  }, [components]);

  const updateHistory = newComponents => {
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    newHistory.push(newComponents);
    setHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
      setComponents(history[currentHistoryIndex - 1] || []);
    }
  };

  const redo = () => {
    if (currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
      setComponents(history[currentHistoryIndex + 1] || []);
    }
  };

  const selectComponent = component => {
    setSelectedComponent(component);
  };

  const handleStyleUpdate = (property, value) => {
    if (!selectedComponent) return;

    const updatedComponents = components.map(component => {
      if (component.pk === selectedComponent.pk) {
        return {
          ...component,
          componentInfo: {
            ...component.componentInfo,
            attributes: {
              ...component.componentInfo.attributes,
              style: {
                ...component.componentInfo.attributes.style,
                [property]: value,
              },
            },
          },
        };
      }
      return component;
    });

    setComponents(updatedComponents);
    updateHistory(updatedComponents);
    setSelectedComponent(
      updatedComponents.find(
        component => component.pk === selectedComponent.pk
      ) || null
    );
  };

  const handleValueUpdate = value => {
    if (!selectedComponent) return;

    const updatedComponents = components.map(component => {
      if (component.pk === selectedComponent.pk) {
        return {
          ...component,
          componentInfo: {
            ...component.componentInfo,
            value,
          },
        };
      }
      return component;
    });

    setComponents(updatedComponents);
    updateHistory(updatedComponents);
    setSelectedComponent(
      updatedComponents.find(
        component => component.pk === selectedComponent.pk
      ) || null
    );
  };

  const deleteComponent = component => {
    const updatedComponents = components.filter(
      comp => comp.pk !== component.pk
    );
    setComponents(updatedComponents);
    updateHistory(updatedComponents);
    setSelectedComponent(null);
  };

  const startDrag = (e, component) => {
    try {
      e.dataTransfer.setData('text/plain', JSON.stringify(component));
      e.dataTransfer.effectAllowed = 'move';
    } catch {
      console.error('Failed to start drag');
    }
  };

  const dragOver = (e, index) => {
    e.preventDefault();
    setDraggedOverIndex(index);
  };

  const drop = (e, dropIndex) => {
    e.preventDefault();
    try {
      const draggedComponent = JSON.parse(e.dataTransfer.getData('text/plain'));
      let updatedComponents = [...components];

      if (!components.find(c => c.pk === draggedComponent.pk)) {
        const newComponent = {
          ...draggedComponent,
          pk: `${draggedComponent.pk}-${Date.now()}`,
        };
        updatedComponents.splice(dropIndex, 0, newComponent);
      } else {
        const dragIndex = components.findIndex(
          c => c.pk === draggedComponent.pk
        );
        updatedComponents = components.filter(
          c => c.pk !== draggedComponent.pk
        );
        updatedComponents.splice(
          dropIndex > dragIndex ? dropIndex - 1 : dropIndex,
          0,
          draggedComponent
        );
      }

      setComponents(updatedComponents);
      updateHistory(updatedComponents);
      setDraggedOverIndex(null);
    } catch {
      console.error('Failed to drop component');
    }
  };

  const renderComponent = component => {
    const { componentInfo } = component;
    const {
      type,
      value,
      attributes = {},
      src,
      alt,
      as: Component = 'div',
      href,
    } = componentInfo || {};

    switch (type) {
      case 'image':
        return (
          <Image src={src} alt={alt} width={500} height={300} {...attributes} />
        );
      case 'button':
        return (
          <a href={href} style={attributes.style}>
            {value}
          </a>
        );
      case 'heading':
        return <Component style={attributes.style}>{value}</Component>;
      default:
        return <div style={attributes.style}>{value}</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        subComponentsData={subComponentsData}
        handleDragStart={startDrag}
      />
      <Canvas
        renderComponent={renderComponent}
        components={components}
        setCurrentHistoryIndex={setCurrentHistoryIndex}
        handleDrop={drop}
        handleDragStart={startDrag}
        handleDragOver={dragOver}
        handleComponentSelect={selectComponent}
        handleDelete={deleteComponent}
        history={history}
        draggedOverIndex={draggedOverIndex}
        setDraggedOverIndex={setDraggedOverIndex}
        handleUndo={undo}
        handleRedo={redo}
      />
      <Customizer
        selectedComponent={selectedComponent}
        handleStyleUpdate={handleStyleUpdate}
        handleValueUpdate={handleValueUpdate}
      />
    </div>
  );
};

export default EmailTemplateBuilder;
