import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import { parseLinkIconString } from '../utils'
import IconSmart from './IconSmart'

/**
 * 社交图标列表
 * 对应原主题 includes/header/social.pug
 */
export default function SocialIcons({ className = '' }) {
  const social = siteConfig('ANZHIYU_SOCIAL', CONFIG.ANZHIYU_SOCIAL, CONFIG)
  if (!social || Object.keys(social).length === 0) return null

  return (
    <>
      {Object.keys(social).map(title => {
        const { link, icon, anim } = parseLinkIconString(social[title])
        if (!link) return null
        return (
          <a
            key={title}
            className={`social-icon faa-parent animated-hover ${className}`}
            href={link}
            target='_blank'
            rel='noreferrer'
            title={title}>
            <IconSmart icon={icon} className={anim} />
          </a>
        )
      })}
    </>
  )
}
