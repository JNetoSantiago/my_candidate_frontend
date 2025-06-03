"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertCircleIcon, PaperclipIcon, UploadIcon, XIcon } from "lucide-react"

import {
  formatBytes,
  useFileUpload,
} from "@/hooks/use-file-upload"
import { useEffect, useState } from "react"

export default function UploadModal({ isOpen }) {
  const maxSize = 100 * 1024 * 1024
  const [uploadId, setUploadId] = useState<string | null>(null)
  const [progressData, setProgressData] = useState<null | {
    status: string
    progress: number
    processed_rows: number
    total_rows: number
    error_message: string | null
  }>(null)

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize
  })

  const file = files[0]

  useEffect(() => {
    if (!uploadId) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/upload_status/${uploadId}`)
        if (!res.ok) throw new Error("Erro no polling")

        const data = await res.json()
        console.log("Status:", data)
        setProgressData(data)

        if (data.status === "done" || data.status === "failed") {
          clearInterval(interval)
          // TODO: Fechar modal
        }
      } catch (err) {
        console.error("Erro no status:", err)
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [uploadId])

  useEffect(() => {
    if (!file) return

    const uploadFile = async () => {
      try {
        const formData = new FormData()
        formData.append("file", file.file)

        const response = await fetch("http://localhost:3000/api/v1/csv_upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Erro no upload")
        const result = await response.json()
        console.log("Upload result:", result)

        setUploadId(result.upload_id)

        console.log("Sucesso:", result)
      } catch (err) {
        console.error("Erro ao enviar:", err)
      }
    }

    uploadFile()
  }, [file])


  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Checkout</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-2">
          {/* Drop area */}
          <div
            role="button"
            onClick={openFileDialog}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-dragging={isDragging || undefined}
            className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
          >
            <input
              {...getInputProps()}
              className="sr-only"
              aria-label="Upload file"
              disabled={Boolean(file)}
            />

            <div className="flex flex-col items-center justify-center text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <UploadIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">Upload file</p>
              <p className="text-muted-foreground text-xs">
                Drag & drop or click to browse (max. {formatBytes(maxSize)})
              </p>
            </div>
          </div>

          {errors.length > 0 && (
            <div
              className="text-destructive flex items-center gap-1 text-xs"
              role="alert"
            >
              <AlertCircleIcon className="size-3 shrink-0" />
              <span>{errors[0]}</span>
            </div>
          )}

          {/* File list */}
          {file && (
            <div className="space-y-2">
              <div
                key={file.id}
                className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <PaperclipIcon
                    className="size-4 shrink-0 opacity-60"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium">
                      {file.file.name}
                    </p>
                  </div>
                </div>

                {progressData && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {progressData.status === "done"
                        ? "Upload complete"
                        : progressData.status === "failed"
                          ? "Upload failed"
                          : `Processing ${progressData.processed_rows}/${progressData.total_rows}`}
                    </span>
                    {progressData.status !== "done" && (
                      <span className="text-xs text-muted-foreground">
                        {progressData.progress}%
                      </span>
                    )}
                  </div>
                )}

                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                  onClick={() => removeFile(files[0]?.id)}
                  aria-label="Remove file"
                >
                  <XIcon className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}

          <p
            aria-live="polite"
            role="region"
            className="text-muted-foreground mt-2 text-center text-xs"
          >
            Single file uploader w/ max size ∙{" "}
            <a
              href="https://github.com/origin-space/originui/tree/main/docs/use-file-upload.md"
              className="hover:text-foreground underline"
            >
              API
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
