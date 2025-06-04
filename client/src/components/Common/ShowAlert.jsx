import Swal from "sweetalert2";
import "animate.css";

const showAlert = async ({
  title,
  text,
  icon,
  goBack = false,
  navigate = null,
  timer = 3000,
}) => {
  await Swal.fire({
    title,
    text,
    icon,
    timer,
    timerProgressBar: true,
    showConfirmButton: false,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });

  if (goBack && navigate) {
    navigate(-1);
  }
};

export default showAlert;
