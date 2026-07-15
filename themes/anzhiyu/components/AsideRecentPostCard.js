import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import CONFIG from '../config'

/**
 * 最新文章卡片
 * 对应原主题 includes/widget/card_recent_post.pug
 */
export default function AsideRecentPostCard({ posts = [] }) {
  const enable = siteConfig('ANZHIYU_CARD_RECENT_POST_ENABLE', CONFIG.ANZHIYU_CARD_RECENT_POST_ENABLE, CONFIG)
  if (!enable || !posts || posts.length === 0) return null

  const limit = siteConfig('ANZHIYU_CARD_RECENT_POST_LIMIT', CONFIG.ANZHIYU_CARD_RECENT_POST_LIMIT, CONFIG)
  const list = limit > 0 ? posts.slice(0, limit) : posts

  return (
    <div className='card-widget card-recent-post'>
      <div className='item-headline'>
        <i className='anzhiyufont anzhiyu-icon-history' />
        <span>最新文章</span>
      </div>
      <div className='aside-list'>
        {list.map(post => (
          <div className='aside-list-item' key={post.id || post.href}>
            {post.pageCoverThumbnail && (
              <SmartLink href={post.href} title={post.title} className='thumbnail'>
                <LazyImage src={post.pageCoverThumbnail} alt={post.title} />
              </SmartLink>
            )}
            <div className='content'>
              <SmartLink href={post.href} title={post.title} className='title'>
                {post.title}
              </SmartLink>
              <time>{post.publishDay}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
