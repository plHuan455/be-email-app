import {
  Menu,
  Autocomplete,
  AutocompleteProps,
  AutocompleteFreeSoloValueMapping,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue,
  AutocompleteRenderOptionState,
  AutocompleteOwnerState,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
} from '@mui/material';
import React, { useId } from 'react';
import { OptionWithMutationObserver } from '.';

export interface AutocompleteNestedProps<
  S extends AutocompleteNestedSubMenu,
  T extends AutocompleteNestedValue<S>,
  // Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  // FreeSolo extends boolean | undefined = undefined,
> extends Omit<
    AutocompleteProps<T, true, DisableClearable, false>,
    'multiple' | 'freeSolo'
  > {
  renderSubOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Required<T>['subMenu'][any],
    state: AutocompleteRenderOptionState,
  ) => React.ReactNode;
  getOptionLabel: (option: T | AutocompleteFreeSoloValueMapping<false>) => string;
  getSubOptionLabel: (
    option: Required<T>['subMenu'][any] | AutocompleteFreeSoloValueMapping<false>,
  ) => string;
  renderSubTags?: (
    value: Required<T>['subMenu'],
    getTagProps: AutocompleteRenderGetTagProps,
    ownerState: AutocompleteOwnerState<S, true, DisableClearable, false>,
  ) => React.ReactNode;
  renderSubInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
  name: string;
}

export interface AutocompleteNestedValue<T extends AutocompleteNestedSubMenu> {
  id: string | number;
  isSelected?: boolean;
  field?: string;
  subMenu?: Array<T>;
}

export interface AutocompleteNestedSubMenu {
  id: string | number;
  isSelected?: boolean;
  field?: string;
}

const config: MutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
};

function AutocompleteNested<
  S extends AutocompleteNestedSubMenu,
  T extends AutocompleteNestedValue<S>,
  // Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  // FreeSolo extends boolean | undefined = undefined,
>({ ...props }: AutocompleteNestedProps<S, T, DisableClearable>) {
  const {
    value: rootValue,
    onChange,
    renderOption,
    renderSubOption,
    renderTags,
    renderSubTags,
    renderInput,
    renderSubInput,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState<T>();
  const [subMenuWidth, setSubMenuWidth] = React.useState(0);

  const selectRef = React.useRef<any>(null);
  const itemFocusRef = React.useRef<any>(null);

  const callBackRef = React.useRef<
    (
      callback: (context: {
        event: React.SyntheticEvent<Element, Event>;
        value: AutocompleteValue<T, true, DisableClearable, false>;
        reason: AutocompleteChangeReason;
        details: AutocompleteChangeDetails<T> | undefined;
      }) => void,
    ) => void
  >(() => undefined);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: AutocompleteValue<T, true, DisableClearable, false>,
    reason: AutocompleteChangeReason,
    details: AutocompleteChangeDetails<T> | undefined,
  ) => {
    // console.log({value: JSON.parse(JSON.stringify(value))})
    const { isCustomEvent, code, keyCode } = event as any;

    // Xóa option bằng keyboard 'Backspace'
    if (
      event.type === 'keydown' &&
      reason === 'removeOption' &&
      (code === 'Backspace' || keyCode === 8)
    ) {
      if (details?.option) {
        // Nếu option có options con
        // Duyệt qua các option con và đổi prop "isSelected" thành false
        if (details.option.subMenu) {
          details.option.subMenu.forEach((subMenu) => {
            subMenu.isSelected = false;
            subMenu.field = undefined;
          });
        }

        details.option.isSelected = false;
        details.option.field = undefined;
        onChange && onChange(event, value, reason, details);
      }
      // console.log('111')
      return;
    }

    // Xóa option bằng nút close
    if (reason === 'removeOption' && !itemFocusRef.current) {
      if (details?.option) {
        // Nếu option có options con
        // Duyệt qua các option con và đổi prop "isSelected" thành false
        if (details.option.subMenu) {
          details.option.subMenu.forEach((subMenu) => {
            subMenu.isSelected = false;
            subMenu.field = undefined;
          });
        }

        // Xóa option cha khỏi value
        const findIndex = value.findIndex((v) => v === details.option);
        findIndex !== -1 ? value.splice(findIndex, 1) : undefined;

        details.option.isSelected = false;
        details.option.field = undefined;
        onChange && onChange(event, value, reason, details);
      }
      // console.log('222')
      return;
    }

    // Click vào xóa tất cả option
    if (reason === 'clear') {
      if (!rootValue) return;
      rootValue.forEach((v) => {
        v.isSelected = false;
        v.field = undefined;
        if (!v.subMenu) return;
        v.subMenu.forEach((subMenu) => {
          subMenu.isSelected = false;
          subMenu.field = undefined;
        });
      });
      onChange && onChange(event, value, reason, details);
      // console.log('333')
      return;
    }

    // Click hoặc Enter vào option
    // Nếu option có options con
    if (details?.option.subMenu && itemFocusRef.current) {
      setOpenSub(true);

      callBackRef.current = (callback) => {
        callback({ event, value, reason, details });
      };

      // console.log('444')
      return;
    }

    // console.log('555')
    if (details?.option) {
      details.option.isSelected = !details.option.isSelected;
      details.option.field = details.option.isSelected ? props.name : undefined;
    }
    onChange && onChange(event, value, reason, details);
  };

  const handleChangeSub = (
    event: React.SyntheticEvent<Element, Event>,
    value: S[],
    reason: AutocompleteChangeReason,
    details: AutocompleteChangeDetails<S> | undefined,
  ) => {
    const callbackOnChange = callBackRef.current;

    // Click vào xóa tất cả option
    if (reason === 'clear') {
      callbackOnChange(({ event, value, reason, details }) => {
        if (!details?.option.subMenu) return;
        // Duyệt qua các option con và đổi prop "isSelected" thành false
        details.option.subMenu.forEach((subMenu) => {
          subMenu.isSelected = false;
          subMenu.field = undefined;
        });

        // Xóa option cha khỏi value
        const findIndex = value.findIndex((v) => v.id === details.option.id);
        findIndex !== -1 ? value.splice(findIndex, 1) : undefined;
        details.option.isSelected = false;
        details.option.field = undefined;

        onChange && onChange(event, value, reason, details);
      });
    }
    if (!details) return;

    const handleChange = () => {
      callbackOnChange(({ event, value, reason, details }) => {
        if (!details?.option.subMenu) return;

        const isSubMenuHasSelected = details.option.subMenu.some(
          (subMenu) => subMenu.isSelected,
        );

        const findIndex = value.findIndex((v) => v.id === details.option.id);

        if (isSubMenuHasSelected) {
          console.log('Case isSubMenuHasSelected');
          findIndex === -1 ? value.push(details.option) : undefined;
          details.option.isSelected = true;
          details.option.field = props.name;
          console.log({ event, value, reason, details });
          onChange && onChange(event, value, reason, details);
          return;
        }

        console.log('Case aaa');
        // Xóa option cha khỏi value
        findIndex !== -1 ? value.splice(findIndex, 1) : undefined;
        details.option.isSelected = false;
        details.option.field = undefined;
        console.log({ event, value, reason, details });
        onChange && onChange(event, value, reason, details);
      });
    };

    if (reason === 'removeOption') {
      details.option.isSelected = false;
      details.option.field = undefined;
      handleChange();
      return;
    }

    if (reason === 'selectOption') {
      details.option.isSelected = true;
      details.option.field = props.name;
      handleChange();
      return;
    }
  };

  const getRenderOption = React.useCallback(() => {
    if (!renderOption) return;

    const handleRenderOption = (
      props: React.HTMLAttributes<HTMLLIElement>,
      option: T,
      state: AutocompleteRenderOptionState,
    ) => {
      return (
        <OptionWithMutationObserver
          config={config}
          mutationCallback={(mutationList, observer) => {
            mutationList.forEach((mutation) => {
              if (mutation.type !== 'attributes') return;

              const ele = mutation.target as HTMLElement;
              if (ele.classList.contains('Mui-focused')) {
                if (option.subMenu) {
                  itemFocusRef.current = ele;
                  setCurrentValue(option);
                } else {
                  itemFocusRef.current = undefined;
                  setCurrentValue(undefined);
                }
              }
            });
          }}>
          {renderOption(props, option, state)}
        </OptionWithMutationObserver>
      );
    };

    return handleRenderOption;
  }, [renderOption]);

  React.useEffect(() => {
    if (selectRef.current) {
      const select = selectRef.current as HTMLDivElement;
      setSubMenuWidth(select.offsetWidth);
    }
  }, [selectRef.current]);

  return (
    <div className="w-full">
      <Autocomplete
        {...props}
        sx={styleNoBorder}
        multiple
        ref={selectRef}
        open={open || openSub}
        openOnFocus
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onMouseEnter={() => (itemFocusRef.current = undefined)}
        disableCloseOnSelect
        onChange={handleChange}
        renderInput={renderInput}
        renderOption={getRenderOption()}
        renderTags={renderTags}
      />
      {currentValue?.subMenu && (
        <Menu
          PaperProps={{ sx: { width: subMenuWidth } }}
          open={openSub}
          anchorEl={itemFocusRef.current}
          onClose={() => setOpenSub(false)}>
          <Autocomplete
            multiple
            filterSelectedOptions
            disableCloseOnSelect
            value={currentValue.subMenu.filter(
              (subMenu) => subMenu.isSelected && subMenu.field === props.name,
            )}
            options={currentValue.subMenu.filter(
              (subMenu) =>
                (subMenu.isSelected && subMenu.field === props.name) ||
                !subMenu.isSelected,
            )}
            getOptionLabel={props.getSubOptionLabel}
            onChange={handleChangeSub}
            renderInput={renderSubInput}
            renderOption={renderSubOption}
            renderTags={renderSubTags}
          />
        </Menu>
      )}
    </div>
  );
}

const styleNoBorder = {
  '& fieldset': {
    border: 'none',
  },
};

export default AutocompleteNested;
