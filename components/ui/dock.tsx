import * as React from "react"
import { motion } from "framer-motion"
import { LucideIcon, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface DockItem {
  icon: LucideIcon
  label: string
  status?: "synced" | "training" | "active" | "online" | "alert" | "idle"
  count?: string
  progress?: number
}

interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[]
  showAddButton?: boolean
  onAddClick?: () => void
}

const statusColors = {
  training: "bg-primary animate-pulse",
  alert: "bg-destructive",
  active: "bg-[hsl(var(--chart-2))]",
  online: "bg-[hsl(var(--chart-1))]",
  synced: "bg-[hsl(var(--chart-4))]",
  idle: "bg-muted-foreground"
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, items, showAddButton = true, onAddClick, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

    return (
      <div 
        ref={ref}
        className={cn("w-full h-64 p-8 flex items-center justify-center", className)} 
        {...props}
      >
        <div className="w-full max-w-4xl h-64 rounded-2xl p-8 relative">
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-8 p-6 rounded-2xl",
                "bg-[#e0e5ec] shadow-[inset_8px_8px_16px_#bec3c9,inset_-8px_-8px_16px_#ffffff]",
                "dark:bg-background dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4),inset_-2px_-2px_4px_rgba(255,255,255,0.1)]"
              )}
            >
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className={cn(
                      "p-4 rounded-xl transition-all duration-300",
                      "bg-[#e0e5ec] shadow-[5px_5px_10px_#bec3c9,-5px_-5px_10px_#ffffff]",
                      "hover:shadow-[inset_5px_5px_10px_#bec3c9,inset_-5px_-5px_10px_#ffffff]",
                      "dark:bg-card dark:shadow-[2px_2px_4px_rgba(0,0,0,0.4),-1px_-1px_3px_rgba(255,255,255,0.1)]",
                      "dark:hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4),inset_-1px_-1px_3px_rgba(255,255,255,0.1)]"
                    )}
                  >
                    <item.icon className="w-6 h-6 text-muted-foreground" />

                    {item.status && (
                      <div className="absolute -top-1 -right-1">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          statusColors[item.status]
                        )} />
                      </div>
                    )}

                    {item.progress && (
                      <svg className="absolute -inset-1 w-8 h-8 rotate-90">
                        <circle
                          className="text-muted"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="transparent"
                          r="15"
                          cx="16"
                          cy="16"
                        />
                        <circle
                          className="text-primary"
                          strokeWidth="2"
                          strokeDasharray={94}
                          strokeDashoffset={94 - (94 * item.progress) / 100}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="15"
                          cx="16"
                          cy="16"
                        />
                      </svg>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 20
                    }}
                    className={cn(
                      "absolute -bottom-16 left-1/2 -translate-x-1/2 p-3",
                      "rounded-xl text-sm whitespace-nowrap",
                      // Неоморфные стили для светлой темы
                      "bg-[#e0e5ec] text-gray-700",
                      "shadow-[5px_5px_10px_#bec3c9,-5px_-5px_10px_#ffffff]",
                      // Стили для тёмной темы
                      "dark:bg-popover dark:text-popover-foreground",
                      "dark:shadow-[2px_2px_4px_rgba(0,0,0,0.4),-1px_-1px_3px_rgba(255,255,255,0.1)]"
                    )}
                  >
                    <div className="font-medium">{item.label}</div>
                    {item.count && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.count}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}

              {showAddButton && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAddClick}
                  className={cn(
                    "p-4 rounded-xl transition-all duration-300",
                    "bg-[#e0e5ec] shadow-[5px_5px_10px_#bec3c9,-5px_-5px_10px_#ffffff]",
                    "hover:shadow-[inset_5px_5px_10px_#bec3c9,inset_-5px_-5px_10px_#ffffff]",
                    "dark:bg-card dark:shadow-[2px_2px_4px_rgba(0,0,0,0.4),-1px_-1px_3px_rgba(255,255,255,0.1)]",
                    "dark:hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4),inset_-1px_-1px_3px_rgba(255,255,255,0.1)]"
                  )}
                >
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    )
  }
)
Dock.displayName = "Dock"

export { Dock, type DockItem, type DockProps }