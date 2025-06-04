import { useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const ToastrNotification = ({ message, type = "info", title = "" }) => {
  useEffect(() => {
    toastr.options = {
      positionClass: "toast-top-right",
      timeOut: "5000",
      extendedTimeOut: "1000",
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      showDuration: "300",
      hideDuration: "1000",
    };

    // Trigger toastr based on type
    switch (type) {
      case "success":
        toastr.success(message, title);
        break;
      case "error":
        toastr.error(message, title);
        break;
      case "warning":
        toastr.warning(message, title);
        break;
      default:
        toastr.info(message, title);
    }
  }, [message, type, title]);

  return null; // This component doesn't render any JSX
};

export default ToastrNotification;
