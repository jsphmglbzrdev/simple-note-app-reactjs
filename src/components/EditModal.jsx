import { useState, useEffect } from "react";
import Circle from "@uiw/react-color-circle";

const EditModal = ({ task, closeModal, showToast, refreshTasks }) => {
  const [editTitle, setEditTitle] = useState(task.task);
  const [editDescription, setEditDescription] = useState("");

  const [hex, setHex] = useState(task.colorBg);

  const handleUpdateData = () => {
    const dataTask = localStorage.getItem("savedTask");
    const savedTask = dataTask ? JSON.parse(dataTask) : [];

    const updatedTasks = savedTask.map((item) =>
      item.id === task.id
        ? {
            ...item,
            task: editTitle,
            description: editDescription,
            date: new Date().toLocaleDateString(),
            colorBg: hex,
          }
        : item
    );

    localStorage.setItem("savedTask", JSON.stringify(updatedTasks));
    console.log(updatedTasks);
    showToast({
      show: true,
      type: "success",
      message: "Task updated successfully!",
    });
    refreshTasks();
    // Pass updated tasks to parent
    closeModal(null);
  };

  useEffect(() => {
    setEditTitle(task.task);
    setEditDescription(task.description);
    setHex(task.colorBg);
  }, [task]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-md shadow-2xl">
      <div
        className="w-[400px] transition-all duration-500 max-w-full p-6 rounded-lg shadow-lg relative"
        style={{ backgroundColor: hex }}
      >
        <div className="flex flex-col space-y-4">
          {/* Title input */}
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="text-xl w-full border-none outline-none text-white font-bold"
          />

          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Enter your notes here..."
            className="text-sm w-full h-55 mb-10 border-none outline-none text-white resize-none overflow-y-auto custom-scroll"
          />

          <div
            className="absolute top-2 right-4 text-sm cursor-pointer text-white hover:text-gray-400"
            onClick={() => closeModal(null)}
          >
            X
          </div>
          <div className="absolute bottom-5 left-5 text-xs text-white">
            {task.date}
          </div>
          <div className="absolute bottom-2 right-5">
            <div className="flex items-center justify-center gap-2">
              <Circle
                colors={["#2D336B", "#0b7a5d", "#34656D", "#344F1F"]}
                className="bg-gray-800 p-2 rounded-xl"
                color={hex}
                onChange={(color) => {
                  setHex(color.hex);
                }}
              />
              <div
                onClick={handleUpdateData}
                className=" text-xs cursor-pointer bg-gray-800 transition-all duration-200 hover:bg-gray-900 text-white rounded-xl px-5 py-2"
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
