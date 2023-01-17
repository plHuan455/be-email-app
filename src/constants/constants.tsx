import LabelOptionStyle from '@components/atoms/SelectBox/labelOptionStyles';

export const optionsVisibility = [
  {
    value: 'Public',
    label: (
      <LabelOptionStyle iconName="dot" labelValue="Public" width={40} height={20} />
    ),
  },
  {
    value: 'Private',
    label: (
      <LabelOptionStyle
        iconName="dot"
        labelValue="Private"
        width={40}
        height={20}
        color="grey"
      />
    ),
  },
];

export const defaultStatus = [
  'Pending',
  'Approved',
  'Rejected',
  'Disbursed',
  'Reimbursed',
];

export const toolbarCustom = {
  options: [
    'history',
    'inline',
    'fontFamily',
    'fontSize',
    'colorPicker',
    'emoji',
    'link',
    'image',
    'textAlign',
    'list',
    'remove',
  ],
  inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
  textAlign: { inDropdown: true },
  list: { inDropdown: true },
};

export const disableStatus = ['Reimbursed', 'Rejected'];

export const AccountSettingFields = [
  {
    name: 'name',
  },
];

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PERMISSIONS = {
  RBAC_DEPARTMENT_CREATE: 'RBAC_DEPARTMENT_CREATE',
  RBAC_DEPARTMENT_UPDATE: 'RBAC_DEPARTMENT_UPDATE',
  RBAC_DEPARTMENT_DELETE: 'RBAC_DEPARTMENT_DELETE',
  USER_SETTING_CREATE: 'USER_SETTING_CREATE',
  USER_SETTING_UPDATE: 'USER_SETTING_UPDATE',
  USER_SETTING_DELETE: 'USER_SETTING_DELETE',
  SYSTEM_POSITION_CREATE: 'SYSTEM_POSITION_CREATE',
  SYSTEM_POSITION_UPDATE: 'SYSTEM_POSITION_UPDATE',
  SYSTEM_POSITION_DELETE: 'SYSTEM_POSITION_DELETE',
};
