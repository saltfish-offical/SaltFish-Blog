import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { saveDarkModeToCookies } from '@/themes/theme'
import { useEffect } from 'react'
import CONFIG from '../config'
import { useThemeGlobal } from './ThemeGlobalContext'
import MenuItems from './MenuItems'

/**
 * 移动端侧边栏抽屉菜单
 * 对应原主题 includes/sidebar.pug（注意：这不是桌面端右侧 aside 卡片栏，
 * 而是点击导航栏汉堡按钮弹出的移动端专属抽屉菜单）
 *
 * 对应原版 main.js 中 sidebarFn.open()/close()：
 * - #sidebar-menus 上加/去 .open（自身滑入）
 * - #body-wrap 上加/去 .open（主体内容推移效果）
 * - #menu-mask 控制显隐遮罩
 */
export default function MobileSidebar({ categoryOptions, tagOptions, postCount }) {
  const { sidebarOpen, setSidebarOpen } = useThemeGlobal()
  const { isDarkMode, updateDarkMode } = useGlobal()

  const showSiteData = siteConfig('ANZHIYU_ASIDE_ENABLE', true, CONFIG)
  const navMenu = siteConfig('ANZHIYU_NAV_MENU', CONFIG.ANZHIYU_NAV_MENU, CONFIG)
  const navEnable = siteConfig('ANZHIYU_NAV_ENABLE', CONFIG.ANZHIYU_NAV_ENABLE, CONFIG)

  useEffect(() => {
    document.getElementById('body-wrap')?.classList.toggle('open', sidebarOpen)
  }, [sidebarOpen])

  const close = () => setSidebarOpen(false)

  const toggleDark = () => {
    const newStatus = !isDarkMode
    saveDarkModeToCookies(newStatus)
    updateDarkMode(newStatus)
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.classList?.remove(newStatus ? 'light' : 'dark')
    htmlElement.classList?.add(newStatus ? 'dark' : 'light')
  }

  return (
    <div id='sidebar'>
      <div id='menu-mask' style={{ display: sidebarOpen ? 'block' : 'none' }} onClick={close}></div>
      <div id='sidebar-menus' className={sidebarOpen ? 'open' : ''}>
        {showSiteData && (
          <div className='sidebar-site-data site-data is-center'>
            <a href='/archive' title='archive'>
              <div className='headline'>文章</div>
              <div className='length-num'>{postCount ?? '-'}</div>
            </a>
            <a href='/tag' title='tag'>
              <div className='headline'>标签</div>
              <div className='length-num'>{tagOptions?.length ?? '-'}</div>
            </a>
            <a href='/category' title='category'>
              <div className='headline'>分类</div>
              <div className='length-num'>{categoryOptions?.length ?? '-'}</div>
            </a>
          </div>
        )}

        <span className='sidebar-menu-item-title'>功能</span>
        <div className='sidebar-menu-item'>
          <a
            className='darkmode_switchbutton menu-child'
            title='深色模式'
            onClick={toggleDark}>
            <i className='anzhiyufont anzhiyu-icon-circle-half-stroke' />
            <span>深色模式</span>
          </a>
        </div>

        {navEnable && (
          <div className='back-menu-list-groups'>
            {navMenu?.map(group => (
              <div className='back-menu-list-group' key={group.title}>
                <div className='back-menu-list-title'>{group.title}</div>
                <div className='back-menu-list'>
                  {group.item?.map(item => (
                    <a
                      className='back-menu-item'
                      href={item.link}
                      title={item.name}
                      key={item.name}>
                      <img className='back-menu-item-icon' src={item.icon} alt={item.name} />
                      <span className='back-menu-item-text'>{item.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <MenuItems />
      </div>
    </div>
  )
}
