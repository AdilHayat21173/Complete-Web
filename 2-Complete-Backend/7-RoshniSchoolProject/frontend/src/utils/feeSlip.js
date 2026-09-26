import { jsPDF } from "jspdf";

function numberText(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString() : "0";
}

export function downloadFeeSlip(row) {
  const doc = new jsPDF({ unit: "pt", format: "a5" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 32;
  const rightX = pageWidth - marginX;
  const centerX = pageWidth / 2;
  let y = 36;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("ROSHNI PUBLIC SCHOOL & COLLEGE", centerX, y, { align: "center" });

  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text("Marghazar Town, Mingora Swat (Branch Gogdara)", centerX, y, {
    align: "center",
  });
  y += 13;
  doc.text("Contact: 0349-896-3400", centerX, y, { align: "center" });
  y += 14;
  doc.line(marginX, y, rightX, y);

  y += 18;
  doc.setFontSize(10);
  doc.text(`ID No: ${row["ID. No"] ?? ""}`, marginX, y);
  doc.text(`Class: ${row["Class"] ?? ""}`, centerX - 20, y, { align: "center" });
  doc.text(`Month: ${row["Month"] ?? ""}`, rightX, y, { align: "right" });
  y += 18;
  doc.text(`Name: ${row["Name of Student"] ?? ""}`, marginX, y);
  y += 16;
  doc.text(`Father's Name: ${row["Father name"] ?? ""}`, marginX, y);
  y += 12;
  doc.line(marginX, y, rightX, y);

  const lineItems = [
    ["Dues", row["Dues"]],
    ["Monthly Fee", row["Monthly Fee"]],
    ["Promotion Fee", row["Promotion Fee"]],
    ["Admission Fee", row["Admission Fee"]],
    ["Books / Copies", row["Books/Copies"]],
    ["Exam Fee", row["Exame Fee"]],
    ["Others", row["Others"]],
  ];
  y += 20;
  lineItems.forEach(([label, value]) => {
    doc.text(label, marginX + 6, y);
    doc.text(numberText(value), rightX, y, { align: "right" });
    y += 16;
  });

  y += 4;
  doc.line(marginX, y, rightX, y);
  y += 18;
  doc.setFont("helvetica", "bold");
  [
    ["Total", row["Total"]],
    ["Received Fee", row["Recived Fee"]],
    ["Balance", Math.max(Number(row["Blance"]) || 0, 0)],
  ].forEach(([label, value]) => {
    doc.text(label, marginX + 6, y);
    doc.text(numberText(value), rightX, y, { align: "right" });
    y += 16;
  });

  doc.setFont("helvetica", "normal");
  y += 8;
  doc.line(marginX, y, rightX, y);
  y += 18;
  doc.text(`Receipt No: ${row["Recpt No"] || "-"}`, marginX, y);
  doc.text(`Date: ${row["Date"] || "-"}`, rightX, y, { align: "right" });
  y += 40;
  doc.text("Cashier Signature: ____________________", marginX, y);

  const studentName = String(row["Name of Student"] || "student").replace(/\s+/g, "_");
  const month = String(row["Month"] || "month").replace(/\s+/g, "_");
  doc.save(`${studentName}-${month}-slip.pdf`);
}