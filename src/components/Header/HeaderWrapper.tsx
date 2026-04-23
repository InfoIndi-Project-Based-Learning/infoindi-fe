const HeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
      {children}
    </div>
  );
};

export default HeaderWrapper;
