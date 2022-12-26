import { useTranslation } from '@@packages/localization/src';
import Row from '@components/organisms/SettingRoleContainer/TableSettingRole/Row';
import Layout from '@layouts/Layout';
import React, { useCallback, useMemo, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@components/atoms/Icon';
import ModalDrawSignature from '@components/atoms/ModalDrawSignature';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultSignId } from '@redux/Global/reducer';
import { getDefaultSignId } from '@redux/selector';
import { useNavigate } from 'react-router-dom';

export interface SignItem {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
  avatar: string;
}

const SignatureContainer = () => {
  // hook
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux
  const defaultSignId = useSelector(getDefaultSignId);

  // states
  const [signDefault, setSignDefault] = useState<number>(defaultSignId);
  const [modalSignByIdNumber, setModalSignByIdNumber] = useState<number>(0);
  const [listSign, setListSign] = useState(rowsSign);

  // functions
  const changeSignDefault = (id: number) => {
    dispatch(setDefaultSignId(id));
    setSignDefault(id);
  };

  const handleDeleteSign = useCallback(
    (id: number) => {
      const l: SignItem[] = [...listSign];
      const lItemIdx = l.findIndex((i) => i.id === id);
      if (lItemIdx > -1) {
        l.splice(lItemIdx, 1);
      }

      setListSign(l);
    },
    [listSign],
  );

  const hanleSubmitSign = useCallback(
    (url: string) => {
      if (modalSignByIdNumber > 0) {
        // edit sign
        const l: SignItem[] = [...listSign];
        const lItem = l.find((i) => i.id === modalSignByIdNumber);
        if (lItem != undefined) {
          // lItem.signature = url;
        }

        setListSign(l);
        setModalSignByIdNumber(0);
      } else {
        // add sign
        const l: SignItem[] = [...listSign];
        // const lItem: SignItem = {
        //   id: l[l.length - 1].id + 1,
        //   signature: url,
        // };
        // l.push(lItem);

        setListSign(l);
        setModalSignByIdNumber(0);
      }
    },
    [modalSignByIdNumber],
  );

  const columns = useMemo(() => {
    const colDefs: GridColDef[] = [
      {
        field: 'id',
        headerName: 'ID',
        width: 60,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'name',
        flex: 1,
        headerName: 'Name',
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'avatar',
        width: 100,
        headerName: 'Avatar',
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => <img className="img-signature" src={params.value} />,
      },
      {
        field: 'position',
        headerName: 'Position',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'phone',
        headerName: 'Phone Number',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'email',
        headerName: 'Email Address',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'setDefault',
        headerName: 'Set as default',
        align: 'center',
        headerAlign: 'center',
        width: 150,
        renderCell: (params) => (
          <Checkbox
            onClick={() => changeSignDefault(Number(params.id))}
            color="success"
            checked={params.id == signDefault}
          />
        ),
      },
    ];

    return colDefs;
  }, [listSign, signDefault]);

  const handleRowClick = (rowData) => {
    console.log('row data --->', rowData);
    navigate(`edit/${rowData.row.id}`);
  };

  return (
    <div className="px-6 flex-1 overflow-hidden flex flex-col">
      <div style={{ height: '85%', width: '100%' }}>
        <DataGrid
          rows={listSign}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          style={{ backgroundColor: '#fff', borderRadius: 15 }}
          onRowClick={(params) => handleRowClick(params)}
        />
      </div>
      {/* <ModalDrawSignature
        isOpen={modalSignByIdNumber !== 0}
        onSubmit={hanleSubmitSign}
      /> */}
    </div>
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
