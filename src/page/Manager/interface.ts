interface ManagerFunctions {
  getAbbreviations(): string;
}

export class Positions {
  constructor(public id: number, public name: string) {}
}

export class Manager implements ManagerFunctions {
  constructor(
    public id: number,
    public avatar: string,
    public firstName: string,
    public lastName: string,
    public identity: string,
    public mail: string,
    public position: string,
    public role: string,
    public department?: string,
  ) {}

  getAbbreviations() {
    const cloneName =
      this.firstName || this.lastName
        ? `${this.firstName} ${this.lastName}`.trim()
        : '';
    const cloneNameSave = cloneName;

    const splitName = cloneName.split(' ');
    const nameLength = splitName.length;

    if (nameLength >= 2) {
      return (
        splitName[0][0].toUpperCase() + splitName[nameLength - 1][0].toUpperCase()
      );
    }

    return cloneNameSave ? splitName[0][0].toUpperCase() : '';
  }

  dissectionMail() {
    const cloneMail = this.mail;
    const splitMail = cloneMail.split('@');

    if (cloneMail) return splitMail[0];

    return `${this.firstName} ${this.lastName}`;
  }
}

export class Department {
  constructor(
    public id: number,
    public name: string,
    public number: number,
    public address: string,
    public employees: Manager[],
    public positions: Positions[],
    public description: string | '',
  ) {}
}

// interface RoleFunction {
//   activeIsGrant: () => void;
//   activeIsDeny: () => void;
// }

export class Role {
  constructor(
    public name: string,
    public status: string,
    public grant?: string,
    public department?: string,
  ) {}

  // activeIsGrant() {
  //   this.isDeny = false;
  //   this.isGrant = true;
  // }

  // activeIsDeny() {
  //   this.isGrant = false;
  //   this.isDeny = true;
  // }
}
