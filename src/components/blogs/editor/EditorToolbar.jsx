import { useEditorState } from "@tiptap/react"
import { BoldIcon, CodeIcon, Heading1Icon, Heading2Icon, Heading3Icon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, Minus, RedoIcon, Strikethrough, Underline, UndoIcon } from "lucide-react";

import ToolbarButton from "./EditorToolbarButton";


const EditorToolbar = ({ editor }) => {
    const editorState = useEditorState({
        editor,
        selector: ({ editor: currentEditor }) => {
            if (!currentEditor) {
                return null
            }

            return {
                isHeading1: currentEditor.isActive("heading", { level: 1 }),
                isHeading2: currentEditor.isActive("heading", { level: 2 }),
                isHeading3: currentEditor.isActive("heading", { level: 3 }),
                isBold: currentEditor.isActive("bold"),
                isItalic: currentEditor.isActive("italic"),
                isUnderline: currentEditor.isActive("underline"),
                isStrike: currentEditor.isActive("strike"),
                isBulletList: currentEditor.isActive("bulletList"),
                isOrderedList: currentEditor.isActive("orderedList"),
                isBlockquote: currentEditor.isActive("blockquote"),
                isCode: currentEditor.isActive("code"),
                isCodeBlock: currentEditor.isActive("codeBlock"),
                isHorizontalRule: currentEditor.isActive("horizontalRule"),
                canUndo: currentEditor.can().chain().focus().undo().run(),
                canRedo: currentEditor.can().chain().focus().redo().run(),
                isLink: currentEditor.isActive("link"),
            }
        },
    })

    if (!editor || !editorState) {
        return null
    }


    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;

        const url = window.prompt("Enter the URL", previousUrl || "https://");

        if (url === null) {
            return;
        }


        if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-col flex-wrap items-center justify-center gap-1 bg-white p-1 rounded-md">

            {/* Heading 1 */}
            <ToolbarButton
                onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                }
                icon={<Heading1Icon size={16} />}
                isActive={editorState.isHeading1}
            />

            {/* Heading 2 */}
            <ToolbarButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                icon={<Heading2Icon size={16} />}
                isActive={editorState.isHeading2}
            />

            {/* Heading 3 */}
            <ToolbarButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                icon={<Heading3Icon size={16} />}
                isActive={editorState.isHeading3}
            />

            {/* Bold */}
            <ToolbarButton
                icon={<BoldIcon size={16} />}
                isActive={editorState.isBold}
                onClick={() =>
                    editor.chain().focus().toggleBold().run()
                }
            />

            {/* Italic */}
            <ToolbarButton
                icon={<ItalicIcon size={16} />}
                onClick={() =>
                    editor.chain().focus().toggleItalic().run()
                }
                isActive={editorState.isItalic}
            />

            {/* Underline */}
            <ToolbarButton
                icon={<Underline size={16} />}
                onClick={() =>
                    editor.chain().focus().toggleUnderline().run()
                }
                isActive={editorState.isUnderline}
            />

            {/* Strike */}
            <ToolbarButton
                icon={<Strikethrough size={16} />}
                onClick={() =>
                    editor.chain().focus().toggleStrike().run()
                }
                isActive={editorState.isStrike}
            />

            {/* Bullet List */}
            <ToolbarButton
                icon={<ListIcon size={16} />}
                onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
                isActive={editorState.isBulletList}
            />

            {/* Ordered List */}
            <ToolbarButton
                icon={<ListOrderedIcon size={16} />}
                onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
                isActive={editorState.isOrderedList}
            />

            {/* Link */}
            <ToolbarButton
                icon={<LinkIcon size={16} />}
                onClick={setLink}
                isActive={editorState.isLink}
            />

            {/* Blockquote */}
            <ToolbarButton
                iconClass="text-quote"
                onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                }
                icon="“"
                isActive={editorState.isBlockquote}
            />

            {/* Code */}
            <ToolbarButton
                icon={<CodeIcon size={16} />}
                onClick={() =>
                    editor.chain().focus().toggleCode().run()
                }
                isActive={editorState.isCode}
            />

            {/* Horizontal Rule */}
            <ToolbarButton
                icon={<Minus size={16} />}
                isActive={editorState.isHorizontalRule}
                onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                }
            />

            {/* Undo */}
            <ToolbarButton
                icon={<UndoIcon size={16} />}
                onClick={() =>
                    editor.chain().focus().undo().run()
                }
                disabled={!editorState.canUndo}
            />

            {/* Redo */}
            <ToolbarButton
                icon={<RedoIcon size={16} />}
                onClick={() =>
                    editor.chain().focus().redo().run()
                }
                disabled={!editorState.canRedo}
            />



        </div>
    );
};

export default EditorToolbar;
