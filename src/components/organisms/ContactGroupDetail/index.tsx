import { ContactSharingGroupsType } from '@containers/ContactContainer/ContactSharingGroupsContainer';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Switch,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactsContainer from '@containers/ContactContainer/Contacts';

import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: ContactSharingGroupsType;
}

const ContactGroupDetail: React.FC<Props> = ({ data }) => {
  // useNavigate
  const navigate = useNavigate();
  const { group_name, members, share_by, share_with } = data;
  return (
    <div className="flex flex-col flex-1 px-6 overflow-hidden">
      <div className="flex-1 overflow-scroll">
        <Grid container>
          <Grid xs={12}>
            <p>
              <b className="inline-block min-w-[120px] text-[18px]">Name:</b>
              <span>{group_name}</span>
            </p>
          </Grid>
          <Grid xs={12}>
            <p>
              <b className="inline-block min-w-[120px] text-[18px]">Share by:</b>
              <span>{share_by}</span>
            </p>
          </Grid>
          <Grid xs={12}>
            <p>
              <b className="inline-block min-w-[120px] text-[18px]">Share with:</b>
              <span>{share_with.join(', ')}</span>
            </p>
          </Grid>
          <Grid xs={12}>
            <p>
              <b className="inline-block min-w-[120px] text-[18px]">Share:</b>
              <Switch sx={{ margin: '-12px' }} />
            </p>
          </Grid>
          <Grid xs={12}>
            <Accordion
              sx={{
                padding: 0,
                backgroundColor: 'transparent',
                boxShadow: 'none',
                '.MuiAccordionSummary-root': {
                  minHeight: 'unset !important',
                  padding: 0,
                  justifyContent: 'flex-start !important',
                },
              }}>
              <AccordionSummary
                sx={{
                  '.MuiAccordionSummary-content': {
                    flexGrow: '0 !important',
                    margin: '0 !important',
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <p className="flex items-center">
                  <b className="inline-block min-w-[120px] text-[18px]">Contacts:</b>
                  <span className="flex items-center pl-2">
                    {members.length}
                    <PeopleIcon sx={{ color: '#999999', paddingLeft: 2 }} />
                  </span>
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <ContactsContainer />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </div>
      <div className="flex justify-end py-2 border-t border-slate-400">
        <Button onClick={() => navigate('/contact/groups/edit/2')}>Edit</Button>
      </div>
    </div>
  );
};

export default ContactGroupDetail;
