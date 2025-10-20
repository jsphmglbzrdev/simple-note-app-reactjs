import { useState, useEffect } from "react";
import ToastMessage from "./ToastMessage";
import TaskDisplay from "./TaskDisplay";
import Circle from '@uiw/react-color-circle';



const TodoTable = ({ theme }) => {

	const [savedTask, setSavedTask] = useState(() => {
		const getSavedTask = localStorage.getItem("savedTask")
		return getSavedTask ? JSON.parse(getSavedTask) : []
	})

  const [taskValue, setTaskValue] = useState("");
  const [toast, setToast] = useState({
    show: false,
    type: "",
  });

  const [hex, setHex] = useState('#2D336B');
	const [color, showColor] = useState(false)
	

  const storeTask = () => {
    if (!taskValue.trim()) {
      setToast({ show: true, type: "error" });
      return;
    }
    const data = {
      id: Date.now(),
      task: taskValue,
      date: new Date().toLocaleDateString(),
      isDone: false,
			colorBg: hex
    };

		setSavedTask([...savedTask, data])

		localStorage.setItem("savedTask", JSON.stringify([...savedTask, data]))

    setTaskValue("");
    setToast({ show: true, type: "success" });
  };

	

  const handleTaskValue = (e) => {
    setTaskValue(e.target.value);
  };

	useEffect(() => {

	}, [hex])

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
        <div className="flex gap-2 sm:w-80 md:w-96 ">
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

							<div className="">
								<div onClick={() => showColor(prev => !prev)} style={{backgroundColor: hex}} className="relative cursor-pointer top-3 flex items-center justify-center w-6 h-6 rounded-full">
									<div className={`${color ? 'flex' : 'hidden'} absolute top-8 right-0 left-0 justify-center text-center`}>
										<Circle
										colors={[ '#2D336B', '#0b7a5d', '#34656D', '#344F1F' ]}
										className=" backdrop-blur-xl rounded-xl bg-gray-500 p-2 shadow-2xl "
										color={hex}
										onChange={(color) => {
											setHex(color.hex);
										}}
									/>
									</div>
								</div>
						
								
							</div>

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
        <TaskDisplay dataTasks={savedTask} theme={theme} />
      </div>
    </div>
  );
};

export default TodoTable;
