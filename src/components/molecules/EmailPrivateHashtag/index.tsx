import * as React from 'react';
import {
  useAutocomplete,
  AutocompleteGetTagProps,
} from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { HashtagTabs } from '@redux/Email/reducer';
import { isEmpty } from 'lodash';
import { rem } from '@utils/functions';

const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
  flex: 1;
`,
);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  font-weight: 700;
`;

const InputWrapper = styled('div')(
  ({ theme }) => `
  margin-left: 20px;
  width: 300px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

interface Props {
  privateHashtagData: HashtagTabs[];
  defaultValue: HashtagTabs[];
  onChangeDefaultValue: (value: HashtagTabs[]) => void;
}

const EmailPrivateHashtag: React.FC<Props> = ({
  privateHashtagData,
  defaultValue,
  onChangeDefaultValue,
}) => {
  const [tempOption, setTempOption] = React.useState<HashtagTabs>();

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [...defaultValue],
    onChange: (e, value) => {
      onChangeDefaultValue(value);
    },
    multiple: true,
    autoHighlight: true,
    options: tempOption
      ? [...privateHashtagData, tempOption]
      : [...privateHashtagData],
    getOptionLabel: (option) => option.title,
  });

  // Handler FNC
  const handleInputHashtag = (e) => {
    const inputValue = e.target.value;
    const isMatchHashtagType = inputValue.match(/([a-zA-Z0-9]+\b)/);

    if (isMatchHashtagType) {
      setTempOption({
        notiNumber: 0,
        status: 'hashtag',
        title: `#${inputValue}`,
        value: inputValue,
        color: '#4BAAA2',
      });
    } else setTempOption(undefined);
  };

  return (
    <Root>
      <div {...getRootProps()} className="flex items-center">
        <Label {...getInputLabelProps()}></Label>
        <InputWrapper
          ref={setAnchorEl}
          className={`${focused ? 'focused' : ''} flex-1`}>
          {value.map((option: HashtagTabs, index: number) => (
            <StyledTag label={option.title} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} onInput={handleInputHashtag} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()} sx={{bottom: `calc(100% - ${rem(16)})`, ml: rem(20), maxHeight: rem(200)}}>
          {(groupedOptions as typeof privateHashtagData).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.title}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
};

export default EmailPrivateHashtag;
