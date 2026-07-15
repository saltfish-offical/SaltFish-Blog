import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useThemeGlobal } from './ThemeGlobalContext'

/**
 * 搜索弹窗
 * 对应原主题 includes/third-party/search/local-search.pug 的外观
 *
 * 功能上复用 NotionNext 内置的搜索路由 /search/[keyword]（与官方主题
 * SearchInput 组件一致），回车或点击搜索图标后跳转到搜索结果页，
 * 结果页由 LayoutSearch 使用本主题的文章列表样式渲染。
 */
export default function SearchDrawer() {
  const { searchOpen, setSearchOpen } = useThemeGlobal()
  const router = useRouter()
  const inputRef = useRef(null)

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [searchOpen])

  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [setSearchOpen])

  const close = () => setSearchOpen(false)

  const doSearch = () => {
    const key = inputRef.current?.value?.trim()
    if (key) {
      close()
      router.push(`/search/${encodeURIComponent(key)}`)
    }
  }

  const onKeyUp = e => {
    if (e.key === 'Enter') doSearch()
  }

  if (!searchOpen) return null

  return (
    <>
      <div id='local-search' className='show'>
        <div className='search-dialog'>
          <nav className='search-nav'>
            <span className='search-dialog-title'>搜索</span>
            <button className='search-close-button' onClick={close}>
              <i className='anzhiyufont anzhiyu-icon-xmark' />
            </button>
          </nav>
          <div className='search-wrap'>
            <div id='local-search-input'>
              <div className='local-search-box'>
                <input
                  ref={inputRef}
                  className='local-search-box--input'
                  type='text'
                  placeholder='输入关键词后回车搜索'
                  onKeyUp={onKeyUp}
                />
              </div>
            </div>
            <hr />
            <div id='local-search-results'>
              <div
                className='is-center'
                style={{ padding: '2rem 0', color: 'var(--anzhiyu-secondtext)' }}>
                按下 Enter 查看搜索结果
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='search-mask' className='show' onClick={close}></div>
    </>
  )
}
