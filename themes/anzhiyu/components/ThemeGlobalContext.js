import { createContext, useContext, useState } from 'react'

const ThemeGlobalContext = createContext(null)

/**
 * 主题内跨组件共享的 UI 状态：
 * - 移动端侧边栏（#sidebar）开关
 * - 搜索弹窗（#local-search）开关
 * 对应原主题里通过操作 DOM class 实现的全局交互状态，这里用 React state 管理
 */
export function ThemeGlobalProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <ThemeGlobalContext.Provider
      value={{ sidebarOpen, setSidebarOpen, searchOpen, setSearchOpen }}>
      {children}
    </ThemeGlobalContext.Provider>
  )
}

export function useThemeGlobal() {
  const ctx = useContext(ThemeGlobalContext)
  if (!ctx) {
    // 容错：未包裹 Provider 时返回安全默认值，避免报错中断渲染
    return {
      sidebarOpen: false,
      setSidebarOpen: () => {},
      searchOpen: false,
      setSearchOpen: () => {}
    }
  }
  return ctx
}
