import { useEffect, useRef, useState } from "react"
import ToolbarButton from "./EditorToolbarButton"
import { Image } from "lucide-react"
import ImageUploadModel from "./ImageUploadModel";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']

const ImageUploadButton = ({ editor }) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [error, setError] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fileInputRef = useRef(null)


    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]

        if (!file) { return; }

        setError(null)


        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setError('Image must be a valid file type (JPEG, PNG, JPG, WEBP)')
            event.target.value = ""
            return
        }

        if (file.size > MAX_FILE_SIZE) {
            setError('Image must be smaller than 5MB')
            event.target.value = ""
            return
        }


        const objectUrl = URL.createObjectURL(file)

        setSelectedFile(file)
        setPreviewUrl(objectUrl)
        setIsModalOpen(true)

        // TODO: Upload image to server and get the URL
    }

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])


    return (
        <>
            <button
                onClick={handleButtonClick}
                className="relative group rounded p-2 cursor-pointer outline-none text-md transition hover:bg-gray-200"
            >
                <Image size={20} strokeWidth={1.5} />
                <span className="absolute bottom-[125%] left-[50%] translate-x-[-50%] text-xs whitespace-nowrap bg-gray-200 text-gray-700 px-2 py-1 rounded-md group-hover:block hidden ">Upload Image</span>
            </button>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            {isModalOpen && (
                <div className="fixed bottom-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">

                    <ImageUploadModel
                        file={selectedFile}
                        previewUrl={previewUrl}
                        onCancel={() => setIsModalOpen(false)}
                        onUpload={() => { }}
                    />
                </div>
            )}
        </>
    )
}

export default ImageUploadButton