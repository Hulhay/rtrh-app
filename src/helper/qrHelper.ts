import { JamaahType, lang } from '../constants';

type DrawQrCodeType = {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  jamaah: JamaahType;
};

export const drawQRCode = (props: DrawQrCodeType) => {
  const { ctx, img, jamaah } = props;

  const expandX = 40;
  const expandY = 220;
  ctx.canvas.width = img.width + expandX;
  ctx.canvas.height = img.height + expandY;

  // Draw a background rectangle
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Add a black border with padding
  const padding = 5;
  const x = expandX / 2 - padding;
  const y = expandX / 2 - padding;
  const w = img.width + 2 * padding;
  const h = img.height + 2 * padding;
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  // Draw the QR Code
  ctx.drawImage(img, expandX / 2, expandX / 2);

  // Add Jamaah Info
  const infoPosition = y + h + 25;
  ctx.textAlign = 'center';
  ctx.font = 'bold 16px "Mukta Malar", sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText(jamaah.name, ctx.canvas.width / 2, infoPosition);

  ctx.textAlign = 'center';
  ctx.font = '14px "Mukta Malar", sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText(jamaah.phoneNumber, ctx.canvas.width / 2, infoPosition + 15);

  // Add a footer
  const footerPosition = ctx.canvas.height - 30;
  ctx.textAlign = 'center';
  ctx.font = 'bold 14px "Mukta Malar", sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText(lang('qr.rtrh'), ctx.canvas.width / 2, footerPosition);

  ctx.textAlign = 'center';
  ctx.font = '12px "Mukta Malar", sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText(lang('qr.address'), ctx.canvas.width / 2, footerPosition + 15);
};
