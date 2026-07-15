import { iconKind } from '../utils'

/**
 * 通用图标渲染：根据原主题约定自动判断图标类型
 * - fa... -> <i class="fa..." />
 * - anzhiyu... -> <i class="anzhiyufont anzhiyu-icon-..." />
 * - icon... -> <svg><use xlink:href="#icon..."/></svg>
 * - 其它 -> 当作图片 <img src="..." />
 */
export default function IconSmart({ icon, className = '', style }) {
  const kind = iconKind(icon)
  if (kind === 'none') return null
  if (kind === 'fa' || kind === 'anzhiyu') {
    const base = kind === 'anzhiyu' ? 'anzhiyufont ' : ''
    return <i className={`${base}${icon} ${className}`} style={style} />
  }
  if (kind === 'svg') {
    return (
      <svg className={`icon ${className}`} aria-hidden='true' style={style}>
        <use xlinkHref={`#${icon}`}></use>
      </svg>
    )
  }
  return <img className={className} src={icon} alt='' style={style} />
}
