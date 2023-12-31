import { toolbarCustom } from "@constants/constants";
import { Box, Button, InputBase, TextField } from "@mui/material";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from "draft-js";
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import { rem } from "@utils/functions";
import ModalBase from "@components/atoms/ModalBase";
import { useRef } from "react";

export interface AddEmailTemplateFields {
  name: string;
  description?: string;
  editor: any;
}

interface AddEmailTemplateProps {
  method: UseFormReturn<AddEmailTemplateFields>;
  isShowFormModal?: boolean;
  onSaveClick?: () => void;
  onClearClick?: () => void;
  onFormModalClose?: () => void;
  onSubmit: (values: AddEmailTemplateFields) => void;
}

const AddEmailTemplate: React.FC<AddEmailTemplateProps> = ({
  method,
  isShowFormModal = false,
  onFormModalClose,
  onSaveClick,
  onClearClick,
  onSubmit
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Box className="t-addEmailTemplate px-6">
      <Box className="shadow-lg" sx={{borderRadius: rem(12), backgroundColor: 'white'}}>
        <FormProvider {...method}>
          <form className="flex flex-col flex-1" onSubmit={method.handleSubmit(onSubmit)} ref={formRef} id='test-export'>
          <Box
            className="flex flex-col"
            sx={{
              px: rem(12),
              '& .public-DraftStyleDefault-block': {
                marginBlock: 0,
              },
              '& .public-DraftEditorPlaceholder-root': {
                height: '100%',
                '& .public-DraftEditorPlaceholder-inner': { height: '100%' },
              },
              '& .public-DraftEditor-content': {
                minHeight: rem(400),
              },
              // Align Text
              '& .rdw-center-aligned-block *': {
                textAlign: 'center'
              },
              '& .rdw-right-aligned-block *': {
                textAlign: 'right'
              },
              '& .rdw-left-aligned-block *': {
                textAlign: 'left'
              },
              '& .rdw-justify-aligned-block *': {
                textAlign: 'justify',
              }
            }}
          >
            <Controller
              name="editor"
              render={({ field: { value, onChange } }) => (
                <Editor
                  editorState={value}
                  onEditorStateChange={(data) => onChange(data)}
                  wrapperClassName="wrapper-class flex flex-col relative"
                  editorClassName="editor-class border flex-1"
                  toolbarClassName="toolbar-class w-full bg-white relative top-0 z-50"
                  placeholder="Enter content here..."
                  toolbar={toolbarCustom}
                  handlePastedText={() => false}
                  onFocus={() => {
                    const toolbar = document.querySelector(
                      '.rdw-editor-toolbar',
                    ) as HTMLElement;

                    toolbar.style.position = 'sticky';
                  }}
                  onBlur={() => {
                    const toolbar = document.querySelector(
                      '.rdw-editor-toolbar',
                    ) as HTMLElement;

                    toolbar.style.position = 'relative';
                  }}
                />
              )}
            />
          </Box>
            <Box display="flex" justifyContent="flex-end" sx={{padding: rem(16), backgroundColor: '#F1F1F6'}}>
              <Button 
                sx={{minWidth: rem(100), backgroundColor: '#ff3b3b', '&:hover': { backgroundColor: '#fe8787'}}}
                onClick={onClearClick} 
              >
                Clear
              </Button>
              <Button sx={{ml: rem(24), minWidth: rem(100)}} onClick={onSaveClick}>Save</Button>
            </Box>
            <ModalBase
              isOpen={isShowFormModal}
              title="Template info"
              onClose={onFormModalClose}
              onSubmit={() => {
                method.handleSubmit(onSubmit)();
              }}
            >
              <Box sx={{pt: rem(12), pb: rem(16)}}>
                <Controller
                  name="name"
                  render={({field: {value, onChange}, fieldState}) => (
                    <TextField
                      id="add-email-template-name"
                      error={Boolean(fieldState.error?.message)}
                      label="Name"
                      helperText={fieldState.error?.message}
                      value={value}
                      onChange={onChange}
                      sx={{width: '100%'}}
                    />
                  )}
                />

                <Controller 
                  name="description"
                  render={({field: {value, onChange}}) => (
                    <TextField
                      id="filled-error"
                      label="Description"
                      sx={{width: '100%', mt: rem(16)}}
                      multiline
                      maxRows={4}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {/* <Button type='submit' sx={{width: '100%', mt: rem(16)}}>Save</Button> */}
              </Box>
            </ModalBase>
            <div style={{width: 0, height: 1, overflow: 'auto'}}>
              <div id="visible" style={{backgroundColor: 'white'}}></div>
            </div>
          </form>
        </FormProvider>
      </Box>
    </Box>
  )
}

export default AddEmailTemplate;