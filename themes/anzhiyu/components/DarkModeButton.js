import { useGlobal } from '@/lib/global'
import { saveDarkModeToCookies } from '@/themes/theme'
import { useEffect } from 'react'

/**
 * 深色模式切换按钮
 * 对应原主题右下角 #darkmode 按钮。
 * 原主题通过 html[data-theme] 驱动样式，本移植版已将编译后的样式改为
 * html.dark / html.light class 选择器，与 NotionNext 官方约定保持一致，
 * 因此这里直接复用 NotionNext 标准的切换方式。
 */
export default function DarkModeButton({ style }) {
  const { isDarkMode, updateDarkMode } = useGlobal()

  // 防御性同步：保证任何来源触发的 isDarkMode 变化都能反映到 html class 上
  useEffect(() => {
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.classList?.remove(isDarkMode ? 'light' : 'dark')
    htmlElement.classList?.add(isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const handleChangeDarkMode = () => {
    const newStatus = !isDarkMode
    saveDarkModeToCookies(newStatus)
    updateDarkMode(newStatus)
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.classList?.remove(newStatus ? 'light' : 'dark')
    htmlElement.classList?.add(newStatus ? 'dark' : 'light')
  }

  return (
    <button
      id='darkmode'
      type='button'
      style={style}
      title='深色模式'
      onClick={handleChangeDarkMode}>
      <i className='anzhiyufont anzhiyu-icon-circle-half-stroke' />
    </button>
  )
}
