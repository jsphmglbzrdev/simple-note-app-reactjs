const TaskDisplay = ({ dataTasks = [], theme }) => {
  return (
    <div className="w-full max-w-6xl">
      {dataTasks.length === 0 ? (
        <div className="text-center opacity-60 italic">No notes yet</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {dataTasks.map((task) => (
            <div
              key={task.id}
              className={`${task.color} rounded-xl shadow-md p-4 break-words transition-transform hover:scale-[1.02]`}
            >
              <div className={`${theme ? 'text-white' : 'text-black'} text-lg font-semibold mb-2`}>{task.task}</div>
              <div className={`${theme ? 'text-white' : 'text-black'} text-xs opacity-70 text-right`}>
                {task.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskDisplay;
