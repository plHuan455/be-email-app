export const parseSignToHtml = (data) => {
  const { avatar, name, position, phone, email } = data;
  return `<div style="display: flex; width: 100%;">
    <div style="display: flex; width: 100px; height: 100px; border-radius: 50%; overflow: hidden;">
        <div
            style="background-image: url(&quot;${avatar}&quot;); width: 100%; height: 100%; background-size: contain;">
        </div>
    </div>
    <div style="flex: 1 1 0%; margin-left: 16px;">
        <p style="font-size: 20px; font-weight: 600; margin: 0px; padding: 0px;">${name}</p>
        <p style="font-weight: 500; margin: 8px 0px; padding: 0px;">${position}</p>
        <p style="font-weight: 500; margin: 8px 0px; padding: 0px;">Phone: ${phone}</p>
        <p style="font-weight: 500; margin: 8px 0px; padding: 0px;">Email: ${email}</p>
    </div>
</div>`;
};
