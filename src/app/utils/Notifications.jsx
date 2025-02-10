import toast, { Toaster } from "react-hot-toast";

export const notify = (icon, message) => {
    toast(
        <div className="flex items-center gap-2">
            {icon}
            {message}
        </div>
    )
}
