import { siteConfig } from '@/lib/config'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import DarkModeButton from './DarkModeButton'

/**
 * 右下角悬浮按钮组
 * 对应原主题 includes/rightside.pug
 */
export default function RightSide({ post }) {
  const [showToTop, setShowToTop] = useState(false)
  const [readMode, setReadMode] = useState(false)
  const [asideHidden, setAsideHidden] = useState(false)

  const isPost = !!post && post.type !== 'Page'
  const readModeEnable = siteConfig('ANZHIYU_READMODE_ENABLE', CONFIG.ANZHIYU_READMODE_ENABLE, CONFIG) && isPost
  const darkModeEnable = siteConfig('ANZHIYU_DARKMODE_BUTTON', CONFIG.ANZHIYU_DARKMODE_BUTTON, CONFIG)
  const hideAsideEnable = siteConfig('ANZHIYU_HIDE_ASIDE_BUTTON', CONFIG.ANZHIYU_HIDE_ASIDE_BUTTON, CONFIG)
  const commentEnable =
    siteConfig('COMMENT_TWIKOO_ENV_ID') ||
    siteConfig('COMMENT_WALINE_SERVER_URL') ||
    siteConfig('COMMENT_VALINE_APP_ID') ||
    siteConfig('COMMENT_GISCUS_REPO') ||
    siteConfig('COMMENT_UTTERRANCES_REPO') ||
    siteConfig('COMMENT_GITALK_CLIENT_ID')

  useEffect(() => {
    const onScroll = () => setShowToTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollToComment = e => {
    e.preventDefault()
    const el = document.getElementById('post-comment')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleReadMode = () => {
    const next = !readMode
    setReadMode(next)
    document.documentElement.classList.toggle('read-mode', next)
  }

  const toggleAside = () => {
    const next = !asideHidden
    setAsideHidden(next)
    document.getElementById('content-inner')?.classList.toggle('hide-aside', next)
  }

  return (
    <div id='rightside' className={showToTop ? 'show' : ''}>
      <div id='rightside-config-hide'>
        {readModeEnable && (
          <button id='readmode' type='button' title='阅读模式' onClick={toggleReadMode}>
            <i className='anzhiyufont anzhiyu-icon-book-open' />
          </button>
        )}
        {darkModeEnable && <DarkModeButton />}
        {hideAsideEnable && (
          <button id='hide-aside-btn' type='button' title='收起侧栏' onClick={toggleAside}>
            <i className='anzhiyufont anzhiyu-icon-arrows-left-right' />
          </button>
        )}
      </div>
      <div id='rightside-config-show'>
        {isPost && (
          <button id='mobile-toc-button' type='button' title='目录' onClick={() => {
            document.getElementById('card-toc')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            <i className='anzhiyufont anzhiyu-icon-list-ul' />
          </button>
        )}
        {commentEnable && (
          <a id='to_comment' href='#post-comment' title='跳到评论区' onClick={scrollToComment}>
            <i className='anzhiyufont anzhiyu-icon-comments' />
          </a>
        )}
        <button id='go-up' type='button' title='回到顶部' onClick={scrollToTop}>
          <i className='anzhiyufont anzhiyu-icon-arrow-up' />
        </button>
      </div>
    </div>
  )
}
