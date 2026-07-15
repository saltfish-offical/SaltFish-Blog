import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import Nav from './Nav'

/**
 * 页头 #page-header
 * 对应原主题 includes/header/index.pug + includes/header/post-info.pug
 *
 * 原主题默认 index_img / default_top_img 均为 false，
 * 因此默认情况下只有文章详情页会显示大图页头（含标题、meta、波浪效果），
 * 首页大图由单独的 HomeTop（对应 top/top.pug）负责，
 * 其余页面（页面/归档/分类/标签/搜索）标题在正文区域内自行渲染。
 */
export default function Header({ post, siteInfo }) {
  const router = useRouter()
  const [navFixed, setNavFixed] = useState(false)
  const isPost = !!post && post.type !== 'Page'
  const isHome = router.pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      setNavFixed(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const topImg = isPost ? post?.pageCover || siteInfo?.pageCover : false

  let headerClass = 'not-top-img'
  if (topImg) {
    headerClass = isPost ? 'post-bg' : 'full_page'
  }
  if (navFixed) headerClass += ' nav-fixed'

  const postTitleIconEnable = siteConfig('POST_TITLE_ICON')

  return (
    <header
      id='page-header'
      className={headerClass}
      style={
        topImg && !isPost
          ? { backgroundImage: `url(${topImg})` }
          : undefined
      }>
      <Nav siteInfo={siteInfo} />

      {isPost && topImg && (
        <>
          <section className='main-hero-waves-area waves-area'>
            <svg
              className='waves-svg'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 24 150 28'
              preserveAspectRatio='none'
              shapeRendering='auto'>
              <defs>
                <path
                  id='gentle-wave'
                  d='M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z'
                />
              </defs>
              <g className='parallax'>
                <use href='#gentle-wave' x='48' y='0' />
                <use href='#gentle-wave' x='48' y='3' />
                <use href='#gentle-wave' x='48' y='5' />
                <use href='#gentle-wave' x='48' y='7' />
              </g>
            </svg>
          </section>
          <div id='post-top-cover'>
            <img id='post-top-bg' className='nolazyload' src={topImg} alt={post?.title} />
          </div>
          <div id='post-info'>
            <div id='post-firstinfo'>
              <div className='meta-firstline'>
                <a className='post-meta-original'>
                  {post?.copyrightAuthor && post.copyrightAuthor !== siteConfig('AUTHOR') ? '转载' : '原创'}
                </a>
                {post?.category && (
                  <span className='post-meta-categories'>
                    <span className='post-meta-separator'>|</span>
                    <i className='anzhiyufont anzhiyu-icon-inbox post-meta-icon' />
                    <SmartLink href={`/category/${post.category}`}>{post.category}</SmartLink>
                  </span>
                )}
                {post?.tagItems?.length > 0 && (
                  <span className='article-meta tags'>
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
              </div>
            </div>

            <h1 id='post-title' className='post-title'>
              {postTitleIconEnable && post?.pageIcon ? `${post.pageIcon} ` : ''}
              {post?.title}
            </h1>

            <div id='post-meta'>
              <div className='meta-firstline'>
                <span className='post-meta-date'>
                  <i className='anzhiyufont anzhiyu-icon-calendar-days post-meta-icon' />
                  <span className='post-meta-label'>发表于</span>
                  <time className='post-meta-date-created'>{post?.publishDay}</time>
                  <span className='post-meta-separator' />
                  <i className='anzhiyufont anzhiyu-icon-history post-meta-icon' />
                  <span className='post-meta-label'>更新于</span>
                  <time className='post-meta-date-updated'>{post?.lastEditedDay}</time>
                </span>
              </div>
              {(post?.wordCount || post?.readTime) && (
                <div className='meta-secondline'>
                  {post?.wordCount && (
                    <span className='post-meta-wordcount'>
                      <i className='anzhiyufont anzhiyu-icon-file-word post-meta-icon' />
                      <span className='post-meta-label'>字数统计:</span>
                      <span className='word-count'>{post.wordCount}</span>
                      <span className='post-meta-separator' />
                    </span>
                  )}
                  {post?.readTime && (
                    <>
                      <i className='anzhiyufont anzhiyu-icon-clock post-meta-icon' />
                      <span className='post-meta-label'>阅读时长:</span>
                      <span>{post.readTime} 分钟</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {!isPost && isHome && (
        <div id='scroll-down'>
          <i className='anzhiyufont anzhiyu-icon-angle-down scroll-down-effects' />
        </div>
      )}
    </header>
  )
}
