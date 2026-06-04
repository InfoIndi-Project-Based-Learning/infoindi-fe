import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      icons={{
        success: (
          <div className="bg-emerald-500/20 p-1 rounded-full text-emerald-600">
            <CircleCheckIcon className="size-4" />
          </div>
        ),
        info: (
          <div className="bg-blue-500/20 p-1 rounded-full text-blue-600">
            <InfoIcon className="size-4" />
          </div>
        ),
        warning: (
          <div className="bg-amber-500/20 p-1 rounded-full text-amber-600">
            <TriangleAlertIcon className="size-4" />
          </div>
        ),
        error: (
          <div className="bg-rose-500/20 p-1 rounded-full text-rose-600">
            <OctagonXIcon className="size-4" />
          </div>
        ),
        loading: (
          <div className="bg-indigo-500/20 p-1 rounded-full text-indigo-600">
            <Loader2Icon className="size-4 animate-spin" />
          </div>
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/80 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-slate-900 group-[.toaster]:border-white/50 group-[.toaster]:shadow-2xl group-[.toaster]:shadow-slate-200/50 group-[.toaster]:rounded-2xl group-[.toaster]:font-sans p-4 gap-4",
          description: "group-[.toast]:text-slate-500 font-medium text-xs mt-1",
          title: "font-bold text-sm",
          actionButton:
            "group-[.toast]:bg-slate-900 group-[.toast]:text-slate-50 group-[.toast]:rounded-xl font-semibold px-4",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500 group-[.toast]:rounded-xl font-semibold px-4",
          error: 
            "group-[.toaster]:!bg-rose-50/90 group-[.toaster]:!text-rose-900 group-[.toaster]:!border-rose-200/50 group-[.toaster]:!shadow-rose-500/10",
          success: 
            "group-[.toaster]:!bg-emerald-50/90 group-[.toaster]:!text-emerald-900 group-[.toaster]:!border-emerald-200/50 group-[.toaster]:!shadow-emerald-500/10",
          warning: 
            "group-[.toaster]:!bg-amber-50/90 group-[.toaster]:!text-amber-900 group-[.toaster]:!border-amber-200/50 group-[.toaster]:!shadow-amber-500/10",
          info: 
            "group-[.toaster]:!bg-blue-50/90 group-[.toaster]:!text-blue-900 group-[.toaster]:!border-blue-200/50 group-[.toaster]:!shadow-blue-500/10",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
