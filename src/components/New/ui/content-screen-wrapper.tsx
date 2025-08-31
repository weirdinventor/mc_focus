import type React from "react"
import { Screen } from "../ui/screen"

interface ContentScreenWrapperProps<T> {
  headerTitle: string
  smallCards?: boolean
  data: T[]
  renderItem: (item: T) => React.ReactNode
  onBack?: () => void
}

export function ContentScreenWrapper<T>({
  headerTitle,
  smallCards = false,
  data,
  renderItem,
  onBack,
}: ContentScreenWrapperProps<T>) {
  return (
    <Screen headerText={headerTitle} onBack={onBack} className="bg-white">
      <div className={`p-4 ${smallCards ? "grid grid-cols-2 gap-4" : "space-y-4"}`}>
        {data.length > 0 ? (
          data.map((item, index) => <div key={index}>{renderItem(item)}</div>)
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content available</h3>
            <p className="text-gray-500">Check back later for updates.</p>
          </div>
        )}
      </div>
    </Screen>
  )
}
