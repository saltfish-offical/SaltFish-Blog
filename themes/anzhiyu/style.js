import Head from 'next/head'
import { siteConfig } from '@/lib/config'
import CONFIG from './config'
import { ANZHIYU_COMPILED_CSS } from './styles/anzhiyuCompiledCss'

/**
 * hex 颜色转 rgba 字符串，用于派生 --anzhiyu-theme-op 等透明度变量
 * @param {string} hex
 * @param {number} alpha
 */
function hexToRgba(hex, alpha) {
  if (!hex || typeof hex !== 'string' || hex[0] !== '#') return null
  let c = hex.substring(1)
  if (c.length === 3) {
    c = c
      .split('')
      .map(ch => ch + ch)
      .join('')
  }
  if (c.length !== 6) return null
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  if ([r, g, b].some(Number.isNaN)) return null
  return `rgba(${r},${g},${b},${alpha})`
}

/**
 * 全局样式注入
 * 1. ANZHIYU_COMPILED_CSS：由原版 Hexo 主题的全部 .styl 源码编译而来，
 *    保留了原主题 100% 的选择器与规则（详见 styles/anzhiyuCompiledCss.js 顶部说明）。
 * 2. 图标字体：原主题内置的 anzhiyufont 图标库，走 CDN（与原主题行为一致），
 *    地址可在 config.js 的 ANZHIYU_ICON_FONT_CSS_URL 中改为自部署路径。
 * 3. 下方 <style jsx global> 用于把 config.js 里的可配置项（主题色等）
 *    动态覆盖到编译后样式所使用的 CSS 变量上，无需重新编译 Stylus。
 */
export const Style = () => {
  const iconFontUrl = siteConfig(
    'ANZHIYU_ICON_FONT_CSS_URL',
    CONFIG.ANZHIYU_ICON_FONT_CSS_URL,
    CONFIG
  )
  const themeColor = siteConfig(
    'ANZHIYU_THEME_COLOR',
    CONFIG.ANZHIYU_THEME_COLOR,
    CONFIG
  )
  const themeColorDark = siteConfig(
    'ANZHIYU_THEME_COLOR_DARK',
    CONFIG.ANZHIYU_THEME_COLOR_DARK,
    CONFIG
  )
  const themeColorOp = hexToRgba(themeColor, 0.137)
  const themeColorDarkOp = hexToRgba(themeColorDark, 0.137)
  const rightsideBottom = siteConfig(
    'ANZHIYU_RIGHTSIDE_BOTTOM',
    CONFIG.ANZHIYU_RIGHTSIDE_BOTTOM,
    CONFIG
  )

  return (
    <>
      <Head>
        {/* 原主题内置图标库 anzhiyufont（CDN），包含站内绝大部分小图标 */}
        <link rel='stylesheet' href={iconFontUrl} />
      </Head>

      {/* 编译自原主题全部 Stylus 源码的完整样式表 */}
      <style
        id='anzhiyu-compiled-css'
        dangerouslySetInnerHTML={{ __html: ANZHIYU_COMPILED_CSS }}
      />

      {/* 可配置项覆盖：主题色 / 右下角按钮位置等 */}
      <style jsx global>{`
        html.light {
          --anzhiyu-theme: ${themeColor};
          ${themeColorOp ? `--anzhiyu-theme-op: ${themeColorOp};` : ''}
        }
        html.dark {
          --anzhiyu-theme: ${themeColorDark};
          ${themeColorDarkOp
            ? `--anzhiyu-theme-op: ${themeColorDarkOp};`
            : ''}
        }
        #rightside {
          bottom: ${rightsideBottom};
        }
      `}</style>
    </>
  )
}
