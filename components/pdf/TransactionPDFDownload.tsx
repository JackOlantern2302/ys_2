// components/TransactionPDFDownload.tsx
'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TransactionPDF from './TransactionPDF';
import { Transaction } from '@/app/(private)/transaction/columns';
import { Button } from '@/components/ui/button';

interface TransactionPDFDownloadProps {
  transactions: Transaction[];
}

const TransactionPDFDownload: React.FC<TransactionPDFDownloadProps> = ({
  transactions,
}) => {
  return (
    <Button asChild variant="default">
      <PDFDownloadLink
        document={<TransactionPDF transactions={transactions} />}
        fileName="transactions.pdf"
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </Button>
  );
};

export default TransactionPDFDownload;
