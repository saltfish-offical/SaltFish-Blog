import { siteConfig } from '@/lib/config'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { throttle } from '../utils'

/**
 * 文章目录卡片（带滚动高亮）
 * 对应原主题 includes/widget/card_post_toc.pug
 * 目录数据结构与滚动定位方式与 NotionPage 渲染的标题（.notion-h[data-id]）保持一致
 */
export default function AsideTocCard({ post }) {
  const enable = siteConfig('ANZHIYU_TOC_ENABLE', CONFIG.ANZHIYU_TOC_ENABLE, CONFIG)
  const toc = post?.toc
  const [activeId, setActiveId] = useState(null)
  const [percent, setPercent] = useState(0)
  const tocIds = useRef([])

  const onScroll = useCallback(
    throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let currentId = null
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const bbox = section.getBoundingClientRect()
        if (bbox.top - 150 < 0) {
          currentId = section.getAttribute('data-id')
          continue
        }
        break
      }
      setActiveId(currentId)

      const article = document.getElementById('article-container')
      if (article) {
        const rect = article.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1))
        setPercent(Math.round((scrolled / Math.max(total, 1)) * 100))
      }
    }, 200),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  if (!enable || !toc || toc.length === 0) return null

  tocIds.current = toc.map(t => uuidToId(t.id))

  return (
    <div id='card-toc' className='card-widget'>
      <div className='item-headline'>
        <i className='anzhiyufont anzhiyu-icon-bars' />
        <span>目录</span>
        <span className='toc-percentage'>{percent}%</span>
      </div>
      <div className='toc-content'>
        {toc.map(tocItem => {
          const id = uuidToId(tocItem.id)
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`toc-item toc-level-${tocItem.indentLevel} ${activeId === id ? 'active' : ''}`}>
              <span className='toc-link' style={{ marginLeft: tocItem.indentLevel * 12 }}>
                <span className='toc-text'>{tocItem.text}</span>
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
