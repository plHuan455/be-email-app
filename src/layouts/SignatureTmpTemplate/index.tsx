import React from 'react';

const SignatureTmpTemplate: React.FC<any> = () => {
  const { name, position, department, phone, email } = signDataTest;
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div>
        <p style={{ fontSize: '20px', fontWeight: 600 }}>{name}</p>
        <p style={{ fontSize: '16px', fontWeight: 500 }}>{position}</p>
        <p style={{ fontSize: '16px', fontWeight: 500 }}>Department: {department}</p>
        <p style={{ fontSize: '16px', fontWeight: 500 }}>Phone: {phone}</p>
        <p style={{ fontSize: '16px', fontWeight: 500 }}>Email: {email}</p>
      </div>
    </div>
  );
};

export default SignatureTmpTemplate;

export const signDataTest = {
  name: 'Jame Mattow',
  position: 'Frontend Developer',
  department: 'IT',
  phone: '0312456789',
  email: 'jame@dev.com',
};
