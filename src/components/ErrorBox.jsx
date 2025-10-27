const ErrorBox = ({ error }) => {
  return (
    <div className="bg-red-100 text-red-700 border border-red-400 rounded-lg p-4 mt-4">
      <strong className="font-semibold">Error:</strong>{" "}
      {error.message || "Failed to load players.\n"}
    </div>
  );
};

export default ErrorBox;
