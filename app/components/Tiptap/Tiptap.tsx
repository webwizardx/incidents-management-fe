'use client';

import './styles.scss';

import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';

export default function Tiptap() {
  const editor = useEditor({
    content: `test`,
    extensions: [
      Highlight,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    immediatelyRender: false,
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="bg-gray-100 p-4">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
