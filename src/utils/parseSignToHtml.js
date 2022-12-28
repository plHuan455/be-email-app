export const parseSignToHtml = (data) => {
  const { name, position, department, phone, email } = data;
  return `<div style="display: flex; width: 100%;">
    <div>
        <p style="font-size: 20px; font-weight: 600; margin: 0px; padding: 0px;">${name}</p>
        <p style="font-weight: 500; margin: 8px 0px; padding: 0px;">${position}</p>
        <p style="font-weight: 500; margin: 8px 0px; padding: 0px;">Department: ${department}</p>
        <p style="font-weight: 500; margin: 8px 0px; padding: 0px;">Phone: ${phone}</p>
        <p style="font-weight: 500; margin: 8px 0px; padding: 0px;">Email: ${email}</p>
    </div>
</div>`;
};
