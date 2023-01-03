import { AttachFile } from '@components/organisms/EmailMess';

export class UserInfo {
  avatar: string;
  name: string;
  mail: string;

  constructor(avatar: string, name: string, mail: string) {
    this.avatar = avatar;
    this.name = name;
    this.mail = mail;
  }

  getAbbreviations() {
    const cloneName = this.name;

    const splitName = cloneName.split(' ');
    const nameLength = splitName.length;

    if (nameLength >= 2) {
      return splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase();
    }
    return splitName[0][0].toUpperCase();
  }
}

export class UserReceiveInfo extends UserInfo {
  id: string | number
  isChecked: boolean;
  field?: 'to' | 'cc' | 'bcc';

  constructor(
    id: string | number,
    avatar: string,
    name: string,
    mail: string,
    isChecked: boolean,
    field?: 'to' | 'cc' | 'bcc',
  ) {
    super(avatar, name, mail);
    this.id = id;
    this.isChecked = isChecked;
    this.field = field;
  }
}

export interface File {
  name: string;
  type: string;
  url: string;
}

export interface Email {
  id: string;
  title: string;
  sender: UserInfo;
  cc: UserInfo[];
  bcc: UserInfo[];
  sendTo: Array<UserInfo>;
  mailContent: string;
  attachFiles: Array<AttachFile>;
  status: string;
  type: string;
  date: string;
}
