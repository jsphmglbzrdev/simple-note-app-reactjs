import { useState } from "react";
import Circle from "@uiw/react-color-circle";

const EditModal = ({ task, closeModal }) => {
  const [editTask, setEditTitle] = useState(task.task);
  const [hex, setHex] = useState("#F44E3B");

  const handleEditTask = (e) => {
    setEditTitle(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-md shadow-2xl">
      <div
        className="w-[400px] max-w-full p-6 rounded-lg shadow-lg relative"
        style={{ backgroundColor: task.colorBg }}
      >
        <div className="flex flex-col space-y-4">
          {/* Title input */}
          <input
            value={editTask}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="text-xl w-full border-none outline-none text-white font-bold"
          />

          <textarea
            placeholder="Enter your notes here..."
            className="text-sm w-full h-40 text-white border-none outline-none resize-none overflow-y-auto"
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
              colors={["#F44E3B", "#0b7a5d", "#FCDC00", "#DBDF00"]}
              className="bg-gray-800 p-2 rounded-xl"
              color={hex}
              onChange={(color) => {
                setHex(color.hex);
              }}
            />
            <div className=" text-xs cursor-pointer bg-gray-800 transition-all duration-200 hover:bg-gray-900 text-white rounded-xl px-5 py-2">
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
