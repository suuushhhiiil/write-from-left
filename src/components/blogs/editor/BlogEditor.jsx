import { useEditor, EditorContent } from "@tiptap/react"

import { editorExtensions } from "./editorExtensions"
import EditorToolbar from "./EditorToolbar"


const BlogEditor = () => {
    const editor = useEditor({
        extensions: editorExtensions,

        content: ``,

        editorProps: {
            attributes: {
                class: "tiptap bg-white border border-gray-300 rounded-lg p-18"
            }
        }
    })

    if (!editor) return null

    return (
        <div className="flex flex-col gap-4 items-center justify-center overflow-hidden">
            <div className="fixed top-[50%] right-20 translate-y-[-50%]">
                <EditorToolbar editor={editor} />
            </div>
            <div className="w-3/4">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default BlogEditor