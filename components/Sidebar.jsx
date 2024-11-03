const Sidebar = ({ subComponentsData, handleDragStart }) => {
  return (
    <div className="w-64 bg-white p-4 border-r">
      <h2 className="text-lg font-bold mb-4">Components</h2>
      {subComponentsData.map(component => (
        <div
          key={component.pk}
          draggable
          onDragStart={e => handleDragStart(e, component)}
          className="bg-blue-50 p-4 rounded cursor-pointer hover:bg-blue-100 mb-2"
        >
          <h3 className="font-medium">{component.componentInfo.label}</h3>
          <p className="text-sm text-gray-600">Drag to add</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
