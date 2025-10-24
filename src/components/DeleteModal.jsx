import {useState, useEffect} from 'react'

const DeleteModal = ({closeModal, task, showToast, refreshTasks, theme}) => {
	



	const handleDeleteTask = (id) => {
		const updatedTasks = JSON.parse(localStorage.getItem('savedTask')) || [];

		const filteredTasks = updatedTasks.filter((task) => task.id !== id);

		localStorage.setItem('savedTask', JSON.stringify(filteredTasks));

		showToast({
			type: 'success',
			message: 'Task deleted successfully!',
			show: true,
		})
		refreshTasks();
		closeModal(null);
	}

	return (
  <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-md shadow-2xl">
      <div
        className="w-[300px] transition-all duration-500 max-w-full p-6 rounded-lg shadow-lg relative"
      >
				<div className='text-sm text-center mb-5'>
					Are you sure you want to delete this task?
				</div>
				<div className="flex items-center justify-center text-sm gap-2">
					<button onClick={() => closeModal(null)} 
					className={`bg-gray-400 hover:bg-gray-600 py-2 px-5 cursor-pointer rounded-2xl transition-all duration-200 ${theme ? 'text-gray-200' : 'text-white'}`}
					>Cancel</button>
					<button onClick={() => handleDeleteTask(task.id)} className={`bg-red-400 hover:bg-red-600 py-2 px-5  cursor-pointer rounded-2xl transition-all ${theme ? 'text-gray-200' : 'text-white'}`}>Delete</button>
				</div>
      </div>
    </div>
	)
}

export default DeleteModal