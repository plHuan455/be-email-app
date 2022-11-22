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

export interface File {
  name: string;
  type: string;
  url: string;
}

export interface Email {
  id: string;
  title: string;
  sender: UserInfo;
  sendTo: Array<UserInfo>;
  mailContent: string;
  attachFiles: Array<File>;
  status: string;
  type: string;
  date: string;
}
