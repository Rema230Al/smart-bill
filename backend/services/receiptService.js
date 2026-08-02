//clean data

function parseReceiptText(rawText){

const line = rawText.spilt('\n').filter(line => line.trim() !== "")
const storeName = lines[0] || '';
const dateMatch = rawText.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/);
const date = dateMatch ? dateMatch[0] : '';
const totalMatch = rawText.match(/total\s*\$?(\d+\.\d{2})/i);
const total = totalMatch ? parseFloat(totalMatch[1]) : 0;

return {storeName,date,total};
}