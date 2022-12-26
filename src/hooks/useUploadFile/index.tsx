import React from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';

interface UploadFileOptions {
  multiple?: boolean;
  dragDrop?: boolean;
  /**
   * Prop support for dragDrop
   */
  containerId?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: ('image/*' | 'application/pdf' | undefined)[];
  checkType?: boolean;
  disabled?: boolean;
}

function useUploadFile(options: UploadFileOptions = {}) {
  const id = React.useMemo(() => uuidv4(), []);
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<HTMLInputElement['value']>();
  const [fileList, setFileList] = React.useState<FileList>();
  const [images, setImages] = React.useState<string[]>();
  const [uploadRoot, setUploadRoot] = React.useState<ReactDOM.Root>();

  const onUpload = React.useCallback(() => {
    if (!inputFileRef || !inputFileRef.current) return;
    const input = inputFileRef.current;

    input.click();
  }, [inputFileRef]);

  const onChange = React.useCallback((options: UploadFileOptions) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        if (!e.target.files) return;
        const files = e.target.files;

        /** Note
         * Làm tạm, sẽ check tiếp
         */
        if (options.checkType) {
          if (options.accept?.includes(files[0].type as any)) {
            setFileList(files);
            setFile(e.target.value);
            return;
          }
          setFileList(undefined);
          setFile(undefined);
          e.target.files = null;
          return;
        }

        setFileList(files);
        setFile(e.target.value);

        if (options.multiple) {
          setImages(() => {
            const arr: string[] = [];
            for (const key in files) {
              if (Object.prototype.hasOwnProperty.call(files, key)) {
                const element = files[key];
                arr.push(URL.createObjectURL(element));
              }
            }
            return arr;
          });
          return;
        }
        console.log(files[0].type);
        setImages([URL.createObjectURL(files[0])]);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);

  React.useEffect(() => {
    let upload = document.getElementById('upload-' + id);
    const container = document.getElementById(options.containerId || 'root')!;

    if (!upload) {
      upload = document.createElement('div');
      upload.id = 'upload-' + id;
      upload.className = 'hidden';

      if (options.dragDrop) {
        upload.className = 'absolute w-full h-full opacity-0';

        if (!options.containerId) {
          console.error('Please provide "containerId" when flag "dragDrop" is true');

          upload.className = 'hidden';
        } else {
          container.classList.add('relative');
        }
      }
      container?.append(upload);
      setUploadRoot(ReactDOM.createRoot(upload));
    }

    return () => {
      uploadRoot && uploadRoot.unmount();
      upload && container?.removeChild(upload);
    };
  }, [options.dragDrop, options.containerId]);

  React.useEffect(() => {
    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(options)(e);
      options.onChange && options.onChange(e);
    };
    if (uploadRoot) {
      uploadRoot.render(
        <InputUploadFile
          className={options.dragDrop && 'w-full h-full'}
          multiple={options.multiple || false}
          onChange={_onChange}
          ref={inputFileRef}
          accept={options.accept && options.accept.join(',')}
          disabled={options.disabled}
        />,
      );
    }
  }, [
    uploadRoot,
    onChange,
    inputFileRef,
    options.multiple,
    options.dragDrop,
    options.onChange,
  ]);

  return {
    onUpload,
    fileList,
  };
}

const InputUploadFile = React.forwardRef<HTMLInputElement, any>((props, ref) => {
  return (
    <input
      className="input__file"
      onChange={props.onChange}
      type={'file'}
      ref={ref}
      accept={props.accept}
      multiple={props.multiple}
      {...props}
    />
  );
});

export default useUploadFile;
