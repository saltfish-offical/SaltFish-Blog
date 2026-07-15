import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 标签云卡片
 * 对应原主题 includes/widget/card_tags.pug（cloudTags 效果）
 * 注：原版默认 minfontsize = maxfontsize = 1.05rem，标签云本身不按热度缩放字号，
 * 仅在开启 aside.card_tags.color 时按标签着色区分。
 */
export default function AsideTagsCard({ tagOptions = [] }) {
  const enable = siteConfig('ANZHIYU_CARD_TAGS_ENABLE', CONFIG.ANZHIYU_CARD_TAGS_ENABLE, CONFIG)
  if (!enable || !tagOptions || tagOptions.length === 0) return null

  const limit = siteConfig('ANZHIYU_CARD_TAGS_LIMIT', CONFIG.ANZHIYU_CARD_TAGS_LIMIT, CONFIG)
  const colorMode = siteConfig('ANZHIYU_CARD_TAGS_COLOR', CONFIG.ANZHIYU_CARD_TAGS_COLOR, CONFIG)
  const tags = limit > 0 ? tagOptions.slice(0, limit) : tagOptions

  // 简单的稳定取色（基于标签名哈希），仅在 colorMode 开启时使用
  const colorFor = name => {
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
    const hue = hash % 360
    return `hsl(${hue}, 65%, 55%)`
  }

  return (
    <div className='card-tags'>
      <div className='item-headline'>
        <i className='anzhiyufont anzhiyu-icon-tags' />
        <span>标签</span>
      </div>
      <div className='card-tag-cloud'>
        {tags.map(tag => (
          <SmartLink
            key={tag.name}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            style={{ fontSize: '1.05rem', color: colorMode ? colorFor(tag.name) : undefined }}>
            {tag.name}
            <sup>{tag.count}</sup>
          </SmartLink>
        ))}
      </div>
      <hr />
    </div>
  )
}
