"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Type,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Start writing...", className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isEditorFocused, setIsEditorFocused] = useState(false)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
    editorRef.current?.focus()
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle common keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault()
          executeCommand("bold")
          break
        case "i":
          e.preventDefault()
          executeCommand("italic")
          break
        case "u":
          e.preventDefault()
          executeCommand("underline")
          break
        case "z":
          e.preventDefault()
          if (e.shiftKey) {
            executeCommand("redo")
          } else {
            executeCommand("undo")
          }
          break
      }
    }
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      executeCommand("createLink", url)
    }
  }

  const insertImage = () => {
    const url = prompt("Enter image URL:")
    if (url) {
      executeCommand("insertImage", url)
    }
  }

  const formatBlock = (tag: string) => {
    executeCommand("formatBlock", tag)
  }

  const toolbarButtons = [
    {
      group: "history",
      buttons: [
        { icon: Undo, command: () => executeCommand("undo"), title: "Undo (Ctrl+Z)" },
        { icon: Redo, command: () => executeCommand("redo"), title: "Redo (Ctrl+Shift+Z)" },
      ],
    },
    {
      group: "formatting",
      buttons: [
        { icon: Bold, command: () => executeCommand("bold"), title: "Bold (Ctrl+B)" },
        { icon: Italic, command: () => executeCommand("italic"), title: "Italic (Ctrl+I)" },
        { icon: Underline, command: () => executeCommand("underline"), title: "Underline (Ctrl+U)" },
      ],
    },
    {
      group: "alignment",
      buttons: [
        { icon: AlignLeft, command: () => executeCommand("justifyLeft"), title: "Align Left" },
        { icon: AlignCenter, command: () => executeCommand("justifyCenter"), title: "Align Center" },
        { icon: AlignRight, command: () => executeCommand("justifyRight"), title: "Align Right" },
      ],
    },
    {
      group: "lists",
      buttons: [
        { icon: List, command: () => executeCommand("insertUnorderedList"), title: "Bullet List" },
        { icon: ListOrdered, command: () => executeCommand("insertOrderedList"), title: "Numbered List" },
      ],
    },
    {
      group: "blocks",
      buttons: [
        { icon: Quote, command: () => formatBlock("blockquote"), title: "Quote" },
        { icon: Type, command: () => formatBlock("h3"), title: "Heading" },
      ],
    },
    {
      group: "media",
      buttons: [
        { icon: LinkIcon, command: insertLink, title: "Insert Link" },
        { icon: ImageIcon, command: insertImage, title: "Insert Image" },
      ],
    },
  ]

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-2">
        <div className="flex flex-wrap items-center gap-1">
          {toolbarButtons.map((group, groupIndex) => (
            <div key={group.group} className="flex items-center">
              {group.buttons.map((button, buttonIndex) => (
                <Button
                  key={buttonIndex}
                  variant="ghost"
                  size="sm"
                  onClick={button.command}
                  title={button.title}
                  className="h-8 w-8 p-0 hover:bg-gray-200"
                >
                  <button.icon className="h-4 w-4" />
                </Button>
              ))}
              {groupIndex < toolbarButtons.length - 1 && <Separator orientation="vertical" className="mx-1 h-6" />}
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsEditorFocused(true)}
        onBlur={() => setIsEditorFocused(false)}
        onKeyDown={handleKeyDown}
        className={cn(
          "min-h-[200px] p-4 prose prose-sm max-w-none focus:outline-none",
          "prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
          "prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1",
          "prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic",
          "prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800",
          "prose-img:rounded-lg prose-img:shadow-sm",
          !value && !isEditorFocused && "text-gray-500",
        )}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
        style={{
          ...(!value &&
            !isEditorFocused && {
              "::before": {
                content: `"${placeholder}"`,
                color: "#9CA3AF",
                pointerEvents: "none",
              },
            }),
        }}
      />

      {/* Character count */}
      <div className="border-t bg-gray-50 px-4 py-2 text-xs text-gray-500 flex justify-between items-center">
        <span>{value.replace(/<[^>]*>/g, "").length} characters</span>
        <span className="text-gray-400">Use Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline</span>
      </div>
    </div>
  )
}
