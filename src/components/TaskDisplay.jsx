import { EllipsisVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const TaskDisplay = ({ dataTasks = [], showToast, refreshTasks, theme }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [editModal, setEditModal] = useState(null);
	const [deleteModal, setDeleteModal] = useState(null);

  const menuRefs = useRef({});

  const handleOpenMenu = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  const openEditModal = (id) => {
    setEditModal((prev) => (prev === id ? null : id));
		setOpenMenu(null)
  };

	const openDeleteModal = (id) => {
    setDeleteModal((prev) => (prev === id ? null : id));
		setOpenMenu(null)

  };
  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = Object.values(menuRefs.current);
      const clickedOutside = refs.every(
        (ref) => ref && !ref.contains(event.target)
      );

      if (clickedOutside) {
        setOpenMenu(null);
      }
    };

    if (openMenu !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div className="w-full max-w-6xl relative">

      {dataTasks.length === 0 ? (
        <div className="text-center opacity-60 italic">No notes yet</div>
      ) : (
        <div className="grid grid-cols-* sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {dataTasks.map((task) => (
            <div
              key={task.id}
              ref={(el) => (menuRefs.current[task.id] = el)}
              className="relative rounded-xl shadow-lg p-4 break-words h-auto min-h-[120px] flex flex-col justify-between"

              style={{ backgroundColor: task.colorBg }}
            >
              <div className="text-white text-lg font-semibold mb-2">
                {task.task}
              </div>
							<div className="text-xs text-white">
								{task.description}
							</div>
              <div className="text-white text-xs opacity-70 text-right">
                {task.date}
              </div>

              <div className="absolute top-2 right-2">
                <EllipsisVertical
                  onClick={() => handleOpenMenu(task.id)}
                  className="w-full p-1 cursor-pointer text-white hover:bg-gray-900 hover:rounded-full shadow-2xl transition-all duration-200"
                />
              </div>

              {openMenu === task.id && (
                <div className="absolute w-20 z-50 -right-10 rounded-lg flex flex-col top-8 bg-gray-800 text-sm">
                  <div
                    onClick={() => openEditModal(task.id)}
                    className="cursor-pointer p-1.5 text-white"
                  >
                    Edit
                  </div>
                  <div 
										onClick={() => openDeleteModal(task.id)}
										className="cursor-pointer p-1.5 text-white">Delete</div>
                </div>
              )}

              {editModal === task.id && (
								<EditModal showToast={showToast} refreshTasks={refreshTasks} task={task} closeModal={setEditModal}/>
              )}

							{deleteModal === task.id && (
								<DeleteModal theme={theme} showToast={showToast} refreshTasks={refreshTasks} task={task} closeModal={setDeleteModal}/>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskDisplay;
