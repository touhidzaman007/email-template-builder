import React from 'react';

const Customizer = ({
  selectedComponent,
  handleStyleUpdate,
  handleValueUpdate,
}) => {
  if (!selectedComponent) {
    return (
      <div className="w-64 bg-white p-4 border-l">
        <h2 className="text-lg font-bold mb-4">Customize</h2>
        <p className="text-gray-500">Select a component to customize</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white p-4 border-l">
      <h2 className="text-lg font-bold mb-4">Customize</h2>
      {selectedComponent ? (
        <div className="space-y-4">
          {selectedComponent.componentInfo.value !== undefined && (
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <input
                type="text"
                value={selectedComponent.componentInfo.value}
                onChange={e => handleValueUpdate(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">
              Font Size(px)
            </label>
            <input
              type="text"
              value={
                selectedComponent.componentInfo.attributes?.style?.fontSize
              }
              onChange={e => handleStyleUpdate('fontSize', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {selectedComponent.componentInfo.type !== 'image' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <input
                  type="color"
                  value={
                    selectedComponent.componentInfo.attributes?.style?.color
                  }
                  onChange={e => handleStyleUpdate('color', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Background Color
                </label>
                <input
                  type="color"
                  value={
                    selectedComponent.componentInfo.attributes?.style
                      ?.backgroundColor || '#ffffff'
                  }
                  onChange={e =>
                    handleStyleUpdate('backgroundColor', e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </>
          )}
          {selectedComponent.componentInfo.type === 'button' && (
            <div>
              <label className="block text-sm font-medium mb-1">Link URL</label>
              <input
                type="text"
                value={selectedComponent.componentInfo.href}
                onChange={e => handleStyleUpdate('href', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Select a component to customize</p>
      )}
    </div>
  );
};

export default Customizer;
