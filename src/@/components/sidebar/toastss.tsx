import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "../ui/button"


export function ToastSimple(){
  const notify = () => toast("Mail sent Successfully");

  return (
    <div>
      <Button variant="destructive" onClick={notify}>Send Manual analysis Request</Button>
      <ToastContainer />
    </div>
  );
}