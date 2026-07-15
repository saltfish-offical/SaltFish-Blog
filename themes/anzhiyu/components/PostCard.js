import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import CONFIG from '../config'
import { getExcerpt } from '../utils'

/**
 * 文章列表卡片
 * 对应原主题 includes/mixins/post-ui.pug 中的 recent-post-item
 */
export default function PostCard({ post, index = 0, isNewest = false }) {
  if (!post) return null

  const coverEnable = siteConfig('ANZHIYU_COVER_INDEX_ENABLE', CONFIG.ANZHIYU_COVER_INDEX_ENABLE, CONFIG)
  const coverPosition = siteConfig('ANZHIYU_COVER_POSITION', CONFIG.ANZHIYU_COVER_POSITION, CONFIG)
  const method = siteConfig('ANZHIYU_INDEX_POST_CONTENT_METHOD', CONFIG.ANZHIYU_INDEX_POST_CONTENT_METHOD, CONFIG)
  const length = siteConfig('ANZHIYU_INDEX_POST_CONTENT_LENGTH', CONFIG.ANZHIYU_INDEX_POST_CONTENT_LENGTH, CONFIG)
  const dateType = siteConfig('ANZHIYU_POST_META_DATE_TYPE', CONFIG.ANZHIYU_POST_META_DATE_TYPE, CONFIG)

  const hasCover = post.pageCoverThumbnail && coverEnable
  const leftOrRight =
    coverPosition === 'both' ? (index % 2 === 0 ? 'left' : 'right') : coverPosition === 'left' ? 'left' : 'right'

  const excerpt = getExcerpt(post, method, length)

  return (
    <div
      className={`recent-post-item ${index === 0 ? 'lastestpost-item' : ''}`}
      onClick={() => (window.location.href = post.href)}>
      {hasCover && (
        <div className={`post_cover ${leftOrRight}`}>
          <SmartLink href={post.href} title={post.title} style={{ display: 'flex', height: '100%' }}>
            <LazyImage className='post_bg' src={post.pageCoverThumbnail} alt={post.title} />
          </SmartLink>
        </div>
      )}

      <div className={`recent-post-info ${hasCover ? '' : 'no-cover'}`}>
        <div className='recent-post-info-top'>
          <div className='recent-post-info-top-tips'>
            {(post.sticky || post.top) && (
              <span className='article-meta sticky-warp'>
                <i className='anzhiyufont anzhiyu-icon-thumbtack sticky' />
                <span className='sticky'>置顶</span>
              </span>
            )}
            {post.category && (
              <SmartLink href={`/category/${post.category}`} className='article-categories-original'>
                {post.category}
              </SmartLink>
            )}
            {isNewest && <span className='newPost'>NEW</span>}
          </div>
          <SmartLink href={post.href} title={post.title} className='article-title'>
            {post.title}
          </SmartLink>
        </div>

        <div className='article-meta-wrap'>
          <span className='post-meta-date'>
            <i className='anzhiyufont anzhiyu-icon-calendar-alt' style={{ display: dateType !== 'both' ? 'none' : undefined }} />
            {dateType === 'both' && <span className='article-meta-label'>发表于</span>}
            <time className='post-meta-date-created' dateTime={post.publishDate}>
              {post.publishDay}
            </time>
            {dateType === 'both' && (
              <>
                <span className='article-meta-separator' />
                <i className='anzhiyufont anzhiyu-icon-history' style={{ fontSize: 15 }} />
                <span className='article-meta-label'>更新于</span>
                <time className='post-meta-date-updated'>{post.lastEditedDay}</time>
              </>
            )}
          </span>
          {post.tagItems?.length > 0 && (
            <span className='article-meta tags'>
              {post.tagItems.map(tag => (
                <SmartLink
                  key={tag.name}
                  href={`/tag/${encodeURIComponent(tag.name)}`}
                  className='article-meta__tags'
                  onClick={e => e.stopPropagation()}>
                  <span>
                    <i className='anzhiyufont anzhiyu-icon-hashtag' />
                    {tag.name}
                  </span>
                </SmartLink>
              ))}
            </span>
          )}
        </div>

        {excerpt && <div className='content'>{excerpt}</div>}
      </div>
    </div>
  )
}
