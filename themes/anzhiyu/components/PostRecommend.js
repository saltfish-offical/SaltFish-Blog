import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 相关文章推荐
 * 对应原主题 scripts/helpers/related_post.js 生成的 .relatedPosts 结构
 * 按标签重合度（权重）从全站文章中挑选相关文章
 */
export default function PostRecommend({ post, allPosts = [] }) {
  const enable = siteConfig('ANZHIYU_RELATED_POST_ENABLE', CONFIG.ANZHIYU_RELATED_POST_ENABLE, CONFIG)
  const limit = siteConfig('ANZHIYU_RELATED_POST_LIMIT', CONFIG.ANZHIYU_RELATED_POST_LIMIT, CONFIG)
  if (!enable || !post || !allPosts || allPosts.length === 0) return null

  const tagNames = new Set((post.tagItems || []).map(t => t.name))
  if (tagNames.size === 0) return null

  const scored = allPosts
    .filter(p => p.id !== post.id && p.type !== 'Page')
    .map(p => ({
      post: p,
      weight: (p.tagItems || []).filter(t => tagNames.has(t.name)).length
    }))
    .filter(x => x.weight > 0)
    .sort((a, b) => b.weight - a.weight)

  const related = scored.slice(0, limit || 6).map(x => x.post)
  if (related.length === 0) return null

  return (
    <div className='relatedPosts'>
      <div className='headline'>
        <i className='anzhiyufont anzhiyu-icon-thumbs-up fa-fw' style={{ fontSize: '1.5rem', marginRight: 4 }} />
        <span>相关推荐</span>
      </div>
      <div className='relatedPosts-list'>
        {related.map(p => (
          <div key={p.id}>
            <SmartLink href={p.href} title={p.title}>
              <img className='cover' src={p.pageCoverThumbnail} alt='cover' />
              <div className='content is-center'>
                <div className='date'>
                  <i className='anzhiyufont anzhiyu-icon-calendar-days fa-fw' /> {p.publishDay}
                </div>
                <div className='title'>{p.title}</div>
              </div>
            </SmartLink>
          </div>
        ))}
      </div>
    </div>
  )
}
