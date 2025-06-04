import { Alert } from "reactstrap";
const AlertComponent = (props) => {
  return (
    <Alert color={props.color} fade={false}>
      {props.message}
    </Alert>
  );
};

export default AlertComponent;
