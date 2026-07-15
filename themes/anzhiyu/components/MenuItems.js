import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import { parseLinkIconString } from '../utils'
import IconSmart from './IconSmart'

/**
 * 原版部分菜单项用 "javascript:xxx()" 作为链接（例如随便逛逛调用 toRandomPost()）。
 * 这里不做任意字符串 eval，只识别已知的 toRandomPost 约定并派发对应事件，
 * 其余未知的 javascript: 链接会被当作空操作处理，避免安全隐患。
 */
function isJsAction(link) {
  return typeof link === 'string' && link.startsWith('javascript:')
}

function runJsAction(link) {
  if (link.includes('toRandomPost')) {
    window.dispatchEvent(new Event('anzhiyu:random-post'))
  }
}

function MenuLink({ link, icon, anim, className, label }) {
  if (isJsAction(link)) {
    return (
      <a className={className} href='#' onClick={e => { e.preventDefault(); runJsAction(link) }}>
        <IconSmart icon={icon} className={anim} />
        <span> {label}</span>
      </a>
    )
  }
  return (
    <SmartLink href={link} className={className}>
      <IconSmart icon={icon} className={anim} />
      <span> {label}</span>
    </SmartLink>
  )
}

/**
 * 顶部 / 侧边栏菜单
 * 对应原主题 includes/header/menu_item.pug
 * 支持两级：一级为 "文字: 链接 || 图标"，二级为对象（渲染为下拉）
 */
export default function MenuItems() {
  const menu = siteConfig('ANZHIYU_MENU', CONFIG.ANZHIYU_MENU, CONFIG)
  if (!menu) return null

  return (
    <div className='menus_items'>
      {Object.keys(menu).map(label => {
        const value = menu[label]
        if (typeof value !== 'object') {
          const { link, icon, anim } = parseLinkIconString(value)
          return (
            <div className='menus_item' key={label}>
              <MenuLink
                link={link}
                icon={icon}
                anim={anim}
                label={label}
                className='site-page faa-parent animated-hover'
              />
            </div>
          )
        }
        return (
          <div className='menus_item' key={label}>
            <a className='site-page'>
              <span> {label}</span>
            </a>
            <ul className='menus_item_child'>
              {Object.keys(value).map(childLabel => {
                const { link, icon, anim } = parseLinkIconString(
                  value[childLabel]
                )
                return (
                  <li key={childLabel}>
                    <MenuLink
                      link={link}
                      icon={icon}
                      anim={anim}
                      label={childLabel}
                      className='site-page child faa-parent animated-hover'
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
