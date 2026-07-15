import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import { groupPostsByYear } from '../utils'

/**
 * 按年份分组的文章列表（归档 / 分类 / 标签页通用样式）
 * 对应原主题 includes/mixins/article-sort.pug
 */
export default function ArticleSortList({ posts = [], startIndex = 1 }) {
  const groups = groupPostsByYear(posts)
  const years = Object.keys(groups).sort((a, b) => (a < b ? 1 : -1))
  let runningIndex = startIndex

  return (
    <div className='article-sort'>
      {years.map(year => {
        const items = groups[year]
        const rendered = items.map(post => {
          const idx = runningIndex++
          return (
            <div className='article-sort-item' key={post.id || post.href}>
              {post.pageCoverThumbnail && (
                <SmartLink href={post.href} title={post.title} className='article-sort-item-img'>
                  <LazyImage src={post.pageCoverThumbnail} alt={post.title} />
                </SmartLink>
              )}
              <div className='article-sort-item-info'>
                <SmartLink href={post.href} title={post.title} className='article-sort-item-title'>
                  {post.title}
                </SmartLink>
                <span className='article-sort-item-index'>{idx}</span>
                <div className='article-meta-wrap'>
                  {post.tagItems?.length > 0 && (
                    <span className='article-sort-item-tags'>
                      {post.tagItems.map(tag => (
                        <SmartLink
                          key={tag.name}
                          href={`/tag/${encodeURIComponent(tag.name)}`}
                          className='article-meta__tags'>
                          <span>
                            <i className='anzhiyufont anzhiyu-icon-hashtag' />
                            {tag.name}
                          </span>
                        </SmartLink>
                      ))}
                    </span>
                  )}
                  <div className='article-sort-item-time'>
                    <i className='anzhiyufont anzhiyu-icon-calendar-alt' />
                    <time>{post.publishDay}</time>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        return (
          <div key={year}>
            <div className='article-sort-item year'>
              <span>{year}</span>
            </div>
            {rendered}
          </div>
        )
      })}
    </div>
  )
}
