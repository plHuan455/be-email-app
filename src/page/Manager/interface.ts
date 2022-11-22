interface ManagerFunctions {
  getAbbreviations(): string;
}

export class Manager implements ManagerFunctions {
  constructor(
    public avatar: string,
    public name: string,
    public mail: string,
    public position: string,
    public role: 'Admin' | 'Employee' | 'Manager' | 'Manager 02' | 'Blocked',
  ) {}

  getAbbreviations() {
    const cloneName = this.name;

    const splitName = cloneName.split(' ');
    const nameLength = splitName.length;

    if (nameLength >= 2) {
      return splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase();
    }
    return splitName[0][0].toUpperCase();
  }

  dissectionMail() {
    const cloneMail = this.mail;
    const splitMail = cloneMail.split('@');

    if (cloneMail) return splitMail[0];

    return this.name;
  }
}
