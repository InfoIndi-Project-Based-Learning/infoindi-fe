import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const isUpdating = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing children to prevent duplication in React 18/19 Strict Mode / Hot Reloading
    containerRef.current.innerHTML = "";

    // Create a child element for Quill to bind to
    const editorElement = document.createElement("div");
    containerRef.current.appendChild(editorElement);

    const quill = new Quill(editorElement, {
      theme: "snow",
      placeholder: placeholder || "Tulis deskripsi postingan Anda di sini...",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" }, 
            { list: "bullet" },
            { indent: "-1" }, 
            { indent: "+1" }
          ],
          [{ align: [] }],
          ["link", "blockquote", "code-block"],
          ["clean"],
        ],
      },
    });

    quillRef.current = quill;

    // Set initial value
    if (value) {
      quill.root.innerHTML = value;
    }

    // Listen to text change events
    quill.on("text-change", () => {
      if (isUpdating.current) return;
      
      const html = quill.root.innerHTML;
      // If it's just an empty paragraph, send empty string to trigger validation correctly
      if (html === "<p><br></p>" || html === "<p></p>") {
        onChange("");
      } else {
        onChange(html);
      }
    });

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      quillRef.current = null;
    };
  }, []);

  // Update editor value if it changes from outside
  useEffect(() => {
    if (quillRef.current) {
      const currentHtml = quillRef.current.root.innerHTML;
      if (value !== currentHtml && value !== "<p><br></p>") {
        isUpdating.current = true;
        
        // Save current selection cursor position if possible
        const range = quillRef.current.getSelection();
        quillRef.current.root.innerHTML = value || "";
        if (range) {
          quillRef.current.setSelection(range);
        }
        
        isUpdating.current = false;
      }
    }
  }, [value]);

  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 shadow-sm">
      <style>{`
        .quill-editor-container .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #f3f4f6;
          background-color: #f9fafb;
          padding: 8px 12px;
        }
        .quill-editor-container .ql-container.ql-snow {
          border: none;
          min-height: 250px;
          font-family: inherit;
          font-size: 0.95rem;
        }
        .quill-editor-container .ql-editor {
          padding: 16px;
          min-height: 250px;
        }
        .quill-editor-container .ql-editor.ql-blank::before {
          font-style: normal;
          color: #9ca3af;
          left: 16px;
        }
        .quill-editor-container .ql-snow .ql-picker {
          font-size: 13px;
          font-weight: 500;
        }
      `}</style>
      <div ref={containerRef} className="quill-editor-container" />
    </div>
  );
}

