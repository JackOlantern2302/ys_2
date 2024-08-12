// components/TransactionPDFDownload.tsx
'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TransactionPDF from './TransactionPDF';
import { Transaction } from '@/app/((private))/transaction/columns';

interface TransactionPDFDownloadProps {
  transactions: Transaction[];
}

const TransactionPDFDownload: React.FC<TransactionPDFDownloadProps> = ({
  transactions,
}) => {
  return (
    <PDFDownloadLink
      document={<TransactionPDF transactions={transactions} />}
      fileName="transactions.pdf"
    >
      {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink>
  );
};

export default TransactionPDFDownload;
