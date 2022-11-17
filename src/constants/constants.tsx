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
