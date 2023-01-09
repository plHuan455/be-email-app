import { EmailTemplateItem } from "@components/templates/EmailTemplateList";
import testImageSrc from "@assets/images/template-test.png";
import { getHtmlStringFromEditorState } from "@utils/functions";


const testHtmlString1 = `<p style="text-align:center;">Cras ultricies ligula sed&nbsp;</p>
<p>Nulla porttitor accumsan tincidunt</p>
<p></p>
<p>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada.</p>
<p></p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
`
const testHtmlString2 = `<p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Proin eget tortor risus. Proin eget tortor risus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
<p></p>
<p>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
<p></p>
<p>Nulla quis lorem ut libero malesuada feugiat. Cras ultricies ligula sed magna dictum porta. Curabitur aliquet quam id dui posuere blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor lectus nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</p>
<p></p>
<p>Sed porttitor lectus nibh. Proin eget tortor risus. Nulla quis lorem ut libero malesuada feugiat. Donec rutrum congue leo eget malesuada. Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta.</p>
<p></p>
<p>Nulla porttitor accumsan tincidunt. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>`

export const emailTemplateList: EmailTemplateItem[] = [
  {id: 1, name: 'Template test 1', description: 'Template test 1 description', imgSrc: testImageSrc, htmlString: testHtmlString1},
  {id: 2, name: 'Template test 2', description: 'Template test 2 description', imgSrc: 'https://picsum.photos/300/400', htmlString: testHtmlString2},
  {id: 3, name: 'Template test 3', description: 'Template test 3 description', imgSrc: 'https://picsum.photos/300/401', htmlString: testHtmlString2},
  {id: 4, name: 'Template test 4', description: 'Template test 4 description', imgSrc: testImageSrc, htmlString: testHtmlString1},
  {id: 5, name: 'Template test 5', description: 'Template test 5 description', imgSrc: 'https://picsum.photos/300/402', htmlString: testHtmlString2},
  {id: 6, name: 'Template test 6', description: 'Template test 6 description', imgSrc: 'https://picsum.photos/300/403', htmlString: testHtmlString2},
]