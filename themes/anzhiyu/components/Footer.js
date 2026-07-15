import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 页脚
 * 对应原主题 includes/footer.pug（footerBar 模式）
 */
export default function Footer() {
  const ownerEnable = siteConfig('ANZHIYU_FOOTER_OWNER_ENABLE', CONFIG.ANZHIYU_FOOTER_OWNER_ENABLE, CONFIG)
  const since = siteConfig('ANZHIYU_FOOTER_SINCE', CONFIG.ANZHIYU_FOOTER_SINCE, CONFIG)
  const author = siteConfig('AUTHOR', 'Author', CONFIG)
  const barEnable = siteConfig('ANZHIYU_FOOTER_BAR_ENABLE', CONFIG.ANZHIYU_FOOTER_BAR_ENABLE, CONFIG)
  const linkList = siteConfig('ANZHIYU_FOOTER_BAR_LINKS', CONFIG.ANZHIYU_FOOTER_BAR_LINKS, CONFIG)
  const ccEnable = siteConfig('ANZHIYU_FOOTER_BAR_CC_ENABLE', CONFIG.ANZHIYU_FOOTER_BAR_CC_ENABLE, CONFIG)
  const ccLink = siteConfig('ANZHIYU_FOOTER_BAR_CC_LINK', CONFIG.ANZHIYU_FOOTER_BAR_CC_LINK, CONFIG)
  const customText = siteConfig('ANZHIYU_FOOTER_CUSTOM_TEXT', CONFIG.ANZHIYU_FOOTER_CUSTOM_TEXT, CONFIG)
  const nowYear = new Date().getFullYear()

  return (
    <>
      <div id='footer-wrap'>
        {customText && <div className='footer_custom_text'>{customText}</div>}
      </div>

      {barEnable && (
        <div id='footer-bar'>
          <div className='footer-bar-links'>
            <div className='footer-bar-left'>
              <div id='footer-bar-tips'>
                {ownerEnable && (
                  <div className='copyright'>
                    &copy;
                    {since && since !== nowYear ? `${since} - ${nowYear}` : nowYear} By{' '}
                    <a className='footer-bar-link' href='/' title={author} target='_blank' rel='noreferrer'>
                      {author}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className='footer-bar-right'>
              {linkList?.map(item => (
                <a className='footer-bar-link' href={item.link} title={item.text} key={item.text}>
                  {item.text}
                </a>
              ))}
              {ccEnable && (
                <a className='footer-bar-link cc' href={ccLink} title='知识共享许可协议'>
                  <i className='anzhiyufont anzhiyu-icon-copyright-line' />
                  <i className='anzhiyufont anzhiyu-icon-creative-commons-by-line' />
                  <i className='anzhiyufont anzhiyu-icon-creative-commons-nc-line' />
                  <i className='anzhiyufont anzhiyu-icon-creative-commons-nd-line' />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      <div id='footer-bottom' style={{ height: 1 }} />
    </>
  )
}
