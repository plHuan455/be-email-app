import { EmailTemplateItem } from "@components/templates/EmailTemplateList";
import testImageSrc from "@assets/images/template-test.png";
import { getHtmlStringFromEditorState } from "@utils/functions";


const testHtmlString = `<p style="text-align:center;">Cras ultricies ligula sed&nbsp;</p>
<p>Nulla porttitor accumsan tincidunt</p>
<p></p>
<p>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada.</p>
<p></p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
`
export const emailTemplateList: EmailTemplateItem[] = [
  {id: 1, name: 'Template test 1', description: 'Template test 1 description', imgSrc: testImageSrc, htmlString: testHtmlString},
  {id: 2, name: 'Template test 2', description: 'Template test 2 description', imgSrc: 'https://picsum.photos/300/400', htmlString: testHtmlString},
  {id: 3, name: 'Template test 3', description: 'Template test 3 description', imgSrc: 'https://picsum.photos/300/400', htmlString: testHtmlString},
  {id: 4, name: 'Template test 4', description: 'Template test 4 description', imgSrc: testImageSrc, htmlString: testHtmlString},
  {id: 5, name: 'Template test 5', description: 'Template test 5 description', imgSrc: 'https://picsum.photos/300/400', htmlString: testHtmlString},
  {id: 6, name: 'Template test 6', description: 'Template test 6 description', imgSrc: 'https://picsum.photos/300/400', htmlString: testHtmlString},
]