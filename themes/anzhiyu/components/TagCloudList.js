import TagPills from './TagPills'

/**
 * 全部标签云页面
 * 对应原主题 includes/page/tags.pug + tags_page_list("tags") helper
 */
export default function TagCloudList({ tagOptions = [] }) {
  return (
    <div className='tag-cloud-list is-center'>
      <div id='tag'>
        <div id='tag-page-tags'>
          <TagPills tagOptions={tagOptions} />
        </div>
      </div>
    </div>
  )
}
