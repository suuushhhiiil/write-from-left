import BlogEditor from './editor/BlogEditor'

const BlogEditorPage = () => {
    return (
        <div className="min-h-screen rounded-lg px-4 lg:px-20 py-4 lg:py-8 bg-gray-100 w-full">
            <div>
                <BlogEditor />
            </div>
        </div>
    )
}

export default BlogEditorPage