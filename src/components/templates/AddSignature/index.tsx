import { toolbarCustom } from "@constants/constants";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, TextField } from "@mui/material";
import { getHtmlStringFromEditorState, rem } from "@utils/functions";
import { Editor } from 'react-draft-wysiwyg';
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";


export interface CreateSignatureFields {
  name: string;
  editor: any
}

interface AddSignatureProps {
  submitLabel?: string;
  method: UseFormReturn<CreateSignatureFields>;
  isLoading?: boolean;
  onSubmit: (values: CreateSignatureFields) => void;
  onCancelClick?: () => void;
}

const AddSignature: React.FC<AddSignatureProps> = ({
  submitLabel,
  method,
  isLoading = false,
  onSubmit,
  onCancelClick,
}) => {
  return (
    <Box className="t-addSignature px-6">
      <Box className="shadow-lg" sx={{ borderRadius: rem(12), backgroundColor: 'white' }}>
        <FormProvider {...method}>
          <form onSubmit={method.handleSubmit(onSubmit)}>
            <Box
              className="flex flex-col flex-1"
              sx={{
                padding: rem(12),
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
                      label="Signature name"
                      size="small"
                      variant="standard"
                      required
                      sx={{ 
                        width: '100%',
                        '& .MuiInputBase-root': {backgroundColor: 'transparent'},
                        '& .MuiFormLabel-root': { fontSize: rem(14)},
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B2B0EE'},
                        '& .MuiOutlinedInput:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#7c78e6' },
                        '& .MuiFormLabel-asterisk': {
                          color: '#f44336'
                        }
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
                <Controller
                  name="editor"
                  render={({ field: { value, onChange }}) => {
                    return(
                    <Editor
                      editorState={value}
                      onEditorStateChange={(data) => onChange(data)}
                      wrapperClassName="wrapper-class flex flex-col relative"
                      editorClassName="editor-class border flex-1"
                      toolbarClassName="toolbar-class w-full bg-white relative top-0 z-50"
                      placeholder="Enter signature here ..."
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
                  )}}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="flex-end" sx={{ padding: rem(16), backgroundColor: '#F1F1F6' }}>
              <Button 
                sx={{ ml: rem(24), minWidth: rem(100), backgroundColor: '#ff3b3b', '&:hover': {backgroundColor : '#f31515'} }} 
                onClick={onCancelClick}
              >
                Cancel
              </Button>
              
              <LoadingButton 
                loading={isLoading}
                sx={{
                  ml: rem(24),
                  minWidth: rem(100),
                  backgroundColor: '#554CFF',
                  color: '#fff',
                  padding: `${rem(6)} ${rem(16)}`,
                  '&:hover': {
                    backgroundColor: '#6d66fb',
                  },
                  '& .MuiCircularProgress-svg': {
                    color: '#c6c5c5',
                  },
                  '&.MuiLoadingButton-root.Mui-disabled': {
                    // color: '#c6c5c5',
                    '& .MuiButton-startIcon': {
                      mr: 0,
                    },
                  },
                }}
                type='submit'
              >
                {submitLabel}
              </LoadingButton>
            </Box>
            <div style={{ width: 0, height: 1, overflow: 'auto' }}>
              <div id="visible" style={{ backgroundColor: 'white' }}></div>
            </div>
          </form>
        </FormProvider>
      </Box>
    </Box>
  )
}

export default AddSignature;
