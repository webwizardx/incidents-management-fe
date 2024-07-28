'use client';

import './styles.scss';

import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import MenuBar from './MenuBar';
type Props = {
  content?: string;
  onChange?: (content: string) => void;
};

export default function Tiptap({ content = '', onChange }: Props) {
  const editor = useEditor({
    content,
    extensions: [
      Highlight,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Placeholder.configure({
        placeholder: 'Ingrese una respuesta...',
      }),
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        onChange?.('');
      } else {
        onChange?.(JSON.stringify(editor.getHTML()));
      }
    },
  });

  useEffect(() => {
    if (content === '') {
      editor?.commands.clearContent(true);
    }
  }, [content, editor]);

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
