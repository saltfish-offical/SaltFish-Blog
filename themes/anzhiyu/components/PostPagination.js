import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 文章详情页 上一篇/下一篇
 * 对应原主题 includes/pagination.pug 的文章分支
 */
export default function PostPagination({ prev, next }) {
  const mode = siteConfig('ANZHIYU_POST_PAGINATION', CONFIG.ANZHIYU_POST_PAGINATION, CONFIG)
  if (!mode || (!prev && !next)) return null

  // mode 1: 上一篇=较旧文章; mode 2(默认): 上一篇=较新文章（与原主题 post_pagination:2 对应）
  const prevPost = mode === 1 ? next : prev
  const nextPost = mode === 1 ? prev : next

  return (
    <nav id='pagination' className='pagination-post'>
      {prevPost && (
        <div className={`prev-post ${nextPost ? 'pull-left' : 'pull-full'}`}>
          <SmartLink href={prevPost.href}>
            <img className='prev-cover' src={prevPost.pageCoverThumbnail} alt='cover of previous post' />
            <div className='pagination-info'>
              <div className='label'>上一篇</div>
              <div className='prev_info'>{prevPost.title}</div>
            </div>
          </SmartLink>
        </div>
      )}
      {nextPost && (
        <div className={`next-post ${prevPost ? 'pull-right' : 'pull-full'}`}>
          <SmartLink href={nextPost.href}>
            <img className='next-cover' src={nextPost.pageCoverThumbnail} alt='cover of next post' />
            <div className='pagination-info'>
              <div className='label'>下一篇</div>
              <div className='next_info'>{nextPost.title}</div>
            </div>
          </SmartLink>
        </div>
      )}
    </nav>
  )
}
