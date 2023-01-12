
import { useNavigate } from 'react-router-dom';
import SignatureTable from '@components/templates/SignatureTable';
import {SIGNATURE_API} from '@constants/UserAPI' 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSignatureService } from '@api/user';
import { toast } from 'react-toastify';

export interface SignItem {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
  avatar: string;
}

const SignatureContainer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate: updateSignatureMutate, isLoading: isSignatureUpdating} = useMutation({
    mutationKey: ['signature-main'],
    mutationFn: deleteSignatureService,
    onSuccess: () => {
      toast.success('Signature has been deleted');
      queryClient.invalidateQueries({queryKey: ['delete-signature']})
    },
    onError: () => {
      toast.error('Cant\'t delete signature');
    }
  })
  return (
    <>
      <SignatureTable
        api={SIGNATURE_API}
        onDeleteActionClick={(id) => updateSignatureMutate(id)}
        onUpdateActionClick={(id) => navigate(`edit/${id}`)}
      />
    </>
  );
};

export default SignatureContainer;

export const rowsSign: SignItem[] = [
  {
    id: 1,
    name: 'Employee A',
    position: 'Frontend Developer',
    phone: '+84123456789',
    email: 'employeeA@mtd.com',
    avatar:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  },
  {
    id: 2,
    name: 'Employee B',
    position: 'Frontend Developer',
    phone: '+84123456789',
    avatar:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
    email: 'employeeB@mtd.com',
  },
  {
    id: 3,
    name: 'Employee C',
    position: 'Frontend Developer',
    phone: '+84123456789',
    email: 'employeeC@mtd.com',
    avatar:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  },
];
