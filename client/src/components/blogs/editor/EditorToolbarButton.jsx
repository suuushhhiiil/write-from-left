import React from 'react'

const ToolbarButton = ({ icon, iconClass, onClick, disabled = false, isActive = false, title = "Title" }) => {
    return (
        <div className="relative group">

            <button type="button" onClick={onClick} className={`rounded p-2 cursor-pointer outline-none text-md transition ${isActive
                ? "bg-black text-white"
                : "hover:bg-gray-200"
                } ${disabled
                    ? "cursor-not-allowed opacity-40"
                    : ""
                }`} disabled={disabled} aria-label={icon}>
                <span className={`${iconClass}`}>{typeof icon === 'string' ? icon : React.cloneElement(icon, { strokeWidth: 1.5, size: 20 })}</span>
            </button>
            <span className="absolute bottom-[125%] left-[50%] translate-x-[-50%] text-xs whitespace-nowrap bg-gray-200 text-gray-700 px-2 py-1 rounded-md group-hover:block hidden ">{title}</span>
        </div>
    )
}

export default ToolbarButton