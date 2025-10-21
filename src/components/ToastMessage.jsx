import {useEffect} from 'react'



const ToastMessage = ({ toastData, setToastData, theme }) => {
	


  useEffect(() => {
    if (toastData.show) {
      const timer = setTimeout(() => {
        setToastData({ show: false, type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastData]);

  return (
    toastData.show && (
      <div className="absolute top-20 z-50 p-5 right-0 text-white backdrop-blur-xl rounded-xl bg-white/10 shadow-2xl border-white/20 text-sm">
        {toastData.type === "error" ? (
          <div className={`${theme ? 'text-red-300' : 'text-red-500'}`}>{toastData.message}</div>
        ) : (
          <div className={`${theme ? 'text-green-300' : 'text-green-500'}`}>{toastData.message}</div>
        )}
      </div>
    )
  );
};

export default ToastMessage;
