import { getSignatureService, updateSignatureService } from '@api/user';
import { UpdateSignatureParams } from '@api/user/interface';
import AddSignature, {CreateSignatureFields} from '@components/templates/AddSignature';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getEditorStateFormHtmlString, getHtmlStringFromEditorState } from '@utils/functions';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateSignContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const method = useForm<CreateSignatureFields>({
    defaultValues: {
      name: '',
      editor: getEditorStateFormHtmlString()
    }
  })

  const { isLoading: isSignatureGetting } = useQuery({
    queryKey: ['update-signature-get-signature', id],
    queryFn: () => getSignatureService(Number(id)),
    enabled: id !== undefined,
    onSuccess: (res) => {
      method.setValue('name', res.data.name),
      method.setValue('editor', getEditorStateFormHtmlString(res.data.text_html))
      navigate('/setting/signature');
    },
    onError: (res) => {
      toast.error("Can't update signature")
    }
  })

  const {mutate: updateSignatureMutate, isLoading: isSignatureUpdating} = useMutation({
    mutationKey: ['update-signature-update'],
    mutationFn: (params: UpdateSignatureParams) => updateSignatureService(Number(id), params),
    onSuccess: () => {
      toast.success('Signature has been updated');
    },
    onError: (err: any) => {
      toast.error(`Can't update signature${err?.response?.data?.message ? ` (${err?.response?.data?.message})`: ''}`);
    },
  })

  const handleSubmit = (values: CreateSignatureFields) => {
    updateSignatureMutate({name: values.name, text_html: getHtmlStringFromEditorState(values.editor)})
  }

  return (
    <>
      <AddSignature
        isLoading={isSignatureUpdating && isSignatureGetting}
        submitLabel={'Update'}
        method={method}
        onSubmit={handleSubmit}
        onCancelClick={() => navigate('/setting/signature')}
      />
    </>
  );
};

export default UpdateSignContainer;
