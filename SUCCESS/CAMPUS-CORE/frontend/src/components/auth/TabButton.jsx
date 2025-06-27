const TabButton = ({ children, isActive, onClick, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive
          ? 'bg-white text-[#3666F6] shadow-soft'
          : 'text-gray-600 hover:bg-white/50'
      }`}
    >
      {Icon && <Icon className={`h-4 w-4 ${isActive ? 'text-[#3666F6]' : 'text-gray-500'}`} />}
      <span>{children}</span>
    </button>
  );
};

export default TabButton;
