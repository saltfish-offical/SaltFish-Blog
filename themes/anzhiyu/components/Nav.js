import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import { useThemeGlobal } from './ThemeGlobalContext'
import MenuItems from './MenuItems'

/**
 * 顶部导航栏
 * 对应原主题 includes/header/nav.pug
 */
export default function Nav({ siteInfo }) {
  const { setSidebarOpen, setSearchOpen } = useThemeGlobal()
  const [percent, setPercent] = useState(0)
  const [backHomeOpen, setBackHomeOpen] = useState(false)

  const title = siteConfig('TITLE', 'NotionNext', CONFIG)
  const navEnable = siteConfig('ANZHIYU_NAV_ENABLE', CONFIG.ANZHIYU_NAV_ENABLE, CONFIG)
  const navMenu = siteConfig('ANZHIYU_NAV_MENU', CONFIG.ANZHIYU_NAV_MENU, CONFIG)
  const searchEnable = siteConfig('ANZHIYU_SEARCH_ENABLE', CONFIG.ANZHIYU_SEARCH_ENABLE, CONFIG)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0
      setPercent(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toRandomPost = () => {
    window.dispatchEvent(new Event('anzhiyu:random-post'))
  }

  return (
    <nav id='nav'>
      <div id='nav-group'>
        <span id='blog_name'>
          {navEnable && (
            <div
              className={`back-home-button ${backHomeOpen ? 'open' : ''}`}
              onMouseEnter={() => setBackHomeOpen(true)}
              onMouseLeave={() => setBackHomeOpen(false)}>
              <i className='anzhiyufont anzhiyu-icon-grip-vertical' />
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
                          <img
                            className='back-menu-item-icon'
                            src={item.icon}
                            alt={item.name}
                          />
                          <span className='back-menu-item-text'>
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <SmartLink href='/' id='site-name'>
            <div className='title'>{title}</div>
            <i className='anzhiyufont anzhiyu-icon-house-chimney' />
          </SmartLink>
        </span>

        <div className='mask-name-container'>
          <div id='name-container'>
            <a id='page-name' onClick={scrollToTop}>
              {siteInfo?.title || title}
            </a>
          </div>
        </div>

        <div id='menus'>
          <MenuItems />
        </div>

        <div id='nav-right'>
          {siteConfig('ANZHIYU_RANDOM_POST_BUTTON', CONFIG.ANZHIYU_RANDOM_POST_BUTTON, CONFIG) && (
            <div className='nav-button' id='randomPost_button'>
              <a
                className='site-page'
                title='随便逛逛'
                onClick={toRandomPost}>
                <i className='anzhiyufont anzhiyu-icon-dice' />
              </a>
            </div>
          )}

          {searchEnable && (
            <div className='nav-button' id='search-button'>
              <a
                className='site-page social-icon search'
                title='搜索'
                onClick={() => setSearchOpen(true)}>
                <i className='anzhiyufont anzhiyu-icon-magnifying-glass' />
                <span> 搜索</span>
              </a>
            </div>
          )}

          <div className='nav-button' id='nav-totop'>
            <a className='totopbtn' onClick={scrollToTop}>
              <i className='anzhiyufont anzhiyu-icon-arrow-up' />
              <span id='percent'>{percent}</span>
            </a>
          </div>

          <div id='toggle-menu'>
            <a
              className='site-page'
              title='菜单'
              onClick={() => setSidebarOpen(true)}>
              <i className='anzhiyufont anzhiyu-icon-bars' />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
