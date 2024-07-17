'use client';

import { Editor } from '@tiptap/react';
import { useCallback } from 'react';

type Props = {
  editor: Editor | null;
};

export default function MenuBar({ editor }: Props) {
  const setLink = useCallback(() => {
    if (!editor) {
      return;
    }
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-wrap gap-1">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive('heading', { level: 1 })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive('heading', { level: 2 })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive('heading', { level: 3 })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive('heading', { level: 4 })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        H4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive('heading', { level: 5 })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        H5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive('heading', { level: 6 })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        H6
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive('paragraph')
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive('bold')
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive('italic')
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive('strike')
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive('highlight')
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Highlight
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive({ textAlign: 'left' })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive({ textAlign: 'center' })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive({ textAlign: 'right' })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive({ textAlign: 'justify' })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Justify
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive({ textAlign: 'blockquote' })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Toggle blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive({ textAlign: 'bulletList' })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Toggle bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive({ textAlign: 'orderedList' })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Toggle ordered list
      </button>
      <button
        onClick={setLink}
        className={`rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset transition-colors ${
          editor.isActive({ textAlign: 'link' })
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        Set link
      </button>
    </div>
  );
}
