import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 归档卡片（按月分组）
 * 对应原主题 includes/widget/card_archives.pug + scripts/helpers/aside_archives.js
 *
 * 注意：此卡片需要站点全部文章列表来生成按月分组的归档，
 * 具体见 utils.js 中 resolveAllPosts() 的取值与说明。
 * 原版每月归档链接到独立的 /archives/YYYY/MM/ 页面；NotionNext 只有一个
 * 归档页，这里改为跳转到 /archive#YYYY-MM 锚点。
 */
export default function AsideArchivesCard({ posts = [] }) {
  const enable = siteConfig('ANZHIYU_CARD_ARCHIVES_ENABLE', CONFIG.ANZHIYU_CARD_ARCHIVES_ENABLE, CONFIG)
  if (!enable || !posts || posts.length === 0) return null

  const limit = siteConfig('ANZHIYU_CARD_ARCHIVES_LIMIT', CONFIG.ANZHIYU_CARD_ARCHIVES_LIMIT, CONFIG)

  const groups = {}
  for (const post of posts) {
    const day = post?.publishDay || post?.lastEditedDay
    if (!day) continue
    const key = day.substring(0, 7) // YYYY-MM
    groups[key] = (groups[key] || 0) + 1
  }
  const allMonths = Object.keys(groups).sort((a, b) => (a < b ? 1 : -1))
  const months = limit > 0 ? allMonths.slice(0, limit) : allMonths
  const hasMore = limit > 0 && allMonths.length > limit

  if (months.length === 0) return null

  return (
    <div className='card-widget card-archives'>
      <div className='item-headline'>
        <i className='anzhiyufont anzhiyu-icon-box-archive' />
        <span>归档</span>
        {hasMore && (
          <SmartLink href='/archive' className='card-more-btn' title='更多'>
            <i className='anzhiyufont anzhiyu-icon-angle-right' />
          </SmartLink>
        )}
      </div>
      <ul className='card-archive-list'>
        {months.map(month => {
          const [y, m] = month.split('-')
          return (
            <li className='card-archive-list-item' key={month}>
              <SmartLink href={`/archive#${month}`} className='card-archive-list-link'>
                <span className='card-archive-list-date'>
                  {y}年{m}月
                </span>
                <div className='card-archive-list-count-group'>
                  <span className='card-archive-list-count'>{groups[month]}</span>
                  <span>篇</span>
                </div>
              </SmartLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
