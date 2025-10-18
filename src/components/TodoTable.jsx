import { useState } from "react";
import ToastMessage from "./ToastMessage";
import TaskDisplay from "./TaskDisplay";

const TodoTable = ({ theme }) => {
  const [taskValue, setTaskValue] = useState("");
  const [dataTask, setDataTask] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    type: "",
  });

  const storeTask = () => {
    if (!taskValue.trim()) {
      setToast({ show: true, type: "error" });
      return;
    }


    const data = {
      id: dataTask.length + 1,
      task: taskValue,
      date: new Date().toLocaleDateString(),
      isDone: false,
    };

    setDataTask([...dataTask, data]);
    setTaskValue("");
    setToast({ show: true, type: "success" });
  };

  const handleTaskValue = (e) => {
    setTaskValue(e.target.value);
  };

  return (
    <div
      className={`min-h-screen w-full ${
        theme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
 

      {/* ===== TOAST MESSAGE ===== */}
      <ToastMessage toastData={toast} theme={theme} setToastData={setToast} />

      {/* ===== INPUT FIELD (fixed below header) ===== */}
      <div
        className={`fixed top-16 left-0 w-full flex justify-center py-3 z-40 backdrop-blur-md`}
      >
        <div className="flex gap-2 w-[500px] sm:w-80 md:w-96 lg:w-[700px]">
          <input
            value={taskValue}
            onChange={handleTaskValue}
						onKeyDown={(e) => {
							e.key === "Enter" && storeTask();
						}}
            type="text"
            placeholder="Take a note..."
            className={`border-2 rounded-md transition-all duration-200
              ${
                theme
                  ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
                  : "border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:border-gray-600"
              }
              w-full py-2 px-4
            `}
          />
          <button
            onClick={storeTask}
            className={`border-2 rounded-md transition-all duration-200 cursor-pointer
              ${
                theme
                  ? "border-gray-300 text-white hover:bg-gray-200 hover:text-black"
                  : "border-gray-700 text-black hover:bg-gray-800 hover:text-white"
              }
              px-5
            `}
          >
            +
          </button>
        </div>
      </div>

      {/* ===== TASK DISPLAY ===== */}
      <div className="pt-36 pb-10 flex justify-center px-5">
        <TaskDisplay dataTasks={dataTask} theme={theme} />
      </div>
    </div>
  );
};

export default TodoTable;
