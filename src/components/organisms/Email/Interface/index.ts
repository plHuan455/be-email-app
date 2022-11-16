export class UserInfo {
  avatar: string;
  name: string;
  mail: string;

  constructor(avatar: string, name: string, mail: string) {
    this.avatar = avatar;
    this.name = name;
    this.mail = mail;
  }
}

export class ReceiverData extends UserInfo {
  constructor(avatar: string, name: string, mail: string) {
    super(avatar, name, mail);
  }

  getAbbreviations() {
    const cloneName = this.name;
    const nameLength = cloneName.length;

    if (nameLength >= 2) {
      return cloneName.slice(0, 2).toUpperCase();
    }
    return cloneName.slice(0, 1).toUpperCase();
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
  sendTo: Array<ReceiverData>;
  mailContent: string;
  attachFiles: Array<File>;
  status: string;
  type: string;
  date: string;
}
