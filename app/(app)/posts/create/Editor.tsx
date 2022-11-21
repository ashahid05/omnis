"use client";

import Utils from "#utils";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faListOl,
  faListUl,
  faCode,
  faFileCode,
  faUndo,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

const characterLimit: number = 512;

const Editor: React.FC<{
  onChange(currentContent: string): void;
  disabled: boolean;
}> = ({ onChange, disabled }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CharacterCount.configure({ limit: characterLimit }),
      Placeholder.configure({
        placeholder: "Write something..",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    editable: !disabled,
    onUpdate(props) {
      const content = props.editor.getHTML();
      return onChange(content);
    },
  });

  return (
    <div className="w-full bg-cool-gray-800 rounded-lg border border-gray-600">
      <div className="flex justify-between items-center py-2 px-3 border-b border-gray-600">
        <div className="flex flex-wrap items-center divide-x divide-gray-600">
          <div className="flex items-center space-x-1 sm:pr-2">
            <button
              type="button"
              className={Utils.concat(
                "p-2 text-gray-400 rounded cursor-pointer hover:text-white hover:bg-gray-600",
                editor?.isActive("bold") && "bg-gray-800"
              )}
              onClick={() => editor?.chain().focus().toggleBold().run()}
              disabled={!editor?.can().chain().focus().toggleBold().run()}
            >
              <FontAwesomeIcon
                className="w-5 h-5 mx-auto block"
                icon={faBold}
              />
            </button>
            <button
              type="button"
              className={Utils.concat(
                "p-2 text-gray-400 rounded cursor-pointer hover:text-white hover:bg-gray-600",
                editor?.isActive("italic") && "bg-gray-800"
              )}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              disabled={!editor?.can().chain().focus().toggleItalic().run()}
            >
              <FontAwesomeIcon
                className="w-5 h-5 mx-auto block"
                icon={faItalic}
              />
            </button>
            <button
              type="button"
              className={Utils.concat(
                "p-2 text-gray-400 rounded cursor-pointer hover:text-white hover:bg-gray-600",
                editor?.isActive("underline") && "bg-gray-800"
              )}
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              disabled={!editor?.can().chain().focus().toggleUnderline().run()}
            >
              <FontAwesomeIcon
                className="w-5 h-5 mx-auto block"
                icon={faUnderline}
              />
            </button>
            <button
              type="button"
              className={Utils.concat(
                "p-2 text-gray-400 rounded cursor-pointer hover:text-white hover:bg-gray-600",
                editor?.isActive("strike") && "bg-gray-800"
              )}
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              disabled={!editor?.can().chain().focus().toggleStrike().run()}
            >
              <FontAwesomeIcon
                className="w-5 h-5 mx-auto block"
                icon={faStrikethrough}
              />
            </button>
          </div>
          <div className="flex items-center space-x-1 sm:px-2">
            <button
              type="button"
              className={Utils.concat(
                "p-2 text-gray-400 rounded cursor-pointer hover:text-white hover:bg-gray-600",
                editor?.isActive("orderedList") && "bg-gray-800"
              )}
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            >
              <FontAwesomeIcon
                className="w-5 h-5 mx-auto block"
                icon={faListOl}
              />
            </button>
            <button
              type="button"
              className={Utils.concat(
                "p-2 text-gray-400 rounded cursor-pointer hover:text-white hover:bg-gray-600",
                editor?.isActive("bulletList") && "bg-gray-800"
              )}
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
            >
              <FontAwesomeIcon
                className="w-5 h-5 mx-auto block"
                icon={faListUl}
              />
            </button>
          </div>
          <div className="flex flex-wrap items-center space-x-1 sm:pl-2">
            <button
              type="button"
              className={Utils.concat(
                "p-2 text-gray-400 rounded cursor-pointer hover:text-white hover:bg-gray-600",
                editor?.isActive("code") && "bg-gray-800"
              )}
              onClick={() => editor?.chain().focus().toggleCode().run()}
              disabled={!editor?.can().chain().focus().toggleCode().run()}
            >
              <FontAwesomeIcon
                className="w-5 h-5 mx-auto block"
                icon={faCode}
              />
            </button>
            <button
              type="button"
              className={Utils.concat(
                "p-2 text-gray-400 rounded cursor-pointer hover:text-white hover:bg-gray-600",
                editor?.isActive("codeBlock") && "bg-gray-800"
              )}
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
            >
              <FontAwesomeIcon
                className="w-5 h-5 mx-auto block"
                icon={faFileCode}
              />
            </button>
          </div>
        </div>
        <div className="flex items-center flex-col sm:flex-row">
          <button
            type="button"
            className="p-2 text-gray-400 rounded cursor-pointer hover:text-white hover:bg-gray-600"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
          >
            <FontAwesomeIcon className="w-5 h-5 mx-auto block" icon={faUndo} />
          </button>
          <button
            type="button"
            className="p-2 text-gray-400 rounded cursor-pointer hover:text-white hover:bg-gray-600"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
          >
            <FontAwesomeIcon className="w-5 h-5 mx-auto block" icon={faRedo} />
          </button>
        </div>
      </div>
      <div className="py-2 px-4 bg-cool-gray-900 rounded-b-lg">
        <EditorContent
          editor={editor}
          style={{ cursor: disabled ? "not-allowed" : "text" }}
        />
      </div>
    </div>
  );
};

export default Editor;
