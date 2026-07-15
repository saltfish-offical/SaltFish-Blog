import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import SocialIcons from './SocialIcons'

/**
 * 作者信息卡片
 * 对应原主题 includes/widget/card_author.pug
 */
export default function AsideAuthorCard({ siteInfo }) {
  const enable = siteConfig('ANZHIYU_CARD_AUTHOR_ENABLE', CONFIG.ANZHIYU_CARD_AUTHOR_ENABLE, CONFIG)
  if (!enable) return null

  const avatar = siteConfig('ANZHIYU_AVATAR', CONFIG.ANZHIYU_AVATAR, CONFIG) || siteInfo?.icon
  const description =
    siteConfig('ANZHIYU_CARD_AUTHOR_DESCRIPTION', CONFIG.ANZHIYU_CARD_AUTHOR_DESCRIPTION, CONFIG) ||
    siteConfig('DESCRIPTION', '', CONFIG)
  const author = siteConfig('AUTHOR', siteInfo?.title, CONFIG)
  const subtitle = siteConfig('BIO', '', CONFIG)

  return (
    <div className='card-widget card-info'>
      <div className='card-content'>
        <div className='author-info-avatar'>
          <img className='avatar-img' src={avatar} alt='avatar' />
        </div>

        {description && <div className='author-info__description' dangerouslySetInnerHTML={{ __html: description }} />}

        <div className='author-info__bottom-group'>
          <SmartLink href='/' className='author-info__bottom-group-left'>
            <h1 className='author-info__name'>{author}</h1>
            <div className='author-info__desc'>{subtitle}</div>
          </SmartLink>
          <div className='card-info-social-icons is-center'>
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  )
}
