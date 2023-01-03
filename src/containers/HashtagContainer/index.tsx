import { useTranslation } from '@@packages/localization/src';
import { removeHashtag } from '@api/hashtag';
import Hashtag from '@components/atoms/Hashtag';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import EditHashtag from '@components/molecules/EditHashtag';
import ModalEmailList, { StatusOptions } from '@components/molecules/ModalEmailList';
import { Box } from '@mui/material';
import { setEmailsList } from '@redux/Email/reducer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const DELAY_CLICK_TIME: number = 200;
let DELAY_TIMER;

interface Props {
  title: string;
  status: StatusOptions;
  catalog: string;
  color: string;
  index: number;
  notiNumber: number;
}

const HashtagContainer: React.FC<Props> = ({
  title,
  status,
  index,
  catalog,
  color = '#4BAAA2',
  notiNumber,
}) => {
  // NavLink
  const NAV_LINK_TO = `/emails/catalog/${catalog}`;
  // useState
  const [modalStatus, setModalStatus] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: catalog,
  });

  // useQueryClient
  const queryClient = useQueryClient();

  //   useTranslation
  const t = useTranslation();

  //   useDispatch
  const dispatch = useDispatch();

  //   useNavigate
  const navigate = useNavigate();

  //   useAlertDialog
  const {
    callback,
    description,
    isLoading,
    isOpen,
    onClose,
    onCloseCallBack,
    setAlertData,
    setIsLoading,
    title: titleDialog,
  } = useAlertDialog();

  // useMutation
  const { mutate: deleteHashtag, isLoading: isRemovingHashtag } = useMutation({
    mutationKey: ['remove-hashtag'],
    mutationFn: (params: { hashtag: string; subject: 'all' | 'only' }) =>
      removeHashtag(params),
    onSuccess: () => {
      onClose();
      toast.success('Delete Successfully!');
      queryClient.invalidateQueries({ queryKey: ['get-all-email-status'] });
    },
  });

  //   Handle FNC
  const handleChangeModalStatus = () => {
    // setModalStatus(false);
    dispatch(setEmailsList([]));
    navigate('/');
  };

  const handleClickHashtag = async (e) => {
    e.preventDefault();
    const eventDetail = e.detail;

    clearTimeout(DELAY_TIMER);
    DELAY_TIMER = await setTimeout(() => {
      switch (eventDetail) {
        case 1:
          navigate(NAV_LINK_TO);
          break;

        default:
          setIsEdit(true);
          console.log('db Click');
          break;
      }
    }, DELAY_CLICK_TIME);
  };

  const handleDeleteHashtag = (e) => {
    e.preventDefault();
    setAlertData(
      'Are you sure want to "Delete" this Hashtag',
      _renderAlertContent(
        `If you agree to "delete" it, we will remove them all from your email
    `,
        catalog,
      ),
      () => deleteHashtag({ hashtag: catalog, subject: 'all' }),
    );
  };

  const _renderAlertContent = useCallback(
    (title: string, hashtagName: string) => {
      return (
        <Box>
          <Box>
            <p>
              <b>{title}</b>
            </p>
          </Box>
          <Box>
            <p>
              <b className="inline-block min-w-[200]">Hashtag Name:</b>
              <span>{hashtagName}</span>
            </p>
          </Box>
        </Box>
      );
    },
    [catalog],
  );

  return (
    <Box key={index}>
      {!isEdit ? (
        <Hashtag
          NAV_LINK_TO={NAV_LINK_TO}
          isHover={isHover}
          setIsHover={setIsHover}
          catalog={catalog}
          notiNumber={notiNumber}
          title={title}
          setModalStatus={setModalStatus}
          onClickHashTag={handleClickHashtag}
          onDeleteHashTag={handleDeleteHashtag}
        />
      ) : (
        <EditHashtag
          formData={formData}
          onChange={(formData) => setFormData(formData)}
          onSubmit={() => {
            console.log('edited Hashtag');
            setIsEdit(false);
            toast.success('Edit Successfully!');
          }}
          onCancel={() => {
            setIsEdit(false);
          }}
        />
      )}
      <ModalEmailList
        titleColor={color}
        title={title}
        catalog={catalog}
        isActive={modalStatus}
        handleChangeModalStatus={handleChangeModalStatus}
      />
      <AlertDialog
        descriptionLabel={description}
        isOpen={isOpen}
        onClose={onClose}
        titleLabel={titleDialog}
        isLoading={isLoading}
        isShowDisagreeBtn
        onAgree={callback}
        onDisagree={onClose}
      />
    </Box>
  );
};

export default HashtagContainer;
