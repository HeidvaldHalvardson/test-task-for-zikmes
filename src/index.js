import "./styles/style.scss"
import onUserFormSubmit from "./js/user-form";
import {onFail, onSuccess} from "./js/form-message";

onUserFormSubmit(onSuccess, onFail)
