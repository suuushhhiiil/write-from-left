const ImageUploadModel = ({ file, previewUrl, onCancel, onUpload }) => {
    return (
        <div>
            <div>
                <h2>Upload Image</h2>

                <img src={previewUrl} alt="Preview" />

                <p>{file.name}</p>

                <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>

                <button onClick={onCancel}>Cancel</button>
                <button onClick={onUpload}>Upload Image</button>
            </div>
        </div>
    )
}

export default ImageUploadModel