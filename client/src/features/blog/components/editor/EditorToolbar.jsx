import { useEditorState } from "@tiptap/react"
import { BoldIcon, CodeIcon, Heading1Icon, Heading2Icon, Heading3Icon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, Minus, Quote, RedoIcon, Strikethrough, Underline, UndoIcon } from "lucide-react";

import ToolbarButton from "./EditorToolbarButton";
import ImageUploadButton from "./ImageUploadButton";


const EditorToolbar = ({ editor, onFileSelected }) => {
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
        <div className="flex items-center justify-start gap-1 bg-white border border-gray-300 p-1 rounded-md shadow-lg overflow-x-auto lg:overflow-x-visible w-full">
            {/* Heading 1 */}
            <ToolbarButton
                onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                }
                title="Heading 1"
                icon={<Heading1Icon />}
                isActive={editorState.isHeading1}
            />

            {/* Heading 2 */}
            <ToolbarButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                title="Heading 2"
                icon={<Heading2Icon />}
                isActive={editorState.isHeading2}
            />

            {/* Heading 3 */}
            <ToolbarButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                title="Heading 3"
                icon={<Heading3Icon />}
                isActive={editorState.isHeading3}
            />

            {/* Bold */}
            <ToolbarButton
                title="Bold"
                icon={<BoldIcon />}
                isActive={editorState.isBold}
                onClick={() =>
                    editor.chain().focus().toggleBold().run()
                }
            />

            {/* Italic */}
            <ToolbarButton
                title="Italic"
                icon={<ItalicIcon />}
                onClick={() =>
                    editor.chain().focus().toggleItalic().run()
                }
                isActive={editorState.isItalic}
            />

            {/* Underline */}
            <ToolbarButton
                title="Underline"
                icon={<Underline />}
                onClick={() =>
                    editor.chain().focus().toggleUnderline().run()
                }
                isActive={editorState.isUnderline}
            />

            {/* Strike */}
            <ToolbarButton
                title="Strikethrough"
                icon={<Strikethrough />}
                onClick={() =>
                    editor.chain().focus().toggleStrike().run()
                }
                isActive={editorState.isStrike}
            />

            {/* Bullet List */}
            <ToolbarButton
                title="Bullet List"
                icon={<ListIcon />}
                onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
                isActive={editorState.isBulletList}
            />

            {/* Ordered List */}
            <ToolbarButton
                title="Ordered List"
                icon={<ListOrderedIcon />}
                onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
                isActive={editorState.isOrderedList}
            />

            {/* Link */}
            <ToolbarButton
                icon={<LinkIcon />}
                onClick={setLink}
                isActive={editorState.isLink}
                title="Link"
            />


            <ImageUploadButton onFileSelected={onFileSelected} />

            {/* Blockquote */}
            <ToolbarButton
                iconClass="text-quote"
                onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                }
                icon={<Quote />}
                title="Blockquote"
                isActive={editorState.isBlockquote}
            />

            {/* Code */}
            <ToolbarButton
                icon={<CodeIcon />}
                onClick={() =>
                    editor.chain().focus().toggleCode().run()
                }
                title="Code"
                isActive={editorState.isCode}
            />

            {/* Horizontal Rule */}
            <ToolbarButton
                icon={<Minus />}
                title="Horizontal Rule"
                isActive={editorState.isHorizontalRule}
                onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                }
            />

            {/* Undo */}
            <ToolbarButton
                icon={<UndoIcon />}
                title="Undo"
                onClick={() =>
                    editor.chain().focus().undo().run()
                }
                disabled={!editorState.canUndo}
            />

            {/* Redo */}
            <ToolbarButton
                icon={<RedoIcon />}
                title="Redo"
                onClick={() =>
                    editor.chain().focus().redo().run()
                }
                disabled={!editorState.canRedo}
            />



        </div>
    );
};

export default EditorToolbar;
