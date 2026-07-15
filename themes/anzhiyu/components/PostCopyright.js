import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 文章版权声明
 * 对应原主题 includes/post/post-copyright.pug
 */
export default function PostCopyright({ post }) {
  const enable = siteConfig('ANZHIYU_COPYRIGHT_ENABLE', CONFIG.ANZHIYU_COPYRIGHT_ENABLE, CONFIG)
  if (!enable || !post) return null

  const author = siteConfig('AUTHOR', 'Author', CONFIG)
  const avatar = siteConfig('ANZHIYU_AVATAR', CONFIG.ANZHIYU_AVATAR, CONFIG)
  const subtitle = siteConfig('BIO', '', CONFIG)
  const license = siteConfig('ANZHIYU_COPYRIGHT_LICENSE', CONFIG.ANZHIYU_COPYRIGHT_LICENSE, CONFIG)
  const licenseUrl = siteConfig('ANZHIYU_COPYRIGHT_LICENSE_URL', CONFIG.ANZHIYU_COPYRIGHT_LICENSE_URL, CONFIG)
  const link = siteConfig('LINK', '', CONFIG)
  const title = siteConfig('TITLE', '', CONFIG)

  const url = typeof window !== 'undefined' ? window.location.href : post?.href

  const copyUrl = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url)
    }
  }

  return (
    <>
      <div className='post-copyright'>
        <div className='copyright-cc-box'>
          <i className='anzhiyufont anzhiyu-icon-copyright' />
        </div>
        <div className='post-copyright__author_box'>
          <a className='post-copyright__author_img' href='/' title='头像'>
            <img className='post-copyright__author_img_back' src={avatar} alt='头像' />
            <img className='post-copyright__author_img_front' src={avatar} alt='头像' />
          </a>
          <div className='post-copyright__author_name'>{author}</div>
          <div className='post-copyright__author_desc'>{subtitle}</div>
        </div>
        <div className='post-copyright__post__info'>
          <a className='post-copyright__original' title='该文章为原创文章，注意版权协议' href={url}>
            原创
          </a>
          <a className='post-copyright-title'>
            <span onClick={copyUrl} style={{ cursor: 'pointer' }}>
              {post?.title}
            </span>
          </a>
        </div>
        <div className='post-copyright__notice'>
          <span className='post-copyright-info'>
            本文采用{' '}
            <a href={licenseUrl} target='_blank' rel='noreferrer'>
              {license}
            </a>{' '}
            协议，转载请注明出处：
            <a href={link}>{title}</a>
          </span>
        </div>
      </div>
      <div className='post-tools-right'>
        <div className='tag_share'>
          <div className='post-meta__box'>
            {post?.tagItems?.length > 0 && (
              <div className='post-meta__box__tag-list'>
                {post.tagItems.map(tag => (
                  <a key={tag.name} href={`/tag/${encodeURIComponent(tag.name)}`} className='post-meta__box__tags'>
                    <span className='tags-punctuation'>
                      <i className='anzhiyufont anzhiyu-icon-tag' />
                    </span>
                    {tag.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
