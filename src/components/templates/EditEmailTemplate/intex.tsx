import { toolbarCustom } from "@constants/constants";
import { Box, Button, InputBase, TextField } from "@mui/material";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from "draft-js";
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import { rem } from "@utils/functions";
import ModalBase from "@components/atoms/ModalBase";
import { useRef } from "react";

export interface EditEmailTemplateFields {
  name: string;
  description?: string;
  editor: any;
}

interface EditEmailTemplateProps {
  method: UseFormReturn<EditEmailTemplateFields>;
  isShowFormModal?: boolean;
  onUpdateClick?: () => void;
  onClearClick?: () => void;
  onFormModalClose?: () => void;
  onSubmit: (values: EditEmailTemplateFields) => void;
}

const EditEmailTemplate: React.FC<EditEmailTemplateProps> = ({
  method,
  isShowFormModal = false,
  onFormModalClose,
  onUpdateClick,
  onClearClick,
  onSubmit
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Box className="t-editEmailTemplate px-6">
      <Box className="shadow-lg" sx={{ borderRadius: rem(12), backgroundColor: 'white' }}>
        <FormProvider {...method}>
          <form onSubmit={method.handleSubmit(onSubmit)} ref={formRef} id='test-export'>
            <Box
              className="flex flex-col flex-1"
              sx={{
                px: rem(12),
                py: rem(16),
                '& .t-editEmailTemplate_field ~ .t-editEmailTemplate_field': {
                  mt: rem(16)
                }
              }}
            >
              <Box className="t-editEmailTemplate_field">
                <Controller
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      id="filled-error"
                      label="Template name"
                      size="small"
                      sx={{ 
                        width: '100%', 
                        '& .MuiFormLabel-root': { fontSize: rem(14)},
                        // '& .MuiFilledInput-root': {
                        //   backgroundColor: 'transparent',
                        //   '&:hover': {
                        //     backgroundColor: 'transparent',
                        //   }
                        // },
                        // '& .MuiFilledInput-root.Mui-focused': {
                        //   backgroundColor: 'transparent',
                        // },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B2B0EE'},
                        '& .MuiOutlinedInput:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#7c78e6' }
                      }}
                      multiline
                      maxRows={4}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Box>
              <Box className="t-editEmailTemplate_field">
                <Controller
                  name="description"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      id="filled-error"
                      label="Description"
                      size="small"
                      sx={{ 
                        width: '100%', 
                        '& .MuiFormLabel-root': { fontSize: rem(14)}, 
                        // '& .MuiFilledInput-root': {
                        //   backgroundColor: 'transparent',
                        //   '&:hover': {
                        //     backgroundColor: 'transparent',
                        //   }
                        // },
                        // '& .MuiFilledInput-root.Mui-focused': {
                        //   backgroundColor: 'transparent',
                        // },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B2B0EE'},
                        '& .MuiOutlinedInput:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#7c78e6' }
                        
                      }}
                      multiline
                      maxRows={4}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Box>
              <Box
                className="t-editEmailTemplate_field flex flex-col"
                sx={{
                  '& .public-DraftStyleDefault-block': {
                    marginBlock: 0,
                  },
                  '& .public-DraftEditorPlaceholder-root': {
                    height: '100%',
                    '& .public-DraftEditorPlaceholder-inner': { height: '100%' },
                  },
                  '& .public-DraftEditor-content': {
                    minHeight: rem(300),
                    // overflow: 'scroll',
                  },
                }}
              >
                <Box 
                  sx={{
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
              </Box>
            </Box>
            <Box display="flex" justifyContent="flex-end" sx={{ padding: rem(16), backgroundColor: '#F1F1F6' }}>
              <Button
                sx={{ minWidth: rem(100), backgroundColor: '#ff3b3b', '&:hover': { backgroundColor: '#fe8787' } }}
                onClick={onClearClick}
              >
                Clear
              </Button>
              <Button sx={{ ml: rem(24), minWidth: rem(100) }} type='submit'>
                Update
              </Button>
            </Box>
            <ModalBase
              isOpen={isShowFormModal}
              title="Template info"
              onClose={onFormModalClose}
              onSubmit={() => {
                method.handleSubmit(onSubmit)();
              }}
            >
              <Box sx={{ pt: rem(12), pb: rem(16) }}>
                <Controller
                  name="name"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <TextField
                      id="add-email-template-name"
                      error={Boolean(fieldState.error?.message)}
                      label="Name"
                      helperText={fieldState.error?.message}
                      value={value}
                      onChange={onChange}
                      sx={{ width: '100%' }}
                    />
                  )}
                />

                <Controller
                  name="description"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      id="filled-error"
                      label="Description"
                      sx={{ width: '100%', mt: rem(16) }}
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
            <div style={{ width: 0, height: 1, overflow: 'auto' }}>
              <div id="visible" style={{ backgroundColor: 'white' }}></div>
            </div>
          </form>
        </FormProvider>
      </Box>
    </Box>
  )
}

export default EditEmailTemplate;