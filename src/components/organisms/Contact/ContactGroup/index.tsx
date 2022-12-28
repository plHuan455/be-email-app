import { ContactType } from '@containers/ContactContainer/Contacts/interface';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ContactGroup } from '@redux/Contact/interface';
import React from 'react';

interface ContactsProps {
  rows: ContactGroup[];
  columns: GridColDef[];
  handleCellClick: (any) => void;
}

const ContactGroup: React.FC<ContactsProps> = ({
  rows,
  columns,
  handleCellClick,
}) => {
  console.log(rows);
  return (
    <div className="px-6 flex-1 overflow-hidden flex flex-col">
      <div style={{ height: '85%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          style={{ backgroundColor: '#fff', borderRadius: 15 }}
          // onRowClick={(params) => handleRowClick(params)}
          onCellClick={(params) => handleCellClick(params)}
        />
      </div>
    </div>
  );
};

export default ContactGroup;
