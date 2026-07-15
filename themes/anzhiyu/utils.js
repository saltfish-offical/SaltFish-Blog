/**
 * 主题内共享的小工具函数
 */

/**
 * 解析原主题约定的 "链接 || 图标 [|| 动画]" 字符串
 * 例如 "https://github.com || anzhiyu-icon-github"
 */
export function parseLinkIconString(str) {
  if (!str || typeof str !== 'string') {
    return { link: '', icon: '', anim: '' }
  }
  const parts = str.split('||').map(s => s.trim())
  return {
    link: parts[0] || '',
    icon: parts[1] || '',
    anim: parts[2] || 'faa-tada'
  }
}

/**
 * 根据图标字符串前缀判断图标类型并返回可渲染的图标描述
 * - "fa..." -> FontAwesome
 * - "anzhiyu..." -> 主题内置图标字体 anzhiyufont
 * - 其它 -> 当作图片地址
 */
export function iconKind(icon) {
  if (!icon) return 'none'
  if (icon.startsWith('fa')) return 'fa'
  if (icon.startsWith('anzhiyu')) return 'anzhiyu'
  if (icon.startsWith('icon')) return 'svg'
  return 'img'
}

/**
 * 极简节流函数，避免额外依赖
 */
export function throttle(fn, wait = 200) {
  let last = 0
  let timer = null
  return function throttled(...args) {
    const now = Date.now()
    const remaining = wait - (now - last)
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      last = now
      fn.apply(this, args)
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now()
        timer = null
        fn.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * 去除 HTML 标签，返回纯文本（用于生成摘要）
 */
export function stripHtml(html) {
  if (!html) return ''
  return String(html)
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * 生成文章摘要，对应原主题 index_post_content 的三种模式
 * @param {*} post NotionNext 文章对象
 * @param {number} method 1: 仅描述 2: 描述优先 3: 自动摘取正文
 * @param {number} length 自动摘取长度
 */
export function getExcerpt(post, method, length = 500) {
  if (method === false) return ''
  const summary = post?.summary
  if (method === 1) {
    return summary || ''
  }
  if (method === 2) {
    if (summary) return summary
  }
  const text = stripHtml(post?.summary || '')
  if (!text) return summary || ''
  return text.length > length ? text.slice(0, length) + ' ...' : text
}

/**
 * 简单的年份分组，用于归档卡片 / 归档页
 * @param {Array} posts
 * @param {string} dateField 'publishDay' | 'lastEditedDay'
 */
export function groupPostsByYear(posts = []) {
  const groups = {}
  for (const post of posts) {
    const day = post?.publishDay || post?.lastEditedDay || ''
    const year = day ? day.substring(0, 4) : '未知'
    if (!groups[year]) groups[year] = []
    groups[year].push(post)
  }
  return groups
}

/**
 * 随机取数组中的 n 个元素
 */
export function sampleArray(arr = [], n = 1) {
  if (!arr || arr.length === 0) return []
  const copy = [...arr]
  const result = []
  while (copy.length && result.length < n) {
    const idx = Math.floor(Math.random() * copy.length)
    result.push(copy.splice(idx, 1)[0])
  }
  return result
}

/**
 * 从页面 props 中尽量取出全站文章列表（用于归档卡片 / 相关推荐 / 随机文章等
 * 需要跨页面文章数据的功能）。不同 NotionNext 版本全局字段名可能不同，
 * 这里做了多重兜底；一律取不到时返回空数组，各调用方都已做好空数据兜底。
 */
export function resolveAllPosts(props) {
  const fromAllPages =
    props?.allPages?.filter(p => p.type === 'Post' && p.status === 'Published')
  return (
    (fromAllPages && fromAllPages.length > 0 && fromAllPages) ||
    props?.latestPosts ||
    props?.allNavPages ||
    props?.posts ||
    []
  )
}
