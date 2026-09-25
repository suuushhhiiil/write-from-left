import React from 'react'

const ToolbarButton = ({ icon, iconClass, onClick, disabled = false, isActive = false }) => {
    return (
        <button type="button" onClick={onClick} className={`rounded p-3 text-md transition ${isActive
            ? "bg-black text-white"
            : "hover:bg-gray-200"
            } ${disabled
                ? "cursor-not-allowed opacity-40"
                : ""
            }`} disabled={disabled} aria-label={icon}>
            <span className={`${iconClass}`}>{icon}</span>
        </button>
    )
}

export default ToolbarButton