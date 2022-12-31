import { EmailTemplateItem } from "@components/templates/EmailTemplateList";
import testImageSrc from "@assets/images/template-test.png";

export const emailTemplateList: EmailTemplateItem[] = [
  {id: 1, name: 'Template test 1', description: 'Template test 1 description', imgSrc: testImageSrc},
  {id: 2, name: 'Template test 2', description: 'Template test 2 description', imgSrc: 'https://picsum.photos/300/400'},
  {id: 3, name: 'Template test 3', description: 'Template test 3 description', imgSrc: 'https://picsum.photos/300/400'},
  {id: 4, name: 'Template test 4', description: 'Template test 4 description', imgSrc: testImageSrc},
  {id: 5, name: 'Template test 5', description: 'Template test 5 description', imgSrc: 'https://picsum.photos/300/400'},
  {id: 6, name: 'Template test 6', description: 'Template test 6 description', imgSrc: 'https://picsum.photos/300/400'},
]