import { useEditor, EditorContent } from "@tiptap/react"

import { editorExtensions } from "./editorExtensions"
import EditorToolbar from "./EditorToolbar"


const BlogEditor = () => {
    const editor = useEditor({
        extensions: editorExtensions,

        content: ``,

        editorProps: {
            attributes: {
                class: "tiptap bg-white border border-gray-300 rounded-lg p-4 lg:p-18"
            }
        }
    })

    if (!editor) return null

    return (
        <div className="flex flex-col gap-4 items-center justify-center overflow-hidden">
            <div className="fixed bottom-4 lg:bottom-12 left-[50%] translate-x-[-50%] z-100 w-full lg:w-fit  rounded-lg px-8 lg:px-0 ">
                <EditorToolbar editor={editor} />
            </div>
            <div className="w-full lg:w-3/4">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default BlogEditor